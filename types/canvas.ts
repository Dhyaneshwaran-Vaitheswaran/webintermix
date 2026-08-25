// ─── Canvas / WebGL Types ────────────────────────────────────────────────────

export type SceneName = "index" | "systems" | "plexus" | "null";

export interface CanvasUniforms {
  uTime: number;
  uScrollProgress: number; // 0–1, normalized scroll depth
  uCursorNDC: [number, number]; // Normalized Device Coordinates [-1, 1]
  uCursorVelocity: number; // Magnitude of cursor velocity
  uIsIdle: boolean; // True after 3s of no movement
}

export interface RendererInfo {
  triangles: number;
  drawCalls: number;
  fps: number;
}

export interface CanvasStore {
  activeScene: SceneName;
  setActiveScene: (scene: SceneName) => void;
  uniforms: CanvasUniforms;
  setUniform: <K extends keyof CanvasUniforms>(key: K, value: CanvasUniforms[K]) => void;
  setUniforms: (partial: Partial<CanvasUniforms>) => void;
  cameraTarget: [number, number, number];
  cameraFOV: number;
  rendererInfo: RendererInfo;
  setRendererInfo: (info: Partial<RendererInfo>) => void;
}

export interface ShaderMaterial {
  vertexShader: string;
  fragmentShader: string;
  uniforms: Record<string, { value: unknown }>;
}
