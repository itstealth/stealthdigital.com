"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/motion/TextReveal";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
}

/**
 * PageHero — reusable hero for inner pages. Editorial style with
 * massive headline + reveal animation.
 */
export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-24 border-b border-cream/10">
      <div className="absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ duration: 1.6 }}
          className="absolute right-[-10%] top-[10%] h-[60vh] w-[60vh] rounded-full bg-accent blur-[140px]"
        />
      </div>

      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="h-px w-10 bg-accent" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            [{eyebrow}]
          </span>
        </motion.div>

        <TextReveal
          as="h1"
          text={title}
          splitBy="word"
          className="font-display text-[44px] sm:text-[64px] md:text-[88px] lg:text-[112px] font-bold leading-[0.95] tracking-[-0.04em] text-balance text-cream max-w-5xl"
        />

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10 text-lg md:text-xl text-cream/70 leading-relaxed max-w-2xl text-pretty"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}