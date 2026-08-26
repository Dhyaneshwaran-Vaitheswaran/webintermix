import type { Metadata, Viewport } from "next";
import { Syncopate } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { ClientSingletons } from "@/components/ClientSingletons";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

const syncopate = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Web Intermix — Systems & Experience Design",
    template: "%s | Web Intermix",
  },
  description:
    "Web Intermix builds precision web systems for companies that understand the difference between a website and a platform.",
  keywords: ["web design", "systems design", "Next.js", "performance", "agency"],
  authors: [{ name: "Web Intermix" }],
  creator: "Web Intermix",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={syncopate.className}
      suppressHydrationWarning
    >
      <body className="bg-black text-white antialiased overflow-x-hidden tracking-tight cursor-none">
        <ClientSingletons />
        
        {/* Ambient Signature Red Core */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF3B3B]/[0.03] rounded-full blur-[120px] pointer-events-none z-0" />

        <SmoothScroll>
          <div id="dom-layer" className="relative z-10 w-full min-h-screen">
            <Navbar />
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
