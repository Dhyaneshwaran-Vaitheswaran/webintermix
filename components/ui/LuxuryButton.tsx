"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { useCursorStore } from "@/stores/cursorStore";

interface LuxuryButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function LuxuryButton({ href, children, className = "" }: LuxuryButtonProps) {
  const { setCursorType } = useCursorStore();

  return (
    <Link
      href={href}
      className={`relative inline-flex items-center justify-center px-8 py-4 bg-transparent border border-black text-black font-mono uppercase tracking-[0.1em] text-xs font-bold transition-all duration-300 hover:bg-signal hover:text-white hover:border-signal ${className}`}
      onMouseEnter={() => setCursorType("button")}
      onMouseLeave={() => setCursorType("default")}
    >
      <span className="relative z-10">{children}</span>
    </Link>
  );
}
