"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export interface ThinkingTab {
  title: string;
  description: string;
}

interface ThinkingTabsProps {
  tabs: ThinkingTab[];
  className?: string;
}

/**
 * ThinkingTabs — accordion with animated progress bar.
 * Each row has a title, expandable description (height 0 → auto),
 * and a 1px progress line that scales X from 0 → 1 while open.
 * Matches Atomic's data-tab-content / data-tab-details / data-tab-progress pattern.
 */
export function ThinkingTabs({ tabs, className }: ThinkingTabsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={`divide-y divide-cream/15 border-y border-cream/15 ${className ?? ""}`}>
      {tabs.map((tab, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={tab.title} className="relative">
            <button
              type="button"
              data-tab-content="true"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full text-left group py-6 md:py-8"
              aria-expanded={isOpen}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-cream leading-[1.15] tracking-tight flex-1">
                  {tab.title}
                </h3>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="shrink-0 inline-flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-cream/20 text-cream group-hover:border-accent group-hover:text-accent"
                >
                  <Plus size={16} strokeWidth={2} />
                </motion.span>
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    data-tab-details="true"
                    className="overflow-hidden"
                  >
                    <p className="pt-4 md:pt-5 text-base md:text-lg text-cream/70 leading-relaxed max-w-3xl pr-12">
                      {tab.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress bar — animates when open */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-cream/15">
                <motion.div
                  data-tab-progress="true"
                  initial={{ scaleX: 0 }}
                  animate={isOpen ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{
                    duration: isOpen ? 6 : 0.4,
                    ease: isOpen ? "linear" : [0.22, 1, 0.36, 1],
                  }}
                  className="h-full bg-accent origin-left"
                />
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}