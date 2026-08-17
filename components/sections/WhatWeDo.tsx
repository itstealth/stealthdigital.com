"use client";

import { ArrowUpRight, Search, Target, Share2, Code, Sparkles, PenTool, Video, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Marquee } from "@/components/motion/Marquee";
import TextBlockAnimation from "@/components/ui/text-block-animation";
import { SERVICES, type Service } from "@/data/services";

/**
 * WhatWeDo — "What we do." section, placed just above the Process section.
 * Service cards in a horizontal marquee, styled to match the Process cards.
 *
 * Card layout (fixed 720px tall, flex column):
 *   ┌─────────────────────────────┐
 *   │ 01          [icon]          │  ← always visible
 *   │ Title                       │  ← always visible
 *   │ Tagline                     │  ← always visible
 *   │ ─────────────────────────── │  ← separator (border-t)
 *   │ [details — expand on hover] │  ← expands on hover, never overlaps
 *   │   Description               │
 *   │   • feature                 │
 *   │   • feature                 │
 *   │   Explore →        ──────   │
 *   └─────────────────────────────┘
 *
 * The details use a very large max-h (2000px) so they are NEVER clipped —
 * the actual content is ~300px, and the transition from 0 → 2000px is
 * imperceptible past the real height while opacity reveals the content.
 *
 * If a `coverImage` is passed, the card becomes a front-cover card:
 *   - Default: the image is shown crisp as the front cover (with a subtle
 *     dark gradient at the bottom so the title stays readable).
 *   - On hover: the image blurs and darkens, and the details fade in on top.
 */

const ICON_MAP: Record<string, LucideIcon> = {
  "search-engine-optimization": Search,
  "search-engine-marketing": Target,
  "social-media-marketing": Share2,
  "website-design-development": Code,
  "ui-ux-design": PenTool,
  "video-production": Video,
};

// Card-specific cover images. Only the Web Development card has a front-cover
// image for now; other cards fall back to the plain text-only layout.
const COVER_IMAGES: Record<string, string> = {
  "search-engine-optimization": "/images/SEO.jpg",
  "search-engine-marketing": "/images/PM.jpg",
  "social-media-marketing": "/images/SMO.jpg",
  "website-design-development": "/images/web developmentt.jpg",
  "ui-ux-design": "/images/UIUX.jpg",
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = ICON_MAP[service.slug] ?? Sparkles;
  const coverImage = COVER_IMAGES[service.slug];

  return (
    <div
      className={`group/card relative shrink-0 w-[300px] md:w-[340px] h-[560px] border border-cream/10 transition-colors duration-500 hover:border-cream/20 flex flex-col overflow-hidden ${
        coverImage
          ? "bg-ink-950 hover:bg-ink-900"
          : "bg-ink-950 hover:bg-ink-900"
      }`}
    >
      {/* Cover image — only rendered when a coverImage is provided for this card.
          On hover: blurs, darkens, and slightly scales so the details read on top. */}
      {coverImage && (
        <div className="absolute inset-0 -z-0">
          <Image
            src={coverImage}
            alt={service.title}
            fill
            sizes="340px"
            className="object-cover transition-all duration-700 ease-out group-hover/card:blur-md group-hover/card:scale-105"
          />
          {/* Default legibility gradient (light) — bottom-darkens so the title is readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/40 to-transparent transition-opacity duration-700 group-hover/card:opacity-0" />
          {/* Hover veil — dark overlay that fades in so blurred image + details read clearly */}
          <div className="absolute inset-0 bg-ink-950/80 opacity-0 transition-opacity duration-700 group-hover/card:opacity-100" />
        </div>
      )}

      {/* Top section — always visible, padded */}
      <div className="relative z-10 p-6 md:p-8">
        {/* Step + icon */}
        <div className="flex items-start justify-between">
          <span className="font-mono text-xs text-cream/40">0{index + 1}</span>
          <Icon
            size={26}
            strokeWidth={1}
            className="text-cream/30 transition-colors duration-500 group-hover/card:text-cream"
          />
        </div>

        {/* Title + tagline */}
        <h3 className="mt-8 font-display text-xl md:text-2xl font-bold text-cream tracking-tight leading-tight">
          {service.title}
        </h3>
        <p className="mt-2 text-sm md:text-base text-cream/60 leading-snug">
          {service.tagline}
        </p>
      </div>

      {/* Visual separator — always visible */}
      <div className="relative z-10 mx-6 md:mx-8 h-px bg-cream/10" />

      {/* Details — only shown on hover of THIS card. Uses a named
          group-hover/card so the marquee's pause-on-hover group doesn't
          trigger every card at once. */}
      <div className="relative z-10 flex-1 overflow-hidden">
        <div className="max-h-0 opacity-0 transition-all duration-500 ease-out group-hover/card:max-h-[2000px] group-hover/card:opacity-100">
          <div className="p-6 md:p-8 pt-5">
            <p className="text-xs md:text-sm leading-relaxed text-cream/70">
              {service.description}
            </p>

            <ul className="mt-4 space-y-1.5">
              {service.features.slice(0, 4).map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-[11px] md:text-xs text-cream/55"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center justify-between">
              <Link
                href={`/services/${service.slug}`}
                className="group/link inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/70 transition-colors hover:text-accent"
              >
                Explore Service
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </Link>
              {/* Hover line — matches Process card style */}
              <div className="h-px w-10 bg-cream/30 transition-all duration-700 group-hover/card:w-full group-hover/card:bg-accent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WhatWeDo() {
  return (
    <section className="relative py-20 md:py-28 bg-ink-950 overflow-hidden">
      <div className="container-fluid mb-16 md:mb-24 px-4 md:px-8">
        <div className="max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-cream/50">
            What we do
          </span>
          <TextBlockAnimation blockColor="#FFD60A">
            <h2 className="mt-6 font-display text-[9vw] font-bold leading-[0.9] tracking-[-0.04em] text-cream md:text-[7vw]">
              What we do
            </h2>
          </TextBlockAnimation>
          <p className="mt-8 text-xl md:text-2xl text-cream/50 max-w-2xl font-sans">
            From strategy to execution, we craft digital products that redefine
            what&rsquo;s possible for your brand.
          </p>
        </div>
      </div>

      {/* Marquee of service cards — matches Process card style, scrolls
          horizontally and pauses on hover. Each card expands to reveal
          full details on individual hover. */}
      <Marquee speed={40} pauseOnHover={true} draggable className="pb-4">
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.slug} service={service} index={i} />
        ))}
      </Marquee>
    </section>
  );
}
