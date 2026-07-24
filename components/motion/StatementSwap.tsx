"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface StatementSwapProps {
  /** First text (visible at top of section). */
  text1: string;
  /** Second text (replaces first as user scrolls past). */
  text2: string;
  className?: string;
}

/**
 * StatementSwap — Atomic's signature scroll-driven text replace.
 * Text1 is visible at top, Text2 is initially hidden below with translateY.
 * As user scrolls, Text2 slides up and pushes Text1 out of view (becomes invisible).
 */
export function StatementSwap({
  text1,
  text2,
  className,
}: StatementSwapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only honour reduced-motion AFTER hydration to avoid DOM mismatch.
  const reduce = mounted && reduceMotion === true;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Text1 fades out and moves up
  const y1 = useTransform(scrollYProgress, [0, 0.4], [0, -80]);
  const opacity1 = useTransform(scrollYProgress, [0.1, 0.4], [1, 0]);
  const filter1 = useTransform(scrollYProgress, [0.1, 0.4], ["blur(0px)", "blur(8px)"]);

  // Text2 fades in from below
  const y2 = useTransform(scrollYProgress, [0.1, 0.5], [80, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const filter2 = useTransform(scrollYProgress, [0.1, 0.5], ["blur(8px)", "blur(0px)"]);

  if (reduce) {
    return <h2 className={className}>{text2}</h2>;
  }

  return (
    <div ref={ref} className="relative min-h-[60vh] flex items-center justify-center">
      {/* Text1 (visible at top) */}
      <motion.h2
        style={{
          y: y1,
          opacity: opacity1,
          filter: filter1,
        }}
        className={className}
      >
        {text1}
      </motion.h2>

      {/* Text2 (replaces as you scroll) */}
      <motion.h2
        style={{
          y: y2,
          opacity: opacity2,
          filter: filter2,
        }}
        className={`${className} absolute inset-0 flex items-center justify-center`}
        aria-hidden
      >
        {text2}
      </motion.h2>
    </div>
  );
}