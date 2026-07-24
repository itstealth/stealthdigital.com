"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

/**
 * About — "Better Growth Starts With the Right Partner" section.
 * Placed on the home page (and reusable elsewhere). Two-column layout:
 * the strategic pitch on the left, key differentiators on the right.
 */
export function About() {
  const differentiators = [
    {
      title: "We listen first",
      description:
        "Every engagement starts with deep discovery — your goals, your audience, your constraints. We don't sell packages, we design solutions.",
    },
    {
      title: "We measure what matters",
      description:
        "Rankings and traffic are vanity. We track conversions, leads, revenue, and ROI — the numbers that pay your bills.",
    },
    {
      title: "We move as one team",
      description:
        "SEO, performance media, social, web, design — integrated under a single strategy. No silos, no finger-pointing between departments.",
    },
    {
      title: "We build for the long game",
      description:
        "Quick wins matter, but compounding growth matters more. We optimise for sustainable results, not quarterly vanity spikes.",
    },
  ];

  return (
    <section className="relative py-24 md:py-40 bg-ink-950">
      <div className="container-fluid">
        <div className="grid gap-12 md:gap-20 md:grid-cols-12">
          {/* Left: headline + body */}
          <Reveal variant="up" className="md:col-span-7">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              [About Stealth Digital]
            </div>
            <h2 className="font-display text-[9vw] md:text-[6vw] font-bold leading-[0.95] tracking-[-0.04em] text-cream text-balance">
              Better Growth Starts With the Right Partner.
            </h2>
            <p className="mt-8 text-lg md:text-xl text-cream/70 leading-relaxed max-w-2xl font-sans">
              Growth becomes easier with the right team beside you. We take time
              to understand your goals, provide clear guidance, and build digital
              strategies that support long-term growth — not short-lived spikes.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="/contact-us" variant="primary" size="lg" showArrow magnetic>
                Start a Conversation
              </Button>
              <Link
                href="/our-digital-agency"
                className="group inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.15em] text-cream/70 hover:text-cream transition-colors"
              >
                Learn more about us
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>

          {/* Right: differentiators */}
          <div className="md:col-span-5 space-y-8">
            {differentiators.map((d, i) => (
              <Reveal key={d.title} variant="up" delay={i * 0.08}>
                <div className="border-t border-cream/10 pt-6">
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-sm text-accent shrink-0 mt-1">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-cream tracking-tight">
                        {d.title}
                      </h3>
                      <p className="mt-2 text-cream/65 leading-relaxed">
                        {d.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
