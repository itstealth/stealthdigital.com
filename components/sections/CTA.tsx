"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";

import { SplitTextHover } from "@/components/motion/SplitTextHover";
import TextBlockAnimation from "@/components/ui/text-block-animation";

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 border-y border-cream/10 overflow-hidden bg-ink-950"
    >
      <div className="container-x relative text-center">
        <Reveal variant="up">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-8 bg-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Let's Build</span>
            <span className="h-px w-8 bg-accent" />
          </div>
        </Reveal>

        <Reveal variant="up" delay={0.1}>
          <TextBlockAnimation blockColor="#FFD60A">
            <h2 className="font-display text-[56px] sm:text-[80px] md:text-[120px] lg:text-[150px] font-bold leading-[0.9] tracking-[-0.04em] text-cream max-w-5xl mx-auto">
              Ready to <span className="text-accent italic">scale?</span>
            </h2>
          </TextBlockAnimation>
        </Reveal>

        <Reveal variant="up" delay={0.25}>
          <p className="mt-8 max-w-xl mx-auto text-lg font-sans text-cream/70 leading-relaxed">
            Tell us about your goals. We'll send back a custom growth plan
            within 48 hours — no fluff, no sales deck.
          </p>
        </Reveal>

        <Reveal variant="up" delay={0.35}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={25} as="span">
              <Link
                href="/contact-us"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-accent px-8 text-base font-semibold text-white transition-all hover:opacity-80"
              >
                <SplitTextHover>Start a Project</SplitTextHover>
                <ArrowUpRight
                  size={18}
                  strokeWidth={2.5}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </Magnetic>
            <Magnetic strength={20} as="span">
              <Link
                href="tel:+919910694833"
                className="group inline-flex h-14 items-center gap-2 rounded-full border border-cream/20 px-7 text-sm font-medium uppercase tracking-[0.15em] text-cream transition-colors hover:border-accent hover:text-accent"
              >
                <SplitTextHover>Call Us Now</SplitTextHover>
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}