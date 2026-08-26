"use client";

import { create } from "zustand";

export type CursorType = "default" | "button" | "drag";

export interface CursorState {
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void;
}

export const useCursorStore = create<CursorState>((set) => ({
  cursorType: "default",
  setCursorType: (type) => set({ cursorType: type }),
}));
