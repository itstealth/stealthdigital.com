"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll — wraps the app in a Lenis-powered smooth-scroll container.
 * Provides inertia-driven scrolling matching Atomic's feel.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const id = requestAnimationFrame(raf);

    // Expose for any anchor-link buttons
    (window as any).lenis = lenis;

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return null;
}

/** Helper to scroll to a section using Lenis if available, else fallback. */
export function scrollTo(target: string | number) {
  const lenis = (window as any).lenis;
  if (lenis) {
    lenis.scrollTo(target, { offset: -80 });
  } else if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}