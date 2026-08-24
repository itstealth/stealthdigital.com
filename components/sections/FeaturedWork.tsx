"use client";

import { Reveal } from "@/components/motion/Reveal";
import TextBlockAnimation from "@/components/ui/text-block-animation";
import StackingCards, {
  StackingCardItem,
} from "@/components/ui/stacking-cards";
import { CASE_STUDIES } from "@/data/caseStudies";

export function FeaturedWork() {
  return (
    <section id="work" className="relative py-20 md:py-28 bg-cream text-ink-950">
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
      </div>

      <StackingCards totalCards={CASE_STUDIES.length}>
        {CASE_STUDIES.map((study, index) => (
          <StackingCardItem
            key={study.slug}
            index={index}
            className="h-[90vh]"
          >
            <div className="relative h-[80%] w-[92%] max-w-6xl mx-auto rounded-3xl overflow-hidden bg-ink-900 border border-ink-950/10 shadow-2xl flex flex-col md:flex-row">
              <div className="md:w-1/2 h-56 md:h-full relative overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
                  {study.industry}
                </div>
                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-cream leading-tight mb-4">
                  {study.title}
                </h3>
                <p className="text-cream/70 text-sm md:text-base leading-relaxed mb-6">
                  {study.summary}
                </p>
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  {study.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="font-display text-2xl font-bold text-accent leading-none">
                        {m.value}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/50 mt-1">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </StackingCardItem>
        ))}
      </StackingCards>
    </section>
  );
}