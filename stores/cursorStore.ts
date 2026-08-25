"use client";

import { create } from "zustand";

export interface CursorState {
  isHovering: boolean;
  setIsHovering: (hover: boolean) => void;
}

export const useCursorStore = create<CursorState>((set) => ({
  isHovering: false,
  setIsHovering: (hover) => set({ isHovering: hover }),
}));
