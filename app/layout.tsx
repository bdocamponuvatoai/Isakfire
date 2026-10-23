import type { Metadata, Viewport } from "next";
import { Big_Shoulders, IBM_Plex_Mono, Public_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { RevealObserver } from "@/components/reveal-observer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { allowIndexing, business, siteUrl } from "@/lib/site";
import { businessJsonLd, serializeJsonLd } from "@/lib/structured-data";
import "./globals.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-public-sans",
});

const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
  // Next has no metrics for this face; globals.css falls back to Arial Narrow.
  adjustFontFallback: false,
  variable: "--font-big-shoulders",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
  variable: "--font-plex-mono",
});

const description =
  "Fire sprinklers, alarms, suppression, monitoring and the inspections that keep them current, for commercial, industrial and residential buildings in Illinois, Michigan, Ohio, Indiana, Wisconsin and Ontario.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Isak Fire Protection · Fire protection systems, inspection & service",
    template: "%s · Isak Fire Protection",
  },
  description,
  applicationName: business.name,
  alternates: { canonical: "/" },
  robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: business.name,
    title: "Isak Fire Protection · Fire protection, kept current",
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Isak Fire Protection badge" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f6f6f3",
  colorScheme: "light",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-US" className={`${publicSans.variable} ${bigShoulders.variable} ${plexMono.variable}`}>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-50 -translate-y-24 rounded-[3px] bg-navy px-5 py-3 font-semibold text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <MobileActionBar />
        <RevealObserver />
        <script
          type="application/ld+json"
          // Static, server-defined data only; serializeJsonLd escapes `<`.
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(businessJsonLd(siteUrl)) }}
        />
      </body>
    </html>
  );
}
