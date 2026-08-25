import type { CommerceModule } from "@/types/commerce";

export const MODULES: CommerceModule[] = [
  // ─── Foundation ─────────────────────────────────────────────────────────────
  {
    id: "foundation-discovery",
    name: "Discovery & Architecture",
    description:
      "Structured intake sessions, competitive analysis, and system architecture definition. The prerequisite for everything else.",
    category: "foundation",
    basePrice: 8000,
    complexity: 1,
    dependencies: [],
    outputs: [
      "Architecture document",
      "Competitive landscape analysis",
      "Technical requirements specification",
      "Sitemap & IA definition",
    ],
    qualifyThreshold: 0,
    duration: 10,
  },
  {
    id: "foundation-design-system",
    name: "Design System",
    description:
      "A complete, documented component library with design tokens, typography scale, and interaction patterns.",
    category: "foundation",
    basePrice: 15000,
    complexity: 2,
    dependencies: ["foundation-discovery"],
    outputs: [
      "Design token system",
      "Component library (Figma + code)",
      "Typography and color system",
      "Interaction pattern documentation",
    ],
    qualifyThreshold: 20,
    duration: 21,
  },
  {
    id: "foundation-brand-language",
    name: "Brand Language",
    description:
      "Visual identity definition: mark, wordmark, motion language, and brand application guidelines.",
    category: "foundation",
    basePrice: 20000,
    complexity: 2,
    dependencies: ["foundation-discovery"],
    outputs: [
      "Logomark & wordmark",
      "Color system",
      "Typography selection",
      "Motion & interaction language",
      "Brand guidelines document",
    ],
    qualifyThreshold: 30,
    duration: 28,
  },

  // ─── Systems ─────────────────────────────────────────────────────────────────
  {
    id: "systems-web-platform",
    name: "Web Platform",
    description:
      "Full-stack web application built on Next.js with performance-first architecture. Target: >95 Lighthouse.",
    category: "systems",
    basePrice: 35000,
    complexity: 3,
    dependencies: ["foundation-design-system"],
    outputs: [
      "Next.js application (App Router)",
      "CMS integration",
      "API layer",
      ">95 Lighthouse score",
      "Deployment pipeline",
    ],
    qualifyThreshold: 50,
    duration: 42,
  },
  {
    id: "systems-commerce",
    name: "Commerce Engine™",
    description:
      "Modular e-commerce or lead qualification infrastructure. Composable service modules, not monolithic platforms.",
    category: "systems",
    basePrice: 28000,
    complexity: 3,
    dependencies: ["systems-web-platform"],
    outputs: [
      "Commerce module system",
      "Client qualification API",
      "Payment integration",
      "Order management interface",
    ],
    qualifyThreshold: 60,
    duration: 35,
  },
  {
    id: "systems-infrastructure",
    name: "Infrastructure & DevOps",
    description:
      "CI/CD pipeline, edge deployment, monitoring, and error tracking. The systems that run the systems.",
    category: "systems",
    basePrice: 12000,
    complexity: 2,
    dependencies: [],
    outputs: [
      "CI/CD pipeline (GitHub Actions)",
      "Edge deployment configuration",
      "Error tracking (Sentry)",
      "Performance monitoring",
      "Staging environment",
    ],
    qualifyThreshold: 40,
    duration: 14,
  },

  // ─── Evidence ────────────────────────────────────────────────────────────────
  {
    id: "evidence-case-study",
    name: "Evidence Documentation",
    description:
      "Measurable outcome documentation. We record what we built, what changed, and what the numbers say.",
    category: "evidence",
    basePrice: 5000,
    complexity: 1,
    dependencies: [],
    outputs: [
      "Quantified outcome report",
      "Architectural decision log",
      "Before/after performance metrics",
      "Client-publishable case study",
    ],
    qualifyThreshold: 0,
    duration: 7,
  },

  // ─── Growth ──────────────────────────────────────────────────────────────────
  {
    id: "growth-retainer",
    name: "Ongoing Systems Retainer",
    description:
      "Monthly engagement for continuous improvement — performance audits, feature additions, and architectural evolution.",
    category: "growth",
    basePrice: 8000,
    complexity: 1,
    dependencies: ["systems-web-platform"],
    outputs: [
      "Monthly performance audit",
      "Up to 40 hours development",
      "Priority response",
      "Quarterly strategy session",
    ],
    qualifyThreshold: 60,
    duration: 30,
  },
];

/** Get all available module categories */
export function getModuleCategories(): string[] {
  return [...new Set(MODULES.map((m) => m.category))];
}

/** Get modules available at a given qualify score */
export function getAvailableModules(qualifyScore: number): CommerceModule[] {
  return MODULES.filter((m) => qualifyScore >= m.qualifyThreshold);
}

/** Get a module by ID */
export function getModuleById(id: string): CommerceModule | undefined {
  return MODULES.find((m) => m.id === id);
}

/** Resolve all dependencies for a set of selected module IDs */
export function resolveDependencies(selectedIds: string[]): string[] {
  const resolved = new Set<string>(selectedIds);

  function resolve(id: string) {
    const mod = getModuleById(id);
    if (!mod) return;
    mod.dependencies.forEach((dep) => {
      if (!resolved.has(dep)) {
        resolved.add(dep);
        resolve(dep);
      }
    });
  }

  selectedIds.forEach(resolve);
  return [...resolved];
}
