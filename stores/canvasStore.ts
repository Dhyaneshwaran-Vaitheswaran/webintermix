"use client";

import { create } from "zustand";
import type { CanvasStore, CanvasUniforms, SceneName } from "@/types/canvas";

const defaultUniforms: CanvasUniforms = {
  uTime: 0,
  uScrollProgress: 0,
  uCursorNDC: [0, 0],
  uCursorVelocity: 0,
  uIsIdle: false,
};

export const useCanvasStore = create<CanvasStore>((set) => ({
  activeScene: "null",
  setActiveScene: (scene: SceneName) => set({ activeScene: scene }),

  uniforms: { ...defaultUniforms },
  setUniform: (key, value) =>
    set((state) => ({
      uniforms: { ...state.uniforms, [key]: value },
    })),
  setUniforms: (partial) =>
    set((state) => ({
      uniforms: { ...state.uniforms, ...partial },
    })),

  cameraTarget: [0, 0, 0],
  cameraFOV: 60,

  rendererInfo: {
    triangles: 0,
    drawCalls: 0,
    fps: 60,
  },
  setRendererInfo: (info) =>
    set((state) => ({
      rendererInfo: { ...state.rendererInfo, ...info },
    })),
}));
