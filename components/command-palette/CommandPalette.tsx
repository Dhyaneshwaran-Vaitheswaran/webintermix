"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useUIStore } from "@/stores/uiStore";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import { useCommands } from "./commands.config";
import { fuzzyFilter } from "@/lib/utils/math";
import { AnimatePresence, motion } from "framer-motion";

const CATEGORY_LABELS: Record<string, string> = {
  navigate: "Navigate",
  action: "Action",
  system: "System",
};

export function CommandPalette() {
  const { paletteOpen, closePalette } = useCommandPalette();
  const commands = useCommands();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = fuzzyFilter(query, commands);

  // Reset state when palette opens
  useEffect(() => {
    if (paletteOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [paletteOpen]);

  const executeSelected = useCallback(() => {
    const cmd = filtered[selectedIndex];
    if (cmd) cmd.handler();
  }, [filtered, selectedIndex]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((i) => Math.max(i - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          executeSelected();
          break;
        case "Escape":
          closePalette();
          break;
      }
    },
    [filtered.length, executeSelected, closePalette]
  );

  // Group commands by category
  const grouped = filtered.reduce<Record<string, typeof filtered>>(
    (acc, cmd) => {
      if (!acc[cmd.category]) acc[cmd.category] = [];
      acc[cmd.category].push(cmd);
      return acc;
    },
    {}
  );

  return (
    <AnimatePresence>
      {paletteOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="palette-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={closePalette}
          />

          {/* Palette */}
          <motion.div
            className="palette-container bg-white border border-black/10 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="Command Palette"
            aria-modal="true"
          >
            {/* Search input */}
            <div className="border-b border-black/10 px-4 py-4 flex items-center gap-3">
              <span className="text-black/40 text-sm">⌘</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or route..."
                className="flex-1 bg-transparent text-black font-medium text-sm outline-none placeholder:text-black/40"
                aria-label="Command search"
                spellCheck={false}
                autoComplete="off"
              />
              <kbd className="text-xs text-black/40 border border-black/10 rounded px-2 py-1 font-mono">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <ul
              ref={listRef}
              className="py-2 max-h-80 overflow-y-auto"
              role="listbox"
            >
              {filtered.length === 0 ? (
                <li className="px-4 py-8 text-center text-black/40 text-sm">
                  No commands found
                </li>
              ) : (
                Object.entries(grouped).map(([category, cmds]) => (
                  <li key={category}>
                    <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-black/40 border-b border-black/5 mx-2 mb-1">
                      {CATEGORY_LABELS[category] ?? category}
                    </div>
                    {cmds.map((cmd) => {
                      const globalIndex = filtered.indexOf(cmd);
                      const isSelected = globalIndex === selectedIndex;
                      return (
                        <button
                          key={cmd.id}
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => cmd.handler()}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          className={`w-[calc(100%-16px)] flex items-center justify-between px-4 py-3 text-left transition-colors duration-150 rounded-xl mx-2 my-0.5 border ${
                            isSelected
                              ? "bg-signal text-white border-signal"
                              : "bg-transparent text-black/60 hover:text-black border-transparent"
                          }`}
                        >
                          <span className="text-sm font-bold">{cmd.label}</span>
                          {cmd.shortcut && (
                            <kbd className={`text-[10px] border rounded px-2 py-0.5 font-mono ${isSelected ? "border-white/30 text-white/80" : "border-black/10 text-black/40"}`}>
                              {cmd.shortcut}
                            </kbd>
                          )}
                        </button>
                      );
                    })}
                  </li>
                ))
              )}
            </ul>

            {/* Footer */}
            <div className="border-t border-black/10 bg-[#F7F7F7] px-4 py-3 flex items-center gap-4">
              <span className="text-xs font-mono text-black/40">↑↓ navigate</span>
              <span className="text-xs font-mono text-black/40">↵ select</span>
              <span className="text-xs font-mono text-black/40 ml-auto">
                {filtered.length} command{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
