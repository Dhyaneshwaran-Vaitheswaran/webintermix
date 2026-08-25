"use client";

import { motion } from "framer-motion";

export function RedAurora() {
  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{
        maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)"
      }}
    >
      {/* Aurora Band 1 */}
      <motion.div
        className="absolute w-[150%] h-[40vh] bg-gradient-to-r from-transparent via-[#FF3B3B]/60 to-transparent mix-blend-screen filter blur-[80px]"
        style={{ top: '10%', left: '-25%', transformOrigin: 'center' }}
        animate={{ 
          rotate: [-10, 5, -10],
          y: [0, 60, 0],
          opacity: [0.4, 0.8, 0.4],
          scaleY: [1, 2, 1],
          skewY: [0, 10, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Aurora Band 2 */}
      <motion.div
        className="absolute w-[150%] h-[30vh] bg-gradient-to-r from-transparent via-[#FF1053]/50 to-transparent mix-blend-screen filter blur-[60px]"
        style={{ top: '30%', left: '-20%', transformOrigin: 'center' }}
        animate={{ 
          rotate: [5, -15, 5],
          y: [0, -80, 0],
          opacity: [0.3, 0.9, 0.3],
          scaleY: [1.2, 0.8, 1.2],
          skewX: [0, -15, 0]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      {/* Aurora Band 3 */}
      <motion.div
        className="absolute w-[120%] h-[50vh] bg-gradient-to-r from-transparent via-[#990000]/60 to-transparent mix-blend-screen filter blur-[90px]"
        style={{ top: '40%', left: '-10%', transformOrigin: 'center' }}
        animate={{ 
          rotate: [-5, 10, -5],
          y: [0, 40, 0],
          opacity: [0.5, 0.2, 0.5],
          scaleX: [1, 1.3, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />

      {/* Subtle background glow */}
      <motion.div
        className="absolute w-[100%] h-[100%] bg-gradient-to-b from-[#FF3B3B]/10 to-transparent mix-blend-screen filter blur-[120px]"
        style={{ top: '0', left: '0' }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
