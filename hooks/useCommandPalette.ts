"use client";

import { useEffect, useCallback } from "react";
import { useUIStore } from "@/stores/uiStore";

/**
 * Handles Command Palette keyboard shortcuts and focus management.
 * ⌘K / Ctrl+K → open
 * Esc → close
 */
export function useCommandPalette() {
  const openPalette = useUIStore((s) => s.openPalette);
  const closePalette = useUIStore((s) => s.closePalette);
  const paletteOpen = useUIStore((s) => s.paletteOpen);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isMeta = e.metaKey || e.ctrlKey;

      // ⌘K or / → toggle
      if ((isMeta && e.key === "k") || e.key === "/") {
        // Prevent default only if we are about to open it, or if it's ⌘K
        if (e.key === "/" && paletteOpen) {
          // If it's open, typing '/' should just type into the search box
          return;
        }
        
        e.preventDefault();
        if (paletteOpen) {
          closePalette();
        } else {
          openPalette();
        }
        return;
      }

      // ⌘⇧H → toggle HUD
      if (isMeta && e.shiftKey && e.key === "H") {
        e.preventDefault();
        useUIStore.getState().toggleHUD();
        return;
      }

      // Esc → close palette
      if (e.key === "Escape" && paletteOpen) {
        closePalette();
      }
    },
    [paletteOpen, openPalette, closePalette]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return { paletteOpen, openPalette, closePalette };
}
