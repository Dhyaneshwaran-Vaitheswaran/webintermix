import type { Metadata } from "next";
import { IndexPageClient } from "./IndexPageClient";

export const metadata: Metadata = {
  title: "Web Intermix — Systems & Experience Design",
  description:
    "Precision web systems. Built for companies that understand the difference between a website and a platform.",
};

export default function IndexPage() {
  return <IndexPageClient />;
}
