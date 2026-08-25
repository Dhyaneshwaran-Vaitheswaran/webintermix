"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";

const STEPS = [
  {
    id: "01",
    title: "DISCOVERY & STRATEGY",
    details: "We map your operational workflows and business objectives. We define the scalable foundations and routing strategies needed to ensure high-speed global delivery.",
    deliverables: ["Strategic Blueprint", "Operational Roadmap", "Risk Analysis"]
  },
  {
    id: "02",
    title: "STRUCTURAL WIREFRAMING",
    details: "Strategic layout without visual distraction. We ensure the user journey flows flawlessly to maximize conversion and operational efficiency.",
    deliverables: ["User Flow Prototypes", "Data Integration Plan", "Structural Wireframes"]
  },
  {
    id: "03",
    title: "BRAND DESIGN SYSTEM",
    details: "We establish the visual authority. Colors, typography, and spacing are standardized for infinite scalability and absolute brand consistency.",
    deliverables: ["Design System", "Component Library", "Interactive Guidelines"]
  },
  {
    id: "04",
    title: "PLATFORM DEVELOPMENT",
    details: "The core engineering phase. We build immersive visual experiences and deploy robust infrastructure for flawless, zero-delay operations.",
    deliverables: ["Production Platform", "Visual Enhancements", "Cloud Infrastructure"]
  },
  {
    id: "05",
    title: "QUALITY ASSURANCE & LAUNCH",
    details: "Rigorous load testing, usability audits, and security verification. We launch only when the platform is proven to handle intense, sustained user demand.",
    deliverables: ["Quality Report", "Security Verification", "Live Deployment"]
  }
];

export function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <section id="process" className="w-full py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">
            The <span className="text-[#FF3B3B]">Process</span>
          </h2>
          <p className="text-[#888888] text-lg max-w-2xl mx-auto">
            A deterministic, 5-phase protocol designed to eliminate risk and guarantee results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-4xl"
        >
          <GlassCard className="p-8 md:p-12">
            <div className="flex flex-col gap-4">
              {STEPS.map((step, idx) => {
                const isActive = activeStep === step.id;
                
                return (
                  <div key={step.id} className="relative">
                    {/* Step Button */}
                    <button
                      onClick={() => setActiveStep(isActive ? null : step.id)}
                      className={`w-full text-left p-6 rounded-xl border transition-all duration-500 group flex items-center justify-between select-none ${
                        isActive 
                          ? "bg-white/5 border-[#FF3B3B]/50 shadow-[0_0_30px_rgba(255,59,59,0.1)]" 
                          : "bg-transparent border-white/10 hover:border-white/30 hover:bg-white/[0.02]"
                      }`}
                    >
                      <div className="flex items-center gap-6">
                        <span className={`font-mono text-xl tracking-widest transition-colors duration-500 ${isActive ? "text-[#FF3B3B]" : "text-white/30 group-hover:text-white/50"}`}>
                          {step.id}.
                        </span>
                        <h3 className={`text-lg md:text-xl font-bold tracking-widest uppercase transition-colors duration-500 ${isActive ? "text-white" : "text-white/70"}`}>
                          {step.title}
                        </h3>
                      </div>
                      <div className={`transform transition-transform duration-500 ${isActive ? "rotate-180" : ""}`}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M5 7.5L10 12.5L15 7.5" stroke={isActive ? "#FF3B3B" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </button>

                    {/* Expandable Drawer */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 pt-4 pb-8 border-l border-r border-b border-white/5 rounded-b-xl -mt-2 bg-black/20 flex flex-col md:flex-row gap-8">
                            <div className="flex-1">
                              <p className="text-[#888888] leading-relaxed">
                                {step.details}
                              </p>
                            </div>
                            <div className="md:w-64 shrink-0 border-l border-white/10 pl-6">
                              <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">Deliverables</h4>
                              <ul className="flex flex-col gap-2">
                                {step.deliverables.map((d, i) => (
                                  <li key={i} className="text-sm font-bold text-white flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-[#FF3B3B]" />
                                    {d}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
