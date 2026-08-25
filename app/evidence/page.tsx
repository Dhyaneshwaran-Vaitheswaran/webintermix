"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { PerformanceComparison } from "@/components/showcases/PerformanceComparison";
import { ProcessTimeline } from "@/components/showcases/ProcessTimeline";

const STUDIES = [
  {
    id: "01",
    title: "Data Infrastructure Modernization",
    description: "Accelerated platform responsiveness by 40% through the implementation of distributed data systems.",
    image: "/images/abstract_data_streams.png"
  },
  {
    id: "02",
    title: "Advanced Visual Processing",
    description: "Engineered decoupled visual processing to deliver stunning graphics without compromising core application speed.",
    image: "/images/liquid_glass_waves.png"
  },
  {
    id: "03",
    title: "Intelligent Deployment Pipeline",
    description: "Slashed deployment times and eliminated human error by integrating automated quality assurance workflows.",
    image: "/images/macro_hardware.png"
  },
];

export default function EvidencePage() {
  return (
    <main className="relative z-10 w-full min-h-screen pt-40 flex flex-col">
      <div className="max-w-5xl mx-auto flex flex-col items-center px-6 md:px-12 lg:px-24 mb-32">
        
        <section className="mb-24 text-center w-full">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 40 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-black uppercase tracking-tighter text-clip-gradient mb-8 leading-[0.9]">
              EVIDENCE<span className="text-[#FF3B3B]">.</span>
            </h1>
            <p className="text-[#888888] text-xl md:text-2xl leading-relaxed max-w-2xl font-medium mx-auto">
              We don't do case studies. We provide verifiable architectural evidence.
            </p>
          </motion.div>
        </section>

        <section className="w-full">
          <AnimatePresence>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.15 } },
                hidden: {}
              }}
              className="flex flex-col gap-8 w-full"
            >
              {STUDIES.map((study) => (
                <motion.div
                  key={study.id}
                  variants={{
                    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                  }}
                >
                  <GlassCard className="w-full group hover:border-white/20 hover:bg-[#0A0A0A]/60 transition-all duration-500">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 w-full md:w-2/3">
                        <span className="font-mono text-[#FF3B3B] text-xl md:text-2xl font-bold tracking-widest shrink-0">
                          {study.id}.
                        </span>
                        <div>
                          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white group-hover:text-[#FF3B3B] transition-colors duration-500 mb-2">
                            {study.title}
                          </h2>
                          <p className="text-[#888888] leading-relaxed text-base md:text-lg group-hover:text-white/90 transition-colors duration-500 border-l border-white/10 pl-6 py-2">
                            {study.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="w-full md:w-1/3 h-48 md:h-32 relative rounded-xl overflow-hidden border border-white/5 group-hover:border-[#FF3B3B]/30 transition-colors duration-500">
                        <Image 
                          src={study.image} 
                          alt={study.title} 
                          fill 
                          className="object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out mix-blend-screen"
                        />
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </section>

      </div>

      {/* ── SHOWCASES ─────────────────────────────────────────────────────────── */}
      <PerformanceComparison />
      <ProcessTimeline />
    </main>
  );
}
