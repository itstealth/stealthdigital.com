"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** Distance in pixels the element travels relative to scroll. */
  distance?: number;
  /** Direction of the parallax effect. */
  direction?: "up" | "down";
}

/**
 * Parallax — wrapper that moves children by `distance` pixels as the
 * section scrolls through the viewport.
 *
 * SSR-safety: gates the `useReducedMotion()` branch on a `mounted` flag
 * so server and first client render produce identical DOM (avoids the
 * `removeChild` hydration error caused by the null → true/false flip).
 */
export function Parallax({
  children,
  className,
  distance = 40,
  direction = "up",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const factor = direction === "up" ? -1 : 1;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [distance * factor, -distance * factor]
  );

  const shouldReduceMotion = mounted && reduceMotion === true;

  if (shouldReduceMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
