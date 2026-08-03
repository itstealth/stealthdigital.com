"use client";

import { Reveal } from "@/components/motion/Reveal";
import TextBlockAnimation from "@/components/ui/text-block-animation";
import { LayoutGrid } from "@/components/ui/layout-grid";
import { CASE_STUDIES } from "@/data/caseStudies";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function FeaturedWork() {
  // Bento layout: card 0 spans 2 cols, card 1 normal, card 2 normal, card 3 spans 2 cols.
  const gridCards = CASE_STUDIES.slice(0, 4).map((study, i) => ({
    id: i + 1,
    className: i === 0 || i === 3 ? "md:col-span-2" : "col-span-1",
    thumbnail: study.image,
    alt: `${study.client} — ${study.title}`,
    content: (
      <div className="pb-2">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-2">
          {study.industry}
        </div>
        <h3 className="font-display text-2xl md:text-4xl font-bold text-cream leading-[1.05] tracking-tight mb-3 max-w-2xl">
          {study.title}
        </h3>
        <p className="text-cream/80 text-sm md:text-base leading-relaxed mb-5 max-w-2xl">
          {study.summary}
        </p>

        {/* Metrics row */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 mb-5">
          {study.metrics.map((m) => (
            <div key={m.label}>
              <div className="font-display text-xl md:text-2xl font-bold text-accent leading-none">
                {m.value}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream/60 mt-1">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Services */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          {study.services.map((s) => (
            <span
              key={s}
              className="inline-flex items-center rounded-full border border-cream/20 bg-ink-950/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-cream backdrop-blur-md"
            >
              {s}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={`/contact-us?ref=${study.slug}`}
          className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.18em] text-accent hover:text-cream transition-colors"
        >
          Start a similar project
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    ),
  }));

  return (
    <section id="work" className="relative py-20 md:py-28 bg-cream text-ink-950 overflow-hidden">
      {/* Subtle paper grain so the white section still feels premium */}
      <div className="absolute inset-0 bg-grain opacity-[0.04] mix-blend-multiply pointer-events-none" />
      <div className="container-fluid relative">
        <Reveal variant="up">
          <div className="flex flex-col gap-6 mb-16 md:mb-24 md:flex-row md:items-end md:justify-between px-4 md:px-8">
            <TextBlockAnimation blockColor="#FFD60A">
              <h2 className="font-display text-[11vw] font-bold leading-[0.9] tracking-[-0.04em] text-ink-950">
                Work
              </h2>
            </TextBlockAnimation>
            <p className="text-ink-950/60 max-w-sm md:text-right font-sans text-lg mb-2">
              Recent case studies across education, D2C, and B2B. Click any tile to dive in.
            </p>
          </div>
        </Reveal>

        <Reveal variant="up" delay={120} className="px-4 md:px-8">
          <LayoutGrid cards={gridCards} theme="light" />
        </Reveal>
      </div>
    </section>
  );
}