"use client";

import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { AWARDS } from "@/data/awards";

/**
 * Recognised By — Awards & Accreditations
 *
 * Editorial masthead on a cream surface, with the dual marquee rolling
 * the credential pills (ink pills on white). Sits between the
 * Testimonials section (light) and the Process section (dark ink-950).
 */
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
                Recognised By
              </span>
              <span className="h-px w-8 bg-ink-950" />
            </div>

            <h2 className="font-display text-[44px] sm:text-[64px] md:text-[88px] font-bold leading-[0.95] tracking-[-0.04em] text-ink-950 text-balance max-w-5xl">
              Awards &amp; Accreditations
            </h2>

            <p className="font-serif italic text-lg md:text-xl text-ink-950/60 max-w-2xl text-pretty">
              A credit roll of the institutions that have honoured our work
              over the years — from platform partners to editorial juries.
            </p>
          </header>
        </Reveal>

        {/* ── Marquee row 1 (forward) ─────────────────────────────────── */}
        <Marquee speed={50} className="mb-4">
          {[...AWARDS, ...AWARDS].map((award, i) => (
            <div
              key={`fwd-${i}`}
              className="flex shrink-0 items-center gap-6 px-10 py-6 border border-ink-950/10 rounded-full bg-cream mx-2 shadow-[0_1px_0_0_rgba(0,0,0,0.04)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="font-display text-lg md:text-xl font-bold text-ink-950 tracking-tight whitespace-nowrap">
                {award.name}
              </span>
              <span className="font-mono text-xs text-ink-950/40">
                [{award.year}]
              </span>
            </div>
          ))}
        </Marquee>

        {/* ── Marquee row 2 (reverse) ─────────────────────────────────── */}
        <Marquee speed={60} reverse>
          {[...AWARDS.slice().reverse(), ...AWARDS.slice().reverse()].map(
            (award, i) => (
              <div
                key={`rev-${i}`}
                className="flex shrink-0 items-center gap-6 px-10 py-6 border border-ink-950/10 rounded-full bg-cream mx-2 shadow-[0_1px_0_0_rgba(0,0,0,0.04)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-ink-950" />
                <span className="font-display text-lg md:text-xl font-bold text-ink-950 tracking-tight whitespace-nowrap">
                  {award.name}
                </span>
                <span className="font-mono text-xs text-ink-950/40">
                  [{award.year}]
                </span>
              </div>
            )
          )}
        </Marquee>

        {/* ── Footnote row ───────────────────────────────────────────── */}
        <Reveal variant="up" delay={0.2}>
          <div className="container-x mt-12 md:mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <p className="font-serif italic text-base md:text-lg text-ink-950/50 max-w-xl text-pretty">
              Selected honours from the past three years. A full credential
              dossier is available on request.
            </p>

            <div className="flex items-center gap-8 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-950/40">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {AWARDS.length} Active Credentials
              </span>
              <span className="hidden md:flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-ink-950/40" />
                2017 — 2025
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
