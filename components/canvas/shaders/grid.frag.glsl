// Grid fragment shader
// Renders a hairline grid with cursor-proximity breathing effect

precision highp float;

uniform float uTime;
uniform vec2 uCursorNDC;      // Normalized device coordinates [-1, 1]
uniform float uCursorVelocity;
uniform float uScrollProgress;
uniform bool uIsIdle;

varying vec2 vUv;
varying vec3 vPosition;

// Grid color tokens
vec3 GRID_COLOR = vec3(0.118, 0.118, 0.118); // #1E1E1E
vec3 CURSOR_COLOR = vec3(1.0, 0.231, 0.231); // #FF3B3B

float gridLine(float coord, float lineWidth) {
  float grid = fract(coord);
  return 1.0 - smoothstep(0.0, lineWidth, min(grid, 1.0 - grid));
}

void main() {
  // Grid scale — 40 cells visible
  float scale = 40.0;
  float lineWidth = 0.015;

  float gx = gridLine(vUv.x * scale, lineWidth);
  float gy = gridLine(vUv.y * scale, lineWidth);
  float grid = max(gx, gy);

  // Cursor proximity effect
  // Convert UV to NDC-like space for cursor comparison
  vec2 uvCentered = vUv * 2.0 - 1.0;
  float cursorDist = length(uvCentered - uCursorNDC);
  float proximityRadius = 0.3 + uCursorVelocity * 0.1;
  float proximity = 1.0 - smoothstep(0.0, proximityRadius, cursorDist);

  // Breathing animation — slow rotation effect
  float breathe = sin(uTime * 0.4) * 0.5 + 0.5;
  float baseAlpha = 0.12 + breathe * 0.04;

  // Idle fade
  float idleFade = uIsIdle ? 0.3 : 1.0;

  // Scroll influence — grid dims as you scroll deeper
  float scrollDim = 1.0 - uScrollProgress * 0.4;

  // Final color computation
  vec3 color = mix(
    GRID_COLOR,
    CURSOR_COLOR,
    proximity * 0.35 * min(1.0, uCursorVelocity * 5.0)
  );

  float alpha = grid * (baseAlpha + proximity * 0.18) * idleFade * scrollDim;

  gl_FragColor = vec4(color, alpha);
}
