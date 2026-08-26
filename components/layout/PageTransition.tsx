"use client";

import { motion } from "framer-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  // Slower, more dramatic easing
  const duration = 1.5;
  const easing: [number, number, number, number] = [0.83, 0, 0.17, 1];

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[100] bg-[#FF3B3B] pointer-events-none origin-bottom"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration, ease: easing }}
      />
      <motion.div
        className="fixed inset-0 z-[99] bg-black pointer-events-none origin-bottom"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration, ease: easing, delay: 0.15 }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </>
  );
}
