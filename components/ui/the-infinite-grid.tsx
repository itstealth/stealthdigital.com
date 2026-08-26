"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";

/**
 * InfiniteGrid
 * ------------
 * Absolutely-positioned background layer: a grid that scrolls forever,
 * with a second brighter copy revealed through a radial mask that follows
 * the cursor.
 *
 * Drop it inside any `relative` container — it fills the parent and stays
 * `pointer-events-none`, attaching its mousemove listener to the parent so
 * links and buttons above it keep working.
 *
 * Line colour is `currentColor`, so set it from the parent:
 *   <InfiniteGrid className="text-cream" />
 */

interface InfiniteGridProps {
  /** Sets the grid line colour via currentColor. */
  className?: string;
  /** Grid cell size in px. */
  size?: number;
  /** Scroll speed in px per frame, x and y. */
  speed?: number;
  /** Radius of the cursor reveal, in px. */
  revealRadius?: number;
  /** Opacity of the always-visible base grid. */
  baseOpacity?: number;
  /** Opacity of the cursor-revealed grid. */
  revealOpacity?: number;
  /** Render the demo's orange/blue blur blobs behind the grid. */
  glow?: boolean;
}

export function InfiniteGrid({
  className,
  size = 40,
  speed = 0.5,
  revealRadius = 300,
  baseOpacity = 0.05,
  revealOpacity = 0.4,
  glow = false,
}: InfiniteGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Park the reveal off-canvas so nothing is lit until the cursor arrives.
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  // The footer sits at the bottom of every page, so gate the scroll loop on
  // visibility rather than animating a grid nobody is looking at.
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting)
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;

    const handleMove = (e: MouseEvent) => {
      const { left, top } = parent.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    };
    const handleLeave = () => {
      mouseX.set(-9999);
      mouseY.set(-9999);
    };

    parent.addEventListener("mousemove", handleMove);
    parent.addEventListener("mouseleave", handleLeave);
    return () => {
      parent.removeEventListener("mousemove", handleMove);
      parent.removeEventListener("mouseleave", handleLeave);
    };
  }, [mouseX, mouseY]);

  useAnimationFrame(() => {
    if (!inView || reduceMotion) return;
    offsetX.set((offsetX.get() + speed) % size);
    offsetY.set((offsetY.get() + speed) % size);
  });

  const maskImage = useMotionTemplate`radial-gradient(${revealRadius}px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {glow && (
        <div className="absolute inset-0">
          <div className="absolute right-[-20%] top-[-20%] h-[40%] w-[40%] rounded-full bg-orange-500/40 blur-[120px] dark:bg-orange-600/20" />
          <div className="absolute right-[10%] top-[-10%] h-[20%] w-[20%] rounded-full bg-primary/30 blur-[100px]" />
          <div className="absolute bottom-[-20%] left-[-10%] h-[40%] w-[40%] rounded-full bg-blue-500/40 blur-[120px] dark:bg-blue-600/20" />
        </div>
      )}

      <div className="absolute inset-0" style={{ opacity: baseOpacity }}>
        <GridPattern offsetX={offsetX} offsetY={offsetY} size={size} />
      </div>

      <motion.div
        className="absolute inset-0"
        style={{ opacity: revealOpacity, maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={offsetX} offsetY={offsetY} size={size} />
      </motion.div>
    </div>
  );
}

function GridPattern({
  offsetX,
  offsetY,
  size,
}: {
  offsetX: ReturnType<typeof useMotionValue<number>>;
  offsetY: ReturnType<typeof useMotionValue<number>>;
  size: number;
}) {
  // Unique per instance — the two stacked layers would otherwise both
  // declare the same <pattern id> and the browser would resolve every
  // fill to whichever landed in the document first.
  const patternId = useId();

  return (
    <svg className="h-full w-full">
      <defs>
        <motion.pattern
          id={patternId}
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d={`M ${size} 0 L 0 0 0 ${size}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

/**
 * Component — the original standalone demo from the source registry.
 * Not used by the site; kept so this file stays in sync with upstream.
 * Safe to delete if you don't want the demo around.
 */
export const Component = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
      <InfiniteGrid className="text-muted-foreground" glow />

      <div className="pointer-events-none relative z-10 mx-auto flex max-w-3xl flex-col items-center space-y-6 px-4 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground drop-shadow-sm md:text-6xl">
            The Infinite Grid
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            Move your cursor to reveal the active grid layer. <br />
            The pattern scrolls infinitely in the background.
          </p>
        </div>

        <div className="pointer-events-auto flex gap-4">
          <button
            onClick={() => setCount(count + 1)}
            className="rounded-md bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-95"
          >
            Interact ({count})
          </button>
          <button className="rounded-md bg-secondary px-8 py-3 font-semibold text-secondary-foreground transition-all hover:bg-secondary/80 active:scale-95">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfiniteGrid;
