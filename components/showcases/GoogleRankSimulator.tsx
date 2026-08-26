"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";

export function GoogleRankSimulator() {
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("Custom Luxury Products");
  const [isSearched, setIsSearched] = useState(false);

  const displayCompany = companyName.trim() || "Your Company";
  const displayDomain = displayCompany.toLowerCase().replace(/[^a-z0-9]/g, "") + ".com";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearched(true);
  };

  return (
    <section id="seo-simulator" className="w-full py-32 px-6 md:px-12 lg:px-24">
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
              Interactive SEO Simulator
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-4 select-none">
            See Your Brand <span className="text-[#FF3B3B]">Rank #1</span>
          </h2>
          <p className="text-[#888888] text-base md:text-lg max-w-2xl mx-auto select-none font-sans">
            Enter your business name below to simulate how our built-in SEO architecture positions you above competitors on Google.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-4xl"
        >
          <GlassCard className="p-6 md:p-10 relative overflow-hidden">
            {/* Input Form */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                    if (!isSearched) setIsSearched(true);
                  }}
                  placeholder="Enter your company name (e.g. Apex Studio)..."
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-5 py-4 text-white text-base md:text-lg placeholder:text-white/30 focus:outline-none focus:border-[#FF3B3B] focus:bg-white/10 transition-all font-sans"
                />
              </div>

              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="bg-white/5 border border-white/15 rounded-xl px-4 py-4 text-white text-sm focus:outline-none focus:border-[#FF3B3B] transition-all font-sans appearance-none"
                style={{ background: "#111", colorScheme: "dark" }}
              >
                <option value="Luxury Goods & Products">Luxury Goods & Products</option>
                <option value="B2B Advisory & Services">B2B Advisory & Services</option>
                <option value="Modern E-Commerce Store">Modern E-Commerce Store</option>
                <option value="Architecture & Studio">Architecture & Studio</option>
              </select>

              <button
                type="submit"
                className="px-8 py-4 rounded-xl bg-[#FF3B3B] hover:bg-[#ff5252] text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(255,59,59,0.3)] hover:shadow-[0_0_35px_rgba(255,59,59,0.5)] shrink-0"
              >
                Simulate Rank #1
              </button>
            </form>

            {/* Google Search Window Mockup */}
            <div className="bg-[#18181b]/90 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative">
              {/* Google Search Bar Mockup */}
              <div className="flex items-center gap-3 bg-[#27272a] rounded-full px-5 py-3 mb-8 border border-white/5">
                <svg className="w-5 h-5 text-white/40 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span className="text-white text-sm md:text-base font-sans font-medium">
                  Best {industry} in 2025
                </span>
                <span className="ml-auto text-xs font-mono text-white/30 hidden sm:inline">
                  About 14,200,000 results (0.18 seconds)
                </span>
              </div>

              {/* Simulated Search Results */}
              <div className="flex flex-col gap-6">
                {/* ── #1 RANKED RESULT (CLIENT SITE) ── */}
                <motion.div
                  layout
                  className="p-5 md:p-6 rounded-xl bg-gradient-to-r from-[#FF3B3B]/15 via-white/[0.03] to-transparent border border-[#FF3B3B]/50 relative overflow-hidden group shadow-[0_0_30px_rgba(255,59,59,0.1)]"
                >
                  {/* Floating Tag */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#FF3B3B] text-white text-[10px] md:text-xs font-mono font-black uppercase px-3 py-1 rounded-full shadow-[0_0_15px_rgba(255,59,59,0.5)]">
                    <span>👑 #1 GOOGLE RANK</span>
                    <span className="opacity-75">· THIS CAN BE YOU</span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-full bg-[#FF3B3B]/20 flex items-center justify-center text-[10px] text-[#FF3B3B] font-bold">
                      G
                    </div>
                    <span className="text-xs text-white/60 font-mono">https://www.{displayDomain}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-[#60a5fa] group-hover:underline cursor-pointer mb-2 font-sans">
                    {displayCompany} — Official Website | Premium {industry}
                  </h3>

                  <p className="text-sm text-white/70 font-sans leading-relaxed mb-4 max-w-2xl">
                    Discover {displayCompany}. Engineered with custom 3D experiences, sub-second page loads, and 100% verified customer trust. Browse official collections and book consultations today.
                  </p>

                  {/* Rich Snippets / Google Sitelinks */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/10">
                    <div className="bg-white/5 rounded-lg p-2.5">
                      <span className="text-[10px] font-mono text-white/40 block">Google Rating</span>
                      <span className="text-xs font-bold text-yellow-400">★★★★★ 4.9 (180+ Reviews)</span>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2.5">
                      <span className="text-[10px] font-mono text-white/40 block">Page Speed</span>
                      <span className="text-xs font-bold text-green-400">⚡ 0.18s Instant Load</span>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2.5">
                      <span className="text-[10px] font-mono text-white/40 block">3D Visuals</span>
                      <span className="text-xs font-bold text-[#FF3B3B]">✓ Interactive WebGL</span>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2.5">
                      <span className="text-[10px] font-mono text-white/40 block">Mobile Conversion</span>
                      <span className="text-xs font-bold text-white">Top 1% in Industry</span>
                    </div>
                  </div>
                </motion.div>

                {/* ── #2 Competitor Result (Slow Template) ── */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 opacity-40">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-white/40 font-mono">https://www.generic-competitor-site.com</span>
                  </div>
                  <h4 className="text-base font-medium text-white/60 mb-1 font-sans">
                    Generic Competitor — Standard Services
                  </h4>
                  <p className="text-xs text-white/40 font-sans line-clamp-1">
                    Welcome to our generic template website. Slow load times, no 3D elements, and buried below your business...
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
