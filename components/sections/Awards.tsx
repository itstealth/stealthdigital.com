"use client";

import Image from "next/image";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import TextBlockAnimation from "@/components/ui/text-block-animation";

/**
 * Partners and Recognition
 *
 * Editorial masthead on a cream surface, with the dual marquee rolling
 * the partner-logo badges. Sits between the Testimonials section (light)
 * and the Process section (dark ink-950).
 */

interface Partner {
  src: string;
  alt: string;
  /**
   * "tight" enlarges the image within the pill so logos that carry
   * extra whitespace around the mark (Snapchat, Meta, Shopify) actually
   * fill the box. "normal" leaves breathing room around smaller marks.
   */
  imgFit?: "normal" | "tight";
  /**
   * Object-fit mode. "cover" crops the image to fill the inner area
   * (used for Snapchat, which is a 16:9 canvas with a centered ghost).
   * Defaults to "contain".
   */
  objectFit?: "contain" | "cover";
  /**
   * Blend mode used to remove a colored/white background from a badge
   * so the logo blends into the cream pill.
   *   "multiply" — works well for pure-white backgrounds (Shopify).
   *   "darken"   — more aggressive; keeps only darker pixels (Google
   *                Partner, which has a slightly tinted background).
   * Set to `false` (default) to disable.
   */
  blend?: false | "multiply" | "darken";
}

const PARTNERS: Partner[] = [
  { src: "/images/Google_Analytics.png", alt: "Google Analytics" },
  { src: "/images/meta%20partner.jpg", alt: "Meta Partner", imgFit: "tight" },
  {
    src: "/images/shopify-partners.png",
    alt: "Shopify Partners",
    imgFit: "tight",
    blend: "multiply",
  },
  {
    src: "/images/Google%20partner.webp",
    alt: "Google Partner",
    blend: "darken",
  },
  { src: "/images/tiktok.webp", alt: "TikTok" },
  { src: "/images/snapchat.png", alt: "Snapchat", imgFit: "tight", objectFit: "cover" },
];

function PartnerBadge({
  src,
  alt,
  imgFit = "normal",
  objectFit = "contain",
  blend = false,
}: {
  src: string;
  alt: string;
  imgFit?: "normal" | "tight";
  objectFit?: "contain" | "cover";
  blend?: false | "multiply" | "darken";
}) {
  // All pills share one uniform outer size (width and height). The
  // inner image area is sized per-partner so logos with whitespace can
  // fill the box more aggressively when needed.
  const innerArea =
    imgFit === "tight" ? "h-full px-3 py-3" : "h-2/3 px-2 py-1";
  const fitClass = objectFit === "cover" ? "object-cover" : "object-contain";
  const blendClass =
    blend === "multiply"
      ? " mix-blend-multiply"
      : blend === "darken"
        ? " mix-blend-darken"
        : "";

  return (
    <div className="flex shrink-0 items-center justify-center w-44 md:w-56 h-24 md:h-32 border border-ink-950/10 rounded-full bg-cream mx-2 shadow-[0_1px_0_0_rgba(0,0,0,0.04)]">
      <div className={`flex items-center justify-center w-full ${innerArea}`}>
        <Image
          src={src}
          alt={alt}
          width={320}
          height={144}
          sizes="320px"
          className={`max-h-full max-w-full ${fitClass}${blendClass}`}
        />
      </div>
    </div>
  );
}

export function Awards() {
  return (
    <section className="relative py-24 md:py-36 border-t border-ink-950/10 bg-cream overflow-hidden">
      {/* Subtle paper grain so the white sections feel like the same paper. */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute inset-0 bg-grain opacity-[0.05] mix-blend-multiply" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[40vh] w-[60vw] rounded-full bg-ink-950/[0.03] blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* ── Masthead ───────────────────────────────────────────────── */}
        <Reveal variant="up">
          <header className="container-x flex flex-col items-center text-center gap-6 mb-12 md:mb-16">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-ink-950" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-950/50">
                Our Network
              </span>
              <span className="h-px w-8 bg-ink-950" />
            </div>

            <TextBlockAnimation blockColor="#FFD60A">
              <h2 className="font-display text-[44px] sm:text-[64px] md:text-[88px] font-bold leading-[0.95] tracking-[-0.04em] text-ink-950 max-w-5xl">
                Partners and Recognition
              </h2>
            </TextBlockAnimation>

            <p className="font-serif italic text-lg md:text-xl text-ink-950/60 max-w-2xl text-pretty">
              Officially certified by the platforms we build, advertise, and
              scale on — recognised partners across analytics, commerce, and
              social.
            </p>
          </header>
        </Reveal>

        {/* ── Marquee row 1 (forward) ─────────────────────────────────── */}
        <Marquee speed={50} className="mb-4">
          {PARTNERS.map((p, i) => (
            <PartnerBadge
              key={`fwd-${i}`}
              src={p.src}
              alt={p.alt}
              imgFit={p.imgFit}
              objectFit={p.objectFit}
              blend={p.blend}
            />
          ))}
        </Marquee>

        {/* ── Marquee row 2 (reverse) ─────────────────────────────────── */}
        <Marquee speed={60} reverse>
          {[...PARTNERS].reverse().map((p, i) => (
            <PartnerBadge
              key={`rev-${i}`}
              src={p.src}
              alt={p.alt}
              imgFit={p.imgFit}
              objectFit={p.objectFit}
              blend={p.blend}
            />
          ))}
        </Marquee>

        {/* ── Footnote row ───────────────────────────────────────────── */}
        <Reveal variant="up" delay={0.2}>
          <div className="container-x mt-12 md:mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <p className="font-serif italic text-base md:text-lg text-ink-950/50 max-w-xl text-pretty">
              Active partnerships with the platforms that power our paid media,
              e-commerce, and analytics work.
            </p>

            <div className="flex items-center gap-8 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-950/40">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {PARTNERS.length} Active Partnerships
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}