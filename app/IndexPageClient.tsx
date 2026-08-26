"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { PerformanceComparison } from "@/components/showcases/PerformanceComparison";
import { GoogleRankSimulator } from "@/components/showcases/GoogleRankSimulator";
import { Interactive3DShowcase } from "@/components/showcases/Interactive3DShowcase";
import { ArchitectTeaser } from "@/components/showcases/ArchitectTeaser";
import { useCanvasStore } from "@/stores/canvasStore";
import { RedAurora } from "@/components/canvas/RedAurora";

const PHILOSOPHY = [
  {
    title: "Custom Web & E-Commerce",
    desc: "High-speed, stunning websites and online stores crafted to turn casual visitors into loyal, paying customers."
  },
  {
    title: "Interactive 3D & Visuals",
    desc: "Eye-catching 3D models and smooth animations that make your brand stand out and leave an unforgettable impression."
  },
  {
    title: "Google SEO & Growth",
    desc: "Targeted search optimization and high-speed architecture to put your business in front of customers actively searching for you."
  }
];

export function IndexPageClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    useCanvasStore.getState().setActiveScene("index");
    return () => useCanvasStore.getState().setActiveScene("null");
  }, []);

  return (
    <main ref={containerRef} className="w-full flex flex-col">
      {/* ── HERO SECTION ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center">
        <RedAurora />
        <div className="relative z-10 flex flex-col items-center w-full">
          <motion.div 
            initial={{ opacity: 0, filter: "blur(10px)", y: 40 }} 
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }} 
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-black uppercase tracking-tight glass-text mb-6 select-none relative z-10 max-w-6xl leading-[1.1]">
              WEBSITES DESIGNED TO TURN HEADS & WIN CLIENTS<span className="text-[#FF3B3B] inline-block mix-blend-normal relative z-20">.</span>
            </h1>
            <p className="text-xs md:text-sm text-white/80 max-w-3xl mt-2 mb-12 font-bold tracking-[0.2em] leading-relaxed uppercase select-none drop-shadow-md">
              Modern web design, custom 3D graphics, and built-in SEO tailored to help your business make a lasting impression and convert visitors into paying clients.
            </p>
            <LiquidButton href="/systems">SEE OUR SERVICES</LiquidButton>
          </motion.div>
        </div>
      </section>

      {/* ── MANIFESTO ──────────────────────────────────────────────────────────── */}
      <section className="relative w-full py-24 px-6 md:px-12 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl text-center"
        >
          <p className="text-sm md:text-base text-white/70 font-bold tracking-[0.15em] leading-loose uppercase select-none drop-shadow-sm">
            Most websites look generic and get lost in Google search. We create bespoke websites with custom 3D visuals and built-in SEO that immediately build trust with your visitors and turn them into paying clients — without any technical headache for you.
          </p>
        </motion.div>
      </section>

      {/* ── SHOWCASES ─────────────────────────────────────────────────────────── */}
      <PerformanceComparison />
      <GoogleRankSimulator />
      <Interactive3DShowcase />

      {/* ── PHILOSOPHY GRID ───────────────────────────────────────────────────── */}
      <section className="relative w-full py-32 px-6 md:px-12 lg:px-24">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {}
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1440px] mx-auto"
        >
          {PHILOSOPHY.map((item, i) => (
            <motion.div 
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <GlassCard className="h-full flex flex-col justify-between group">
                <h3 className="text-xl font-bold tracking-tight mb-6 text-white uppercase">{item.title}</h3>
                <p className="text-[#888888] leading-relaxed group-hover:text-white/90 transition-colors duration-500 font-sans normal-case text-sm md:text-base">{item.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── ARCHITECT TEASER HOOK ────────────────────────────────────────────── */}
      <ArchitectTeaser />
    </main>
  );
}
