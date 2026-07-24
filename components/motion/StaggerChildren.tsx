"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect, createElement } from "react";
import { stagger } from "./variants";
import { cn } from "@/lib/utils";

/** Atomic's stagger preset values (60-300ms). */
export type StaggerDelay = 60 | 80 | 100 | 120 | 150 | 300;

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  /** Delay between each child animation in ms. Atomic uses 60/80/100/120/150/300. */
  delay?: StaggerDelay | number;
  /** Initial delay before animation starts in ms. */
  startDelay?: number;
  /** Trigger on viewport intersection */
  triggerOnView?: boolean;
  /** Element type. */
  as?: "div" | "section" | "ul" | "ol";
}

/**
 * StaggerChildren — wraps children so each one fades up in sequence.
 * Atomic uses this pattern with `data-stagger="100"` etc.
 * Pair with `<StaggerItem>` children for the per-item animation.
 */
export function StaggerChildren({
  children,
  className,
  delay = 100,
  startDelay = 0,
  triggerOnView = true,
  as = "div",
}: StaggerChildrenProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only honour reduced-motion AFTER hydration to avoid DOM mismatch.
  const reduce = mounted && reduceMotion === true;

  const variants = stagger(delay / 1000);

  if (reduce) {
    return createElement(as, { className }, children);
  }

  return createElement(
    motion[as] as any,
    {
      ref,
      className: cn(className),
      initial: "hidden",
      animate: triggerOnView ? (inView ? "visible" : "hidden") : "visible",
      variants,
      transition: { delayChildren: startDelay / 1000 },
    },
    children
  );
}

/** Individual item inside StaggerChildren. */
export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  return createElement(
    motion[as] as any,
    {
      className: cn(className),
      variants: {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      },
    },
    children
  );
}