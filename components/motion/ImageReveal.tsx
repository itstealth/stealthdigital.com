"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  src: string;
  alt: string;
  /** Aspect ratio. Default 16/9. */
  aspect?: string;
  /** Direction the mask wipes from. Default "up" (rises from bottom). */
  direction?: "up" | "down" | "left" | "right";
  /** Reveal delay in seconds. */
  delay?: number;
  /** Optional object-fit override. */
  fit?: "cover" | "contain";
  /** Sizes attribute for Next.js Image */
  sizes?: string;
  /** Priority loading */
  priority?: boolean;
  className?: string;
  /** Whether to add a subtle scale-in after reveal. */
  scaleIn?: boolean;
}

/**
 * ImageReveal — image with a clip-path mask that wipes in when scrolled
 * into view. Direction matches Atomic's split-screen reveal patterns.
 * Optional scaleIn adds a subtle zoom for cinematic feel.
 */
export function ImageReveal({
  src,
  alt,
  aspect = "16/9",
  direction = "up",
  delay = 0,
  fit = "cover",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  className,
  scaleIn = true,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only honour reduced-motion AFTER hydration to avoid DOM mismatch.
  const reduce = mounted && reduceMotion === true;

  const initialClip =
    direction === "up"
      ? "inset(100% 0 0 0)"
      : direction === "down"
      ? "inset(0 0 100% 0)"
      : direction === "left"
      ? "inset(0 100% 0 0)"
      : "inset(0 0 0 100%)";

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden bg-ink-800", className)}
      style={{ aspectRatio: aspect }}
    >
      {!reduce && (
        <>
          <motion.div
            initial={{ clipPath: initialClip }}
            animate={
              inView ? { clipPath: "inset(0% 0% 0% 0%)" } : { clipPath: initialClip }
            }
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
            className="absolute inset-0"
          >
            <motion.div
              initial={scaleIn ? { scale: 1.15 } : { scale: 1 }}
              animate={inView && scaleIn ? { scale: 1 } : { scale: 1.15 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay }}
              className="w-full h-full"
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                className={cn(fit === "cover" ? "object-cover" : "object-contain")}
                priority={priority}
              />
            </motion.div>
          </motion.div>
        </>
      )}
      {reduce && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={cn(fit === "cover" ? "object-cover" : "object-contain")}
          priority={priority}
        />
      )}
    </div>
  );
}