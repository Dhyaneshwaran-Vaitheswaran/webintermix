"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 200;
const BOUNDS = 10;

export function AmbientDust() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const phases = new Float32Array(PARTICLE_COUNT);
    const speeds = new Float32Array(PARTICLE_COUNT);

    const white = new THREE.Color(0xffffff);
    const red = new THREE.Color(0xff3b3b);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Random position in bounding box
      positions[i * 3] = (Math.random() - 0.5) * BOUNDS * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS * 2;
      // Z spread slightly behind the main content
      positions[i * 3 + 2] = -2 - Math.random() * 15;

      // 5% red
      const isRed = Math.random() < 0.05;
      const c = isRed ? red : white;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      // Unique phase and speed for drift
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.05 + Math.random() * 0.1;
    }

    return { positions, colors, phases, speeds };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      
      // Ultra-slow drift
      positions[idx] += Math.sin(t * particles.speeds[i] + particles.phases[i]) * 0.002;
      positions[idx + 1] += Math.cos(t * particles.speeds[i] * 0.8 + particles.phases[i]) * 0.002;
      positions[idx + 2] += 0.005; // slowly drift towards camera

      // Reset Z if it gets too close
      if (positions[idx + 2] > 2) {
        positions[idx + 2] = -15;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
          count={PARTICLE_COUNT}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
          count={PARTICLE_COUNT}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.05}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
