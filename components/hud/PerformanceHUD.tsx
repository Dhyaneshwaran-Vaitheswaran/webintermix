"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/stores/uiStore";
import { useCanvasStore } from "@/stores/canvasStore";
import { usePerformanceHUD, getPageWeight, getDOMNodeCount } from "@/hooks/usePerformanceHUD";

/**
 * Performance HUD — displays live performance metrics.
 * Toggle with ⌘⇧H or via Command Palette.
 */
export function PerformanceHUD() {
  const pathname = usePathname();
  const hudVisible = useUIStore((s) => s.hudVisible);
  const { fps, drawCalls, triangles } = useCanvasStore((s) => s.rendererInfo);
  const [domNodes, setDomNodes] = useState(0);
  const [pageWeight, setPageWeight] = useState("—");

  // Start FPS measurement
  usePerformanceHUD();

  useEffect(() => {
    if (!hudVisible) return;
    setPageWeight(getPageWeight());
    const interval = setInterval(() => {
      setDomNodes(getDOMNodeCount());
    }, 2000);
    return () => clearInterval(interval);
  }, [hudVisible]);

  if (!hudVisible) return null;

  const fpsCritical = fps < 55;
  const frameCritical = fps > 0 && 1000 / fps > 20;

  return (
    <div className="perf-hud font-mono text-xs text-[#FF3B3B]" aria-label="Performance HUD" aria-live="off">
      <div>
        Route&nbsp;&nbsp;&nbsp;&nbsp;{pathname}
      </div>
      <div data-critical={fpsCritical}>
        FPS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fps}
      </div>
      <div data-critical={frameCritical}>
        Frame&nbsp;&nbsp;&nbsp;&nbsp;{fps > 0 ? `${(1000 / fps).toFixed(1)}ms` : "—"}
      </div>
      <div>
        Bundle&nbsp;&nbsp;&nbsp;{pageWeight}
      </div>
      <div>
        DOM&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{domNodes} nodes
      </div>
      <div>
        Calls&nbsp;&nbsp;&nbsp;&nbsp;{drawCalls}
      </div>
      <div>
        Tris&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{triangles.toLocaleString()}
      </div>
    </div>
  );
}
