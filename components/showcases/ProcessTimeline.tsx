"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";

const MILESTONES = [
  {
    id: "01",
    dayLabel: "DAY 01",
    dayRange: "DAYS 01 – 02",
    duration: "2 DAYS",
    title: "Discovery & Architectural Blueprint",
    tagline: "Vision, Audience & Revenue Strategy",
    details: "We map your brand DNA, analyze your competitors' digital weaknesses, and lock in your website's exact technical scope, 3D requirements, and conversion architecture.",
    deliverables: ["Scope & Technical Dossier", "Competitor Teardown", "Conversion Funnel Map"],
    icon: "🎯",
    jumpArc: "Strategy Arc",
  },
  {
    id: "02",
    dayLabel: "DAY 03",
    dayRange: "DAYS 03 – 06",
    duration: "4 DAYS",
    title: "3D Modeling & Bespoke UI Design",
    tagline: "Visual Dominance & Interaction System",
    details: "Our 3D specialists craft custom interactive WebGL product models, luxury typography, and smooth motion physics. You review an interactive concept before development starts.",
    deliverables: ["Interactive 3D Prototypes", "Bespoke Design System", "High-Resolution 3D Assets"],
    icon: "🔮",
    jumpArc: "3D & UI Sprint",
  },
  {
    id: "03",
    dayLabel: "DAY 07",
    dayRange: "DAYS 07 – 10",
    duration: "4 DAYS",
    title: "High-Speed WebGL & Next.js Build",
    tagline: "Sub-Second Code Engineering",
    details: "We build your website using modern Next.js, React Three Fiber, and Tailwind CSS. Engineered for 60 FPS fluidity, zero lag, and instant global edge caching.",
    deliverables: ["Clean Next.js Codebase", "Native WebGL 3D Pipeline", "100% Mobile Fluidity"],
    icon: "⚡",
    jumpArc: "Full Build Arc",
  },
  {
    id: "04",
    dayLabel: "DAY 11",
    dayRange: "DAYS 11 – 13",
    duration: "3 DAYS",
    title: "Google SEO & Speed Audit SLA",
    tagline: "100/100 Core Web Vitals Verification",
    details: "We execute full Google SEO schema setup, rich snippet metadata, and strict performance audits to verify your site achieves 95–100 Google PageSpeed scores.",
    deliverables: ["Google SEO Schema Setup", "100/100 Speed SLA Verification", "Cross-Device Testing"],
    icon: "👑",
    jumpArc: "SEO & Audit Arc",
  },
  {
    id: "05",
    dayLabel: "DAY 14",
    dayRange: "DAY 14",
    duration: "1 DAY",
    title: "Global Launch & Full Handover",
    tagline: "Live Deployment & 100% Code Ownership",
    details: "We take your site live on global Edge CDN, connect your custom domain, and hand over 100% repository code ownership with ongoing peace of mind.",
    deliverables: ["Live Global Deployment", "Full Code Repository Ownership", "24/7 Ongoing Support"],
    icon: "🚀",
    jumpArc: "Launch Jump",
  },
];

export function ProcessTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMilestone = MILESTONES[activeIndex];

  return (
    <section id="process" className="w-full py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF3B3B]/30 bg-[#FF3B3B]/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FF3B3B] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#FF3B3B] uppercase">
              14-Day Delivery Number Line
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-4">
            FROM CONCEPT TO LAUNCH <span className="text-[#FF3B3B]">IN 14 DAYS.</span>
          </h2>
          <p className="text-[#888888] text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
            Click across our continuous 14-day number line to see how your project progresses from Day 1 strategy to Day 14 live global launch.
          </p>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════════
            AESTHETIC NUMBER LINE COMPONENT
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="w-full max-w-5xl mb-12 relative select-none">
          <GlassCard className="p-6 md:p-10 relative overflow-hidden shadow-2xl border-white/10">
            
            {/* Top Jump Arcs Indicator SVG (Desktop) */}
            <div className="hidden md:block w-full h-28 relative mb-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 800 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="arcGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF3B3B" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ff7878" stopOpacity="1" />
                  </linearGradient>
                  <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="glow" />
                    <feComposite in="SourceGraphic" in2="glow" operator="over" />
                  </filter>
                </defs>

                {/* 4 Jump Arcs connecting the 5 points (0%, 25%, 50%, 75%, 100%) */}
                {[
                  { startX: 40, endX: 220, label: "+2 DAYS (Strategy)", idx: 0 },
                  { startX: 220, endX: 400, label: "+4 DAYS (3D & UI)", idx: 1 },
                  { startX: 400, endX: 580, label: "+4 DAYS (WebGL Build)", idx: 2 },
                  { startX: 580, endX: 760, label: "+3 DAYS (SEO Audit)", idx: 3 },
                ].map((arc, i) => {
                  const isPassed = activeIndex > i;
                  const isCurrent = activeIndex === i;
                  const midX = (arc.startX + arc.endX) / 2;
                  const height = 75;

                  return (
                    <g key={i} className="cursor-pointer" onClick={() => setActiveIndex(i + 1)}>
                      {/* Parabolic Jump Path */}
                      <path
                        d={`M ${arc.startX} 90 Q ${midX} ${90 - height} ${arc.endX} 90`}
                        fill="none"
                        stroke={isPassed || isCurrent ? "url(#arcGlow)" : "rgba(255,255,255,0.15)"}
                        strokeWidth={isCurrent ? "3" : "2"}
                        strokeDasharray={isCurrent ? "6 3" : "none"}
                        filter={isCurrent ? "url(#glowFilter)" : "none"}
                        className="transition-all duration-500"
                      />
                      
                      {/* Arrowhead */}
                      <polygon
                        points={`${arc.endX},90 ${arc.endX - 8},82 ${arc.endX - 4},90 ${arc.endX - 8},98`}
                        fill={isPassed || isCurrent ? "#FF3B3B" : "rgba(255,255,255,0.2)"}
                        className="transition-all duration-500"
                      />

                      {/* Jump Label */}
                      <text
                        x={midX}
                        y={90 - height - 8}
                        textAnchor="middle"
                        fill={isCurrent ? "#FF3B3B" : isPassed ? "#ffffff" : "rgba(255,255,255,0.3)"}
                        fontSize="10"
                        fontWeight="bold"
                        fontFamily="monospace"
                        letterSpacing="1px"
                      >
                        {arc.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* ── THE HORIZONTAL AXIS LINE ── */}
            <div className="relative w-full my-6 flex items-center justify-between px-4 sm:px-8">
              
              {/* Continuous Number Line Bar */}
              <div className="absolute left-8 right-8 h-1 bg-white/10 rounded-full">
                {/* Active Progress Fill */}
                <motion.div
                  className="h-full bg-gradient-to-r from-[#FF3B3B] to-[#ff7878] shadow-[0_0_15px_rgba(255,59,59,0.8)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(activeIndex / (MILESTONES.length - 1)) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>

              {/* 5 Milestone Nodes & Tick Marks */}
              {MILESTONES.map((m, idx) => {
                const isActive = activeIndex === idx;
                const isCompleted = activeIndex >= idx;

                return (
                  <div key={m.id} className="relative z-10 flex flex-col items-center">
                    
                    {/* Vertical Tick Mark */}
                    <div className={`w-0.5 h-3 mb-2 transition-all ${
                      isCompleted ? "bg-[#FF3B3B]" : "bg-white/20"
                    }`} />

                    {/* Interactive Node Dot */}
                    <button
                      onClick={() => setActiveIndex(idx)}
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-[#FF3B3B] border-white text-white shadow-[0_0_25px_rgba(255,59,59,0.8)] scale-125"
                          : isCompleted
                          ? "bg-[#220707] border-[#FF3B3B] text-[#FF3B3B]"
                          : "bg-[#09090b] border-white/20 text-white/40 hover:border-white/50 hover:text-white"
                      }`}
                    >
                      <span className="text-sm md:text-base font-bold font-mono">
                        {idx + 1}
                      </span>
                    </button>

                    {/* Number Line Label below tick */}
                    <div className="mt-3 text-center flex flex-col items-center">
                      <span className={`text-xs md:text-sm font-mono font-black tracking-wider transition-colors ${
                        isActive ? "text-[#FF3B3B]" : isCompleted ? "text-white" : "text-white/40"
                      }`}>
                        {m.dayLabel}
                      </span>
                      <span className="text-[10px] font-mono text-white/40 hidden sm:block uppercase">
                        {m.duration}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>

          </GlassCard>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            ACTIVE MILESTONE DOSSIER CARD
        ══════════════════════════════════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMilestone.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-5xl"
          >
            <GlassCard className="p-8 md:p-12 shadow-2xl border-[#FF3B3B]/30 relative overflow-hidden">
              <div className="flex flex-col lg:flex-row justify-between gap-8 items-start">
                
                {/* Left Column: Details */}
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-xs md:text-sm font-bold text-[#FF3B3B] uppercase tracking-widest bg-[#FF3B3B]/10 px-3.5 py-1.5 rounded-full border border-[#FF3B3B]/20">
                      {activeMilestone.dayRange} · PHASE 0{activeIndex + 1}
                    </span>
                    <span className="text-xs font-mono text-green-400 font-bold">
                      {activeMilestone.duration} Velocity
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white mb-2">
                    {activeMilestone.title}
                  </h3>

                  <span className="text-xs font-mono uppercase tracking-widest text-[#FF3B3B] block mb-6">
                    {activeMilestone.tagline}
                  </span>

                  <p className="text-[#888888] text-base md:text-lg font-sans leading-relaxed max-w-2xl">
                    {activeMilestone.details}
                  </p>

                  {/* Navigation Step Buttons */}
                  <div className="flex gap-3 mt-8">
                    <button
                      onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
                      disabled={activeIndex === 0}
                      className="px-5 py-2.5 rounded-full border border-white/20 text-xs font-mono uppercase text-white/60 hover:text-white disabled:opacity-30 transition-all"
                    >
                      ← Previous Day
                    </button>
                    <button
                      onClick={() => setActiveIndex((prev) => Math.min(MILESTONES.length - 1, prev + 1))}
                      disabled={activeIndex === MILESTONES.length - 1}
                      className="px-6 py-2.5 rounded-full bg-[#FF3B3B] hover:bg-[#ff5252] text-xs font-mono font-bold uppercase text-white disabled:opacity-30 transition-all shadow-[0_0_20px_rgba(255,59,59,0.4)]"
                    >
                      Next Milestone →
                    </button>
                  </div>
                </div>

                {/* Right Column: Key Deliverables */}
                <div className="w-full lg:w-80 shrink-0 bg-white/[0.03] border border-white/10 p-6 rounded-2xl text-left">
                  <span className="text-xs font-mono uppercase tracking-widest text-white/50 block mb-4">
                    Milestone Deliverables:
                  </span>
                  <ul className="flex flex-col gap-3">
                    {activeMilestone.deliverables.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs font-mono font-bold text-white">
                        <span className="w-2 h-2 rounded-full bg-[#FF3B3B]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-[10px] font-mono text-white/60 uppercase">
                      Guaranteed Delivery
                    </span>
                  </div>
                </div>

              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
