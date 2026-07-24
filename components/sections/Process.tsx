"use client";

import { motion } from "framer-motion";
import { Search, Lightbulb, Rocket, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const PROCESS = [
  {
    step: "01",
    title: "Discover",
    description:
      "We dig into your business, audience, competitors, and numbers. The audit reveals opportunities and gaps most teams never see.",
    icon: Search,
  },
  {
    step: "02",
    title: "Strategise",
    description:
      "A bespoke plan — channel mix, budget allocation, KPIs, and a 90-day roadmap. Every recommendation tied to revenue.",
    icon: Lightbulb,
  },
  {
    step: "03",
    title: "Execute",
    description:
      "We ship creative, build landing pages, launch campaigns, write code. Fast turnaround. High standards. Transparent reporting.",
    icon: Rocket,
  },
  {
    step: "04",
    title: "Optimise",
    description:
      "Weekly experiments. Quarterly reviews. We double down on what works, cut what doesn't, and compound growth month over month.",
    icon: TrendingUp,
  },
];

export function Process() {
  return (
    <section className="relative py-24 md:py-40 bg-ink-950">
      <div className="container-fluid">
        <Reveal variant="up">
          <div className="max-w-4xl mb-16 md:mb-24 px-4 md:px-8">
            <h2 className="font-display text-[9vw] font-bold leading-[0.9] tracking-[-0.04em] text-cream">
              The Process.
            </h2>
            <p className="mt-8 text-xl md:text-2xl text-cream/50 max-w-2xl font-sans">
              A proven four-phase methodology. Built from 500+ engagements — refined into a system that compounds growth.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-px bg-cream/10 md:grid-cols-4">
          {PROCESS.map((p, i) => (
            <Reveal
              key={p.step}
              variant="up"
              delay={i * 0.08}
              className="bg-ink-950 p-8 md:p-12 group transition-colors hover:bg-ink-900"
            >
              <div className="flex items-start justify-between mb-16">
                <span className="font-mono text-sm text-cream/40">{p.step}</span>
                <p.icon
                  size={32}
                  strokeWidth={1}
                  className="text-cream/30 transition-colors group-hover:text-cream"
                />
              </div>

              <h3 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4 tracking-tight">
                {p.title}
              </h3>
              <p className="text-cream/60 leading-relaxed font-sans text-lg">
                {p.description}
              </p>

              {/* Hover line */}
              <div className="mt-8 h-px w-12 bg-cream/20 group-hover:w-full group-hover:bg-cream transition-all duration-700" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}