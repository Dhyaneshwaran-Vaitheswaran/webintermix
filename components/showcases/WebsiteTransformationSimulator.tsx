"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { GlassCard } from "@/components/ui/GlassCard";

// ── 3D OBJECT INSIDE WEB INTERMIX PANE ────────────────────────────────────────
function InteractiveSimulator3D() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={meshRef} scale={1.25}>
      {/* Luxury Chronograph Center Case */}
      <mesh>
        <cylinderGeometry args={[1.0, 1.05, 0.25, 64]} />
        <meshStandardMaterial color="#FF3B3B" metalness={0.95} roughness={0.15} />
      </mesh>
      {/* Sunburst Dial */}
      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 0.02, 64]} />
        <meshStandardMaterial color="#0a0a0c" roughness={0.8} />
      </mesh>
      {/* Glowing Hand */}
      <mesh position={[0, 0.15, 0]} rotation={[0, 0, 0.8]}>
        <boxGeometry args={[0.04, 0.7, 0.01]} />
        <meshStandardMaterial color="#ffffff" emissive="#FF3B3B" emissiveIntensity={0.8} />
      </mesh>
      {/* Outer Halo */}
      <mesh position={[0, 0.14, 0]}>
        <torusGeometry args={[0.9, 0.04, 16, 64]} />
        <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

export function WebsiteTransformationSimulator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderBoxRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);

  // Scroll linked automatic gentle sweep
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Automatically sweep slider from 30% to 75% as visitor scrolls past
  const autoSweep = useTransform(scrollYProgress, [0.2, 0.6], [30, 75]);

  useEffect(() => {
    const unsubscribe = autoSweep.on("change", (val) => {
      if (!isDragging) {
        setSliderPos(val);
      }
    });
    return () => unsubscribe();
  }, [autoSweep, isDragging]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!sliderBoxRef.current) return;
    const rect = sliderBoxRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  return (
    <section ref={containerRef} className="w-full py-28 px-6 md:px-12 lg:px-24 select-none">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center text-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mb-14 flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF3B3B]/30 bg-[#FF3B3B]/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FF3B3B] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#FF3B3B] uppercase">
              Interactive Before & After Simulator
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-4 max-w-4xl text-center">
            DRAG TO UNVEIL <span className="text-[#FF3B3B]">THE TRANSFORMATION.</span>
          </h2>

          <p className="text-[#888888] text-sm md:text-base max-w-2xl font-sans leading-relaxed text-center">
            Drag the glowing laser slider from left to right to watch the dated, glitchy WordPress template transform into a bespoke 60 FPS Web Intermix 3D digital asset.
          </p>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════════
            BROWSER SIMULATION STAGE (LEFT TO RIGHT REVEAL)
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="w-full max-w-5xl">
          <GlassCard className="p-0 overflow-hidden shadow-[0_0_80px_rgba(255,59,59,0.12)] border-white/15 rounded-3xl">
            
            {/* macOS Browser Title Bar */}
            <div className="bg-[#121214] border-b border-white/10 px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block" />
              </div>

              {/* URL Pill */}
              <div className="bg-black/50 border border-white/10 px-6 py-1.5 rounded-full text-xs font-mono text-white/60 flex items-center gap-2">
                <span className="text-white/40">🔒 https://www.yourbrand.com</span>
                <span className="text-[10px] text-[#FF3B3B] font-bold uppercase hidden sm:inline">
                  {sliderPos > 50 ? "[WEB INTERMIX 3D ACTIVATED]" : "[LEGACY TEMPLATE]"}
                </span>
              </div>

              <div className="text-xs font-mono text-white/40 hidden sm:block">
                Drag Left ➔ Right to Reveal ⟷
              </div>
            </div>

            {/* Main Interactive Stage Box */}
            <div
              ref={sliderBoxRef}
              onPointerDown={() => setIsDragging(true)}
              onPointerUp={() => setIsDragging(false)}
              onPointerMove={(e) => {
                if (isDragging || e.buttons === 1) {
                  handlePointerMove(e);
                }
              }}
              className="relative w-full h-[480px] md:h-[540px] overflow-hidden cursor-ew-resize touch-none"
            >
              
              {/* ─────────────────────────────────────────────────────────────
                  LAYER 1 (UNDERNEATH): CLUNKY WORDPRESS TEMPLATE
              ───────────────────────────────────────────────────────────── */}
              <div className="absolute inset-0 bg-[#e8e8e8] text-[#222222] p-6 md:p-10 flex flex-col justify-between font-serif select-none">
                {/* Glitch Warning Alert */}
                <div className="bg-[#fef2f2] border border-[#ef4444] text-[#b91c1c] p-3 rounded-md text-xs font-mono text-left flex items-center justify-between shadow-sm">
                  <span>⚠️ Warning: Elementor Pro Plugin Memory Exhausted (PHP 7.4 Deprecated)</span>
                  <span className="text-[10px] bg-red-200 px-2 py-0.5 rounded font-bold">404 Error</span>
                </div>

                {/* Clunky Header & Nav */}
                <div className="flex justify-between items-center border-b border-gray-300 pb-3 mt-2">
                  <span className="font-bold text-xl text-gray-800 tracking-normal">YourBrand Inc.</span>
                  <div className="text-xs text-gray-600 space-x-4 hidden sm:block">
                    <span>Home</span>
                    <span>About Us</span>
                    <span>Products (Broken)</span>
                    <span>Contact Us</span>
                  </div>
                </div>

                {/* Flat Boxy Hero */}
                <div className="grid grid-cols-2 gap-6 my-auto items-center text-left">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-gray-500 block mb-1">Standard Agency Template</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                      Welcome To Our Website
                    </h3>
                    <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                      We offer services. Please click the button below to submit a form. Page takes 4.2s to load on smartphones...
                    </p>
                    <button className="px-4 py-2 bg-blue-600 text-white text-xs rounded shadow">
                      Read More »
                    </button>
                  </div>

                  {/* Broken 2D Image Box with Spinner */}
                  <div className="h-44 bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center text-gray-500 text-xs">
                    <div className="w-6 h-6 border-2 border-gray-500 border-t-transparent rounded-full animate-spin mb-2" />
                    <span>Loading Image (4.2s)...</span>
                    <span className="text-[10px] text-red-500 font-mono">Slow Server Response</span>
                  </div>
                </div>

                {/* Bad Performance Pill */}
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg text-xs font-mono flex items-center justify-between">
                  <span>🔴 Google Score: 38/100 (Failed Core Web Vitals)</span>
                  <span className="hidden sm:inline">Bounce Rate: 72%</span>
                </div>
              </div>

              {/* ─────────────────────────────────────────────────────────────
                  LAYER 2 (TOP OVERLAY): WEB INTERMIX 3D MASTERPIECE
                  Wipes from LEFT to RIGHT as sliderPos increases!
              ───────────────────────────────────────────────────────────── */}
              <div
                className="absolute inset-0 bg-[#08080a] text-white p-6 md:p-10 flex flex-col justify-between overflow-hidden"
                style={{
                  clipPath: `polygon(0% 0%, ${sliderPos}% 0%, ${sliderPos}% 100%, 0% 100%)`,
                }}
              >
                {/* Background Red Aurora Glow */}
                <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[300px] bg-[#FF3B3B]/15 blur-[100px] rounded-full pointer-events-none" />

                {/* Top Luxury Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 relative z-10">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#FF3B3B] animate-pulse" />
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">
                      YOUR BRAND // APEX LUXURY
                    </span>
                  </div>
                  <span className="text-xs font-mono text-green-400 font-bold bg-green-500/10 px-3 py-1 rounded-full border border-green-500/30">
                    ⚡ 0.18s Instant Load
                  </span>
                </div>

                {/* Live 3D Experience Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto items-center text-left relative z-10">
                  <div>
                    <div className="inline-block bg-[#FF3B3B]/10 border border-[#FF3B3B]/30 px-3 py-1 rounded-full text-[10px] font-mono font-bold text-[#FF3B3B] uppercase tracking-widest mb-3">
                      Bespoke 3D Architecture
                    </div>
                    <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white mb-2 leading-none">
                      UNFORGETTABLE <span className="text-[#FF3B3B]">EXPERIENCES.</span>
                    </h3>
                    <p className="text-white/60 text-xs md:text-sm font-sans mb-5 leading-relaxed">
                      Custom 60 FPS 3D product models, frictionless 1-click Razorpay checkout, and guaranteed #1 Google ranking architecture.
                    </p>

                    {/* Razorpay 1-Click Pill */}
                    <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[#0C2340] border border-[#3395FF]/40 text-white font-mono text-xs font-bold shadow-[0_0_25px_rgba(51,149,255,0.3)]">
                      <span className="text-[#3395FF]">⚡ RAZORPAY</span>
                      <span>· 1-Click Instant Pay</span>
                    </div>
                  </div>

                  {/* 3D WebGL Canvas Inside Window */}
                  <div className="h-56 relative rounded-2xl bg-black/40 border border-white/10 overflow-hidden shadow-inner">
                    <div className="absolute top-3 right-3 z-10 text-[9px] font-mono text-white/50 bg-black/60 px-2 py-0.5 rounded-full">
                      Native 60 FPS WebGL
                    </div>
                    <Canvas camera={{ position: [0, 1, 3.5], fov: 45 }}>
                      <ambientLight intensity={0.8} />
                      <directionalLight position={[5, 5, 5]} intensity={2.5} />
                      <directionalLight position={[-5, -5, -5]} intensity={1} color="#FF3B3B" />
                      <Suspense fallback={null}>
                        <Float speed={2} rotationIntensity={0.4}>
                          <InteractiveSimulator3D />
                        </Float>
                      </Suspense>
                      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
                    </Canvas>
                  </div>
                </div>

                {/* Verified 100/100 Core Web Vitals Badge */}
                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-mono flex items-center justify-between relative z-10">
                  <span className="text-green-400 font-bold">🟢 Google PageSpeed: 100/100 SLA</span>
                  <span className="text-white/60">Conversion Boost: +210%</span>
                </div>
              </div>

              {/* ─────────────────────────────────────────────────────────────
                  THE GLOWING LASER SLIDER HANDLE DIVIDER
              ───────────────────────────────────────────────────────────── */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF3B3B] via-white to-[#FF3B3B] shadow-[0_0_25px_rgba(255,59,59,1)] z-30 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                {/* Center Circular Grab Badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FF3B3B] border-2 border-white flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,59,59,0.9)] cursor-ew-resize">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 16l-4-4 4-4M17 8l4 4-4 4" />
                  </svg>
                </div>
              </div>

            </div>
          </GlassCard>
        </div>

      </div>
    </section>
  );
}
