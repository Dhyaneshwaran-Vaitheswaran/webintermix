"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useCursorStore } from "@/stores/cursorStore";
import { useCanvasStore } from "@/stores/canvasStore";

/**
 * SignalField: A dynamic 3D particle grid
 * Renders an array of tiny, sharp particle nodes in a mathematical plane.
 * Particles subtly distort/attract toward the mouse position with spring math.
 */
export function SignalField() {
  const pointsRef = useRef<THREE.Points>(null);

  // Configuration
  const count = 2500;
  const spread = 40;
  const attractionRadius = 6.0; // In 3D space units
  const baseOpacity = 0.25;

  const { positions, originalPositions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const baseColor = new THREE.Color("#000000");

    // Grid distribution (approximate square)
    const side = Math.ceil(Math.sqrt(count));
    const step = spread / side;

    let i = 0;
    for (let x = 0; x < side; x++) {
      for (let y = 0; y < side; y++) {
        if (i >= count) break;
        
        // Center the grid
        const px = (x * step) - (spread / 2);
        const py = (y * step) - (spread / 2);
        
        // Add slight randomness to break perfect grid
        const rx = px + (Math.random() - 0.5) * step * 0.5;
        const ry = py + (Math.random() - 0.5) * step * 0.5;
        const rz = (Math.random() - 0.5) * 2; // subtle depth variance
        
        positions[i * 3] = rx;
        positions[i * 3 + 1] = ry;
        positions[i * 3 + 2] = rz;

        originalPositions[i * 3] = rx;
        originalPositions[i * 3 + 1] = ry;
        originalPositions[i * 3 + 2] = rz;

        colors[i * 3] = baseColor.r;
        colors[i * 3 + 1] = baseColor.g;
        colors[i * 3 + 2] = baseColor.b;

        sizes[i] = 1.0;

        i++;
      }
    }

    return { positions, originalPositions, colors, sizes };
  }, [count, spread]);

  const geometryRef = useRef<THREE.BufferGeometry>(null);
  
  // To smooth out the target position from the DOM space
  const smoothedCursor = useRef(new THREE.Vector3(0, 0, 0));
  const mousePosRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useFrame((state) => {
    if (!geometryRef.current) return;
    const posAttribute = geometryRef.current.attributes.position as THREE.BufferAttribute;
    const colorAttribute = geometryRef.current.attributes.color as THREE.BufferAttribute;
    
    // Read scroll position from store
    const scrollProgress = useCanvasStore.getState().uniforms.uScrollProgress;
    
    // Tilt the entire particle field based on scroll progress
    if (pointsRef.current) {
      pointsRef.current.rotation.x = scrollProgress * Math.PI * -0.15;
    }
    
    // Convert DOM pixel coordinates to NDC (-1 to +1)
    const cursor = mousePosRef.current;
    const ndcX = (cursor.x / window.innerWidth) * 2 - 1;
    const ndcY = -(cursor.y / window.innerHeight) * 2 + 1;
    
    // Convert NDC to World Space (rough approximation for z=0 plane)
    const vec = new THREE.Vector3(ndcX, ndcY, 0.5);
    vec.unproject(state.camera);
    const dir = vec.sub(state.camera.position).normalize();
    const distance = -state.camera.position.z / dir.z;
    const targetPos = state.camera.position.clone().add(dir.multiplyScalar(distance));
    
    // Smooth the cursor position
    smoothedCursor.current.lerp(targetPos, 0.1);

    const baseColor = new THREE.Color("#000000");
    const accentColor = new THREE.Color("#FF3B3B");

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      
      const ox = originalPositions[idx];
      const oy = originalPositions[idx + 1];
      const oz = originalPositions[idx + 2];
      
      const px = posAttribute.array[idx];
      const py = posAttribute.array[idx + 1];
      const pz = posAttribute.array[idx + 2];
      
      // Current position vector
      const currentPos = new THREE.Vector3(px, py, pz);
      
      // Calculate distance to cursor
      const distToCursor = currentPos.distanceTo(smoothedCursor.current);
      
      // Spring logic
      let tx = ox;
      let ty = oy;
      let tz = oz;
      
      // Attraction force
      let colorMix = 0;
      if (distToCursor < attractionRadius) {
        const force = Math.pow(1 - distToCursor / attractionRadius, 2);
        
        // Attract toward cursor
        const attractionVec = new THREE.Vector3()
          .subVectors(smoothedCursor.current, currentPos)
          .normalize()
          .multiplyScalar(force * 1.5);
          
        tx = ox + attractionVec.x;
        ty = oy + attractionVec.y;
        tz = oz + attractionVec.z + (force * 2.0); // pop out slightly
        
        colorMix = force;
      }
      
      // Apply spring force
      const stiffness = 0.1;
      const damping = 0.8;
      
      // Simplified spring without velocity tracking (lerp gives similar effect)
      posAttribute.array[idx] += (tx - px) * stiffness;
      posAttribute.array[idx + 1] += (ty - py) * stiffness;
      posAttribute.array[idx + 2] += (tz - pz) * stiffness;
      
      // Update color based on proximity
      const finalColor = baseColor.clone().lerp(accentColor, colorMix);
      colorAttribute.array[idx] = finalColor.r;
      colorAttribute.array[idx + 1] = finalColor.g;
      colorAttribute.array[idx + 2] = finalColor.b;
    }

    posAttribute.needsUpdate = true;
    colorAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={colors.length / 3}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={sizes.length}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={baseOpacity}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
