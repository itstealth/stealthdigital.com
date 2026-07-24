"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface RollingDigitProps {
  /** The final value (e.g., "5B+", "98%", "150"). */
  value: string;
  /** Duration of full roll animation in ms. */
  duration?: number;
  className?: string;
}

/**
 * RollingDigit — slot-machine style counter where each character rolls
 * into place from translateY(100%) or translateY(-100%) inside a masked
 * overflow:hidden span. Matches Atomic's stat-card counter pattern.
 */
export function RollingDigit({
  value,
  duration = 1800,
  className,
}: RollingDigitProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView) setStarted(true);
  }, [inView]);

  // Split string into characters for individual rolling
  const chars = value.split("");

  return (
    <span ref={ref} className={className} aria-label={value}>
      {chars.map((char, i) => {
        const isSpace = char === " ";
        const fromTop = i % 2 === 0;

        return (
          <span
            key={i}
            className="relative overflow-hidden inline-flex align-baseline"
            style={{
              height: "1em",
              lineHeight: "1em",
              width: isSpace ? "0.3em" : undefined,
            }}
            aria-hidden
          >
            <span
              className="inline-block will-change-transform"
              style={{
                transform: started
                  ? "translateY(0%)"
                  : `translateY(${fromTop ? "-100%" : "100%"})`,
                transition: `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${
                  (i * duration) / (chars.length * 3)
                }ms`,
              }}
            >
              {char}
            </span>
          </span>
        );
      })}
      <span className="sr-only">{value}</span>
    </span>
  );
}