"use client";

import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";

const CLIENTS = [
  "GL Bajaj Institute",
  "Indo Global Group",
  "IMM Delhi",
  "Bloom Beverages",
  "Nua Wellness",
  "Sukoon Health",
  "The Loom Co.",
  "Rangoon Retail",
  "Aarka Hospitality",
  "Paperboat Studios",
  "Mitti Naturals",
  "Cycle Coffee",
];

export function Clients() {
  return (
    <section className="relative py-16 md:py-20 border-t border-cream/10 bg-ink-950">
      <div className="container-x mb-8">
        <Reveal variant="up">
          <div className="flex flex-wrap items-center gap-4">
            <span className="eyebrow">Trusted By</span>
            <span className="font-mono text-xs text-cream/50">
              200+ ambitious brands · Delhi NCR & beyond
            </span>
          </div>
        </Reveal>
      </div>
      <Marquee speed={55}>
        {[...CLIENTS, ...CLIENTS].map((c, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-3 px-8 py-3 border border-cream/10 rounded-full"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-display text-lg md:text-xl font-semibold text-cream/80 whitespace-nowrap">
              {c}
            </span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}