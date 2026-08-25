"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/stores/uiStore";

export function SiteNavigation() {
  const pathname = usePathname();
  const openPalette = useUIStore((s) => s.openPalette);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-black/10 transition-all duration-300 pointer-events-auto">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center h-20 w-full px-6 md:px-12">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-base font-bold uppercase tracking-[0.15em] text-black"
          >
            WEB INTERMIX
          </Link>
        </div>

        {/* Center: Nav links */}
        <div className="hidden md:flex items-center gap-10">
          {["/", "/systems", "/evidence", "/threshold"].map((href) => (
            <Link
              key={href}
              href={href}
              className={`text-xs font-bold tracking-[0.1em] uppercase transition-colors duration-300 ${
                (href === "/" ? pathname === "/" : pathname.startsWith(href))
                  ? "text-black"
                  : "text-black/60 hover:text-signal"
              }`}
            >
              {href === "/" ? "HOME" : href.slice(1).replace("-", " ")}
            </Link>
          ))}
        </div>

        {/* Right: Menu Button */}
        <div className="flex items-center">
          <button 
            onClick={openPalette}
            className="flex items-center justify-center w-12 h-12 bg-[#F7F7F7] border border-black/10 group hover:bg-signal transition-colors duration-300"
            aria-label="Open Menu"
          >
            {/* SVG Menu Icon */}
            <svg 
              width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
              className="text-black group-hover:text-white transition-colors duration-300"
            >
              <rect x="4" y="9" width="16" height="1.5" fill="currentColor"/>
              <rect x="4" y="14" width="16" height="1.5" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
