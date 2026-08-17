"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { textReveal, stagger } from "./variants";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
  /** Split by "word" or "char" */
  splitBy?: "word" | "char";
  /** Per-item stagger in ms. Default 35. */
  staggerDelay?: number;
  /** Initial delay before animation starts */
  delay?: number;
}

/**
 * TextReveal — splits text into words/chars and animates each upward
 * through an overflow:hidden mask. Matches Atomic's `data-reveal="true"`,
 * `data-reveal-group="true"`, and `data-reveal-group-nested="true"`.
 */
export function TextReveal({
  text,
  className,
  as = "span",
  splitBy = "word",
  staggerDelay = 35,
  delay = 0,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  const items = splitBy === "char" ? text.split("") : text.split(" ");

  const MotionTag = motion[as] as any;

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger(staggerDelay / 1000)}
      transition={{ delay: delay / 1000, delayChildren: delay / 1000 }}
    >
      {items.map((item, i) => (
        <span
          key={i}
          className="reveal-mask"
          style={{ marginRight: splitBy === "word" ? "0.25em" : 0 }}
        >
          <motion.span variants={textReveal} className="inline-block">
            {item === "" ? " " : item}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}