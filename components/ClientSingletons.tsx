"use client";

import dynamic from "next/dynamic";

// All ssr:false dynamic imports MUST be in a Client Component in Next.js 16+
const CanvasRoot = dynamic(
  () => import("@/components/canvas/CanvasRoot").then((m) => ({ default: m.CanvasRoot })),
  { ssr: false }
);

const PhysicsCursor = dynamic(
  () => import("@/components/cursor/PhysicsCursor").then((m) => ({ default: m.PhysicsCursor })),
  { ssr: false }
);

const CommandPalette = dynamic(
  () => import("@/components/command-palette/CommandPalette").then((m) => ({ default: m.CommandPalette })),
  { ssr: false }
);

const PerformanceHUD = dynamic(
  () => import("@/components/hud/PerformanceHUD").then((m) => ({ default: m.PerformanceHUD })),
  { ssr: false }
);

/**
 * ClientSingletons — A thin client wrapper for all lazy-loaded,
 * client-only global singleton components.
 *
 * This pattern is required in Next.js 16+ App Router:
 * `ssr: false` is only valid inside Client Components.
 */
export function ClientSingletons() {
  return (
    <>
      <CanvasRoot />
      <PhysicsCursor />
      <CommandPalette />
      <PerformanceHUD />
    </>
  );
}
