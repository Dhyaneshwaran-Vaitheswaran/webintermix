"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true, syncTouch: false, touchMultiplier: 0 }}>
      {children as any}
    </ReactLenis>
  );
}
