"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { ResponsiveViewer } from "@/components/showcases/ResponsiveViewer";
import { CommerceEngineExplorer } from "@/components/showcases/CommerceEngineExplorer";
import { ProcessTimeline } from "@/components/showcases/ProcessTimeline";

const MODULES = [
  {
    id: "web-design",
    name: "Custom Web Design & Development",
    description: "Bespoke websites tailored specifically for your brand. We never use clunky templates. Everything is custom-crafted to load instantly, look stunning, and guide your visitors directly toward becoming paying clients.",
  },
  {
    id: "3d-visuals",
    name: "Interactive 3D Visuals & Modeling",
    description: "Give your visitors an unforgettable experience. We create interactive 3D product models, smooth animations, and visual storytelling that make your brand stand out in a sea of boring competitors.",
  },
  {
    id: "seo-growth",
    name: "Google SEO & Search Growth",
    description: "Get discovered by clients actively searching for your services. We implement clean site architecture, keyword optimization, and lightning-fast speeds that search engines love to rank on page 1.",
  },
  {
    id: "ecommerce",
    name: "High-Converting E-Commerce",
    description: "Sell products effortlessly. From custom product displays to 1-click mobile checkout, we build seamless online shopping experiences designed to maximize your revenue and order value.",
  },
];

export function SystemsPageClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  // Parallax effects for the cards
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const y4 = useTransform(scrollYProgress, [0, 1], [160, -160]);

  return (
    <main ref={containerRef} className="w-full min-h-screen pt-32 flex flex-col">
      <div className="max-w-[1440px] w-full mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative px-6 md:px-12 lg:px-24">
        {/* SCROLLING LEFT COLUMN */}
        <div className="lg:w-2/3 py-12 lg:py-24 pb-32 order-2 lg:order-1">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
            className="flex flex-col gap-12"
          >
            {MODULES.map((mod, i) => {
              const y = i === 0 ? y1 : i === 1 ? y2 : i === 2 ? y3 : y4;

              return (
                <motion.div
                  key={mod.id}
                  style={{ y }}
                  variants={{
                    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                  }}
                >
                  <GlassCard className="h-full group hover:border-white/20 transition-colors duration-500">
                    <div className="font-mono text-[#FF3B3B] text-xs font-bold mb-6 tracking-widest">
                      (SERVICE 0{i + 1})
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-4">
                      {mod.name}
                    </h3>
                    <p className="text-[#888888] leading-relaxed text-base md:text-lg group-hover:text-white/90 transition-colors duration-500 font-sans">
                      {mod.description}
                    </p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* STICKY RIGHT COLUMN */}
        <div className="lg:w-1/3 h-fit lg:sticky lg:top-40 order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", x: 40 }}
            animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-clip-gradient mb-8 leading-[0.9] break-words">
              OUR SERVICES<span className="text-[#FF3B3B]">.</span>
            </h1>
            <p className="text-[#888888] text-base md:text-lg leading-relaxed max-w-sm font-sans">
              We take care of your design, 3D graphics, SEO, and tech from start to finish so your business looks world-class and wins more customers.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── PARALLAX IMAGE BREAK ────────────────────────────────────────────── */}
      <section className="relative w-full h-[60vh] overflow-hidden my-32">
        <motion.div 
          className="absolute inset-0"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]) }}
        >
          <Image 
            src="/images/red_geometric_core.png" 
            alt="Core Systems Architecture" 
            fill 
            className="object-cover opacity-50 mix-blend-screen" 
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-transparent to-[#000000]" />
      </section>

      {/* ── SHOWCASES ─────────────────────────────────────────────────────────── */}
      <ResponsiveViewer />
      <CommerceEngineExplorer />
      <ProcessTimeline />

    </main>
  );
}
