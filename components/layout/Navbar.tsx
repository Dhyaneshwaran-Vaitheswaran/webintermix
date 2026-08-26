"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

import { AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "HOME" },
    { href: "/systems", label: "SERVICES" },
    { href: "/evidence", label: "THE STANDARD" },
    { href: "/threshold", label: "AI ARCHITECT" },
  ];

  return (
    <>
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-max max-w-[90vw]">
        <nav className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-full px-6 md:px-8 py-4 flex items-center justify-between md:justify-start shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all">
          <div className="font-bold tracking-widest text-white md:pr-8 md:border-r border-white/10 text-sm whitespace-nowrap">
            WEB INTERMIX
          </div>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 ml-8">
            {links.map((link, i) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative px-2 py-1"
                >
                  <span className={`relative z-10 text-xs font-bold tracking-[0.1em] transition-colors duration-300 ${isActive ? "text-white" : "text-[#888888] hover:text-white"}`}>
                    {link.label}
                  </span>
                  {hoveredIndex === i && (
                    <motion.div
                      layoutId="navbar-hover"
                      className="absolute inset-0 bg-white/5 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger */}
          <button 
            className="block md:hidden ml-6 text-white p-2 z-50 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <motion.path
                d="M4 6H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                animate={isMenuOpen ? { d: "M6 6L18 18" } : { d: "M4 6H20" }}
              />
              <motion.path
                d="M4 12H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.path
                d="M4 18H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                animate={isMenuOpen ? { d: "M6 18L18 6" } : { d: "M4 18H20" }}
              />
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-3xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-10">
              {links.map((link) => {
                const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="relative"
                  >
                    <span className={`text-3xl font-black uppercase tracking-[0.2em] transition-colors duration-300 ${isActive ? "text-white" : "text-[#888888] hover:text-[#FF3B3B]"}`}>
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
