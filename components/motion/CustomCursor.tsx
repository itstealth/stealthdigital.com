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

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the cursor size to center it
      mouseX.set(e.clientX - 10);
      mouseY.set(e.clientY - 10);

      // Check if we are hovering over an element that wants the custom cursor
      const target = e.target as HTMLElement;
      const cursorElement = target.closest("[data-cursor]");

      if (cursorElement) {
        setIsHovering(true);
        const text = cursorElement.getAttribute("data-cursor-text") || "View";
        setCursorText(text);
      } else {
        setIsHovering(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
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