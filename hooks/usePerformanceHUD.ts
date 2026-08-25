"use client";

import { useEffect, useRef, useCallback } from "react";
import { useCanvasStore } from "@/stores/canvasStore";

const FPS_SAMPLE_SIZE = 60;

/**
 * rAF-based performance measurement hook.
 * Tracks FPS rolling average and writes it to canvasStore.
 * Also reads page weight from Next.js data.
 */
export function usePerformanceHUD() {
  const frameTimes = useRef<number[]>([]);
  const lastTime = useRef<number>(performance.now());
  const rafRef = useRef<number | null>(null);
  const setRendererInfo = useCanvasStore((s) => s.setRendererInfo);

  const tick = useCallback(() => {
    const now = performance.now();
    const delta = now - lastTime.current;
    lastTime.current = now;

    frameTimes.current.push(delta);
    if (frameTimes.current.length > FPS_SAMPLE_SIZE) {
      frameTimes.current.shift();
    }

    const avgDelta =
      frameTimes.current.reduce((a, b) => a + b, 0) / frameTimes.current.length;
    const fps = Math.round(1000 / avgDelta);

    setRendererInfo({ fps });

    rafRef.current = requestAnimationFrame(tick);
  }, [setRendererInfo]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);
}

/**
 * Get the approximate current page JS weight from __NEXT_DATA__.
 * Returns a human-readable string.
 */
export function getPageWeight(): string {
  if (typeof window === "undefined") return "—";
  try {
    const data = (window as typeof window & { __NEXT_DATA__?: { props?: unknown } }).__NEXT_DATA__;
    if (!data) return "—";
    const json = JSON.stringify(data);
    const kb = (new Blob([json]).size / 1024).toFixed(1);
    return `${kb} KB`;
  } catch {
    return "—";
  }
}

/**
 * Get DOM node count.
 */
export function getDOMNodeCount(): number {
  if (typeof document === "undefined") return 0;
  return document.querySelectorAll("*").length;
}
