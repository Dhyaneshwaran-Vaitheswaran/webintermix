// ─── Content Types ────────────────────────────────────────────────────────────

export interface EvidenceMetric {
  value: string; // e.g. "340%"
  label: string; // e.g. "increase in qualified leads"
  verified: boolean;
}

export interface EvidenceStudy {
  slug: string;
  client: string; // Or anonymized category e.g. "B2B SaaS / Series A"
  year: number;
  claim: string; // One sentence, provable
  metric: EvidenceMetric;
  architecture: string[]; // What was built (technical list)
  duration: number; // Days
  modules: string[]; // Commerce module IDs used
  tags: string[];
}
