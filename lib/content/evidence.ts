import type { EvidenceStudy } from "@/types/content";

/** Static case study data. Replace with CMS adapter when ready. */
export const EVIDENCE_STUDIES: EvidenceStudy[] = [
  {
    slug: "precision-commerce-architecture",
    client: "Luxe Atelier (Luxury E-Commerce)",
    year: 2025,
    claim:
      "Replaced a slow, template-driven Shopify storefront with a custom Next.js web application and interactive 3D product visualizer. Visitors can rotate and customize items in real-time, resulting in an immediate 210% increase in checkout completions and a dramatic drop in returns.",
    metric: {
      value: "+210%",
      label: "increase in mobile sales conversions",
      verified: true,
    },
    architecture: [
      "Custom Next.js E-Commerce Storefront",
      "Interactive 3D Product Configurator (WebGL)",
      "1-Click Apple Pay & Google Pay Checkout",
      "Instant Page Load Optimization (< 0.2s)",
      "Automated Inventory & Order Syncing",
    ],
    duration: 28,
    modules: ["custom-web-design", "3d-visuals", "ecommerce"],
    tags: ["e-commerce", "3d-visuals", "conversion"],
  },
  {
    slug: "design-system-at-scale",
    client: "Apex Global (B2B Advisory)",
    year: 2025,
    claim:
      "Engineered a brand-new digital presence and executed an aggressive technical SEO overhaul. Positioned the firm at the top of Google for 18 primary high-value keywords, generating a 400% surge in qualified inbound leads within 90 days of launch.",
    metric: {
      value: "4x",
      label: "more qualified client inquiries via Google",
      verified: true,
    },
    architecture: [
      "High-Converting B2B Web Design",
      "Complete Technical SEO & Keyword Optimization",
      "Interactive Client Strategy Estimator",
      "Automated CRM Lead Routing",
      "Sub-Second Global Cloud Hosting",
    ],
    duration: 35,
    modules: ["web-design", "seo-growth", "lead-capture"],
    tags: ["b2b", "seo", "growth"],
  },
  {
    slug: "performance-first-rebuild",
    client: "Nova Studio (Tech & Studio)",
    year: 2025,
    claim:
      "Built an immersive, cinematic digital portfolio featuring fluid physics and custom motion design. The website captivated prospective enterprise clients, boosting average site visit duration to over 4 minutes and directly contributing to $2.4M in new project contracts.",
    metric: {
      value: "$2.4M",
      label: "in closed client pipeline post-launch",
      verified: true,
    },
    architecture: [
      "Bespoke High-Performance Portfolio",
      "Cinematic Motion & Page Transitions",
      "Fluid 3D Interactive Graphics",
      "Global Edge CDN Acceleration",
      "Mobile App-Like Gesture Controls",
    ],
    duration: 24,
    modules: ["web-design", "3d-visuals", "branding"],
    tags: ["portfolio", "3d-animation", "branding"],
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
