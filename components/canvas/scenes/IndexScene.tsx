"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useCanvasStore } from "@/stores/canvasStore";
import * as THREE from "three";
import gridVert from "../shaders/grid.vert.glsl";
import gridFrag from "../shaders/grid.frag.glsl";
import { SignalField } from "../objects/SignalField";

/**
 * IndexScene — WebGL scene for the homepage.
 * Renders a mathematically precise grid that:
 * - Breathes slowly over time
 * - Reacts to cursor proximity (color shift toward #FF3B3B)
 * - Dims as the user scrolls
 * - Fades when cursor is idle
 */
export function IndexScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  const uniforms = useRef({
    uTime: { value: 0 },
    uCursorNDC: { value: new THREE.Vector2(0, 0) },
    uCursorVelocity: { value: 0 },
    uScrollProgress: { value: 0 },
    uIsIdle: { value: false },
  });

  useFrame(({ clock }) => {
    const storeUniforms = useCanvasStore.getState().uniforms;

    uniforms.current.uTime.value = clock.getElapsedTime();
    uniforms.current.uCursorNDC.value.set(
      storeUniforms.uCursorNDC[0],
      storeUniforms.uCursorNDC[1]
    );
    uniforms.current.uCursorVelocity.value = Math.min(
      1,
      storeUniforms.uCursorVelocity * 0.1
    );
    uniforms.current.uScrollProgress.value = storeUniforms.uScrollProgress;
    uniforms.current.uIsIdle.value = storeUniforms.uIsIdle;
  });

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, -1]}>
        <planeGeometry args={[20, 20, 1, 1]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={gridVert}
          fragmentShader={gridFrag}
          uniforms={uniforms.current}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <SignalField />
    </group>
  );
}
