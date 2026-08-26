"use client";

import { useRef, useState, useEffect } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import Link from "next/link";
import { useCursorStore } from "@/stores/cursorStore";

interface LiquidButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  href?: string;
  children: React.ReactNode;
}

export function LiquidButton({ href, children, className = "", ...props }: LiquidButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const { setCursorType } = useCursorStore();

  useEffect(() => {
    const media = window.matchMedia("(hover: none)");
    setIsMobile(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const handleMouseEnter = () => {
    setCursorType("button");
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    setCursorType("default");
  };

  const buttonContent = (
    <div 
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={reset}
      className="relative inline-block p-4"
    >
      <motion.button
        animate={isMobile ? { x: 0, y: 0 } : { x: position.x, y: position.y }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
        className={`relative overflow-hidden rounded-full bg-transparent border border-white/20 backdrop-blur-md px-8 py-4 text-white text-sm tracking-widest uppercase transition-all duration-500 group select-none ${
          !isMobile ? "hover:border-[#FF3B3B]/50 hover:shadow-[0_0_30px_rgba(255,59,59,0.2)] hover:text-[#FF3B3B]" : "active:border-[#FF3B3B]/50 active:bg-[#FF3B3B]/10 active:text-[#FF3B3B]"
        } ${className}`}
        {...props}
      >
        {!isMobile && (
          <div className="absolute inset-0 bg-[#FF3B3B]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
        )}
        <span className="relative z-10 transition-colors duration-500">{children}</span>
      </motion.button>
    </div>
  );

  if (href) {
    return <Link href={href}>{buttonContent}</Link>;
  }

  return buttonContent;
}
