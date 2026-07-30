"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/motion/TextReveal";
import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  /**
   * Optional right-side slot (e.g. a 3D Spline scene, an image, a chart).
   * Rendered absolutely on the right at lg+ viewports; hidden on smaller
   * screens so the heading keeps full width. Pass any ReactNode and
   * style its own width/height via className on the element you pass in.
   */
  aside?: ReactNode;
}

/**
 * PageHero — reusable hero for inner pages. Editorial style with
 * massive headline + reveal animation. Optional `aside` slot renders
 * on the right at lg+ so pages can decorate the heading with media
 * without breaking the editorial layout.
 */
export function PageHero({ eyebrow, title, description, aside }: PageHeroProps) {
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

      <div className="container-x relative">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
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

          {aside && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block lg:col-span-4 relative h-[420px] xl:h-[520px]"
            >
              {aside}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}