"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useCursorStore } from "@/stores/cursorStore";

export function PhysicsCursor() {
  const { isHovering } = useCursorStore();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const springConfig = { damping: 40, stiffness: 1000, mass: 0.05 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full bg-[#FF3B3B] shadow-[0_0_15px_#FF3B3B] pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2"
      style={{
        width: isHovering ? 64 : 16,
        height: isHovering ? 64 : 16,
        x,
        y,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: isHovering ? 1.5 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
  );
}
