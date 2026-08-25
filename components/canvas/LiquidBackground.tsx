"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

// Using a custom vertex shader via onBeforeCompile to deform the plane.
const noiseChunk = `
  // Simplex 3D Noise 
  // by Ian McEwan, Ashima Arts
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){ 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

    i = mod(i, 289.0 ); 
    vec4 p = permute( permute( permute( 
              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                  dot(p2,x2), dot(p3,x3) ) );
  }
`;

function LiquidMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) }
  }), []);

  const { pointer } = useThree();
  const targetMouse = useRef(new THREE.Vector2(0, 0));

  useFrame((state, delta) => {
    uniforms.uTime.value += delta * 0.2;
    
    // Smoothly interpolate mouse position
    targetMouse.current.lerp(pointer, 0.05);
    uniforms.uMouse.value.copy(targetMouse.current);
    
    if (meshRef.current) {
      // Small continuous rotation to make it feel alive
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetMouse.current.y * 0.2, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetMouse.current.x * 0.2, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]} scale={[12, 12, 1]}>
      <planeGeometry args={[1, 1, 128, 128]} />
      <meshPhysicalMaterial
        ref={materialRef}
        transmission={1}
        opacity={1}
        roughness={0.1}
        ior={1.5}
        thickness={2}
        clearcoat={1}
        color="#ffffff"
        onBeforeCompile={(shader) => {
          shader.uniforms.uTime = uniforms.uTime;
          shader.uniforms.uMouse = uniforms.uMouse;

          shader.vertexShader = shader.vertexShader.replace(
            "#include <common>",
            `#include <common>
            uniform float uTime;
            uniform vec2 uMouse;
            ${noiseChunk}
            `
          );

          shader.vertexShader = shader.vertexShader.replace(
            "#include <begin_vertex>",
            `#include <begin_vertex>
            
            float n = snoise(vec3(position.xy * 2.0, uTime * 0.5));
            // Add mouse influence
            float dist = distance(position.xy, uMouse * 0.5);
            float mouseInfluence = smoothstep(0.5, 0.0, dist);
            
            transformed.z += n * 0.2 + mouseInfluence * 0.3;
            `
          );

          // Need to recompute normals for physical material to reflect properly
          shader.vertexShader = shader.vertexShader.replace(
            "#include <beginnormal_vertex>",
            `#include <beginnormal_vertex>
            // Approximate normals based on height map neighbors
            float e = 0.01;
            float nx = snoise(vec3((position.xy + vec2(e, 0.0)) * 2.0, uTime * 0.5));
            float ny = snoise(vec3((position.xy + vec2(0.0, e)) * 2.0, uTime * 0.5));
            float nz = snoise(vec3(position.xy * 2.0, uTime * 0.5));
            
            vec3 tangent = vec3(e, 0.0, nx - nz);
            vec3 binormal = vec3(0.0, e, ny - nz);
            objectNormal = normalize(cross(tangent, binormal));
            `
          );
        }}
      />
    </mesh>
  );
}

export function LiquidBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#050505]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#8B5CF6" />
        <directionalLight position={[-10, -10, -5]} intensity={2} color="#3B82F6" />
        
        {/* Procedural Environment map for realistic glass reflections without external fetching */}
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
            <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
            <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[5, 1, -1]} scale={2} />
          </group>
        </Environment>
        
        <LiquidMesh />
      </Canvas>
    </div>
  );
}
