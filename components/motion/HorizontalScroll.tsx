"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  /** How far the content translates horizontally per 100% scroll through the section. */
  amount?: number;
  /** Height of the sticky scroll area (px or vh). Default 200vh. */
  height?: string;
}

/**
 * HorizontalScroll — vertical scroll drives horizontal translation.
 * Atomic's site uses similar patterns on case study and process sections.
 */
export function HorizontalScroll({
  children,
  className,
  amount = 80,
  height = "200vh",
}: HorizontalScrollProps) {
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
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, `-${amount}%`]
  );

  if (reduce) {
    return (
      <div ref={ref} className={cn("overflow-x-auto", className)}>
        <div className="flex">{children}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("relative", className)} style={{ height }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex will-change-transform"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}