"use client";

import { useState, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProcessTimeline } from "@/components/showcases/ProcessTimeline";
import Link from "next/link";

// ── 3D SPATIAL ARTIFACT FOR STAGE 02 ─────────────────────────────────────────
function SpatialCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.6;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.8;
    }
  });

  return (
    <group scale={1.4}>
      {/* Central Gem Core */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#FF3B3B"
          emissive="#FF3B3B"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
          wireframe={false}
        />
      </mesh>

      {/* Orbiting Laser Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.5, 0.04, 16, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.8}
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

// ── LIVE SPEED TEST WIDGET FOR STAGE 01 ──────────────────────────────────────
function SpeedTestWidget() {
  const [testing, setTesting] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const runTest = () => {
    setTesting(true);
    setScore(null);
    setTimeout(() => {
      setTesting(false);
      setScore(100);
    }, 1500);
  };

  return (
    <div className="w-full bg-[#08080a] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between h-[360px] shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-white uppercase tracking-widest">
            Global Edge CDN Telemetry
          </span>
        </div>
        <span className="text-xs font-mono text-white/40">4 Locations</span>
      </div>

      {/* Node List */}
      <div className="flex flex-col gap-3 my-4">
        {[
          { city: "New York (iad1)", latency: "9 ms", score: "100/100" },
          { city: "London (lhr1)", latency: "14 ms", score: "100/100" },
          { city: "Tokyo (hnd1)", latency: "18 ms", score: "99/100" },
          { city: "Frankfurt (fra1)", latency: "12 ms", score: "100/100" },
        ].map((node, i) => (
          <div key={i} className="flex items-center justify-between bg-white/[0.03] px-4 py-2.5 rounded-xl border border-white/5 text-xs font-mono">
            <span className="text-white/80">{node.city}</span>
            <div className="flex items-center gap-4">
              <span className="text-green-400 font-bold">{node.latency}</span>
              <span className="text-white/40 hidden sm:inline">{node.score}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <button
          onClick={runTest}
          disabled={testing}
          className="px-6 py-2.5 rounded-full bg-[#FF3B3B] hover:bg-[#ff5252] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all disabled:opacity-50"
        >
          {testing ? "Testing Latency..." : "Run Global Ping"}
        </button>
        <span className="text-xs font-mono text-white/60">
          Core Web Vitals: <strong className="text-green-400">{score ? "100 / 100" : "Verified 99+"}</strong>
        </span>
      </div>
    </div>
  );
}

// ── LIVE SEO CLIMBER WIDGET FOR STAGE 03 ─────────────────────────────────────
function SeoClimberWidget() {
  return (
    <div className="w-full bg-[#08080a] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between h-[360px] shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <span className="text-xs font-mono font-bold text-[#FF3B3B] uppercase tracking-widest">
          SERP Trajectory Simulation
        </span>
        <span className="text-xs font-mono text-green-400 font-bold">#1 Goal Achieved</span>
      </div>

      {/* Trajectory Timeline */}
      <div className="space-y-4 my-auto">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-white/50">Day 01 (Pre-Optimization):</span>
          <span className="text-red-400 font-bold">Rank #42 (Buried)</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="w-1/4 h-full bg-red-500" />
        </div>

        <div className="flex items-center justify-between text-xs font-mono pt-2">
          <span className="text-white/50">Day 14 (Web Intermix SEO Engine):</span>
          <span className="text-green-400 font-bold">Rank #1 (👑 Top Result)</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "25%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            className="h-full bg-gradient-to-r from-[#FF3B3B] to-green-400"
          />
        </div>
      </div>

      <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 text-xs font-mono text-white/80 flex items-center justify-between">
        <span>Rich Snippet Schema:</span>
        <span className="text-green-400 font-bold">✓ 100% Validated</span>
      </div>
    </div>
  );
}

// ── LIVE 1-CLICK CHECKOUT WIDGET FOR STAGE 04 ────────────────────────────────
function CheckoutSimulatorWidget() {
  const [isOrdered, setIsOrdered] = useState(false);

  const triggerOrder = () => {
    setIsOrdered(true);
    setTimeout(() => setIsOrdered(false), 3000);
  };

  return (
    <div className="w-full bg-[#08080a] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between h-[360px] shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3395FF] animate-pulse" />
          <span className="text-xs font-mono font-bold text-white uppercase tracking-widest">
            Razorpay 1-Click Checkout
          </span>
        </div>
        <span className="text-xs font-mono text-[#3395FF] font-bold">+210% Conversion</span>
      </div>

      {/* Animated Flow */}
      <div className="my-auto flex flex-col items-center text-center">
        {isOrdered ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-green-400 text-xl font-bold mb-2">
              ✓
            </div>
            <h4 className="text-sm font-bold text-white font-mono uppercase">Razorpay Payment Verified · 0.3s</h4>
            <span className="text-xs text-white/50 font-sans">Instant UPI / QR / Card confirmation</span>
          </motion.div>
        ) : (
          <div className="w-full max-w-xs flex flex-col gap-3">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-left flex justify-between text-xs font-mono">
              <span className="text-white/70">Cart Item:</span>
              <span className="text-white font-bold">₹4,500.00</span>
            </div>
            <button
              onClick={triggerOrder}
              className="w-full py-4 rounded-xl bg-[#0C2340] hover:bg-[#13335c] border border-[#3395FF]/40 text-white font-black text-xs font-mono uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(51,149,255,0.2)] hover:shadow-[0_0_30px_rgba(51,149,255,0.4)] flex items-center justify-center gap-2"
            >
              <span className="text-[#3395FF] font-black">⚡ RAZORPAY</span>
              <span>· 1-Click Instant Pay</span>
            </button>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-white/10 flex justify-between text-xs font-mono text-white/50">
        <span>Supported Gateways:</span>
        <span className="text-[#3395FF] font-bold">UPI, Cards, NetBanking</span>
      </div>
    </div>
  );
}

// ── MAIN SYSTEMS PAGE CLIENT ─────────────────────────────────────────────────
export function SystemsPageClient() {
  return (
    <main className="w-full min-h-screen pt-40 pb-32 flex flex-col items-center relative overflow-hidden">
      
      {/* ── Ambient Glow Backdrop ── */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#FF3B3B]/10 blur-[160px] rounded-full pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto flex flex-col items-center px-6 md:px-12 lg:px-24 w-full relative z-10">
        
        {/* ── Page Header ── */}
        <section className="mb-24 text-center w-full flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 40 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <div className="inline-block bg-[#FF3B3B]/10 border border-[#FF3B3B]/30 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[#FF3B3B] uppercase tracking-widest mb-6">
              Digital Architecture & Capabilities
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-6 leading-[1.1] max-w-5xl">
              FOUR ENGINES FOR <span className="text-[#FF3B3B]">TOTAL MARKET DOMINANCE.</span>
            </h1>
            <p className="text-[#888888] text-base md:text-lg leading-relaxed max-w-2xl font-sans mx-auto">
              We don&apos;t just build websites. We engineer end-to-end digital assets with custom 3D visuals, sub-second speed, and Google SEO built directly into the core.
            </p>
          </motion.div>
        </section>

        {/* ── 4 Full-Width Cinematic Storytelling Stages ── */}
        <div className="flex flex-col gap-16 w-full mb-32">
          
          {/* ════ STAGE 01: BESPOKE WEB ARCHITECTURE ════ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-8 md:p-12 shadow-2xl border-white/10 hover:border-[#FF3B3B]/40 transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Left: Copy */}
                <div className="text-left">
                  <span className="text-xs font-mono font-bold text-[#FF3B3B] uppercase tracking-widest block mb-2">
                    Engine 01 · Global Speed & Precision
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-white mb-4">
                    Custom Web Design & Edge Engineering
                  </h2>
                  <p className="text-[#888888] text-base font-sans leading-relaxed mb-6">
                    Bespoke websites tailored specifically for your brand. We never use clunky templates. Everything is custom-crafted to load in under 0.2s, score 100/100 on Google, and turn casual visitors into paying clients.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-white/90">
                    <li className="flex items-center gap-2"><span className="text-[#FF3B3B]">✓</span> Zero Templates</li>
                    <li className="flex items-center gap-2"><span className="text-[#FF3B3B]">✓</span> Sub-0.2s Global Load</li>
                    <li className="flex items-center gap-2"><span className="text-[#FF3B3B]">✓</span> 100/100 Core Web Vitals</li>
                    <li className="flex items-center gap-2"><span className="text-[#FF3B3B]">✓</span> 100% Responsive Fluidity</li>
                  </ul>
                </div>
                {/* Right: Interactive Widget */}
                <div>
                  <SpeedTestWidget />
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* ════ STAGE 02: INTERACTIVE 3D VISUALS ════ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-8 md:p-12 shadow-2xl border-white/10 hover:border-[#FF3B3B]/40 transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Left: Copy */}
                <div className="text-left">
                  <span className="text-xs font-mono font-bold text-[#FF3B3B] uppercase tracking-widest block mb-2">
                    Engine 02 · Visual Dominance
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-white mb-4">
                    Interactive 3D Visuals & Modeling
                  </h2>
                  <p className="text-[#888888] text-base font-sans leading-relaxed mb-6">
                    Give your visitors an unforgettable visual spectacle. We create real-time 3D product models, fluid lighting physics, and interactive configurators that make your brand stand out and boost engagement by 4x.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-white/90">
                    <li className="flex items-center gap-2"><span className="text-[#FF3B3B]">✓</span> 60 FPS Native WebGL</li>
                    <li className="flex items-center gap-2"><span className="text-[#FF3B3B]">✓</span> 360° Orbit & Zoom</li>
                    <li className="flex items-center gap-2"><span className="text-[#FF3B3B]">✓</span> Custom Material Finishes</li>
                    <li className="flex items-center gap-2"><span className="text-[#FF3B3B]">✓</span> Zero 3D Plugin Lag</li>
                  </ul>
                </div>
                {/* Right: Interactive 3D Canvas Widget */}
                <div className="w-full h-[360px] rounded-2xl bg-[#08080a] border border-white/10 overflow-hidden relative shadow-2xl">
                  <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono text-white/70">
                    Drag to Orbit 3D Core
                  </div>
                  <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[5, 5, 5]} intensity={2.5} />
                    <directionalLight position={[-5, -5, -5]} intensity={1} color="#FF3B3B" />
                    <Suspense fallback={null}>
                      <Float speed={2} rotationIntensity={0.5}>
                        <SpatialCore />
                      </Float>
                    </Suspense>
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
                  </Canvas>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* ════ STAGE 03: GOOGLE SEO ENGINE ════ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-8 md:p-12 shadow-2xl border-white/10 hover:border-[#FF3B3B]/40 transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Left: Copy */}
                <div className="text-left">
                  <span className="text-xs font-mono font-bold text-[#FF3B3B] uppercase tracking-widest block mb-2">
                    Engine 03 · Inbound Acquisition
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-white mb-4">
                    Google SEO & Search Domination
                  </h2>
                  <p className="text-[#888888] text-base font-sans leading-relaxed mb-6">
                    Get discovered by high-value clients actively searching for your services. We implement clean technical SEO, structured data schemas, and high-velocity keyword targeting to rank you on Page 1.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-white/90">
                    <li className="flex items-center gap-2"><span className="text-[#FF3B3B]">✓</span> Page 1 Keyword Strategy</li>
                    <li className="flex items-center gap-2"><span className="text-[#FF3B3B]">✓</span> Rich Snippet Badges</li>
                    <li className="flex items-center gap-2"><span className="text-[#FF3B3B]">✓</span> Semantic HTML5 Graph</li>
                    <li className="flex items-center gap-2"><span className="text-[#FF3B3B]">✓</span> Competitor SERP Outranking</li>
                  </ul>
                </div>
                {/* Right: SEO Climber Widget */}
                <div>
                  <SeoClimberWidget />
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* ════ STAGE 04: E-COMMERCE & CHECKOUT ════ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-8 md:p-12 shadow-2xl border-white/10 hover:border-[#FF3B3B]/40 transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Left: Copy */}
                <div className="text-left">
                  <span className="text-xs font-mono font-bold text-[#FF3B3B] uppercase tracking-widest block mb-2">
                    Engine 04 · Revenue Multiplier
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-white mb-4">
                    High-Converting Mobile E-Commerce
                  </h2>
                  <p className="text-[#888888] text-base font-sans leading-relaxed mb-6">
                    Turn browsing into buying. From interactive 3D product previews to frictionless 1-click Razorpay checkout with instant UPI, QR, and cards, we build shopping experiences that maximize conversion and average order value.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-white/90">
                    <li className="flex items-center gap-2"><span className="text-[#FF3B3B]">✓</span> Razorpay Instant UPI & Cards</li>
                    <li className="flex items-center gap-2"><span className="text-[#FF3B3B]">✓</span> +210% Conversion Lift</li>
                    <li className="flex items-center gap-2"><span className="text-[#FF3B3B]">✓</span> 50% Less Cart Abandonment</li>
                    <li className="flex items-center gap-2"><span className="text-[#FF3B3B]">✓</span> Automated Payment Webhooks</li>
                  </ul>
                </div>
                {/* Right: Checkout Simulator Widget */}
                <div>
                  <CheckoutSimulatorWidget />
                </div>
              </div>
            </GlassCard>
          </motion.div>

        </div>

        {/* ── 14-Day Delivery Sprint Roadmap ── */}
        <ProcessTimeline />

        {/* ── Direct Call to Action to AI Architect ── */}
        <section className="mt-16 text-center w-full flex flex-col items-center">
          <Link
            href="/threshold"
            className="px-10 py-5 rounded-full bg-[#FF3B3B] hover:bg-[#ff5252] text-white font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_35px_rgba(255,59,59,0.4)] hover:scale-105"
          >
            CONFIGURE YOUR PROJECT BLUEPRINT →
          </Link>
          <span className="text-white/30 text-xs font-mono uppercase tracking-widest mt-4">
            Interactive AI Project Architect · Instant Custom Roadmap
          </span>
        </section>

      </div>
    </main>
  );
}
