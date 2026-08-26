"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { WebsiteTransformationSimulator } from "@/components/showcases/WebsiteTransformationSimulator";
import Link from "next/link";

// ── 4 CORE GUARANTEES ────────────────────────────────────────────────────────
const GUARANTEES = [
  {
    id: "01",
    badge: "PERFORMANCE SLA",
    title: "100/100 Google Speed SLA",
    metric: "Sub-0.3s Global Load",
    desc: "We guarantee your website scores 95–100 on Google PageSpeed Insights and loads in under 0.3s worldwide. If it falls below this standard, we optimize it for free until it passes.",
  },
  {
    id: "02",
    badge: "VELOCITY GUARANTEE",
    title: "14-Day Rapid Launch Sprint",
    metric: "Live in 14 Days",
    desc: "No months of endless agency meetings or delays. Your custom website, 3D visual models, and SEO are engineered, tested, and deployed in 14 business days flat.",
  },
  {
    id: "03",
    badge: "ZERO RISK PILOT",
    title: "Risk-Free Live Concept Preview",
    metric: "100% Peace of Mind",
    desc: "Before you commit to a full build, our team designs and codes an interactive 3D concept of your future homepage so you can test-drive the look and feel completely risk-free.",
  },
  {
    id: "04",
    badge: "FULL FREEDOM",
    title: "100% Full Ownership & Zero Lock-In",
    metric: "Zero Hostage Fees",
    desc: "You own 100% of your source code, 3D assets, domain, and hosting. No monthly hostage fees, no proprietary agency lock-in. Full digital sovereignty.",
  },
];

// ── WORDPRESS VS MODERN STACK MATRIX ─────────────────────────────────────────
const MATRIX = [
  {
    feature: "Platform Stability & Maintenance",
    legacy: "Glitchy WordPress plugins, broken database updates, and unexpected site crashes.",
    modern: "Zero-maintenance serverless architecture. Bulletproof uptime with 99.99% reliability.",
  },
  {
    feature: "Security & Vulnerabilities",
    legacy: "Frequent malware infections, outdated PHP exploits, and database injection risks.",
    modern: "Immutable static edge deployment. Immune to traditional database hacks and vulnerabilities.",
  },
  {
    feature: "Mobile Speed & Core Web Vitals",
    legacy: "3.5s – 5.0s bloated load times that hurt your Google search ranking and lose clients.",
    modern: "Sub-0.2s instant global delivery on high-speed CDN, scoring 99/100 on Google.",
  },
  {
    feature: "3D & Visual Storytelling",
    legacy: "Heavy, laggy plugins that freeze mobile browsers and look dated.",
    modern: "Native 60 FPS WebGL 3D models with real-time lighting that captivate visitors.",
  },
];

export default function StandardPage() {
  return (
    <main className="relative z-10 w-full min-h-screen pt-40 pb-32 flex flex-col items-center">
      <div className="max-w-5xl mx-auto flex flex-col items-center px-6 md:px-12 lg:px-24 w-full text-center">
        
        {/* ── Page Header ── */}
        <section className="mb-20 text-center w-full flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 40 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <div className="inline-block bg-[#FF3B3B]/10 border border-[#FF3B3B]/30 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[#FF3B3B] uppercase tracking-widest mb-6">
              The Web Intermix Standard
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-6 leading-[1.1]">
              IRONCLAD GUARANTEES<span className="text-[#FF3B3B]">.</span><br />
              ZERO HEADACHES<span className="text-[#FF3B3B]">.</span>
            </h1>
            <p className="text-[#888888] text-base md:text-lg leading-relaxed max-w-2xl font-sans mx-auto">
              We don&apos;t make vague promises. We operate on mathematical performance SLAs, rapid delivery timelines, and risk-free guarantees so your business is always protected.
            </p>
          </motion.div>
        </section>

        {/* ── 4 Core Guarantees Grid ── */}
        <section className="w-full mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
            {GUARANTEES.map((g) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
              >
                <GlassCard className="h-full p-8 md:p-10 flex flex-col justify-between group hover:border-[#FF3B3B]/50 transition-all duration-500 shadow-2xl">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-mono font-bold tracking-widest text-[#FF3B3B] uppercase bg-[#FF3B3B]/10 px-3 py-1 rounded-full border border-[#FF3B3B]/20">
                        {g.badge}
                      </span>
                      <span className="text-xs font-mono text-green-400 font-bold">
                        {g.metric}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-3 group-hover:text-[#FF3B3B] transition-colors">
                      {g.title}
                    </h3>

                    <p className="text-[#888888] text-sm md:text-base font-sans leading-relaxed group-hover:text-white/90 transition-colors">
                      {g.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF3B3B]" />
                    <span className="text-[11px] font-mono text-white/50 uppercase tracking-widest">
                      Backed by Contract SLA
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── VISUAL BEFORE & AFTER TRANSFORMATION SIMULATOR ── */}
        <WebsiteTransformationSimulator />

        {/* ── Why Legacy WordPress Fails vs Modern Next.js Matrix ── */}
        <section className="w-full mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center mb-12"
          >
            <div className="inline-block bg-[#FF3B3B]/10 border border-[#FF3B3B]/30 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[#FF3B3B] uppercase tracking-widest mb-4">
              Architecture Comparison
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
              WHY TEMPLATES BREAK <span className="text-[#FF3B3B]">VS MODERN STACK.</span>
            </h2>
            <p className="text-[#888888] text-sm md:text-base max-w-xl font-sans">
              See why WordPress plugin glitches and clunky templates cost businesses clients, and how our custom engineering fixes it permanently.
            </p>
          </motion.div>

          <GlassCard className="p-6 md:p-10 w-full overflow-hidden shadow-2xl text-left">
            <div className="flex flex-col gap-6">
              {MATRIX.map((row, idx) => (
                <div key={idx} className="border-b border-white/10 pb-6 last:border-b-0 last:pb-0">
                  <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-white mb-4">
                    {row.feature}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Legacy / WordPress */}
                    <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 text-xs font-sans text-red-200/80 leading-relaxed">
                      <span className="font-mono text-red-400 font-bold block mb-1 uppercase tracking-wider text-[10px]">
                        ✕ Legacy WordPress & Templates
                      </span>
                      {row.legacy}
                    </div>

                    {/* Web Intermix */}
                    <div className="p-4 rounded-xl bg-green-950/20 border border-green-500/20 text-xs font-sans text-green-200/90 leading-relaxed">
                      <span className="font-mono text-green-400 font-bold block mb-1 uppercase tracking-wider text-[10px]">
                        ✓ Web Intermix Modern Engineering
                      </span>
                      {row.modern}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        {/* ── Call to Action to Launch AI Architect ── */}
        <section className="text-center w-full flex flex-col items-center">
          <Link
            href="/threshold"
            className="px-10 py-5 rounded-full bg-[#FF3B3B] hover:bg-[#ff5252] text-white font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_35px_rgba(255,59,59,0.4)] hover:scale-105"
          >
            LAUNCH AI PROJECT ARCHITECT →
          </Link>
          <span className="text-white/30 text-xs font-mono uppercase tracking-widest mt-4">
            Interactive 60-Second Experience · Instant Custom Estimate
          </span>
        </section>

      </div>
    </main>
  );
}
