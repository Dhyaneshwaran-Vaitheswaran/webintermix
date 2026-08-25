import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="min-h-dvh flex items-center section-padding">
      <div className="container-grid w-full">
        <div className="col-span-8">
          <p className="text-label text-muted mb-8">404</p>
          <h1 className="text-display text-primary">
            This page
            <br />
            <span className="text-muted">doesn&apos;t exist yet.</span>
          </h1>
          <p className="text-body text-muted mt-12 max-w-[400px]">
            We removed it, or it was never here. Both are deliberate choices.
          </p>
          <div className="mt-12 flex items-center gap-8">
            <Link
              href="/"
              className="text-label text-primary border border-border px-6 py-3 hover:border-signal hover:text-signal transition-colors duration-300"
            >
              Return to Index →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
