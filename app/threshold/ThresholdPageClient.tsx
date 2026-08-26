"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import Link from "next/link";

// ── TASTE PROFILES ───────────────────────────────────────────────────────────
const TASTE_PROFILES = [
  {
    id: "obsidian",
    title: "Obsidian Minimalist",
    tagline: "Apple & Saint Laurent Luxury",
    desc: "Deep blacks, ultra-refined typography, razor-sharp red accents, and effortless prestige.",
    accent: "#FF3B3B",
    icon: "💎",
  },
  {
    id: "cyber-3d",
    title: "Kinetic 3D & Cyber",
    tagline: "Spatial Computing & WebGL",
    desc: "Interactive 3D product models, real-time lighting physics, and fluid ambient auroras.",
    accent: "#ff5252",
    icon: "🔮",
  },
  {
    id: "editorial",
    title: "Clean Editorial Authority",
    tagline: "High-Converting B2B Power",
    desc: "Lightning-fast architecture, bold typographic contrast, and instant credibility.",
    accent: "#ffffff",
    icon: "⚡",
  },
  {
    id: "ecommerce",
    title: "High-Impact E-Commerce",
    tagline: "Frictionless Sales Machine",
    desc: "Interactive 3D configurators, 1-click mobile checkout, and high conversion flow.",
    accent: "#f59e0b",
    icon: "🛍️",
  },
];

// ── FEATURE ARSENAL ──────────────────────────────────────────────────────────
const FEATURE_ARSENAL = [
  { id: "speed", label: "Sub-0.2s Global CDN Speed", metric: "Zero Bounce Rate", icon: "⚡" },
  { id: "seo", label: "#1 Google Search SEO Engine", metric: "Page 1 Ranking", icon: "👑" },
  { id: "3d", label: "Interactive 3D Product Visualizers", metric: "+210% Conversion", icon: "👟" },
  { id: "checkout", label: "1-Click Razorpay Checkout (UPI & Cards)", metric: "2x Checkout Rate", icon: "💳" },
  { id: "physics", label: "Kinetic Fluid Physics & Custom Cursor", metric: "4x Engagement", icon: "✨" },
  { id: "security", label: "Enterprise Security & Zero-Lag Cloud", metric: "99.99% Uptime", icon: "🛡️" },
];

// ── SCALE TIERS ──────────────────────────────────────────────────────────────
const SCALE_TIERS = [
  { id: "foundation", label: "Growth Foundation", range: "$3,000 – $7,500", desc: "Complete custom high-speed website, modern branding, and Google SEO setup." },
  { id: "full-scale", label: "Full-Scale Transformation", range: "$7,500 – $18,000", desc: "Interactive 3D product visualizer, full SEO campaign, custom motion physics, and e-commerce." },
  { id: "category-leader", label: "Category Leader / Bespoke", range: "$18,000+", desc: "Full bespoke 3D spatial experience, multi-page custom web app, advanced SEO, and ongoing growth strategy." },
];

const TIMELINE_OPTIONS = [
  { id: "blitz", label: "Blitz Launch", time: "Under 3 Weeks" },
  { id: "standard", label: "Standard Sprint", time: "4 – 6 Weeks" },
  { id: "flexible", label: "Strategic Rollout", time: "Flexible Timeline" },
];

export function ThresholdPageClient() {
  const [currentStage, setCurrentStage] = useState(1);
  const [selectedTaste, setSelectedTaste] = useState(TASTE_PROFILES[0].id);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["speed", "seo", "3d"]);
  const [selectedScale, setSelectedScale] = useState(SCALE_TIERS[1].id);
  const [selectedTimeline, setSelectedTimeline] = useState(TIMELINE_OPTIONS[1].id);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form info
  const [clientInfo, setClientInfo] = useState({
    name: "",
    brandName: "",
    email: "",
    notes: "",
  });

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleNextToStage4 = () => {
    setIsSynthesizing(true);
    setCurrentStage(4);
    setTimeout(() => {
      setIsSynthesizing(false);
    }, 1800);
  };

  const activeTasteObj = TASTE_PROFILES.find((t) => t.id === selectedTaste)!;
  const activeScaleObj = SCALE_TIERS.find((s) => s.id === selectedScale)!;
  const activeTimelineObj = TIMELINE_OPTIONS.find((t) => t.id === selectedTimeline)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="w-full min-h-screen pt-32 pb-24 px-6 md:px-12 flex flex-col items-center justify-start relative overflow-hidden">
      
      {/* ── AMBIENT RED NEON BACKDROP ── */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#FF3B3B]/10 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="w-full max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* ── EXPERIENCE PROGRESS HUD ── */}
        {!isSubmitted && (
          <div className="w-full max-w-xl mb-12 flex flex-col items-center">
            <div className="flex items-center justify-between w-full mb-3">
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#FF3B3B] uppercase">
                AI DIGITAL ARCHITECT · STAGE 0{currentStage} / 05
              </span>
              <span className="text-[11px] font-mono text-white/40 tracking-wider">
                {currentStage === 1 && "Visual Taste Profiler"}
                {currentStage === 2 && "Feature Arsenal"}
                {currentStage === 3 && "Scale & Timeline"}
                {currentStage === 4 && "Blueprint Dossier"}
                {currentStage === 5 && "Final Transmission"}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FF3B3B] to-[#ff6b6b]"
                initial={{ width: "20%" }}
                animate={{ width: `${(currentStage / 5) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        )}

        {/* ── STAGE CONTAINERS ── */}
        <AnimatePresence mode="wait">
          
          {/* ══════════════════════════════════════════════════════════════════════
              STAGE 1: BRAND TASTE PROFILER
          ══════════════════════════════════════════════════════════════════════ */}
          {currentStage === 1 && (
            <motion.div
              key="stage-1"
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col items-center text-center"
            >
              <div className="inline-block bg-[#FF3B3B]/10 border border-[#FF3B3B]/30 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[#FF3B3B] uppercase tracking-widest mb-4">
                Step 01 · Visual DNA Analysis
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-4">
                CHOOSE YOUR BRAND&apos;S <span className="text-[#FF3B3B]">AESTHETIC.</span>
              </h1>

              <p className="text-[#888888] text-sm md:text-base max-w-xl mb-10 font-sans">
                Select the visual archetype that best represents the prestige and atmosphere you want your new website to command.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-10">
                {TASTE_PROFILES.map((taste) => {
                  const isSelected = selectedTaste === taste.id;
                  return (
                    <button
                      key={taste.id}
                      onClick={() => setSelectedTaste(taste.id)}
                      className={`text-left p-6 md:p-8 rounded-2xl border transition-all duration-500 relative overflow-hidden group ${
                        isSelected
                          ? "bg-[#FF3B3B]/10 border-[#FF3B3B] shadow-[0_0_40px_rgba(255,59,59,0.2)] scale-[1.02]"
                          : "bg-[#0c0c0e]/80 border-white/10 hover:border-white/30 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl">{taste.icon}</span>
                        {isSelected && (
                          <span className="bg-[#FF3B3B] text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full shadow-[0_0_15px_rgba(255,59,59,0.6)]">
                            SELECTED DNA
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white mb-1">
                        {taste.title}
                      </h3>

                      <span className="text-xs font-mono text-[#FF3B3B] uppercase tracking-wider block mb-3">
                        {taste.tagline}
                      </span>

                      <p className="text-[#888888] text-sm font-sans leading-relaxed group-hover:text-white/80 transition-colors">
                        {taste.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentStage(2)}
                className="px-10 py-5 rounded-full bg-[#FF3B3B] hover:bg-[#ff5252] text-white font-black text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_35px_rgba(255,59,59,0.4)] hover:scale-105 inline-flex items-center gap-3"
              >
                PROCEED TO FEATURE ARSENAL →
              </button>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              STAGE 2: FEATURE ARSENAL
          ══════════════════════════════════════════════════════════════════════ */}
          {currentStage === 2 && (
            <motion.div
              key="stage-2"
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col items-center text-center"
            >
              <div className="inline-block bg-[#FF3B3B]/10 border border-[#FF3B3B]/30 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[#FF3B3B] uppercase tracking-widest mb-4">
                Step 02 · Capability Configuration
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-4">
                SELECT YOUR <span className="text-[#FF3B3B]">FEATURE ARSENAL.</span>
              </h1>

              <p className="text-[#888888] text-sm md:text-base max-w-xl mb-10 font-sans">
                Click to equip the digital capabilities your brand needs to outperform competitors in sales and search rank.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-10">
                {FEATURE_ARSENAL.map((feat) => {
                  const isEquipped = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`p-5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between ${
                        isEquipped
                          ? "bg-[#FF3B3B]/10 border-[#FF3B3B]/80 shadow-[0_0_30px_rgba(255,59,59,0.15)]"
                          : "bg-[#0c0c0e]/80 border-white/10 hover:border-white/25 hover:bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{feat.icon}</span>
                        <div>
                          <h4 className="text-sm md:text-base font-bold text-white uppercase tracking-tight">
                            {feat.label}
                          </h4>
                          <span className="text-xs font-mono text-[#FF3B3B]">{feat.metric}</span>
                        </div>
                      </div>

                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                        isEquipped ? "bg-[#FF3B3B] border-[#FF3B3B] text-white" : "border-white/20 text-transparent"
                      }`}>
                        ✓
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStage(1)}
                  className="px-8 py-5 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-xs font-mono font-bold tracking-widest uppercase transition-all"
                >
                  ← BACK
                </button>
                <button
                  onClick={() => setCurrentStage(3)}
                  className="px-10 py-5 rounded-full bg-[#FF3B3B] hover:bg-[#ff5252] text-white font-black text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_35px_rgba(255,59,59,0.4)] hover:scale-105"
                >
                  CONFIGURE SCALE & TIMELINE →
                </button>
              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              STAGE 3: SCALE & TIMELINE
          ══════════════════════════════════════════════════════════════════════ */}
          {currentStage === 3 && (
            <motion.div
              key="stage-3"
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col items-center text-center"
            >
              <div className="inline-block bg-[#FF3B3B]/10 border border-[#FF3B3B]/30 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[#FF3B3B] uppercase tracking-widest mb-4">
                Step 03 · Scope & Velocity
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-4">
                PROJECT SCALE & <span className="text-[#FF3B3B]">VELOCITY.</span>
              </h1>

              <p className="text-[#888888] text-sm md:text-base max-w-xl mb-10 font-sans">
                Choose your investment tier and desired turnaround speed so our AI Architect can calculate your live project blueprint.
              </p>

              {/* Scale Tiers */}
              <div className="flex flex-col gap-4 w-full mb-8">
                {SCALE_TIERS.map((tier) => {
                  const isSelected = selectedScale === tier.id;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => setSelectedScale(tier.id)}
                      className={`p-6 rounded-2xl border text-left transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isSelected
                          ? "bg-[#FF3B3B]/10 border-[#FF3B3B] shadow-[0_0_35px_rgba(255,59,59,0.15)]"
                          : "bg-[#0c0c0e]/80 border-white/10 hover:border-white/25 hover:bg-white/[0.03]"
                      }`}
                    >
                      <div>
                        <h4 className="text-lg font-bold text-white uppercase tracking-tight mb-1">
                          {tier.label}
                        </h4>
                        <p className="text-xs text-[#888888] font-sans max-w-md">{tier.desc}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-mono text-base font-bold text-[#FF3B3B] block">
                          {tier.range}
                        </span>
                        <span className="text-[10px] font-mono text-white/40 uppercase">Estimated Range</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Timeline Selector */}
              <div className="w-full mb-10">
                <span className="text-xs font-mono uppercase tracking-widest text-white/50 block mb-4">
                  Desired Delivery Velocity:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {TIMELINE_OPTIONS.map((time) => {
                    const isSelected = selectedTimeline === time.id;
                    return (
                      <button
                        key={time.id}
                        onClick={() => setSelectedTimeline(time.id)}
                        className={`p-4 rounded-xl border font-mono text-xs uppercase tracking-wider transition-all ${
                          isSelected
                            ? "bg-[#FF3B3B] text-white font-bold border-[#FF3B3B] shadow-[0_0_20px_rgba(255,59,59,0.4)]"
                            : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                        }`}
                      >
                        <span className="block font-bold">{time.label}</span>
                        <span className="text-[10px] opacity-80">{time.time}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStage(2)}
                  className="px-8 py-5 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-xs font-mono font-bold tracking-widest uppercase transition-all"
                >
                  ← BACK
                </button>
                <button
                  onClick={handleNextToStage4}
                  className="px-10 py-5 rounded-full bg-[#FF3B3B] hover:bg-[#ff5252] text-white font-black text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_35px_rgba(255,59,59,0.4)] hover:scale-105 inline-flex items-center gap-3"
                >
                  SYNTHESIZE AI BLUEPRINT ⚡
                </button>
              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              STAGE 4: LIVE AI BLUEPRINT DOSSIER
          ══════════════════════════════════════════════════════════════════════ */}
          {currentStage === 4 && (
            <motion.div
              key="stage-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col items-center"
            >
              {isSynthesizing ? (
                /* Neural Scanner Loading Animation */
                <GlassCard className="w-full py-24 px-8 text-center flex flex-col items-center shadow-[0_0_80px_rgba(255,59,59,0.15)]">
                  <div className="w-24 h-24 rounded-full border-2 border-[#FF3B3B] border-t-transparent animate-spin mb-8 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#FF3B3B]/20 animate-pulse" />
                  </div>
                  <span className="text-xs font-mono text-[#FF3B3B] tracking-widest uppercase font-bold mb-2">
                    ◆ AI NEURAL SYNTHESIS IN PROGRESS
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tight mb-4">
                    COMPILING PROJECT DOSSIER...
                  </h3>
                  <p className="text-white/40 text-sm font-mono max-w-sm">
                    Cross-referencing {selectedFeatures.length} capabilities with {activeTasteObj.title} architecture...
                  </p>
                </GlassCard>
              ) : (
                /* Synthesized Blueprint Dossier Card */
                <div className="w-full flex flex-col items-center">
                  <div className="inline-block bg-green-500/10 border border-green-500/30 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-green-400 uppercase tracking-widest mb-4">
                    ✓ AI BLUEPRINT SYNTHESIS COMPLETE
                  </div>

                  <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-2 text-center">
                    YOUR CUSTOM <span className="text-[#FF3B3B]">PROJECT BLUEPRINT.</span>
                  </h1>

                  <p className="text-[#888888] text-sm md:text-base max-w-xl mb-8 font-sans text-center">
                    Here is your tailored technical roadmap based on your brand aesthetic and chosen capabilities.
                  </p>

                  <GlassCard className="w-full p-8 md:p-12 relative overflow-hidden mb-8 border-[#FF3B3B]/40 shadow-2xl">
                    {/* Top Blueprint Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-6 mb-8 gap-4">
                      <div>
                        <span className="text-[10px] font-mono text-[#FF3B3B] uppercase tracking-widest block">
                          Architectural Dossier #WI-{Math.floor(1000 + Math.random() * 9000)}
                        </span>
                        <h3 className="text-2xl font-bold uppercase text-white tracking-tight">
                          {activeTasteObj.title} Experience
                        </h3>
                      </div>
                      <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-right">
                        <span className="text-[10px] font-mono text-white/40 uppercase block">Target Turnaround</span>
                        <span className="text-xs font-bold font-mono text-white">{activeTimelineObj.time}</span>
                      </div>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <span className="text-[10px] font-mono text-white/40 uppercase block">Projected Speed</span>
                        <span className="text-xl font-bold text-green-400 font-mono">100/100 Core Vitals</span>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <span className="text-[10px] font-mono text-white/40 uppercase block">Conversion Multiplier</span>
                        <span className="text-xl font-bold text-[#FF3B3B] font-mono">2.5x – 3.8x Boost</span>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <span className="text-[10px] font-mono text-white/40 uppercase block">Estimated Investment</span>
                        <span className="text-xl font-bold text-white font-mono">{activeScaleObj.range}</span>
                      </div>
                    </div>

                    {/* Equipped Modules Checklist */}
                    <div className="mb-8">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-3">
                        Configured Superpower Arsenal:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {selectedFeatures.map((fid) => {
                          const f = FEATURE_ARSENAL.find((item) => item.id === fid);
                          return (
                            <div key={fid} className="flex items-center gap-2 text-xs font-mono text-white/90 bg-black/40 px-3 py-2 rounded-lg border border-white/5">
                              <span className="text-[#FF3B3B]">✓</span>
                              <span>{f?.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FF3B3B]/10 border border-[#FF3B3B]/20 text-xs font-mono text-white/80">
                      💡 <strong>AI Architect Note:</strong> This blueprint includes full responsive mobile optimization, zero-lag WebGL rendering, and guaranteed sub-second response times worldwide.
                    </div>
                  </GlassCard>

                  <button
                    onClick={() => setCurrentStage(5)}
                    className="px-12 py-5 rounded-full bg-[#FF3B3B] hover:bg-[#ff5252] text-white font-black text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_40px_rgba(255,59,59,0.5)] hover:scale-105"
                  >
                    CLAIM BLUEPRINT & SUBMIT INQUIRY →
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              STAGE 5: FINAL TRANSMISSION FORM
          ══════════════════════════════════════════════════════════════════════ */}
          {currentStage === 5 && !isSubmitted && (
            <motion.div
              key="stage-5"
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col items-center text-center"
            >
              <div className="inline-block bg-[#FF3B3B]/10 border border-[#FF3B3B]/30 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[#FF3B3B] uppercase tracking-widest mb-4">
                Final Step · Instant Dossier Transmission
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-4">
                WHERE SHOULD WE <span className="text-[#FF3B3B]">SEND YOUR BLUEPRINT?</span>
              </h1>

              <p className="text-[#888888] text-sm md:text-base max-w-xl mb-10 font-sans">
                Enter your details to officially transmit your dossier. We will review your blueprint and reach out within 24 hours to confirm scope and schedule your discovery session.
              </p>

              <GlassCard className="w-full p-8 md:p-12 shadow-2xl">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-white/50 block mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={clientInfo.name}
                        onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF3B3B] transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-white/50 block mb-2">
                        Business / Brand Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={clientInfo.brandName}
                        onChange={(e) => setClientInfo({ ...clientInfo, brandName: e.target.value })}
                        placeholder="e.g. Luxe Atelier"
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF3B3B] transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-white/50 block mb-2">
                      Email Address (Where to send blueprint) *
                    </label>
                    <input
                      type="email"
                      required
                      value={clientInfo.email}
                      onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                      placeholder="sarah@luxeatelier.com"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF3B3B] transition-all font-sans"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-white/50 block mb-2">
                      Additional Vision or Questions (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={clientInfo.notes}
                      onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
                      placeholder="Any specific reference websites or special features you'd like to mention..."
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF3B3B] transition-all font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-5 rounded-full bg-[#FF3B3B] hover:bg-[#ff5252] text-white font-black text-sm md:text-base uppercase tracking-widest transition-all duration-300 shadow-[0_0_40px_rgba(255,59,59,0.4)] hover:shadow-[0_0_60px_rgba(255,59,59,0.6)] mt-4"
                  >
                    TRANSMIT DOSSIER & INITIALIZE PROJECT ⚡
                  </button>

                  <p className="text-center text-xs font-mono text-white/30 uppercase tracking-widest">
                    Zero Obligations · Encrypted Transmission · Guaranteed 24-Hour Reply
                  </p>
                </form>
              </GlassCard>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════
              SUCCESS CONFIRMATION
          ══════════════════════════════════════════════════════════════════════ */}
          {isSubmitted && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-2xl text-center"
            >
              <GlassCard className="py-20 px-8 flex flex-col items-center shadow-[0_0_90px_rgba(255,59,59,0.15)] border-[#FF3B3B]/40">
                
                {/* Animated Verification Seal */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="w-24 h-24 rounded-full border-2 border-[#FF3B3B] bg-[#FF3B3B]/10 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(255,59,59,0.4)]"
                >
                  <svg className="w-12 h-12 text-[#FF3B3B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>

                <span className="text-xs font-mono text-[#FF3B3B] uppercase tracking-widest font-bold mb-3">
                  ◆ DOSSIER TRANSMISSION CONFIRMED
                </span>

                <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mb-4">
                  YOU&apos;RE IN THE SYSTEM<span className="text-[#FF3B3B]">.</span>
                </h2>

                <p className="text-white/70 text-base max-w-md mx-auto mb-8 font-sans leading-relaxed">
                  Thank you, <strong className="text-white">{clientInfo.name || "friend"}</strong>. Your tailored <strong className="text-[#FF3B3B]">{activeTasteObj.title}</strong> blueprint has been logged. Our senior team will review your scope and contact you within 24 hours.
                </p>

                <div className="flex gap-4">
                  <Link
                    href="/"
                    className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-widest transition-all"
                  >
                    ← Return Home
                  </Link>
                  <Link
                    href="/systems"
                    className="px-8 py-3.5 rounded-full bg-[#FF3B3B] hover:bg-[#ff5252] text-white font-mono text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(255,59,59,0.3)]"
                  >
                    Explore Systems →
                  </Link>
                </div>

              </GlassCard>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </main>
  );
}
