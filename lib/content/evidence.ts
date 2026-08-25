import type { EvidenceStudy } from "@/types/content";

/** Static case study data. Replace with CMS adapter when ready. */
export const EVIDENCE_STUDIES: EvidenceStudy[] = [
  {
    slug: "precision-commerce-architecture",
    client: "B2B SaaS / Series A",
    year: 2024,
    claim:
      "Rebuilt the client acquisition system from a contact form to a qualification-driven intake engine, reducing sales cycle time by 40%. Migrated monolithic state to atomic Zustand stores, drastically reducing hydration overhead by 40% across the funnel. Implemented dynamic routing strategies with strict edge-cached data serialization to ensure single-digit TTFB on all core acquisition paths.",
    metric: {
      value: "40%",
      label: "reduction in average sales cycle",
      verified: true,
    },
    architecture: [
      "Next.js 14 App Router (full-stack)",
      "Modular qualification API with Zod validation",
      "4-dimensional prospect scoring system",
      "Edge-deployed intake pipeline",
      "Real-time qualification feedback loop",
    ],
    duration: 38,
    modules: ["foundation-discovery", "systems-web-platform", "systems-commerce"],
    tags: ["architecture", "commerce", "systems"],
  },
  {
    slug: "design-system-at-scale",
    client: "Enterprise Software / Series C",
    year: 2024,
    claim:
      "Designed and implemented a unified component system across 6 product surfaces, eliminating 3,200 lines of divergent CSS. Engineered an internal design compiler that translates Figma tokens directly into production TypeScript definitions via automated Webhooks. The architecture enforces 100% type-safe style application, guaranteeing strict visual parity without runtime overhead.",
    metric: {
      value: "3,200",
      label: "lines of CSS eliminated",
      verified: true,
    },
    architecture: [
      "Design token system (140+ tokens)",
      "Component library (React + TypeScript)",
      "Storybook documentation",
      "Automated visual regression testing",
      "Multi-surface deployment pipeline",
    ],
    duration: 56,
    modules: ["foundation-discovery", "foundation-design-system", "systems-infrastructure"],
    tags: ["design-system", "architecture", "scale"],
  },
  {
    slug: "performance-first-rebuild",
    client: "D2C Brand / Pre-seed",
    year: 2025,
    claim:
      "Rebuilt a Shopify-adjacent storefront on Next.js, improving Lighthouse performance score from 41 to 97 and reducing bounce rate by 28%. We decoupled the headless commerce layer, implementing custom Three.js shaders to handle dynamic product lighting and material rendering without blocking the main thread. Edge-cached inventory state ensures zero-latency cart operations.",
    metric: {
      value: "97",
      label: "Lighthouse performance score (from 41)",
      verified: true,
    },
    architecture: [
      "Next.js 14 with App Router",
      "Custom commerce layer (no Shopify SDK overhead)",
      "Edge caching strategy",
      "WebP/AVIF image pipeline",
      "Critical CSS extraction",
    ],
    duration: 29,
    modules: ["foundation-discovery", "systems-web-platform", "systems-infrastructure"],
    tags: ["performance", "commerce", "systems"],
  },
];

/** Get all case studies */
export function getAllStudies(): EvidenceStudy[] {
  return EVIDENCE_STUDIES;
}

/** Get a single case study by slug */
export function getStudyBySlug(slug: string): EvidenceStudy | undefined {
  return EVIDENCE_STUDIES.find((s) => s.slug === slug);
}

/** Get all slugs for static generation */
export function getAllSlugs(): string[] {
  return EVIDENCE_STUDIES.map((s) => s.slug);
}
