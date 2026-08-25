"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useCanvasStore } from "@/stores/canvasStore";
import { IndexScene } from "./scenes/IndexScene";
import { NullScene } from "./scenes/NullScene";
import { SystemsScene } from "./scenes/SystemsScene";
import { PlexusScene } from "./scenes/PlexusScene";
import { AmbientDust } from "./objects/AmbientDust";
import type { SceneName } from "@/types/canvas";

function ActiveScene({ scene }: { scene: SceneName }) {
  switch (scene) {
    case "index":
      return <IndexScene />;
    case "systems":
      return <SystemsScene />;
    case "plexus":
      return <PlexusScene />;
    case "null":
    default:
      return <NullScene />;
  }
}

/**
 * CanvasRoot — the single, persistent R3F canvas instance.
 *
 * Architecture rules:
 * - Mounted ONCE in layout.tsx. Never unmounts.
 * - position: fixed, z-index: 0, pointer-events: none
 * - Never owns content — only comments on it via uniforms
 * - Scene routing driven exclusively by canvasStore.activeScene
 */
export function CanvasRoot() {
  const activeScene = useCanvasStore((s) => s.activeScene);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // If mobile, do not mount the heavy WebGL canvas to preserve battery/performance.
  // The CSS RedAurora handles background visual weight on small screens.
  if (isMobile) {
    return null;
  }

  return (
    <div
      id="webgl-canvas"
      aria-hidden="true"
      role="presentation"
      className="fixed inset-0 w-screen h-screen z-0 pointer-events-none overflow-hidden"
    >
      <Canvas
        camera={{ fov: 60, near: 0.1, far: 100, position: [0, 0, 5] }}
        gl={{
          antialias: false, // Performance: no MSAA needed for flat shaders
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          gl.setClearColor(0x000000, 0);
        }}
        frameloop="always"
        performance={{ min: 0.5 }} // Drop to 30fps under GPU pressure
        style={{ width: "100%", height: "100%" }}
      >
        <AmbientDust />
        <Suspense fallback={<NullScene />}>
          <ActiveScene scene={activeScene} />
        </Suspense>
      </Canvas>
    </div>
  );
}
