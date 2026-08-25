import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ground: "#0A0A0A",
        surface: "#111111",
        border: "#1E1E1E",
        muted: "#404040",
        primary: "#E8E8E8",
        void: "#FFFFFF",
        signal: "#FF3B3B",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        display: ["clamp(72px,12vw,180px)", { lineHeight: "0.92", letterSpacing: "-0.04em" }],
        heading: ["clamp(32px,5vw,72px)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        subheading: ["clamp(20px,2.5vw,36px)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        label: ["11px", { lineHeight: "1", letterSpacing: "0.15em" }],
        body: ["16px", { lineHeight: "1.65", letterSpacing: "-0.01em" }],
        mono: ["14px", { lineHeight: "1.5", letterSpacing: "0" }],
      },
      spacing: {
        gutter: "clamp(16px,3vw,48px)",
        section: "clamp(80px,12vw,180px)",
      },
      gridTemplateColumns: {
        "12": "repeat(12, minmax(0, 1fr))",
      },
      transitionTimingFunction: {
        "precision": "cubic-bezier(0.16, 1, 0.3, 1)",
        "mechanical": "cubic-bezier(0.4, 0, 0.6, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "cursor-idle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "cursor-idle": "cursor-idle 3s ease-in-out infinite",
      },
      backgroundImage: {
        "grid-hairline": `linear-gradient(to right, #1E1E1E 1px, transparent 1px),
          linear-gradient(to bottom, #1E1E1E 1px, transparent 1px)`,
      },
      backgroundSize: {
        "grid-8": "8px 8px",
      },
    },
  },
  plugins: [],
};

export default config;
