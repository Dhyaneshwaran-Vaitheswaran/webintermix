"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useCanvasStore } from "@/stores/canvasStore";
import * as THREE from "three";

// R3F extends JSX to include Three.js primitives via 'primitive' or JSX intrinsics.
// Use 'primitive' for Three.js objects to avoid conflicts with SVG <line>.

/**
 * SystemsScene — WebGL scene for /systems page.
 * Renders a 3D coordinate axis system that reacts to scroll progress.
 * X/Y/Z axes are revealed progressively as the user scrolls.
 */
export function SystemsScene() {
  const groupRef = useRef<THREE.Group>(null);

  const axisLength = 3;

  const xMat = useRef(
    new THREE.LineBasicMaterial({ color: "#FF3B3B", transparent: true, opacity: 0 })
  );
  const yMat = useRef(
    new THREE.LineBasicMaterial({ color: "#E8E8E8", transparent: true, opacity: 0 })
  );
  const zMat = useRef(
    new THREE.LineBasicMaterial({ color: "#404040", transparent: true, opacity: 0 })
  );

  const xLine = useRef(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-axisLength, 0, 0),
        new THREE.Vector3(axisLength, 0, 0),
      ]),
      xMat.current
    )
  );
  const yLine = useRef(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -axisLength, 0),
        new THREE.Vector3(0, axisLength, 0),
      ]),
      yMat.current
    )
  );
  const zLine = useRef(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, -axisLength),
        new THREE.Vector3(0, 0, axisLength),
      ]),
      zMat.current
    )
  );

  useFrame(({ clock }) => {
    const { uScrollProgress } = useCanvasStore.getState().uniforms;
    const t = clock.getElapsedTime();

    // Slow rotation
    if (groupRef.current) {
      groupRef.current.rotation.x = t * 0.05;
      groupRef.current.rotation.y = t * 0.08;
    }

    // Progressive axis reveal via opacity
    const s = uScrollProgress;
    xMat.current.opacity = Math.min(1, s * 4);
    yMat.current.opacity = Math.min(1, Math.max(0, s * 4 - 1));
    zMat.current.opacity = Math.min(1, Math.max(0, s * 4 - 2));
  });

  return (
    <group ref={groupRef}>
      <primitive object={xLine.current} />
      <primitive object={yLine.current} />
      <primitive object={zLine.current} />
    </group>
  );
}
