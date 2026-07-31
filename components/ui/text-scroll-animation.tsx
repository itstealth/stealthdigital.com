"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Search, Target, Code, TrendingUp, type LucideIcon } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
};

/**
 * CharacterV1 — text character that converges to center on scroll.
 * Each letter has a horizontal offset and a 3D rotation proportional
 * to its distance from the headline's center index. As scrollYProgress
 * moves 0 → 0.5, every character animates to its final position.
 */
const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);

  return (
    <motion.span
      className={cn("inline-block text-accent", isSpace && "w-4")}
      style={{ x, rotateX }}
    >
      {char}
    </motion.span>
  );
};

type ProcessStep = {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
  duration: string;
};

type CardProps = {
  step: ProcessStep;
  index: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
  rotate?: boolean;
};

const SPREAD_X_CARD = 220; // pixels of horizontal offset per step from center

/**
 * ProcessCardV2 / V3 — process step cards that converge to center on
 * scroll. V2 uses x + y + scale. V3 adds a 3D rotation and a more
 * aggressive horizontal spread. Each card carries the step number,
 * icon, title, duration, and a one-line description.
 */
const ProcessCardV2 = ({ step, index, centerIndex, scrollYProgress }: CardProps) => {
  const distanceFromCenter = index - centerIndex;
  const { icon: Icon } = step;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * SPREAD_X_CARD, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);
  const y = useTransform(
    scrollYProgress,
    [0, 0.5],
    [Math.abs(distanceFromCenter) * 50, 0]
  );

  return (
    <motion.div
      className="flex w-[260px] flex-col gap-4 rounded-2xl border border-cream/10 bg-ink-900 p-6 will-change-transform"
      style={{ x, scale, y, transformOrigin: "center" }}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
          Step {step.step}
        </span>
        <Icon className="h-5 w-5 text-cream/40" strokeWidth={1.5} />
      </div>
      <h3 className="font-display text-2xl font-bold tracking-tight text-cream">
        {step.title}
      </h3>
      <p className="text-xs text-cream/50 leading-relaxed">{step.description}</p>
      <div className="mt-auto border-t border-cream/10 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40">
        {step.duration}
      </div>
    </motion.div>
  );
};

const ProcessCardV3 = ({ step, index, centerIndex, scrollYProgress }: CardProps) => {
  const distanceFromCenter = index - centerIndex;
  const { icon: Icon } = step;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * (SPREAD_X_CARD + 40), 0]
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.5],
    [-Math.abs(distanceFromCenter) * 20, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);

  return (
    <motion.div
      className="flex w-[260px] flex-col gap-4 rounded-2xl border border-cream/10 bg-ink-900 p-6 will-change-transform"
      style={{ x, rotate, y, scale, transformOrigin: "center" }}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
          Step {step.step}
        </span>
        <Icon className="h-5 w-5 text-cream/40" strokeWidth={1.5} />
      </div>
      <h3 className="font-display text-2xl font-bold tracking-tight text-cream">
        {step.title}
      </h3>
      <p className="text-xs text-cream/50 leading-relaxed">{step.description}</p>
      <div className="mt-auto border-t border-cream/10 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40">
        {step.duration}
      </div>
    </motion.div>
  );
};

/**
 * TextScrollAnimation — three stacked scroll-driven sections:
 *
 *   1. A centered headline "the Process" whose letters converge to
 *      the middle on scroll.
 *   2. A row of the four process step cards that slide and scale together.
 *   3. The same row with a 3D rotation per card.
 *
 * Each block is 210vh tall and is driven by `useScroll` against its own
 * ref, so the animations are independently bound to their own scroll
 * progress. Designed to live INSIDE an existing section (no <main> or
 * Lenis wrapper — both are provided by the app shell).
 */
export function TextScrollAnimation() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const targetRef2 = useRef<HTMLDivElement | null>(null);
  const targetRef3 = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const { scrollYProgress: scrollYProgress2 } = useScroll({ target: targetRef2 });
  const { scrollYProgress: scrollYProgress3 } = useScroll({ target: targetRef3 });

  // "the Process " — trailing space gives the last letter breathing room.
  const text = "the Process ";
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  // The four phases of the Stealth methodology. Mirrors the AdmitOneTicket
  // data in the rest of the Process section so the scroll animation and
  // the static ticket grid read as one coherent set.
  const processSteps: ProcessStep[] = [
    {
      step: "01",
      title: "Discover",
      description: "Deep audit of business, audience, competitors, and numbers.",
      icon: Search,
      duration: "Week 1–2",
    },
    {
      step: "02",
      title: "Strategise",
      description: "Channel mix, budget, KPIs, and a 90-day roadmap tied to revenue.",
      icon: Target,
      duration: "Week 3–4",
    },
    {
      step: "03",
      title: "Execute",
      description: "Creative, landing pages, campaigns, and code — shipped fast.",
      icon: Code,
      duration: "Week 5–10",
    },
    {
      step: "04",
      title: "Optimise",
      description: "Weekly experiments that compound growth month over month.",
      icon: TrendingUp,
      duration: "Ongoing",
    },
  ];
  const cardCenterIndex = Math.floor(processSteps.length / 2);

  return (
    <div className="w-full">
      {/* Block 1 — converging headline */}
      <div
        ref={targetRef}
        className="relative box-border flex h-[210vh] items-center justify-center gap-[2vw] overflow-hidden p-[2vw]"
      >
        <div
          className="font-sans w-full max-w-4xl text-center text-6xl font-bold uppercase tracking-tighter text-cream"
          style={{ perspective: "500px" }}
        >
          {characters.map((char, index) => (
            <CharacterV1
              key={index}
              char={char}
              index={index}
              centerIndex={centerIndex}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>

      {/* Block 2 — process step cards slide in */}
      <div
        ref={targetRef2}
        className="relative -mt-[100vh] box-border flex h-[210vh] flex-col items-center justify-center gap-[2vw] overflow-hidden p-[2vw]"
      >
        <p className="font-sans flex items-center justify-center gap-3 text-2xl font-medium tracking-tight text-cream">
          <span className="font-sans font-medium">four phases, one outcome</span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {processSteps.map((step, index) => (
            <ProcessCardV2
              key={step.step}
              step={step}
              index={index}
              centerIndex={cardCenterIndex}
              scrollYProgress={scrollYProgress2}
            />
          ))}
        </div>
      </div>

      {/* Block 3 — process step cards with rotation */}
      <div
        ref={targetRef3}
        className="relative -mt-[95vh] box-border flex h-[210vh] flex-col items-center justify-center gap-[2vw] overflow-hidden p-[2vw]"
      >
        <p className="font-sans flex items-center justify-center gap-3 text-2xl font-medium tracking-tight text-cream">
          <span className="font-sans font-medium">four phases, one outcome</span>
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-6"
          style={{ perspective: "500px" }}
        >
          {processSteps.map((step, index) => (
            <ProcessCardV3
              key={step.step}
              step={step}
              index={index}
              centerIndex={cardCenterIndex}
              scrollYProgress={scrollYProgress3}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
