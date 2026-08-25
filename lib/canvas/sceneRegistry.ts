import type { SceneName } from "@/types/canvas";

/** Maps Next.js route pathnames to scene names */
const SCENE_MAP: Record<string, SceneName> = {
  "/": "plexus",
  "/systems": "systems",
  "/evidence": "null",
  "/threshold": "plexus",
};

/**
 * Get the scene name for a given route pathname.
 * Falls back to 'null' for unknown routes.
 */
export function getSceneForRoute(pathname: string): SceneName {
  // Handle dynamic routes like /evidence/[slug]
  if (pathname.startsWith("/evidence/")) return "null";
  return SCENE_MAP[pathname] ?? "null";
}

/** Duration of scene transition animation in ms */
export const SCENE_TRANSITION_MS = 400;
