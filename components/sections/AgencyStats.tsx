"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { AGENCY_STATS } from "@/data/stats";

export function AgencyStats() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 border-y border-cream/10 overflow-hidden"
    >
      {/* Subtle parallax background text */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <span className="font-display text-[20vw] font-bold tracking-[-0.06em] text-cream/[0.025] whitespace-nowrap">
          Growth · Growth · Growth
        </span>
      </motion.div>

      <div className="container-x relative">
        <div className="grid gap-px bg-cream/10 md:grid-cols-4 border border-cream/10">
          {AGENCY_STATS.map((s, i) => (
            <Reveal
              key={s.label}
              variant="up"
              delay={i * 0.1}
              className="bg-ink-950 px-6 py-10 md:py-14 md:px-10 group hover:bg-ink-900 transition-colors"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/40 mb-3">
                [0{i + 1}]
              </div>
              <div className="font-display text-5xl md:text-7xl font-bold tracking-[-0.03em] text-cream leading-[0.95] mb-3">
                {s.value}
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-cream/60">
                {s.label}
              </div>
              <div className="mt-6 h-px w-0 group-hover:w-full bg-cream transition-all duration-700" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}