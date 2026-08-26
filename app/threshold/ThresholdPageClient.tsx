"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";

// ── Field definitions ──────────────────────────────────────────────────────

const FIELDS = [
  {
    id: "name",
    label: "01. Your Name",
    type: "text",
    placeholder: "Jane Doe",
    tag: "input",
  },
  {
    id: "company",
    label: "02. Business / Brand Name",
    type: "text",
    placeholder: "Acme Brand",
    tag: "input",
  },
  {
    id: "email",
    label: "03. Your Email Address",
    type: "email",
    placeholder: "jane@acme.com",
    tag: "input",
  },
  {
    id: "challenge",
    label: "04. Tell Us About Your Project & Goals",
    type: "text",
    placeholder: "We want a sleek new website with 3D product visuals and better Google rankings...",
    tag: "textarea",
  },
] as const;

const SELECT_OPTIONS = {
  budget: [
    { value: "", label: "Select estimated budget" },
    { value: "under-5k", label: "< $5,000" },
    { value: "5-15k", label: "$5,000 – $15,000" },
    { value: "15-35k", label: "$15,000 – $35,000" },
    { value: "35k+", label: "$35,000+" },
  ],
  timeline: [
    { value: "", label: "Select desired timeline" },
    { value: "asap", label: "As Soon As Possible" },
    { value: "under-1m", label: "Within 1 Month" },
    { value: "1-3m", label: "1 – 3 Months" },
    { value: "flexible", label: "Flexible Timeline" },
  ],
};

// ── Component ─────────────────────────────────────────────────────────────

export function ThresholdPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    challenge: "",
    budget: "",
    timeline: "",
    objective: "website",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isHoveringSubmit, setIsHoveringSubmit] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main className="w-full min-h-screen pt-28 pb-20 px-6 flex items-start justify-center relative overflow-hidden">
      {/* Ambient red pulse behind form */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 60%, rgba(255,59,59,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-2xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                transition={{ duration: 0.5 }}
              >
                {/* Header above card */}
                <motion.div
                  className="mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <p className="text-[#FF3B3B] text-xs tracking-[0.3em] uppercase font-mono mb-4">
                    ◆ START YOUR PROJECT
                  </p>
                  <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white leading-none">
                    LET&apos;S BUILD
                    <br />
                    <span className="text-clip-gradient">SOMETHING GREAT</span>
                    <span className="text-[#FF3B3B]">.</span>
                  </h1>
                  <p className="text-[#888888] text-base mt-4 font-sans leading-relaxed">
                    Tell us about your project goals. We&apos;ll review your details and reach out within 24 hours with a custom plan.
                  </p>
                </motion.div>

                <GlassCard
                  className={`w-full relative transition-shadow duration-700 ${
                    focusedField
                      ? "shadow-[0_0_60px_rgba(255,59,59,0.07)]"
                      : "shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                  }`}
                >
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-8 md:gap-14"
                  >
                    {/* ── Objective Selection ── */}
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="text-xs text-white/40 tracking-[0.2em] uppercase font-mono mb-4">
                        00. What type of project do you need?
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { id: "website", label: "Custom Website" },
                          { id: "ecommerce", label: "E-Commerce Store" },
                          { id: "3d", label: "3D Visuals & Modeling" },
                          { id: "seo", label: "Google SEO Growth" }
                        ].map((obj) => {
                          const isActive = formData.objective === obj.id;
                          return (
                            <button
                              key={obj.id}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, objective: obj.id }))}
                              className={`px-4 py-4 rounded-xl border transition-all duration-300 relative overflow-hidden group flex items-center justify-center ${
                                isActive 
                                  ? "bg-[#FF3B3B]/10 border-[#FF3B3B]/60 shadow-[0_0_20px_rgba(255,59,59,0.15)]" 
                                  : "bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.05]"
                              }`}
                            >
                              <span className={`text-xs md:text-sm tracking-wider uppercase font-bold relative z-10 transition-colors duration-300 text-center ${
                                isActive ? "text-[#FF3B3B]" : "text-white/60 group-hover:text-white"
                              }`}>
                                {obj.label}
                              </span>
                              {isActive && (
                                <motion.div 
                                  className="absolute inset-0 bg-gradient-to-t from-[#FF3B3B]/15 to-transparent pointer-events-none"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>

                    {/* ── Text / Textarea fields ── */}
                    {FIELDS.map((field, i) => (
                      <motion.div
                        key={field.id}
                        className="relative group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.35 + i * 0.08,
                          duration: 0.7,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        {field.tag === "textarea" ? (
                          <textarea
                            id={field.id}
                            name={field.id}
                            required
                            rows={2}
                            value={formData[field.id as keyof typeof formData]}
                            onChange={handleChange}
                            onFocus={() => setFocusedField(field.id)}
                            onBlur={() => setFocusedField(null)}
                            placeholder={field.placeholder}
                            className="w-full bg-transparent border-b border-white/10 py-4 text-2xl md:text-3xl text-white placeholder-transparent focus:outline-none focus:border-[#FF3B3B] transition-colors duration-500 resize-none rounded-none peer"
                          />
                        ) : (
                          <input
                            id={field.id}
                            name={field.id}
                            type={field.type}
                            required
                            value={formData[field.id as keyof typeof formData]}
                            onChange={handleChange}
                            onFocus={() => setFocusedField(field.id)}
                            onBlur={() => setFocusedField(null)}
                            placeholder={field.placeholder}
                            autoComplete="off"
                            className="w-full bg-transparent border-b border-white/10 py-4 text-2xl md:text-3xl text-white placeholder-transparent focus:outline-none focus:border-[#FF3B3B] transition-colors duration-500 rounded-none peer"
                          />
                        )}
                        <label
                          htmlFor={field.id}
                          className="absolute left-0 top-4 text-white/40 text-xl transition-all duration-500 peer-focus:-translate-y-8 peer-focus:text-sm peer-focus:text-[#FF3B3B] peer-focus:tracking-widest peer-focus:uppercase peer-valid:-translate-y-8 peer-valid:text-sm peer-valid:text-white/30 peer-valid:tracking-widest peer-valid:uppercase pointer-events-none"
                        >
                          {field.label}
                        </label>

                        {/* Active field accent line */}
                        <motion.div
                          className="absolute bottom-0 left-0 h-px bg-[#FF3B3B]"
                          initial={{ width: "0%" }}
                          animate={{
                            width: focusedField === field.id ? "100%" : "0%",
                          }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      </motion.div>
                    ))}

                    {/* ── Select dropdowns ── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                      {(
                        [
                          {
                            id: "budget",
                            label: "05. Budget Range",
                            options: SELECT_OPTIONS.budget,
                          },
                          {
                            id: "timeline",
                            label: "06. Timeline",
                            options: SELECT_OPTIONS.timeline,
                          },
                        ] as const
                      ).map((sel, i) => (
                        <motion.div
                          key={sel.id}
                          className="relative"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.67 + i * 0.08,
                            duration: 0.7,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <p className="text-xs text-white/30 tracking-[0.3em] uppercase font-mono mb-3">
                            {sel.label}
                          </p>
                          <div className="relative">
                            <select
                              name={sel.id}
                              id={sel.id}
                              value={
                                formData[sel.id as keyof typeof formData]
                              }
                              onChange={handleChange}
                              onFocus={() => setFocusedField(sel.id)}
                              onBlur={() => setFocusedField(null)}
                              className="w-full bg-transparent border-b border-white/10 py-3 text-white/70 text-lg focus:outline-none focus:border-[#FF3B3B] transition-colors duration-500 appearance-none rounded-none"
                              style={{
                                background: "transparent",
                                colorScheme: "dark",
                              }}
                            >
                              {sel.options.map((opt) => (
                                <option
                                  key={opt.value}
                                  value={opt.value}
                                  className="bg-[#0A0A0A] text-white"
                                >
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            {/* Chevron */}
                            <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M4 6L8 10L12 6"
                                  stroke={
                                    focusedField === sel.id
                                      ? "#FF3B3B"
                                      : "rgba(255,255,255,0.3)"
                                  }
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            {/* Active accent line */}
                            <motion.div
                              className="absolute bottom-0 left-0 h-px bg-[#FF3B3B]"
                              initial={{ width: "0%" }}
                              animate={{
                                width:
                                  focusedField === sel.id ? "100%" : "0%",
                              }}
                              transition={{ duration: 0.4, ease: "easeOut" }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* ── Submit button ── */}
                    <motion.div
                      className="mt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.85,
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <motion.button
                        type="submit"
                        onHoverStart={() => setIsHoveringSubmit(true)}
                        onHoverEnd={() => setIsHoveringSubmit(false)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative w-full overflow-hidden group"
                        style={{
                          background: "transparent",
                          border: "none",
                          padding: 0,
                        }}
                      >
                        {/* Button body */}
                        <div className="relative w-full flex items-center justify-between px-10 py-8 border border-[#FF3B3B]/60 overflow-hidden">
                          {/* Fill animation */}
                          <motion.div
                            className="absolute inset-0 bg-[#FF3B3B]"
                            initial={{ x: "-101%" }}
                            animate={{
                              x: isHoveringSubmit ? "0%" : "-101%",
                            }}
                            transition={{
                              duration: 0.5,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          />

                          <span className="relative z-10 text-xl md:text-2xl font-black uppercase tracking-tight text-white transition-colors duration-300">
                            SEND PROJECT INQUIRY
                          </span>

                          {/* Animated arrow */}
                          <motion.span
                            className="relative z-10 text-[#FF3B3B] group-hover:text-white transition-colors duration-300"
                            animate={{
                              x: isHoveringSubmit ? 8 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <svg
                              width="32"
                              height="32"
                              viewBox="0 0 32 32"
                              fill="none"
                            >
                              <path
                                d="M6 16H26M26 16L18 8M26 16L18 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </motion.span>
                        </div>

                        {/* Glow below button */}
                        <motion.div
                          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-[#FF3B3B] blur-xl"
                          animate={{ opacity: isHoveringSubmit ? 0.25 : 0 }}
                          transition={{ duration: 0.4 }}
                        />
                      </motion.button>

                      <p className="text-center text-white/40 text-xs mt-4 tracking-wider uppercase font-mono">
                        No obligations · Fast response within 24 hours
                      </p>
                    </motion.div>
                  </form>
                </GlassCard>
              </motion.div>
            ) : (
              /* ── Success State ────────────────────────────────────────── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <GlassCard className="text-center py-20 px-8 flex flex-col items-center shadow-[0_0_80px_rgba(255,59,59,0.08)]">
                  {/* Animated check */}
                  <motion.div
                    className="w-20 h-20 rounded-full border border-[#FF3B3B]/50 bg-[#FF3B3B]/5 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(255,59,59,0.2)]"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      stroke="#FF3B3B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 16 13 23 26 9" />
                    </svg>
                  </motion.div>

                  <motion.p
                    className="text-[#FF3B3B] text-xs tracking-[0.3em] uppercase font-mono mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    ◆ Message Received
                  </motion.p>

                  <motion.h2
                    className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-6 leading-none"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    THANK YOU<span className="text-[#FF3B3B]">.</span>
                  </motion.h2>

                  <motion.p
                    className="text-white/60 text-base max-w-md mx-auto mb-10 leading-relaxed font-sans"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.65 }}
                  >
                    We&apos;ve received your project inquiry. Our team will review your requirements and reach out within 24 hours to schedule a quick discovery call.
                  </motion.p>

                  <motion.a
                    href="/"
                    className="text-xs tracking-widest uppercase font-mono text-white/50 hover:text-[#FF3B3B] transition-colors duration-300 border-b border-white/10 hover:border-[#FF3B3B]/50 pb-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    ← Return to Homepage
                  </motion.a>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
