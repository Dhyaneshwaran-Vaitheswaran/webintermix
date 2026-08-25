import { z } from "zod";

/** Zod schema for validating client intake submissions */
export const IntakeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  company: z.string().min(1, "Company name is required"),
  email: z.string().email("A valid email address is required"),
  challenge: z
    .string()
    .min(50, "Please describe your challenge in at least 50 characters — specificity helps us help you"),
  timeline: z.enum(["4w", "8w", "12w", "open"], {
    message: "Please select a timeline",
  }),
  budget: z.enum(["<10k", "10-25k", "25-50k", "50k+"], {
    message: "Please select a budget range",
  }),
  modules: z.array(z.string()).min(1, "Please select at least one service module"),
});

export type ValidatedIntake = z.infer<typeof IntakeSchema>;
