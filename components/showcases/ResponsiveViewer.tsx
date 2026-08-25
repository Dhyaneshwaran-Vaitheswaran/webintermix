"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";

type Device = "desktop" | "tablet" | "mobile";

const DEVICE_WIDTHS: Record<Device, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "390px"
};

export function ResponsiveViewer() {
  const [device, setDevice] = useState<Device>("desktop");

  return (
    <section id="responsive" className="w-full py-32 px-6 md:px-12 lg:px-24 bg-black/20">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">
            Adaptive <span className="text-[#FF3B3B]">Geometry</span>
          </h2>
          <p className="text-[#888888] text-lg max-w-2xl mx-auto mb-8">
            Our interfaces gracefully reflow across any viewport, maintaining performance and aesthetic integrity.
          </p>

          {/* Controls */}
          <div className="flex gap-4 justify-center">
            {(["desktop", "tablet", "mobile"] as Device[]).map((d) => (
              <button
                key={d}
                onClick={() => setDevice(d)}
                className={`px-6 py-2 rounded-full font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
                  device === d 
                    ? "bg-[#FF3B3B] text-white shadow-[0_0_20px_rgba(255,59,59,0.4)]" 
                    : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full flex justify-center"
        >
          <motion.div 
            animate={{ width: DEVICE_WIDTHS[device] }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="w-full max-w-5xl"
          >
            <GlassCard className="p-4 md:p-8 overflow-hidden h-[600px] flex flex-col gap-6 bg-[#0A0A0A]/80">
              {/* Mockup Header */}
              <div className="w-full h-12 border-b border-white/10 flex items-center gap-4 px-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 bg-white/5 rounded-full h-6 mx-4 max-w-md" />
              </div>

              {/* Mockup Content */}
              <div className="flex flex-1 gap-6">
                {/* Sidebar (hidden on mobile, small on tablet) */}
                <motion.div 
                  className={`bg-white/5 rounded-xl h-full transition-all duration-500 ${
                    device === "mobile" ? "hidden" : device === "tablet" ? "w-16" : "w-64"
                  }`}
                />
                
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col gap-6">
                  {/* Hero block */}
                  <div className="w-full h-48 bg-gradient-to-br from-white/10 to-transparent rounded-xl border border-white/5" />
                  
                  {/* Grid blocks */}
                  <div className={`grid gap-6 transition-all duration-500 ${
                    device === "mobile" ? "grid-cols-1" : device === "tablet" ? "grid-cols-2" : "grid-cols-3"
                  }`}>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="h-32 bg-white/5 rounded-xl border border-white/5" />
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
