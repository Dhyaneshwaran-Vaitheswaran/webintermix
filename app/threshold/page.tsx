import type { Metadata } from "next";
import { ThresholdPageClient } from "./ThresholdPageClient";

export const metadata: Metadata = {
  title: "The Threshold",
  description:
    "Tell us what's broken. We'll tell you if we can fix it. Client intake gateway.",
};

export default function ThresholdPage() {
  return <ThresholdPageClient />;
}
