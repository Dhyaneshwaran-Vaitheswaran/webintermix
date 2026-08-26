"use client";

import { useState, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, ContactShadows } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { GlassCard } from "@/components/ui/GlassCard";

// ── COLOR THEMES ─────────────────────────────────────────────────────────────
const COLOR_THEMES = [
  { id: "crimson", name: "Ruby Crimson", primary: "#FF3B3B", secondary: "#140303", metal: "#330808", glow: "#ff4d4d" },
  { id: "obsidian", name: "Matte Obsidian", primary: "#26262a", secondary: "#0d0d0f", metal: "#1f1f23", glow: "#52525b" },
  { id: "platinum", name: "Polished Platinum", primary: "#f1f5f9", secondary: "#1e293b", metal: "#94a3b8", glow: "#ffffff" },
  { id: "gold", name: "Cyber Gold", primary: "#f59e0b", secondary: "#1a1202", metal: "#78350f", glow: "#fbbf24" },
];

// ── HIGH-FIDELITY 3D MODELS ──────────────────────────────────────────────────

/**
 * 1. Precision Chronograph Luxury Timepiece
 * Featuring: fluted bezel, dial hour markers, sub-dials, animated sweeping second hand,
 * sapphire crystal lens, pushers, and segmented metal bracelet.
 */
function ChronographWatch({ theme, wireframe }: { theme: typeof COLOR_THEMES[0]; wireframe: boolean }) {
  const group = useRef<THREE.Group>(null);
  const secondHand = useRef<THREE.Mesh>(null);
  const subDialHand = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.25;
    }
    if (secondHand.current) {
      secondHand.current.rotation.z -= delta * 3.5;
    }
    if (subDialHand.current) {
      subDialHand.current.rotation.z -= delta * 1.5;
    }
  });

  // Hour markers around dial
  const hourMarkers = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * Math.PI) / 6;
      const radius = 0.72;
      return {
        x: Math.sin(angle) * radius,
        y: Math.cos(angle) * radius,
        angle: -angle,
      };
    });
  }, []);

  return (
    <group ref={group} scale={1.25} position={[0, 0, 0]} rotation={[0.4, 0, 0]}>
      {/* Outer Fluted Case Bezel */}
      <mesh>
        <cylinderGeometry args={[1.15, 1.18, 0.26, 64]} />
        <meshStandardMaterial
          color={theme.primary}
          metalness={0.95}
          roughness={0.15}
          wireframe={wireframe}
        />
      </mesh>

      {/* Inner Chamfered Bezel Ring */}
      <mesh position={[0, 0.08, 0]}>
        <torusGeometry args={[0.95, 0.07, 16, 64]} />
        <meshStandardMaterial color={theme.metal} metalness={0.9} roughness={0.1} wireframe={wireframe} />
      </mesh>

      {/* Sunburst Dial Face */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.02, 64]} />
        <meshStandardMaterial color={theme.secondary} roughness={0.7} metalness={0.4} wireframe={wireframe} />
      </mesh>

      {/* 12 Applied Dial Indices */}
      {hourMarkers.map((marker, i) => (
        <mesh key={i} position={[marker.x, 0.135, marker.y]} rotation={[0, marker.angle, 0]}>
          <boxGeometry args={[0.04, 0.015, 0.12]} />
          <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} wireframe={wireframe} />
        </mesh>
      ))}

      {/* Dual Sub-Dials */}
      <mesh position={[-0.35, 0.13, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.01, 32]} />
        <meshStandardMaterial color="#050505" roughness={0.9} wireframe={wireframe} />
      </mesh>
      <mesh position={[0.35, 0.13, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.01, 32]} />
        <meshStandardMaterial color="#050505" roughness={0.9} wireframe={wireframe} />
      </mesh>

      {/* Sub-Dial Hand */}
      <mesh ref={subDialHand} position={[-0.35, 0.145, 0]}>
        <boxGeometry args={[0.02, 0.15, 0.005]} />
        <meshStandardMaterial color={theme.glow} emissive={theme.glow} emissiveIntensity={0.8} wireframe={wireframe} />
      </mesh>

      {/* Main Hour Hand */}
      <mesh position={[0, 0.14, 0]} rotation={[0, 0, -0.8]}>
        <boxGeometry args={[0.06, 0.5, 0.01]} />
        <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.2} wireframe={wireframe} />
      </mesh>

      {/* Main Minute Hand */}
      <mesh position={[0, 0.145, 0]} rotation={[0, 0, 1.4]}>
        <boxGeometry args={[0.045, 0.7, 0.01]} />
        <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.2} wireframe={wireframe} />
      </mesh>

      {/* Sweeping Chrono Second Hand */}
      <mesh ref={secondHand} position={[0, 0.155, 0]}>
        <boxGeometry args={[0.02, 0.85, 0.005]} />
        <meshStandardMaterial color={theme.glow} emissive={theme.glow} emissiveIntensity={0.9} wireframe={wireframe} />
      </mesh>

      {/* Center Pinion */}
      <mesh position={[0, 0.165, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
        <meshStandardMaterial color={theme.glow} metalness={0.9} roughness={0.1} wireframe={wireframe} />
      </mesh>

      {/* Sapphire Crystal Glass Lens */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.98, 0.98, 0.04, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.05}
          metalness={0.1}
          transparent={true}
          opacity={0.3}
          wireframe={wireframe}
        />
      </mesh>

      {/* Crown & Dual Chrono Pushers */}
      <mesh position={[1.25, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.12, 0.2, 16]} />
        <meshStandardMaterial color={theme.primary} metalness={0.9} roughness={0.2} wireframe={wireframe} />
      </mesh>
      <mesh position={[1.15, 0, -0.6]} rotation={[0, 0.5, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 0.18, 16]} />
        <meshStandardMaterial color={theme.metal} metalness={0.9} roughness={0.2} wireframe={wireframe} />
      </mesh>
      <mesh position={[1.15, 0, 0.6]} rotation={[0, -0.5, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 0.18, 16]} />
        <meshStandardMaterial color={theme.metal} metalness={0.9} roughness={0.2} wireframe={wireframe} />
      </mesh>

      {/* Integrated Steel Bracelet Links (Top & Bottom) */}
      {[-1, 1].map((dir, linkIdx) => (
        <group key={linkIdx} position={[0, -0.05, dir * 1.5]} rotation={[dir * 0.35, 0, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.85, 0.18, 0.7]} />
            <meshStandardMaterial color={theme.metal} metalness={0.9} roughness={0.25} wireframe={wireframe} />
          </mesh>
          <mesh position={[0, -0.15, dir * 0.6]} rotation={[dir * 0.4, 0, 0]}>
            <boxGeometry args={[0.75, 0.16, 0.7]} />
            <meshStandardMaterial color={theme.primary} metalness={0.9} roughness={0.25} wireframe={wireframe} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * 2. Aerodynamic Cyber Sneaker
 * Featuring: multi-layer sculpted sole, hollow air pods, heel stabilizer cage,
 * contoured knit upper, and glowing neon energy piping.
 */
function AeroSneaker({ theme, wireframe }: { theme: typeof COLOR_THEMES[0]; wireframe: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={group} scale={1.05} position={[0, -0.2, 0]} rotation={[0.1, 0.4, 0]}>
      {/* Sculpted Outsole Base */}
      <mesh position={[0, -0.65, 0]}>
        <boxGeometry args={[3.4, 0.25, 1.2]} />
        <meshStandardMaterial color="#08080a" roughness={0.9} wireframe={wireframe} />
      </mesh>

      {/* Responsive Midsole with Suspension Dampers */}
      <mesh position={[-0.1, -0.42, 0]}>
        <boxGeometry args={[3.1, 0.28, 1.15]} />
        <meshStandardMaterial color={theme.secondary} roughness={0.6} metalness={0.3} wireframe={wireframe} />
      </mesh>

      {/* 3x Hollowed Air Cushion Pods */}
      {[-0.8, 0, 0.8].map((x, idx) => (
        <mesh key={idx} position={[x, -0.42, 0.58]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.35, 16]} />
          <meshStandardMaterial color={theme.glow} emissive={theme.glow} emissiveIntensity={0.8} wireframe={wireframe} />
        </mesh>
      ))}

      {/* Sculpted Ergonomic Upper Knit */}
      <mesh position={[-0.2, 0.05, 0]}>
        <boxGeometry args={[2.5, 0.75, 1.05]} />
        <meshStandardMaterial color={theme.primary} roughness={0.4} metalness={0.2} wireframe={wireframe} />
      </mesh>

      {/* Aerodynamic Toe Box (Curved Front) */}
      <mesh position={[1.15, -0.12, 0]} rotation={[0, 0, -0.25]}>
        <cylinderGeometry args={[0.52, 0.58, 0.85, 32]} />
        <meshStandardMaterial color={theme.secondary} roughness={0.5} wireframe={wireframe} />
      </mesh>

      {/* Reinforced Heel Support Cage */}
      <mesh position={[-1.25, 0.3, 0]} rotation={[0, 0, 0.15]}>
        <boxGeometry args={[0.7, 0.9, 1.0]} />
        <meshStandardMaterial color={theme.metal} metalness={0.85} roughness={0.2} wireframe={wireframe} />
      </mesh>

      {/* Ankle Collar Opening */}
      <mesh position={[-0.6, 0.65, 0]} rotation={[0, 0, 0.1]}>
        <torusGeometry args={[0.42, 0.1, 16, 32]} />
        <meshStandardMaterial color="#111115" roughness={0.8} wireframe={wireframe} />
      </mesh>

      {/* Glowing Dynamic Lateral Swoop Line */}
      <mesh position={[0, 0.05, 0.58]} rotation={[0, 0, 0.25]}>
        <torusGeometry args={[0.7, 0.05, 16, 32, Math.PI * 0.8]} />
        <meshStandardMaterial color={theme.glow} emissive={theme.glow} emissiveIntensity={0.9} wireframe={wireframe} />
      </mesh>
    </group>
  );
}

/**
 * 3. Modern Ribbon Lounge Chair
 * Featuring: continuous curved tubular chrome frame, ergonomic tufted cushions,
 * polished metallic base, and architectural proportions.
 */
function RibbonChair({ theme, wireframe }: { theme: typeof COLOR_THEMES[0]; wireframe: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={group} scale={1.15} position={[0, -0.3, 0]}>
      {/* Ergonomic Deep Seat Cushion */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[1.25, 1.25, 0.28, 64]} />
        <meshStandardMaterial color={theme.primary} roughness={0.5} metalness={0.15} wireframe={wireframe} />
      </mesh>

      {/* Curved Tufted Backrest */}
      <mesh position={[0, 0.95, -0.85]} rotation={[0.22, 0, 0]}>
        <boxGeometry args={[2.1, 1.4, 0.24]} />
        <meshStandardMaterial color={theme.primary} roughness={0.5} metalness={0.15} wireframe={wireframe} />
      </mesh>

      {/* Decorative Leather Piping Seam */}
      <mesh position={[0, 0.95, -0.72]} rotation={[0.22, 0, 0]}>
        <boxGeometry args={[2.15, 0.04, 0.04]} />
        <meshStandardMaterial color={theme.glow} emissive={theme.glow} emissiveIntensity={0.5} wireframe={wireframe} />
      </mesh>

      {/* Continuous Chrome Tubular Support Armatures */}
      {[-1.15, 1.15].map((x, i) => (
        <mesh key={i} position={[x, 0.45, -0.3]} rotation={[0.3, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1.6, 24]} />
          <meshStandardMaterial color="#ffffff" metalness={0.98} roughness={0.05} wireframe={wireframe} />
        </mesh>
      ))}

      {/* Central Rotating Pedestal Column */}
      <mesh position={[0, -0.45, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.75, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.98} roughness={0.05} wireframe={wireframe} />
      </mesh>

      {/* 4-Star Architectural Chrome Base */}
      {[0, Math.PI / 2].map((rot, idx) => (
        <mesh key={idx} position={[0, -0.82, 0]} rotation={[0, rot + Math.PI / 4, 0]}>
          <boxGeometry args={[2.4, 0.06, 0.18]} />
          <meshStandardMaterial color="#ffffff" metalness={0.98} roughness={0.05} wireframe={wireframe} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * 4. Spatial Acoustic Headset
 * Featuring: CNC chamfered aluminum earcups, glowing acoustic driver halo,
 * memory foam ear pads, and dual-rod suspension headband.
 */
function SpatialHeadset({ theme, wireframe }: { theme: typeof COLOR_THEMES[0]; wireframe: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={group} scale={1.25} position={[0, 0, 0]} rotation={[0.2, 0.3, 0]}>
      {/* Dual Steel Arch Headband */}
      <mesh position={[0, 0.55, 0]}>
        <torusGeometry args={[1.15, 0.06, 16, 64, Math.PI]} />
        <meshStandardMaterial color="#ffffff" metalness={0.95} roughness={0.1} wireframe={wireframe} />
      </mesh>

      {/* Inner Woven Tension Mesh Band */}
      <mesh position={[0, 0.45, 0]}>
        <torusGeometry args={[1.05, 0.04, 16, 64, Math.PI * 0.9]} />
        <meshStandardMaterial color="#111" roughness={0.9} wireframe={wireframe} />
      </mesh>

      {/* Left & Right Earcups */}
      {[-1, 1].map((dir, i) => (
        <group key={i} position={[dir * 1.2, -0.1, 0]} rotation={[0, 0, dir * (Math.PI / 2)]}>
          {/* Anodized Outer Aluminum Shell */}
          <mesh>
            <cylinderGeometry args={[0.55, 0.58, 0.38, 64]} />
            <meshStandardMaterial color={theme.primary} metalness={0.9} roughness={0.18} wireframe={wireframe} />
          </mesh>

          {/* Chamfered Mirror-Polished Ring */}
          <mesh position={[0, 0.19, 0]}>
            <torusGeometry args={[0.54, 0.03, 16, 64]} />
            <meshStandardMaterial color="#ffffff" metalness={0.98} roughness={0.05} wireframe={wireframe} />
          </mesh>

          {/* Glowing Magnetic Acoustic Driver Halo */}
          <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.28, 0.45, 32]} />
            <meshStandardMaterial color={theme.glow} emissive={theme.glow} emissiveIntensity={0.9} wireframe={wireframe} />
          </mesh>

          {/* Memory Foam Ear Cushion */}
          <mesh position={[0, -0.22, 0]}>
            <torusGeometry args={[0.42, 0.16, 16, 32]} />
            <meshStandardMaterial color="#141418" roughness={0.95} wireframe={wireframe} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ── CATEGORIES DATA ──────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "watch",
    label: "Chronograph Watch",
    tag: "Luxury Timepiece",
    desc: "Detailed mechanical chronograph with live sweeping second hand, dual sub-dials, and sapphire crystal reflections.",
    metric: "99/100 Mobile Speed"
  },
  {
    id: "sneaker",
    label: "Aero Cyber Sneaker",
    tag: "Footwear & Fashion",
    desc: "Aerodynamic sneaker with suspension air pods, contoured upper mesh, and glowing neon energy lines.",
    metric: "+210% Conversion Rate"
  },
  {
    id: "furniture",
    label: "Ribbon Lounge Chair",
    tag: "Architectural Furniture",
    desc: "Sculptural continuous chrome frame with tufted ergonomic cushions and star pedestal base.",
    metric: "4x Longer Engagement"
  },
  {
    id: "tech",
    label: "Spatial Audio Headset",
    tag: "Hardware & Tech",
    desc: "CNC anodized aluminum earcups, magnetic acoustic halos, and dual-rod suspension headband.",
    metric: "Instant 60 FPS WebGL"
  }
];

// ── MAIN SHOWCASE COMPONENT ──────────────────────────────────────────────────
export function Interactive3DShowcase() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [activeTheme, setActiveTheme] = useState(COLOR_THEMES[0]);
  const [isWireframe, setIsWireframe] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(true);

  const currentCat = CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <section id="3d-showcase" className="w-full py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center text-center">
        
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF3B3B]/30 bg-[#FF3B3B]/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FF3B3B] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#FF3B3B] uppercase">
              Live WebGL 3D Product Visualizer
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-4 select-none max-w-4xl">
            REAL 3D EXPERIENCES <span className="text-[#FF3B3B]">THAT SELL.</span>
          </h2>

          <p className="text-[#888888] text-sm md:text-base max-w-2xl mx-auto select-none font-sans leading-relaxed">
            Don&apos;t just show flat product photos. Give your customers interactive 3D models they can rotate, zoom, and customize live in the browser with zero lag.
          </p>
        </motion.div>

        {/* ── Category Pill Tabs (Centered) ── */}
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 mb-10 w-full max-w-3xl">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-3 rounded-full font-mono text-xs md:text-sm tracking-wider uppercase transition-all duration-300 select-none ${
                  isActive
                    ? "bg-[#FF3B3B] text-white font-bold shadow-[0_0_30px_rgba(255,59,59,0.5)] scale-105"
                    : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ── Centered Full-Stage 3D Viewport ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-4xl"
        >
          <GlassCard className="p-6 md:p-10 relative overflow-hidden flex flex-col items-center shadow-2xl">
            
            {/* 3D Canvas Stage */}
            <div className="w-full h-[400px] md:h-[480px] relative rounded-2xl bg-[#08080a] border border-white/10 overflow-hidden shadow-inner flex items-center justify-center">
              
              {/* Interaction Hint Overlay */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-lg pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                <span className="text-[10px] md:text-xs font-mono text-white/80 tracking-widest uppercase font-bold">
                  Drag to Rotate 360° · Scroll to Zoom
                </span>
              </div>

              {/* Three.js R3F Canvas */}
              <Canvas camera={{ position: [0, 1.2, 4.2], fov: 45 }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 12, 6]} intensity={3.0} />
                <directionalLight position={[-10, -10, -6]} intensity={1.2} color="#FF3B3B" />
                <pointLight position={[0, 4, 2]} intensity={2.0} color="#ffffff" />
                <pointLight position={[0, -3, -2]} intensity={1.0} color="#FF3B3B" />

                <Suspense fallback={null}>
                  <Float speed={isAutoRotate ? 2 : 0} rotationIntensity={0.3} floatIntensity={0.4}>
                    {activeCategory === "watch" && <ChronographWatch theme={activeTheme} wireframe={isWireframe} />}
                    {activeCategory === "sneaker" && <AeroSneaker theme={activeTheme} wireframe={isWireframe} />}
                    {activeCategory === "furniture" && <RibbonChair theme={activeTheme} wireframe={isWireframe} />}
                    {activeCategory === "tech" && <SpatialHeadset theme={activeTheme} wireframe={isWireframe} />}
                  </Float>
                  <ContactShadows position={[0, -1.3, 0]} opacity={0.65} scale={10} blur={2} far={4} color="#000" />
                </Suspense>

                <OrbitControls enableZoom={true} minDistance={2} maxDistance={6.5} enablePan={false} autoRotate={isAutoRotate} autoRotateSpeed={1.8} />
              </Canvas>
            </div>

            {/* ── Centered Details & Controls Dock ── */}
            <div className="w-full mt-8 flex flex-col items-center text-center">
              
              {/* Metric & Title */}
              <div className="flex flex-col items-center gap-2 mb-4">
                <div className="inline-block bg-[#FF3B3B]/10 border border-[#FF3B3B]/30 px-4 py-1 rounded-full text-xs font-mono font-bold text-[#FF3B3B] uppercase tracking-widest">
                  {currentCat.metric}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white">
                  {currentCat.label}
                </h3>
                <p className="text-[#888888] text-sm md:text-base max-w-xl font-sans leading-relaxed">
                  {currentCat.desc}
                </p>
              </div>

              {/* Material Finish Swatches (Centered) */}
              <div className="flex flex-col items-center mb-8">
                <span className="text-xs font-mono uppercase tracking-widest text-white/50 mb-3">
                  Material Finish: <strong className="text-white">{activeTheme.name}</strong>
                </span>
                <div className="flex gap-4">
                  {COLOR_THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setActiveTheme(theme)}
                      style={{ backgroundColor: theme.primary }}
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                        activeTheme.id === theme.id 
                          ? "scale-125 border-white shadow-[0_0_20px_rgba(255,255,255,0.6)]" 
                          : "border-white/20 opacity-60 hover:opacity-100"
                      }`}
                      title={theme.name}
                    />
                  ))}
                </div>
              </div>

              {/* Interactive Action Controls */}
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <button
                  onClick={() => setIsWireframe(!isWireframe)}
                  className={`px-6 py-3 rounded-full border text-xs font-mono font-bold uppercase tracking-wider transition-all select-none ${
                    isWireframe
                      ? "bg-[#FF3B3B]/20 border-[#FF3B3B] text-[#FF3B3B] shadow-[0_0_20px_rgba(255,59,59,0.3)]"
                      : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {isWireframe ? "Wireframe: ON" : "Wireframe: OFF"}
                </button>

                <button
                  onClick={() => setIsAutoRotate(!isAutoRotate)}
                  className={`px-6 py-3 rounded-full border text-xs font-mono font-bold uppercase tracking-wider transition-all select-none ${
                    isAutoRotate
                      ? "bg-white/20 border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {isAutoRotate ? "360° Spin: ON" : "360° Spin: OFF"}
                </button>
              </div>

              {/* Bottom Feature Pill */}
              <div className="px-6 py-2.5 rounded-full bg-white/[0.03] border border-white/10 inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF3B3B]" />
                <span className="text-xs font-mono text-white/70">
                  Runs natively in WebGL · Zero 3D plugins required · 60 FPS on iOS & Android
                </span>
              </div>

            </div>

          </GlassCard>
        </motion.div>

      </div>
    </section>
  );
}
