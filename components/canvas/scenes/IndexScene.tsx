"use client";

import { useFrame } from "@react-three/fiber";
import { useCanvasStore } from "@/stores/canvasStore";
import { SignalField } from "../objects/SignalField";
import { GeometricCore } from "../objects/GeometricCore";

/**
 * IndexScene — WebGL scene for the homepage.
 * Features a minimalist setup focusing on the fluid GeometricCore.
 */
export function IndexScene() {
  useFrame(() => {
    // Keep uniforms updated for SignalField or GeometricCore if they need them
    // Even if not heavily used here, good practice to sync
  });

  return (
    <group>
      <SignalField />
      <GeometricCore />
    </group>
  );
}

