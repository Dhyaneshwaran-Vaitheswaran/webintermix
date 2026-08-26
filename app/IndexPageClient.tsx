"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { GlassCard } from "@/components/ui/GlassCard";
import Image from "next/image";
import { PerformanceComparison } from "@/components/showcases/PerformanceComparison";
import { ResponsiveViewer } from "@/components/showcases/ResponsiveViewer";
import { useCursorStore } from "@/stores/cursorStore";
import { useCanvasStore } from "@/stores/canvasStore";
import { RedAurora } from "@/components/canvas/RedAurora";

const IMAGES = [
  "/images/liquid_glass_waves.png",
  "/images/red_geometric_core.png",
  "/images/abstract_data_streams.png",
  "/images/macro_hardware.png",
];

const PHILOSOPHY = [
  {
    title: "Seamless Data Synchronization",
    desc: "We build digital infrastructure that flows smoothly between systems. Our platforms adapt to intense load requirements effortlessly, ensuring your business operations never miss a beat."
  },
  {
    title: "Interactive Readiness",
    desc: "By optimizing delivery and pushing processing to the edge, we guarantee instant responses. Your users experience flawless interaction from the very first click."
  },
  {
    title: "Immersive Digital Experiences",
    desc: "We utilize advanced visual rendering to craft visceral, fluid digital environments. Our platforms command attention while maintaining absolute technical stability."
  }
];

export function IndexPageClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { setCursorType } = useCursorStore();

  useEffect(() => {
    useCanvasStore.getState().setActiveScene("index");
    return () => useCanvasStore.getState().setActiveScene("null");
  }, []);

  const { scrollYProgress } = useScroll({
    target: carouselRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["20%", "-40%"]);

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
          <h1 className="text-4xl md:text-6xl lg:text-[8rem] font-black uppercase tracking-tighter glass-text mb-4 select-none relative z-10">
            FLUID INFRASTRUCTURE<span className="text-[#FF3B3B] inline-block mix-blend-normal relative z-20">.</span>
          </h1>
          <p className="text-xs md:text-sm text-white/70 max-w-3xl mt-6 mb-12 font-bold tracking-[0.3em] leading-loose uppercase select-none drop-shadow-md">
            Digital systems engineered for trust. We build seamless, invisible infrastructure that commands confidence and drives measurable growth.
          </p>
          <LiquidButton href="/threshold">INITIALIZE TRANSMISSION</LiquidButton>
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
          <p className="text-sm md:text-base text-[#FF3B3B]/60 font-bold tracking-[0.2em] leading-loose uppercase select-none drop-shadow-sm">
            We reject the bloated, template-driven status quo. Our engineering philosophy is rooted in atomic architecture and fluid physics. By offloading heavy processing and optimizing the critical rendering path, we construct digital environments that feel less like websites and more like native, high-performance operating systems. The result is an invisible infrastructure that silently builds absolute user trust.
          </p>
        </motion.div>
      </section>

      {/* ── SHOWCASES ─────────────────────────────────────────────────────────── */}
      <PerformanceComparison />
      <ResponsiveViewer />

      {/* ── DYNAMIC SLIDESHOW ─────────────────────────────────────────────────── */}
      <section 
        ref={carouselRef} 
        className="relative h-[clamp(400px,80vh,800px)] w-full overflow-hidden flex items-center bg-black/20 mt-16 cursor-none"
        onMouseEnter={() => setCursorType("drag")}
        onMouseLeave={() => setCursorType("default")}
      >
        <motion.div style={{ x }} className="flex gap-4 md:gap-8 px-6 md:px-12 pointer-events-none">
          {IMAGES.map((src, i) => (
            <motion.div 
              key={i} 
              className="relative w-[clamp(280px,70vw,600px)] md:w-[clamp(400px,40vw,800px)] h-[clamp(300px,50vh,500px)] flex-shrink-0 rounded-3xl overflow-hidden glass-panel"
              initial={{ opacity: 0.5, filter: "blur(4px)", scale: 0.9 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1.05 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
            >
              <Image 
                src={src} 
                alt={`Showcase ${i + 1}`} 
                fill 
                className="object-cover opacity-60 mix-blend-screen"
                sizes="(max-width: 768px) 70vw, 40vw"
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

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
                <h3 className="text-2xl font-bold tracking-tight mb-8 text-white">{item.title}</h3>
                <p className="text-[#888888] leading-relaxed group-hover:text-white/80 transition-colors duration-500">{item.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
