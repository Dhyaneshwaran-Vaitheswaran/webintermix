"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";

export function ArchitectTeaser() {
  return (
    <section className="w-full py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FF3B3B]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-5xl"
        >
          <GlassCard className="p-8 md:p-16 relative overflow-hidden text-center flex flex-col items-center shadow-[0_0_80px_rgba(255,59,59,0.08)] border-[#FF3B3B]/30">
            
            {/* Pulsing Live Scanner Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#FF3B3B]/40 bg-[#FF3B3B]/10 mb-8 shadow-[0_0_20px_rgba(255,59,59,0.2)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF3B3B] animate-ping" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#FF3B3B] uppercase">
                AI Project Architect Engine
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-6 max-w-3xl leading-[1.1]">
              GET YOUR CUSTOM <span className="text-[#FF3B3B]">WEBSITE BLUEPRINT</span> IN 60 SECONDS.
            </h2>

            <p className="text-[#888888] text-base md:text-lg max-w-2xl mx-auto mb-10 font-sans leading-relaxed">
              Experience our interactive AI Architect. Test your brand&apos;s visual style, configure 3D visuals & SEO requirements, and get an instant custom roadmap and growth forecast.
            </p>

            {/* Interactive Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mb-12">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left flex items-center gap-3">
                <span className="text-[#FF3B3B] text-xl font-bold font-mono">01.</span>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-white block font-bold">Taste Profiler</span>
                  <span className="text-[11px] text-white/50 font-sans">Match your visual brand DNA</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left flex items-center gap-3">
                <span className="text-[#FF3B3B] text-xl font-bold font-mono">02.</span>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-white block font-bold">Feature Arsenal</span>
                  <span className="text-[11px] text-white/50 font-sans">Configure 3D & Google SEO</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left flex items-center gap-3">
                <span className="text-[#FF3B3B] text-xl font-bold font-mono">03.</span>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-white block font-bold">Instant Blueprint</span>
                  <span className="text-[11px] text-white/50 font-sans">Real-time scope & ROI report</span>
                </div>
              </div>
            </div>

            {/* Centered CTA Block */}
            <div className="flex flex-col items-center gap-4 w-full">
              <Link
                href="/threshold"
                className="relative inline-flex items-center justify-center px-10 py-5 rounded-full bg-[#FF3B3B] hover:bg-[#ff5252] text-white font-black text-sm md:text-base uppercase tracking-widest transition-all duration-300 shadow-[0_0_35px_rgba(255,59,59,0.4)] hover:shadow-[0_0_50px_rgba(255,59,59,0.6)] hover:scale-105 group"
              >
                <span className="relative z-10 flex items-center gap-3">
                  LAUNCH AI PROJECT ARCHITECT
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>

              <span className="text-white/40 text-xs font-mono uppercase tracking-widest block text-center">
                Interactive 60-Second Experience · Zero Obligations
              </span>
            </div>

          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
