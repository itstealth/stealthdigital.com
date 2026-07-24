"use client";

import { motion } from "framer-motion";
import React from "react";

interface SplitTextHoverProps {
  children: string;
  className?: string;
  staggerDelay?: number;
}

export function SplitTextHover({
  children,
  className = "",
  staggerDelay = 0.02,
}: SplitTextHoverProps) {
  return (
    <motion.span
      initial="initial"
      whileHover="hover"
      className={`relative inline-flex overflow-hidden ${className}`}
    >
      {/* Top Text (visible initially, moves up on hover) */}
      <span className="inline-flex">
        {children.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: 0 },
              hover: { y: "-100%" },
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1], // Expo ease out like GSAP
              delay: i * staggerDelay,
            }}
            className="inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </span>

      {/* Bottom Text (hidden below initially, moves up to replace on hover) */}
      <span className="absolute inset-0 inline-flex text-accent">
        {children.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: "100%" },
              hover: { y: 0 },
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
              delay: i * staggerDelay,
            }}
            className="inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}
