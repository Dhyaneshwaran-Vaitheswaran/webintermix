"use client";

import { useEffect } from "react";
import { useUIStore } from "@/stores/uiStore";
import { useCanvasStore } from "@/stores/canvasStore";
import { getSceneForRoute, SCENE_TRANSITION_MS } from "@/lib/canvas/sceneRegistry";
import { usePathname } from "next/navigation";

/**
 * Syncs the current route to the canvas scene registry.
 * On route change, fades the current scene out before switching.
 * Also synchronizes scroll progress to canvas uniforms.
 */
export function useSceneSync() {
  const pathname = usePathname();
  const setActiveScene = useCanvasStore((s) => s.setActiveScene);
  const setUniforms = useCanvasStore((s) => s.setUniforms);

  // ── Route → Scene sync ────────────────────────────────────────────────────
  useEffect(() => {
    // Step 1: Transition to null scene (fade out)
    setActiveScene("null");

    // Step 2: After transition, load new scene
    const timeout = setTimeout(() => {
      const scene = getSceneForRoute(pathname);
      setActiveScene(scene);
      // Reset scroll on route change
      setUniforms({ uScrollProgress: 0 });
    }, SCENE_TRANSITION_MS);

    return () => clearTimeout(timeout);
  }, [pathname, setActiveScene, setUniforms]);

  // ── Scroll → Uniform sync ─────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      setUniforms({ uScrollProgress: Math.min(1, Math.max(0, progress)) });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [setUniforms]);
}

/**
 * Syncs reduced motion preference to UI store.
 */
export function useReducedMotion() {
  const setReduceMotion = useUIStore((s) => s.setReduceMotion);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [setReduceMotion]);
}
