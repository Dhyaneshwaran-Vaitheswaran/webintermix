"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useCanvasStore } from "@/stores/canvasStore";
import { Float, MeshDistortMaterial } from "@react-three/drei";

export function GeometricCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Slow cinematic rotation
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.15;

    // Subtle reaction to mouse
    const { uCursorNDC } = useCanvasStore.getState().uniforms;
    const targetX = uCursorNDC[0] * 0.5;
    const targetY = uCursorNDC[1] * 0.5;
    
    meshRef.current.rotation.x += (targetY - meshRef.current.rotation.x) * 0.02;
    meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.02;
  });

  return (
    <group position={[0, 0, -2]}>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={3} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={5} color="#FF3B3B" />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef} scale={1.2}>
          <icosahedronGeometry args={[2, 64]} />
          <MeshDistortMaterial
            color="#000000"
            emissive="#880000"
            roughness={0.1}
            metalness={0.9}
            clearcoat={1}
            clearcoatRoughness={0.1}
            distort={0.4}
            speed={2}
          />
        </mesh>
      </Float>
    </group>
  );
}
