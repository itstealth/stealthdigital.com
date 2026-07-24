"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Zap, Heart, BookOpen, Trophy } from "lucide-react";
import { Reveal, type FadeDelay } from "@/components/motion/Reveal";

export interface DifferenceCard {
  n: string;
  title: string;
  description: string;
}

const ICONS = { Zap, Heart, BookOpen, Trophy };

interface DifferenceCarouselProps {
  cards: DifferenceCard[];
  iconKeys: (keyof typeof ICONS)[];
}

/**
 * DifferenceCarousel — 4 horizontally-scrollable cards, each with
 * large number, heading, description, and SVG icon. Matches Atomic's
 * data-diff-text pattern. Cards fade in with 80ms stagger.
 */
export function DifferenceCarousel({ cards, iconKeys }: DifferenceCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative -mx-5 md:-mx-8 lg:-mx-12">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto px-5 md:px-8 lg:px-12 py-4 gap-4 snap-x snap-mandatory scrollbar-none"
      >
        {cards.map((card, i) => {
          const Icon = ICONS[iconKeys[i]];
          return (
            <Reveal
              key={card.n}
              variant="up"
              delay={(80 + i * 80) as FadeDelay}
              className="snap-start shrink-0 w-[80vw] sm:w-[420px] md:w-[460px] lg:w-[480px]"
            >
              <div className="bg-[#FEE2E2] rounded-[10px] h-full flex flex-col overflow-hidden">
                <div className="px-6 sm:px-8 md:px-10 pt-8 md:pt-10 flex items-center gap-4 min-h-[90px]">
                  <span
                    data-diff-text="true"
                    className="text-accent font-bold text-3xl md:text-5xl lg:text-6xl leading-none tracking-tight shrink-0 w-16 md:w-24 lg:w-32"
                  >
                    {card.n}
                  </span>
                  <h3
                    data-diff-text="true"
                    className="text-accent text-lg md:text-2xl lg:text-3xl font-bold leading-[1.15] tracking-tight flex-1 min-w-0"
                  >
                    {card.title}
                  </h3>
                </div>

                <div
                  data-diff-text="true"
                  className="px-6 sm:px-8 md:px-10 flex-1 flex items-start pt-4"
                >
                  <p className="text-[#1F1E1E] text-sm md:text-base leading-[1.4] max-w-[640px] flex-1">
                    {card.description}
                  </p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
                    className="shrink-0 w-16 md:w-24 lg:w-28 flex items-center justify-center self-end"
                  >
                    <Icon
                      size={100}
                      strokeWidth={1.5}
                      className="text-accent w-full h-full max-w-full"
                    />
                  </motion.div>
                </div>

                <div className="px-6 sm:px-8 md:px-10 pb-8 md:pb-10" />
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Edge fades for horizontal scroll hint */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-20 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-20 bg-gradient-to-l from-ink-950 to-transparent" />

      <style jsx>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}