"use client";

import { useRef, Children, cloneElement, isValidElement, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/** Atomic-preset magnetic strengths. */
export type MagneticStrength = 15 | 20 | 25 | 30 | 40 | 50;

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** Strength of magnetic pull. Atomic uses 15, 25, 30, 50. */
  strength?: MagneticStrength | number;
  /** If true, apply reverse magnetic effect to the immediate child. */
  innerTarget?: boolean;
  innerStrength?: MagneticStrength | number;
  as?: "div" | "span" | "button" | "a";
}

/**
 * Magnetic — wrapper that makes content physically follow the cursor
 * on hover. Uses capped displacement (% of element half-width, not
 * unbounded pixels) to avoid breaking hover state on large buttons.
 *
 * Implementation details:
 *   - Lock the target rect at mouse-enter so the displacement is
 *     consistent during the lifetime of the hover.
 *   - Cap displacement at 30% of the element's smallest dimension
 *     so the inner content never escapes the hit box.
 *   - Supports an `innerTarget` mode (atomic's data-magnetic-inner-target)
 *     where the child moves in the opposite direction for parallax.
 */
export function Magnetic({
  children,
  className,
  strength = 30,
  innerTarget = false,
  innerStrength = 25,
  as = "div",
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [locked, setLocked] = useState<{ cx: number; cy: number; cap: number } | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 18, stiffness: 220, mass: 0.4 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  function onEnter(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cap = Math.min(rect.width, rect.height) * 0.3; // max 30% of smaller axis
    setLocked({
      cx: rect.left + rect.width / 2,
      cy: rect.top + rect.height / 2,
      cap,
    });
  }

  function onMove(e: React.MouseEvent) {
    if (!locked || !ref.current) return;
    const dx = e.clientX - locked.cx;
    const dy = e.clientY - locked.cy;

    // Cap displacement so the moving content stays near the hit box
    let tx = dx * (strength / 100);
    let ty = dy * (strength / 100);
    if (tx > locked.cap) tx = locked.cap;
    if (tx < -locked.cap) tx = -locked.cap;
    if (ty > locked.cap) ty = locked.cap;
    if (ty < -locked.cap) ty = -locked.cap;

    x.set(tx);
    y.set(ty);
  }

  function onLeave() {
    setLocked(null);
    x.set(0);
    y.set(0);
  }

  const MotionTag = motion[as] as any;

  return (
    <MotionTag
      ref={ref}
      className={cn("inline-block", className)}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
    >
      {innerTarget
        ? Children.map(children, (child, i) => {
            if (!isValidElement(child)) return child;
            return (
              <InnerMagnetic key={i} strength={innerStrength}>
                {child}
              </InnerMagnetic>
            );
          })
        : children}
    </MotionTag>
  );
}

function InnerMagnetic({
  children,
  strength,
}: {
  children: React.ReactNode;
  strength: MagneticStrength | number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [locked, setLocked] = useState<{ cx: number; cy: number; cap: number } | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Inverted — moves opposite of parent for parallax depth
  const sx = useSpring(x, { damping: 22, stiffness: 250, mass: 0.3 });
  const sy = useSpring(y, { damping: 22, stiffness: 250, mass: 0.3 });

  function onEnter(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setLocked({
      cx: rect.left + rect.width / 2,
      cy: rect.top + rect.height / 2,
      cap: Math.min(rect.width, rect.height) * 0.3,
    });
  }

  function onMove(e: React.MouseEvent) {
    if (!locked || !ref.current) return;
    const dx = e.clientX - locked.cx;
    const dy = e.clientY - locked.cy;
    let tx = -dx * (strength / 100);
    let ty = -dy * (strength / 100);
    if (tx > locked.cap) tx = locked.cap;
    if (tx < -locked.cap) tx = -locked.cap;
    if (ty > locked.cap) ty = locked.cap;
    if (ty < -locked.cap) ty = -locked.cap;
    x.set(tx);
    y.set(ty);
  }

  function onLeave() {
    setLocked(null);
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      className="inline-block"
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
    >
      {children}
    </motion.span>
  );
}