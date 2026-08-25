import type { Metadata } from "next";
import { SystemsPageClient } from "./SystemsPageClient";

export const metadata: Metadata = {
  title: "Systems & Infrastructure",
  description:
    "Our architecture is modular by design. Every component exists to be recombined.",
};

export default function SystemsPage() {
  return <SystemsPageClient />;
}
