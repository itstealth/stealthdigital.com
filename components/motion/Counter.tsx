"use client";

import { useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef } from "react";

interface CounterProps {
  /** Final value to count up to. */
  to: number;
  /** Duration in seconds. */
  duration?: number;
  /** Optional suffix (%, +, k, etc). */
  suffix?: string;
  /** Optional prefix. */
  prefix?: string;
  className?: string;
  /** Decimal places to show. */
  decimals?: number;
}

/**
 * Counter — animates a number from 0 → `to` when scrolled into view.
 * Used in StatsMarquee and case study results.
 */
export function Counter({
  to,
  duration = 2,
  suffix = "",
  prefix = "",
  className,
  decimals = 0,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    decimals > 0
      ? latest.toFixed(decimals)
      : Math.floor(latest).toLocaleString("en-IN")
  );
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, count, to, duration, rounded]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}