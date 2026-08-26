"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";

const STEPS = [
  {
    id: "01",
    title: "DISCOVERY & GOALS",
    details: "We start with a friendly strategy session to understand your business, target audience, and revenue goals. We create a clear roadmap and outline the exact features your new website needs.",
    deliverables: ["Project Roadmap", "Competitor Review", "Feature Outline"]
  },
  {
    id: "02",
    title: "CUSTOM DESIGN & 3D",
    details: "We craft custom, high-fidelity design mockups and interactive 3D visuals tailored to your brand identity. You get to review and approve everything before development begins.",
    deliverables: ["Interactive Prototypes", "3D Visual Assets", "Style Guide"]
  },
  {
    id: "03",
    title: "LIGHTNING-FAST BUILD",
    details: "We turn the approved designs into a responsive, high-speed website that loads instantly and works flawlessly across mobile phones, tablets, and computers.",
    deliverables: ["Custom Web Build", "Mobile Optimization", "CMS Integration"]
  },
  {
    id: "04",
    title: "GOOGLE SEO & TESTING",
    details: "We optimize your website structure for Google search rankings, configure metadata, and run thorough speed and security audits so launch day is 100% smooth.",
    deliverables: ["SEO Setup", "Speed Audit", "Cross-Device Testing"]
  },
  {
    id: "05",
    title: "LAUNCH & ONGOING PEACE OF MIND",
    details: "We take your site live, connect your custom domain, and handle all hosting and maintenance details so you can focus on running your business with zero tech stress.",
    deliverables: ["Live Launch", "Domain & Hosting Setup", "Ongoing Support"]
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
            How We <span className="text-[#FF3B3B]">Work</span>
          </h2>
          <p className="text-[#888888] text-base md:text-lg max-w-2xl mx-auto font-sans">
            A simple, transparent 5-step journey from initial idea to high-converting live website.
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
