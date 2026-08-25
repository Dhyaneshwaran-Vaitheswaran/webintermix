export interface Vector2 {
  x: number;
  y: number;
}

// ─── Basic Math ───────────────────────────────────────────────────────────────

/** Linear interpolation */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Vector2 lerp */
export function lerpV2(a: Vector2, b: Vector2, t: number): Vector2 {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) };
}

/** Clamp value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** Remap a value from one range to another */
export function remap(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

/** Euclidean distance between two Vector2 points */
export function distance(a: Vector2, b: Vector2): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/** Magnitude (length) of a Vector2 */
export function magnitude(v: Vector2): number {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

/** Normalize a Vector2 to unit length */
export function normalize(v: Vector2): Vector2 {
  const mag = magnitude(v);
  if (mag === 0) return { x: 0, y: 0 };
  return { x: v.x / mag, y: v.y / mag };
}

/** Add two Vector2 */
export function addV2(a: Vector2, b: Vector2): Vector2 {
  return { x: a.x + b.x, y: a.y + b.y };
}

/** Subtract Vector2: a - b */
export function subV2(a: Vector2, b: Vector2): Vector2 {
  return { x: a.x - b.x, y: a.y - b.y };
}

/** Scale Vector2 by scalar */
export function scaleV2(v: Vector2, s: number): Vector2 {
  return { x: v.x * s, y: v.y * s };
}

// ─── Spring Physics ───────────────────────────────────────────────────────────

export interface SpringState {
  position: number;
  velocity: number;
}

/**
 * Advance a spring simulation by one frame.
 * @param state - Current spring state
 * @param target - Target position
 * @param stiffness - Spring stiffness (0.12 default)
 * @param damping - Damping ratio (0.82 default)
 */
export function springStep(
  state: SpringState,
  target: number,
  stiffness = 0.12,
  damping = 0.82
): SpringState {
  const acceleration = (target - state.position) * stiffness;
  const velocity = (state.velocity + acceleration) * damping;
  const position = state.position + velocity;
  return { position, velocity };
}

/** Spring step for Vector2 */
export function springStepV2(
  position: Vector2,
  velocity: Vector2,
  target: Vector2,
  stiffness = 0.12,
  damping = 0.82
): { position: Vector2; velocity: Vector2 } {
  const ax = (target.x - position.x) * stiffness;
  const ay = (target.y - position.y) * stiffness;
  const vx = (velocity.x + ax) * damping;
  const vy = (velocity.y + ay) * damping;
  return {
    position: { x: position.x + vx, y: position.y + vy },
    velocity: { x: vx, y: vy },
  };
}

// ─── Conversion ───────────────────────────────────────────────────────────────

/**
 * Convert pixel coordinates to Normalized Device Coordinates [-1, 1]
 */
export function toNDC(
  pos: Vector2,
  width = window.innerWidth,
  height = window.innerHeight
): [number, number] {
  return [(pos.x / width) * 2 - 1, -(pos.y / height) * 2 + 1];
}

// ─── Fuzzy Search (no library) ────────────────────────────────────────────────

/**
 * Simple fuzzy search — returns score 0–1 (1 = exact, 0 = no match)
 */
export function fuzzyScore(needle: string, haystack: string): number {
  const n = needle.toLowerCase();
  const h = haystack.toLowerCase();

  if (h.includes(n)) return 1;

  let score = 0;
  let hi = 0;
  for (let ni = 0; ni < n.length; ni++) {
    const found = h.indexOf(n[ni], hi);
    if (found === -1) return 0;
    score += 1 / (found - hi + 1);
    hi = found + 1;
  }
  return score / n.length;
}

export function fuzzyFilter<T extends { label: string }>(
  needle: string,
  items: T[]
): T[] {
  if (!needle.trim()) return items;
  return items
    .map((item) => ({ item, score: fuzzyScore(needle, item.label) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}
