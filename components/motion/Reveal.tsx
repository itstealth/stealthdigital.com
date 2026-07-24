"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fadeUp, stagger, fadeIn } from "./variants";
import { cn } from "@/lib/utils";

/** Atomic's fade-delay preset values (0-500ms). */
export type FadeDelay = 0 | 80 | 100 | 120 | 150 | 200 | 240 | 300 | 400 | 500;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms. Use FadeDelay type for type-safety with Atomic presets. */
  delay?: FadeDelay | number;
  once?: boolean;
  variant?: "fade" | "up" | "stagger";
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Reveal — wrapper that fades children in when scrolled into view.
 *
 * SSR-safety: `useReducedMotion()` returns `null` on the server and
 * `true`/`false` on the client. If we branched on its value directly,
 * the server would render the animated `motion` element while a client
 * with reduced-motion enabled would render a plain element — a DOM
 * structure mismatch that causes `removeChild` errors during hydration.
 *
 * Fix: gate the reduced-motion branch on a `mounted` flag so both
 * server and the very first client render produce identical DOM.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  once = true,
  variant = "up",
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: "0px 0px -80px 0px" });
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only honour the reduced-motion preference AFTER hydration so the
  // server and first client render produce identical markup.
  const shouldReduceMotion = mounted && reduceMotion === true;

  const variants =
    variant === "fade" ? fadeIn : variant === "stagger" ? stagger(0.08) : fadeUp;

  const MotionTag = motion[as as keyof typeof motion] as any;

  if (shouldReduceMotion) {
    const Tag = as as any;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ delay: delay / 1000 }}
    >
      {children}
    </MotionTag>
  );
}

/** Hook: detect when an element enters viewport. Useful for counters. */
export function useInViewOnce(threshold = 0.3) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || inView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [inView, threshold]);

  return { ref, inView };
}
