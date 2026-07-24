"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { CASE_STUDIES } from "@/data/caseStudies";

export function FeaturedWork() {
  return (
    <section id="work" className="relative py-24 md:py-40 bg-ink-950">
      <div className="container-fluid">
        <Reveal variant="up">
          <div className="flex flex-col gap-6 mb-16 md:mb-24 md:flex-row md:items-end md:justify-between px-4 md:px-8">
            <h2 className="font-display text-[11vw] font-bold leading-[0.9] tracking-[-0.04em] text-cream">
              Work.
            </h2>
            <p className="text-cream/50 max-w-sm md:text-right font-sans text-lg mb-2">
              Recent case studies across education, D2C, and B2B. We deliver measurable growth.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 px-4 md:px-8">
          {CASE_STUDIES.slice(0, 4).map((study, i) => (
            <Reveal
              key={study.slug}
              variant="up"
              delay={i * 0.1}
              as="article"
              className={
                i === 0 || i === 3
                  ? "md:col-span-2"
                  : "md:col-span-1"
              }
            >
              <Link
                href={`/contact-us?ref=${study.slug}`}
                className="group block relative overflow-hidden bg-ink-900"
                data-cursor="true"
                data-cursor-text="View"
              >
                <div
                  className={`relative overflow-hidden ${
                    i === 0 || i === 3
                      ? "aspect-[16/7]"
                      : "aspect-[4/5]"
                  }`}
                >
                  <Parallax distance={i % 2 === 0 ? 20 : 15}>
                    <Image
                      src={study.image}
                      alt={study.client}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100"
                    />
                  </Parallax>

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent transition-opacity group-hover:opacity-60" />

                  {/* Top row */}
                  <div className="absolute top-6 left-6 right-6 flex items-start justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                       <span className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-ink-950/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-cream backdrop-blur-md">
                         {study.industry}
                       </span>
                    </div>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute inset-x-6 md:inset-x-12 bottom-6 md:bottom-12">
                    <div className="font-mono text-xs uppercase tracking-[0.2em] text-cream/70 mb-4">
                      {study.client}
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                      <h3 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight text-cream max-w-2xl">
                        {study.title}
                      </h3>
                      
                      <div className="hidden md:flex flex-wrap gap-8 items-center bg-ink-950/50 backdrop-blur-md border border-cream/20 rounded-2xl px-6 py-4">
                        {study.metrics.slice(0, 2).map((m) => (
                          <div key={m.label}>
                            <div className="font-display text-2xl font-bold text-cream leading-none">
                              {m.value}
                            </div>
                            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream/50 mt-1">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}