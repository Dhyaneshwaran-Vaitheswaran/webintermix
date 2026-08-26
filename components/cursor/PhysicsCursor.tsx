"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { useCursorStore } from "@/stores/cursorStore";

const SpidermanArrow = () => (
  <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_4px_8px_rgba(255,59,59,0.5)]">
    {/* Inner shadow / Bevel effect using multiple paths */}
    <path d="M6 6L14 26L17 17L27 19L6 6Z" fill="white" />
    <path d="M6 6L14 26L17 17L27 19L6 6Z" fill="url(#bevel)" />
    <path d="M6 6L14 26L17 17L27 19L6 6Z" stroke="#FF3B3B" strokeWidth="1.5" strokeLinejoin="round" />
    <defs>
      <linearGradient id="bevel" x1="6" y1="6" x2="27" y2="26" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="white" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#FF3B3B" stopOpacity="0.3" />
      </linearGradient>
    </defs>
  </svg>
);

export function PhysicsCursor() {
  const { cursorType } = useCursorStore();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Faster spring for the arrow so it feels responsive
  const springConfig = { damping: 25, stiffness: 700, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
      x.set(e.clientX);
      y.set(e.clientY);
    };
    
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y, isVisible]);

  const isButton = cursorType === "button";
  const isDrag = cursorType === "drag";
  const isDefault = cursorType === "default";

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100] flex items-center justify-center"
      style={{
        x,
        y,
        // When it's an arrow we don't want to center it exactly on the tip, but we offset the SVG itself inside slightly, or just let it offset 
        translateX: isDefault ? "-20%" : "-50%",
        translateY: isDefault ? "-20%" : "-50%",
      }}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
      }}
    >
      <AnimatePresence mode="wait">
        {isDefault && (
          <motion.div
            key="arrow"
            initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <SpidermanArrow />
          </motion.div>
        )}

        {isButton && (
          <motion.div
            key="button"
            className="w-16 h-16 rounded-full border-2 border-[#FF3B3B] bg-white/10 backdrop-blur-sm shadow-[inset_0_0_15px_rgba(255,59,59,0.5)]"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          />
        )}

        {isDrag && (
          <motion.div
            key="drag"
            className="w-24 h-24 rounded-full border border-white/40 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-[inset_0_0_20px_rgba(255,59,59,0.3),_0_0_20px_rgba(255,59,59,0.4)]"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <span className="text-white text-xs font-black tracking-[0.3em] uppercase drop-shadow-[0_0_5px_rgba(255,59,59,0.8)]">
              Drag
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
