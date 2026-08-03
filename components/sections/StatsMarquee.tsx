"use client";

import { Marquee } from "@/components/motion/Marquee";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import TextBlockAnimation from "@/components/ui/text-block-animation";
import { STATS } from "@/data/stats";

export function StatsMarquee() {
  return (
    <section className="relative py-24 md:py-40 bg-ink-950 overflow-hidden">
      <div className="container-fluid mb-16 md:mb-24 px-4 md:px-8">
        <Reveal variant="up">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <TextBlockAnimation blockColor="#FFD60A">
              <h2 className="font-display text-[8vw] md:text-[6vw] font-bold leading-[0.9] tracking-[-0.04em] text-cream">
                By The Numbers
              </h2>
            </TextBlockAnimation>
            <p className="text-cream/50 max-w-sm md:text-right font-sans text-lg mb-2">
              Real numbers from real client campaigns — averaged across 200+ engagements over the last 24 months.
            </p>
          </div>
        </Reveal>
      </div>

      <Marquee speed={45} className="mb-4">
        {STATS.slice(0, 5).map((s, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-6 rounded-2xl border border-cream/10 bg-ink-900 px-8 py-6 md:px-10 md:py-8 backdrop-blur mx-2"
          >
            <div className="font-display text-5xl md:text-7xl font-bold text-cream leading-none">
              <Counter to={s.value} suffix={s.suffix} decimals={s.decimals} />
            </div>
            <div className="max-w-[160px] md:max-w-[200px]">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/40 mb-1">
                Metric
              </div>
              <p className="text-sm md:text-base text-cream/80 leading-snug">
                {s.label}
              </p>
            </div>
          </div>
        ))}
      </Marquee>

      <Marquee speed={55} reverse className="">
        {STATS.slice(5).map((s, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-6 rounded-2xl border border-cream/10 bg-ink-900 px-8 py-6 md:px-10 md:py-8 backdrop-blur mx-2"
          >
            <div className="font-display text-5xl md:text-7xl font-bold text-cream leading-none">
              <Counter to={s.value} suffix={s.suffix} decimals={s.decimals} />
            </div>
            <div className="max-w-[160px] md:max-w-[200px]">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/40 mb-1">
                Metric
              </div>
              <p className="text-sm md:text-base text-cream/80 leading-snug">
                {s.label}
              </p>
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
}