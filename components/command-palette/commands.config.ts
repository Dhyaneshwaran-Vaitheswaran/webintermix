"use client";

import { useRouter } from "next/navigation";
import { useUIStore } from "@/stores/uiStore";

export type CommandCategory = "navigate" | "action" | "system";

export interface Command {
  id: string;
  label: string;
  category: CommandCategory;
  shortcut?: string;
  handler: () => void;
}

/** Build the command registry — call this inside a component to get router access */
export function useCommands(): Command[] {
  const router = useRouter();
  const { closePalette, toggleHUD, toggleGrid, setReduceMotion, reduceMotion } =
    useUIStore();

  return [
    // ── Navigation ────────────────────────────────────────────────────────────
    {
      id: "nav-index",
      label: "Go to Index",
      category: "navigate",
      handler: () => {
        router.push("/");
        closePalette();
      },
    },
    {
      id: "nav-systems",
      label: "Go to Systems",
      category: "navigate",
      handler: () => {
        router.push("/systems");
        closePalette();
      },
    },
    {
      id: "nav-evidence",
      label: "Go to Evidence",
      category: "navigate",
      handler: () => {
        router.push("/evidence");
        closePalette();
      },
    },
    {
      id: "nav-process",
      label: "View Process Timeline",
      category: "navigate",
      handler: () => {
        router.push("/evidence#process");
        closePalette();
      },
    },
    {
      id: "nav-threshold",
      label: "Go to Threshold",
      category: "navigate",
      handler: () => {
        router.push("/threshold");
        closePalette();
      },
    },
    {
      id: "action-audit",
      label: "Request Architecture Audit",
      category: "action",
      handler: () => {
        router.push("/threshold");
        closePalette();
      },
    },
    {
      id: "action-book",
      label: "Book Discovery Session",
      category: "action",
      handler: () => {
        router.push("/threshold");
        closePalette();
      },
    },

    // ── Actions ───────────────────────────────────────────────────────────────
    {
      id: "toggle-hud",
      label: "Toggle Performance HUD",
      category: "action",
      shortcut: "⌘⇧H",
      handler: () => {
        toggleHUD();
        closePalette();
      },
    },
    {
      id: "copy-email",
      label: "Copy Contact Email",
      category: "action",
      handler: () => {
        navigator.clipboard.writeText("hello@webintermix.com");
        closePalette();
      },
    },

    // ── System ────────────────────────────────────────────────────────────────
    {
      id: "toggle-grid",
      label: "Toggle Grid Overlay",
      category: "system",
      handler: () => {
        toggleGrid();
        closePalette();
      },
    },
    {
      id: "reduce-motion",
      label: reduceMotion ? "Enable Motion" : "Reduce Motion",
      category: "system",
      handler: () => {
        setReduceMotion(!reduceMotion);
        closePalette();
      },
    },
  ];
}
