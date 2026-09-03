import type { Metadata } from "next";
import Script from "next/script";
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
import { SiteFooter } from "@/components/layout/SiteFooter";
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
      <head>
        {/* The hero's Spline scene is fetched from these origins once the
            runtime mounts; warming DNS/TLS here saves a round trip when it
            does. GTM likewise. */}
        <link rel="preconnect" href="https://prod.spline.design" crossOrigin="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* Google Tag Manager — as high in <head> as possible. Uses next/script
            so the App Router doesn't strip the inline tag; afterInteractive
            keeps it off the critical path without delaying the container
            past hydration. Container: GTM-5NW7F5FL */}
        <Script id="gtm-base" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5NW7F5FL');`}
        </Script>

        {/* Apply the saved/system theme before first paint so there's no
            white/black flash. Kept in sync with ThemeToggle (localStorage key
            "theme": "light" | "dark"; absent = follow the OS). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="grain-overlay min-h-screen overflow-x-hidden bg-ink-950">
        {/* Google Tag Manager (noscript) — immediately after the opening
            <body> tag, per GTM's install instructions. */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5NW7F5FL"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Preloader />
        <SmoothScroll />
        <CustomCursor />
        <Navbar />
        <main className="relative">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}