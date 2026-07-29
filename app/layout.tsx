import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Crimson_Text,
  JetBrains_Mono,
  Inter_Tight,
  Geist,
  Libre_Baskerville,
} from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Preloader } from "@/components/motion/Preloader";
import { cn } from "@/lib/utils";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Serif font for editorial / testimonial copy. Exposed via the --font-serif
// CSS variable so any element can opt in with `font-serif`.
const crimson = Crimson_Text({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Display serif for hero / quote treatments. Exposed via --font-baskerville.
const baskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-baskerville",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stealthdigital.in"),
  title: {
    default: "Stealth Digital — Best Digital Marketing Agency in Delhi NCR",
    template: "%s | Stealth Digital",
  },
  description:
    "Stealth Digital is a Delhi NCR-based digital marketing agency specialising in SEO, SEM, Social Media Marketing, and Website Design. We design digital products that help grow businesses.",
  keywords: [
    "digital marketing agency",
    "Delhi NCR",
    "SEO agency India",
    "PPC agency",
    "social media marketing",
    "website design",
    "Stealth Digital",
  ],
  authors: [{ name: "Stealth Digital" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://stealthdigital.in",
    siteName: "Stealth Digital",
    title: "Stealth Digital — Best Digital Marketing Agency in Delhi NCR",
    description:
      "We design digital products that help grow businesses. SEO, SEM, SMM, and Web Design from Delhi NCR.",
    images: ["/images/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stealth Digital — Best Digital Marketing Agency in Delhi NCR",
    description:
      "We design digital products that help grow businesses. SEO, SEM, SMM, and Web Design from Delhi NCR.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        display.variable,
        mono.variable,
        geist.variable,
        crimson.variable,
        baskerville.variable,
        "font-sans"
      )}
    >
      <body className="grain-overlay min-h-screen overflow-x-hidden bg-ink-950">
        <Preloader />
        <SmoothScroll />
        <CustomCursor />
        <Navbar />
        <main className="relative">{children}</main>
        <CinematicFooter />
      </body>
    </html>
  );
}