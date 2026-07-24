"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface BlurWordRevealProps {
  text: string;
  className?: string;
  /** Per-word stagger delay in ms (Atomic uses 80/100/120). */
  stagger?: number;
  /** Initial delay before animation */
  delay?: number;
  /** Element to render. */
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

/**
 * BlurWordReveal — atomic's signature h1 animation.
 * Each word starts at: blur(10px), opacity 0, translateY(50px).
 * On view: animates to blur(0), opacity 1, translateY(0).
 * Uses will-change CSS prop for smooth GPU acceleration.
 */
export function BlurWordReveal({
  text,
  className,
  stagger = 80,
  delay = 0,
  as = "h1",
}: BlurWordRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  const words = text.split(" ");
  const Tag = as as any;

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-[transform,filter,opacity]"
          style={{ marginRight: "0.3em" }}
          initial={{
            filter: "blur(10px)",
            opacity: 0,
            y: 50,
          }}
          animate={
            inView
              ? { filter: "blur(0px)", opacity: 1, y: 0 }
              : { filter: "blur(10px)", opacity: 0, y: 50 }
          }
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + i * (stagger / 1000),
          }}
        >
          {word}
        </motion.span>
      ))}
      {/* Hidden for screen readers */}
      <span className="sr-only">{text}</span>
    </Tag>
  );
}