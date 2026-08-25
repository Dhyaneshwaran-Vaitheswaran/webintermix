// ─── Commerce Engine™ Types ──────────────────────────────────────────────────

export type ModuleCategory = "foundation" | "systems" | "evidence" | "growth";
export type ModuleComplexity = 1 | 2 | 3;

export interface CommerceModule {
  id: string;
  name: string;
  description: string;
  category: ModuleCategory;
  basePrice: number; // In USD (internal use only)
  complexity: ModuleComplexity; // 1=sprint, 2=standard, 3=strategic
  dependencies: string[]; // Module IDs this module requires
  outputs: string[]; // Deliverable descriptions
  qualifyThreshold: number; // Min qualify score (0–100) to unlock
  duration: number; // Typical duration in days
}

export type TimelineOption = "4w" | "8w" | "12w" | "open";
export type BudgetRange = "<10k" | "10-25k" | "25-50k" | "50k+";
export type IntakeStatus = "received" | "flagged" | "qualified";

export interface IntakePayload {
  firstName: string;
  company: string;
  email: string;
  challenge: string; // min 50 chars
  timeline: TimelineOption;
  budget: BudgetRange;
  modules: string[]; // Selected module IDs
}

export interface QualifyResult {
  intakeId: string;
  qualifyScore: number; // 0–100
  status: IntakeStatus;
  estimatedResponse: string; // Human-readable
  scoreBreakdown: {
    budget: number;
    challenge: number;
    timeline: number;
    modules: number;
  };
}

export interface ModuleCatalogResponse {
  modules: CommerceModule[];
  categories: ModuleCategory[];
  totalModules: number;
}
