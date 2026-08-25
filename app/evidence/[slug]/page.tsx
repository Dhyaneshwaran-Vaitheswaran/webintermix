import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getStudyBySlug, getAllSlugs } from "@/lib/content/evidence";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getStudyBySlug(slug);
  if (!study) return { title: "Not Found" };

  return {
    title: study.claim,
    description: `${study.metric.value} ${study.metric.label}. ${study.duration} days. ${study.year}.`,
  };
}

export default async function EvidenceStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getStudyBySlug(slug);
  if (!study) notFound();

  return (
    <main className="pt-32 section-padding pb-32">
      <div className="container-grid w-full">
        {/* Breadcrumb */}
        <div className="col-span-12 mb-12">
          <Link
            href="/evidence"
            className="text-label text-muted hover:text-primary transition-colors duration-200"
          >
            ← Evidence
          </Link>
        </div>

        {/* Header */}
        <div className="col-span-8">
          <p className="text-label text-muted mb-4">
            {study.client} · {study.year} · {study.duration} days
          </p>
          <h1 className="text-heading text-primary">{study.claim}</h1>
        </div>

        {/* Divider */}
        <div className="col-span-12 border-t border-border my-12" />

        {/* Primary metric */}
        <div className="col-span-4">
          <p className="text-label text-muted mb-3">Primary Outcome</p>
          <p className="text-display text-signal leading-none">{study.metric.value}</p>
          <p className="text-body text-muted mt-4">{study.metric.label}</p>
          {study.metric.verified && (
            <p className="text-label text-signal mt-3">✓ Verified</p>
          )}
        </div>

        {/* Architecture */}
        <div className="col-span-8">
          <p className="text-label text-muted mb-6">What Was Built</p>
          <ul className="space-y-3" aria-label="Architecture list">
            {study.architecture.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="text-label text-muted mt-1 shrink-0 w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-body text-primary">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div className="col-span-12 border-t border-border my-12" />

        {/* Tags */}
        <div className="col-span-12 flex items-center gap-4">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="text-label text-muted border border-border px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="col-span-12 mt-20">
          <Link
            href="/threshold"
            className="text-label text-primary border border-border px-6 py-3 hover:border-signal hover:text-signal transition-colors duration-300"
          >
            Start a conversation at Threshold →
          </Link>
        </div>
      </div>
    </main>
  );
}
