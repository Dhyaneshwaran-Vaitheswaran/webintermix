import type { ValidatedIntake } from "./intake.schema";
import type { QualifyResult, IntakeStatus } from "@/types/commerce";
import { randomUUID } from "crypto";

const BUDGET_SCORES: Record<string, number> = {
  "<10k": 0,
  "10-25k": 40,
  "25-50k": 70,
  "50k+": 100,
};

const TIMELINE_SCORES: Record<string, number> = {
  "4w": 20,
  "8w": 60,
  "12w": 80,
  open: 100,
};

function getStatus(score: number): IntakeStatus {
  if (score >= 70) return "qualified";
  if (score >= 30) return "received";
  return "flagged";
}

function getEstimatedResponse(status: IntakeStatus): string {
  switch (status) {
    case "qualified":
      return "Within 24 hours";
    case "received":
      return "Within 48–72 hours";
    case "flagged":
      return "Within 5 business days";
  }
}

/**
 * Score an intake submission 0–100 across four dimensions:
 * - Budget (40% weight): Does the budget support the work?
 * - Challenge (30% weight): Is the brief specific and substantive?
 * - Timeline (15% weight): Is there appropriate time to do the work?
 * - Modules (15% weight): Is the scope of work defined?
 */
export function qualifyIntake(intake: ValidatedIntake): QualifyResult {
  const budgetScore = BUDGET_SCORES[intake.budget] ?? 0;
  const challengeScore = Math.min(100, (intake.challenge.length / 300) * 100);
  const timelineScore = TIMELINE_SCORES[intake.timeline] ?? 0;
  const moduleScore = Math.min(100, intake.modules.length * 25);

  const total = Math.round(
    budgetScore * 0.4 +
      challengeScore * 0.3 +
      timelineScore * 0.15 +
      moduleScore * 0.15
  );

  const status = getStatus(total);

  return {
    intakeId: randomUUID(),
    qualifyScore: total,
    status,
    estimatedResponse: getEstimatedResponse(status),
    scoreBreakdown: {
      budget: Math.round(budgetScore),
      challenge: Math.round(challengeScore),
      timeline: Math.round(timelineScore),
      modules: Math.round(moduleScore),
    },
  };
}
