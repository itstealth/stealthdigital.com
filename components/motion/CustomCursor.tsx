"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const cursorRef = useRef<HTMLDivElement>(null);

  // Use motion values for smooth tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Add spring physics to make the cursor drag slightly behind the mouse
  const springX = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 0.5 });

  useEffect(() => {
    // Determine if on touch device (we don't want custom cursor on mobile)
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    // The position is a motion value, so it updates without re-rendering.
    // The hover lookup is the expensive half — closest() walks the DOM — so it
    // is throttled to one check per frame, and the two pieces of state are
    // only written when they actually change. Previously every mousemove
    // (120+/sec on a high-refresh mouse) did a tree walk and issued two state
    // updates, re-rendering the cursor continuously while moving.
    let queued = false;
    let latestTarget: HTMLElement | null = null;

    const readHoverState = () => {
      queued = false;
      const cursorElement = latestTarget?.closest("[data-cursor]");
      const nextHovering = Boolean(cursorElement);
      const nextText = cursorElement
        ? cursorElement.getAttribute("data-cursor-text") || "View"
        : "";

      setIsHovering((prev) => (prev === nextHovering ? prev : nextHovering));
      setCursorText((prev) => (prev === nextText ? prev : nextText));
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the cursor size to center it
      mouseX.set(e.clientX - 10);
      mouseY.set(e.clientY - 10);

      latestTarget = e.target as HTMLElement;
      if (!queued) {
        queued = true;
        requestAnimationFrame(readHoverState);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[100] items-center justify-center mix-blend-difference hidden md:flex"
      style={{
        x: springX,
        y: springY,
      }}
      animate={{
        width: isHovering ? 80 : 20,
        height: isHovering ? 80 : 20,
        x: isHovering ? "-30px" : "0px", // offset adjustment for bigger size
        y: isHovering ? "-30px" : "0px",
        backgroundColor: isHovering ? "#FFD60A" : "#FFFFFF",
        mixBlendMode: isHovering ? "normal" : "difference",
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
    >
      <motion.div
        className="rounded-full w-full h-full absolute inset-0 bg-current"
      />
      <motion.span
        className="relative z-10 text-white font-mono text-[10px] uppercase tracking-widest pointer-events-none whitespace-nowrap"
        animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.5 }}
        transition={{ duration: 0.2 }}
      >
        {cursorText}
      </motion.span>
    </motion.div>
  );
}