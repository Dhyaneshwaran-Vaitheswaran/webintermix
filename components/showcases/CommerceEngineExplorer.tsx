"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";

const TABS = [
  {
    id: "speed",
    label: "01. Instant Speed",
    title: "Sub-Second Global Load Times",
    description: "Studies show that a 1-second delay reduces conversions by 7%. We build lightweight, edge-accelerated websites that load instantaneously for every visitor, anywhere in the world.",
    highlights: ["Global Content Delivery Network", "Automated Image Compression", "Zero Lag Interactive Elements"],
    metric: "< 0.2s Page Load"
  },
  {
    id: "seo",
    label: "02. Google SEO Ready",
    title: "Engineered For Search Dominance",
    description: "Google prioritizes websites with clean code, fast response times, and semantic structure. We implement automated sitemaps, rich schema snippets, and metadata that help you climb search rankings.",
    highlights: ["Structured Schema Markup", "Automated Meta Tags & Sitemaps", "Core Web Vitals Optimization"],
    metric: "100/100 SEO Score"
  },
  {
    id: "mobile",
    label: "03. Mobile Checkout",
    title: "Frictionless Sales & Lead Capture",
    description: "Capture leads and sales on the first visit with streamlined forms and 1-click payment integrations (Apple Pay, Google Pay, and Stripe) designed specifically for mobile shoppers.",
    highlights: ["1-Click Apple & Google Pay", "Instant Form Validation", "High-Converting Layouts"],
    metric: "2.5x Higher Conversion"
  },
  {
    id: "security",
    label: "04. Enterprise Security",
    title: "Bank-Grade Stability & Protection",
    description: "Rest easy knowing your website and client data are shielded with automated SSL encryption, DDoS protection, and continuous automated backups.",
    highlights: ["Automated Daily Backups", "End-to-End SSL Encryption", "99.99% Guaranteed Uptime"],
    metric: "99.99% Uptime"
  }
];

export function CommerceEngineExplorer() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  const activeContent = TABS.find((t) => t.id === activeTab)!;

  return (
    <section id="commerce" className="w-full py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4 select-none">
            Built For <span className="text-[#FF3B3B]">Growth</span>
          </h2>
          <p className="text-[#888888] text-base md:text-lg max-w-2xl mx-auto select-none font-sans">
            Every technical detail is optimized behind the scenes so your website consistently turns traffic into revenue.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-5xl"
        >
          <GlassCard className="p-8 md:p-12 overflow-hidden flex flex-col min-h-[460px]">
            {/* Top Tabs */}
            <div className="w-full flex flex-wrap justify-center items-center gap-2 mb-10 border-b border-white/5 pb-8">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-full font-mono text-xs md:text-sm tracking-widest uppercase transition-all duration-300 select-none ${
                    activeTab === tab.id
                      ? "bg-[#FF3B3B]/10 text-[#FF3B3B] border border-[#FF3B3B]/50"
                      : "text-white/40 hover:bg-white/5 hover:text-white border border-transparent"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="w-full relative flex flex-col items-center flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-3xl flex flex-col items-start text-left"
                >
                  <div className="mb-6 flex items-center justify-between w-full border-b border-white/10 pb-4">
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white">
                      {activeContent.title}
                    </h3>
                    <div className="flex items-center gap-3 bg-[#FF3B3B]/10 border border-[#FF3B3B]/30 px-4 py-1.5 rounded-full">
                      <div className="w-2 h-2 rounded-full bg-[#FF3B3B] animate-pulse" />
                      <span className="font-mono text-[#FF3B3B] tracking-widest uppercase text-xs md:text-sm font-bold">
                        {activeContent.metric}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-[#888888] leading-relaxed text-base md:text-lg mb-8 font-sans">
                    {activeContent.description}
                  </p>

                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                    {activeContent.highlights.map((item, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B3B] shrink-0" />
                        <span className="text-xs font-mono uppercase tracking-wider text-white/90">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
