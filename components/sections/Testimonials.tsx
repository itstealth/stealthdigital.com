"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import TextBlockAnimation from "@/components/ui/text-block-animation";
import { TESTIMONIALS } from "@/data/testimonials";

// SplashCursor is a WebGL fluid effect — only loaded on the client and
// only mounted while the Client Voices section is in view, so the heavy
// GL init doesn't run when the section is offscreen. The .jsx file is the
// original JS implementation; the `.tsx` conversion was abandoned because
// the helper classes use untyped `this`.
const SplashCursor = dynamic(() => import("@/components/SplashCursor.jsx"), {
  ssr: false,
  loading: () => null,
});

export function Testimonials() {
  const [active, setActive] = useState(0);

  // Auto-rotate
  useEffect(() => {
    const id = setInterval(() => {
      setActive((p) => (p + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const t = TESTIMONIALS[active];

  // Italicize the most quotable span in each testimonial so the Crimson
  // Text italic cut has something to do. The phrase is the headline result
  // the reviewer is testifying about.
  const renderQuote = (quote: string) => {
    const highlight = (() => {
      if (active === 0) return "page one for our most competitive keywords";
      if (active === 1) return "6x ROAS across Google and Meta";
      if (active === 2) return "challenged our assumptions";
      if (active === 3) return "went from 8k to 90k followers in 10 months";
      return "blended ROAS went from 2.1x to 5.8x";
    })();
    const idx = quote.toLowerCase().indexOf(highlight.toLowerCase());
    if (idx === -1) return quote;
    const before = quote.slice(0, idx);
    const match = quote.slice(idx, idx + highlight.length);
    const after = quote.slice(idx + highlight.length);
    return (
      <>
        {before}
        <em className="font-serif italic text-accent">{match}</em>
        {after}
      </>
    );
  };

  // Track whether the section is in view so we only mount the (expensive)
  // SplashCursor WebGL effect when the user is actually looking at it.
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "0px 0px -10% 0px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 border-t border-ink-950/10 bg-cream overflow-hidden"
    >
      {/* SplashCursor — full-viewport WebGL fluid cursor. Only mounted
          while the section is in view; pointer-events:none so it never
          blocks clicks. */}
      {inView && (
        <SplashCursor
          DENSITY_DISSIPATION={3.5}
          VELOCITY_DISSIPATION={2}
          PRESSURE={0.1}
          CURL={3}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={6000}
          COLOR_UPDATE_SPEED={10}
          SHADING
          RAINBOW_MODE={false}
          COLOR="#FACC15"
        />
      )}

      {/* Backdrop — soft accent blobs + subtle grain to give the white
          section depth without being visually loud. */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        {/* Primary accent glow — top-right */}
        <div className="absolute -top-32 -right-32 h-[60vh] w-[60vh] rounded-full bg-accent/10 blur-[120px]" />
        {/* Secondary soft glow — bottom-left */}
        <div className="absolute -bottom-40 -left-32 h-[55vh] w-[55vh] rounded-full bg-ink-950/5 blur-[140px]" />
        {/* Subtle grain on top */}
        <div className="absolute inset-0 bg-grain opacity-[0.06] mix-blend-multiply" />
      </div>

      <div className="relative z-10 container-x">
        <Reveal variant="up">
          <div className="flex flex-col gap-6 mb-12 md:mb-16">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-ink-950" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-950/50">
                Client Voices
              </span>
            </div>
            <TextBlockAnimation blockColor="#FFD60A">
              <h2 className="font-display text-[44px] sm:text-[64px] md:text-[88px] font-bold leading-[0.95] tracking-[-0.04em] text-ink-950 max-w-5xl">
                What Our Happy Clients Say About Us
              </h2>
            </TextBlockAnimation>
          </div>
        </Reveal>

        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Quote */}
          <div className="md:col-span-8">
            <Quote
              className="text-ink-950/15 mb-6"
              size={48}
              strokeWidth={1}
              aria-hidden
            />
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] font-normal leading-[1.25] tracking-[-0.01em] text-ink-950 text-balance"
              >
                <span className="font-baskerville text-accent mr-1 align-[-0.15em] text-[0.9em]">
                  &ldquo;
                </span>
                {renderQuote(t.quote)}
                <span className="font-baskerville text-accent ml-1 align-[-0.25em] text-[0.9em]">
                  &rdquo;
                </span>
              </motion.blockquote>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${active}-author`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="mt-12 flex flex-wrap items-center gap-4 border-t border-ink-950/10 pt-8"
              >
                <div>
                  <div className="font-baskerville text-2xl font-bold italic text-ink-950 mb-1">
                    {t.name}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-950/50">
                    {t.role} · {t.company}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right column — Video + Controls */}
          <div className="md:col-span-4 flex flex-col justify-between gap-8 mt-8 md:mt-0">
            {/* Video — same source for every testimonial. Re-keyed on
                `active` so it unmounts/remounts and restarts from the
                beginning on each slide: the video plays 5 times, once
                per testimonial. */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-ink-950 shadow-2xl shadow-black/30"
              >
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src="/videos/testi demo .mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col gap-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-950/50">
                [0{active + 1} / 0{TESTIMONIALS.length}]
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() =>
                    setActive(
                      (active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
                    )
                  }
                  className="group inline-flex h-14 w-14 items-center justify-center rounded-full border border-ink-950/20 text-ink-950 transition-all hover:border-ink-950 hover:bg-ink-950 hover:text-cream"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  onClick={() => setActive((active + 1) % TESTIMONIALS.length)}
                  className="group inline-flex h-14 w-14 items-center justify-center rounded-full border border-ink-950/20 text-ink-950 transition-all hover:border-ink-950 hover:bg-ink-950 hover:text-cream"
                  aria-label="Next testimonial"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
