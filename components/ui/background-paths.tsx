"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * BackgroundPaths — animated SVG path background with a per-letter
 * spring reveal headline. Adapted from a popular shadcn-style "background
 * paths" hero to fit Stealth Digital's dark `ink-950` / `cream` palette
 * and `font-display` headings.
 *
 * Two ways to use it:
 *
 *  1. Standalone (renders its own full-bleed section). Pass `title` or
 *     `segments` for the headline, and optionally a `cta` for the button.
 *
 *     <BackgroundPaths
 *       segments={[
 *         { text: "We're the team that" },
 *         { text: "makes growth", className: "text-cream/40" },
 *         { text: "real.", className: "text-accent italic" },
 *       ]}
 *       cta={{ label: "Get in touch", href: "/contact-us" }}
 *     />
 *
 *  2. As a background layer inside an existing section. Wrap the page
 *     content yourself and pass `asBackground` so the component does
 *     NOT render its own min-h-screen container.
 */

type Segment = {
  text: string;
  className?: string;
};

type Cta = {
  label: string;
  href: string;
  showArrow?: boolean;
};

interface BackgroundPathsProps {
  /** Single-style title. Ignored if `segments` or `lines` is provided. */
  title?: string;
  /** Per-segment title on a single line — use this when different words
   *  need different colors / weights. */
  segments?: Segment[];
  /** Multi-line title. Each entry is one line; each line is an array of
   *  styled segments. The second line starts ~180ms after the first so
   *  the reveal feels like a wave. */
  lines?: Segment[][];
  /** Optional content rendered ABOVE the headline — e.g. an eyebrow
   *  label or section number. */
  eyebrow?: React.ReactNode;
  /** Optional CTA below the headline. */
  cta?: Cta;
  /** Optional content rendered below the headline — e.g. a description
   *  paragraph and a stats band. */
  children?: React.ReactNode;
  /** When true, the component renders only the path SVG and the headline
   *  without its own min-h-screen wrapper — useful for layering inside
   *  an existing section. */
  asBackground?: boolean;
  /** When true, the component sizes to its content rather than filling
   *  the viewport. Use this to embed the animation in an existing
   *  section. */
  compact?: boolean;
  className?: string;
}

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    // Accent yellow (#FFD60A) at escalating opacity per path.
    color: `rgba(255,214,10,${0.08 + i * 0.025})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-accent"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

function Headline({
  segments,
  title,
  lines,
}: {
  segments?: Segment[];
  title?: string;
  lines?: Segment[][];
}) {
  // Three modes, in order of priority:
  //   1. `lines`  — multi-line, each line an array of styled segments.
  //   2. `segments` — single line, each entry a styled run.
  //   3. `title` — single line, one style for the whole string.
  const resolvedLines: Segment[][] = lines
    ? lines
    : [segments ?? [{ text: title ?? "" }]];

  // Per-line delay so the second line starts a beat after the first.
  const LINE_DELAY = 0.18;

  return (
    <h1 className="font-display text-[36px] sm:text-[52px] md:text-[72px] lg:text-[96px] font-bold mb-8 tracking-[-0.03em] leading-[0.95]">
      {resolvedLines.map((line, lineIndex) => (
        <span
          key={lineIndex}
          className="block"
        >
          {line.map((run, runIndex) => (
            <span key={runIndex} className="inline-block mr-4 last:mr-0">
              {run.text.split("").map((letter, letterIndex) => (
                <motion.span
                  key={`${lineIndex}-${runIndex}-${letterIndex}`}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay:
                      lineIndex * LINE_DELAY +
                      runIndex * 0.1 +
                      letterIndex * 0.03,
                    type: "spring",
                    stiffness: 150,
                    damping: 25,
                  }}
                  className={cn(
                    "inline-block text-transparent bg-clip-text",
                    "bg-gradient-to-b from-cream to-cream/70",
                    run.className
                  )}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

export function BackgroundPaths({
  title = "Background Paths",
  segments,
  lines,
  eyebrow,
  cta,
  children,
  asBackground = false,
  compact = false,
  className,
}: BackgroundPathsProps) {
  const pathsAndHeadline = (
    <>
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div
        className={cn(
          "relative z-10 container-x text-center",
          asBackground ? "py-16 md:py-24" : ""
        )}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-5xl mx-auto"
        >
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-10 flex justify-center"
            >
              {eyebrow}
            </motion.div>
          )}

          <Headline segments={segments} title={title} lines={lines} />

          {cta && (
            <div
              className="inline-block group relative bg-gradient-to-b from-white/10 to-black/10
              p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl
              transition-shadow duration-300"
            >
              <Button
                href={cta.href}
                variant="primary"
                size="lg"
                showArrow={cta.showArrow}
                magnetic
                magneticStrength={25}
              >
                {cta.label}
              </Button>
            </div>
          )}

          {children}
        </motion.div>
      </div>
    </>
  );

  if (asBackground) {
    return (
      <div className={cn("absolute inset-0 overflow-hidden", className)}>
        {pathsAndHeadline}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full flex items-center justify-center overflow-hidden bg-ink-950",
        compact ? "py-16 md:py-24" : "min-h-screen",
        className
      )}
    >
      {pathsAndHeadline}
    </div>
  );
}
