"use client";

import { create } from "zustand";

interface UIStore {
  // Command Palette
  paletteOpen: boolean;
  openPalette: () => void;
  closePalette: () => void;
  togglePalette: () => void;

  // Performance HUD
  hudVisible: boolean;
  toggleHUD: () => void;
  setHUDVisible: (visible: boolean) => void;

  // Navigation
  navMinimized: boolean;
  setNavMinimized: (minimized: boolean) => void;

  // Grid overlay (for /systems and debug)
  gridVisible: boolean;
  toggleGrid: () => void;

  // Reduced motion (user preference override)
  reduceMotion: boolean;
  setReduceMotion: (reduce: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  paletteOpen: false,
  openPalette: () => set({ paletteOpen: true }),
  closePalette: () => set({ paletteOpen: false }),
  togglePalette: () => set((s) => ({ paletteOpen: !s.paletteOpen })),

  hudVisible: false,
  toggleHUD: () => set((s) => ({ hudVisible: !s.hudVisible })),
  setHUDVisible: (hudVisible) => set({ hudVisible }),

  navMinimized: false,
  setNavMinimized: (navMinimized) => set({ navMinimized }),

  gridVisible: false,
  toggleGrid: () => set((s) => ({ gridVisible: !s.gridVisible })),

  reduceMotion: false,
  setReduceMotion: (reduceMotion) => set({ reduceMotion }),
}));
