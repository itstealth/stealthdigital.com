"use client";

import { Reveal } from "@/components/motion/Reveal";
import TextBlockAnimation from "@/components/ui/text-block-animation";
import HowItWorks, { type Step } from "@/components/ui/how-it-works";

/**
 * The four phases of the Stealth Process. Mapped to HowItWorks' Step shape:
 *   title       → phase name (h3 on the card)
 *   description → short body copy that fits the pin card
 *   colorTheme  → rotates orange/blue/purple to match the
 *                 component's 3-color palette (orange is reused for the
 *                 fourth phase)
 *
 * Source: condensed from the previous sticky-stacked phase cards into a
 * single description per phase to fit the pin-card layout.
 */
const STEALTH_PROCESS: Step[] = [
  {
    title: "Discover",
    description:
      "We dig into your business, audience, competitors, and numbers. The audit reveals opportunities and gaps most teams never see.",
    colorTheme: "orange",
  },
  {
    title: "Strategise",
    description:
      "Channel mix, budget allocation, KPIs, and a 90-day roadmap — every recommendation tied to revenue, not vanity metrics.",
    colorTheme: "blue",
  },
  {
    title: "Execute",
    description:
      "Creative, landing pages, campaigns, and code. In-house. On brand. Fast turnaround. Transparent reporting.",
    colorTheme: "purple",
  },
  {
    title: "Optimise",
    description:
      "Weekly experiments. Quarterly reviews. Double down on what works, cut what doesn't, compound growth month over month.",
    colorTheme: "orange",
  },
];

/**
 * Process — "The Process." section.
 *
 * Renders the section header (TextBlockAnimation "The Process." + subtitle)
 * followed by the HowItWorks pin-card layout with Stealth's four phases.
 *
 * The wrapper keeps `bg-black` so the section sits on a pure-black canvas
 * regardless of theme. HowItWorks receives `background="black"` so its
 * decorative grid + edge-gradient layers are not rendered, and
 * `scrollArrow` so a single chevron arrow travels the dotted path between
 * the four phase cards as the section scrolls through the viewport.
 */
export function Process() {
  return (
    <section id="process" className="relative bg-black pt-20 md:pt-28">
      <div className="container-fluid">
        <Reveal variant="up">
          <div className="max-w-4xl mb-6 px-4 md:mb-10 md:px-8">
            <TextBlockAnimation blockColor="#FFD60A">
              <h2 className="font-display text-[9vw] font-bold leading-[0.9] tracking-[-0.04em] text-white">
                The Process
              </h2>
            </TextBlockAnimation>
            <p className="mt-6 max-w-2xl text-xl text-white/50 font-sans md:text-2xl">
              A proven four-phase methodology. Built from 500+ engagements —
              refined into a system that compounds growth.
            </p>
          </div>
        </Reveal>
      </div>

      <HowItWorks
        features={STEALTH_PROCESS}
        background="black"
        scrollArrow={{ enabled: true, color: "#FFD60A", glowRadius: 4 }}
      />
    </section>
  );
}
