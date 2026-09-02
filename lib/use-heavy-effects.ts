"use client";

import { useEffect, useState } from "react";

/**
 * Whether this device should run the expensive decorative effects (the WebGL
 * fluid cursor, the Spline 3D scene). Returns false until measured, so the
 * effect is opt-in rather than opt-out — a first paint without the effect is
 * far cheaper to recover from than one that janks.
 *
 * Bails out on: reduced-motion preferences, data-saver, low core counts, low
 * reported memory, and touch/coarse pointers (where a cursor effect has
 * nothing to track anyway).
 */
export function useHeavyEffectsAllowed(): boolean {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const saveData = nav.connection?.saveData === true;
    const fewCores =
      typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4;
    const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;

    setAllowed(
      !reducedMotion && !coarsePointer && !saveData && !fewCores && !lowMemory
    );
  }, []);

  return allowed;
}
