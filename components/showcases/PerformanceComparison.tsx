"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";

export function PerformanceComparison() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="performance" className="w-full py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4 select-none">
            The Engine <span className="text-[#FF3B3B]">Advantage</span>
          </h2>
          <p className="text-[#888888] text-lg max-w-2xl mx-auto select-none">
            Hover to reveal the performance disparity between standard architectures and the Web Intermix platform.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-4xl cursor-default"
        >
          <div 
            className="relative w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <GlassCard className="p-8 md:p-12 relative overflow-hidden">
              <div className="relative z-10 select-none h-[280px]">
                {/* Standard Agency Build */}
                <motion.div
                  className="absolute inset-0 flex flex-col gap-6"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isHovered ? 0 : 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <h3 className="text-xl font-bold text-white/50 uppercase tracking-widest border-b border-white/10 pb-4">
                    Standard Agency Build
                  </h3>
                  <div className="space-y-4">
                    <MetricRow label="Lighthouse Score" value="42" color="text-red-500" />
                    <MetricRow label="Server Response Time" value="1.8s" color="text-yellow-500" />
                    <MetricRow label="Platform Weight" value="4.2MB" color="text-red-500" />
                    <MetricRow label="Interactive Readiness" value="High Lag" color="text-yellow-500" />
                  </div>
                </motion.div>

                {/* Web Intermix Platform */}
                <motion.div
                  className="absolute inset-0 flex flex-col gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <h3 className="text-xl font-bold text-white uppercase tracking-widest border-b border-[#FF3B3B]/50 pb-4">
                    Web Intermix Platform
                  </h3>
                  <div className="space-y-4">
                    <MetricRow label="Lighthouse Score" value="99" color="text-[#FF3B3B]" />
                    <MetricRow label="Server Response Time" value="80ms" color="text-green-500" />
                    <MetricRow label="Platform Weight" value="120KB" color="text-green-500" />
                    <MetricRow label="Interactive Readiness" value="Instant" color="text-[#FF3B3B]" />
                  </div>
                </motion.div>
              </div>

              {/* Background Glow */}
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  background: `radial-gradient(circle at 50% 50%, rgba(255,59,59,0.05) 0%, transparent 60%)`
                }}
              />
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MetricRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex justify-between items-end border-b border-white/5 pb-2">
      <span className="text-sm text-[#888888]">{label}</span>
      <span className={`text-2xl font-black font-mono ${color}`}>{value}</span>
    </div>
  );
}
