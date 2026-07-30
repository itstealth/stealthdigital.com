"use client";

import { Suspense, lazy, useEffect } from "react";

// Spline pulls ~1MB+ on the client; lazy-load it so the hero stays
// cheap and only the robot scene pays the cost when it scrolls in.
const Spline = lazy(() => import("@splinetool/react-spline"));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

/**
 * Hides the "Built with Spline" watermark that the Spline runtime
 * injects on the canvas. Spline only officially lets paid plans
 * remove the badge, but the DOM node it lives in is queryable —
 * injecting a high-specificity style block lets us suppress it
 * without forking the runtime.
 *
 * Multiple selectors are used because the watermark element's class
 * names have shifted between Spline runtime versions.
 */
function useHideSplineWatermark() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "spline-watermark-hider";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      /* Hide the "Built with Spline" badge regardless of which
         runtime version rendered it. */
      [class*="spline-watermark"],
      [class*="spline-logo"],
      [class*="SplineLogo"],
      [class*="built-with-spline"],
      [class*="BuiltWithSpline"],
      [data-spline-watermark],
      a[href*="spline.design"][target="_blank"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        width: 0 !important;
        height: 0 !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.getElementById(styleId)?.remove();
    };
  }, []);
}

/**
 * InteractiveRobotSpline
 * ----------------------
 * Lazy-loaded wrapper around `@splinetool/react-spline` with a
 * dark-themed spinner fallback. Pass any `*.splinecode` URL via the
 * `scene` prop. The component takes the full size of its parent —
 * set `className` to control positioning (`absolute inset-0`, etc.).
 */
export function InteractiveRobotSpline({
  scene,
  className,
}: InteractiveRobotSplineProps) {
  useHideSplineWatermark();

  return (
    <Suspense
      fallback={
        <div
          className={`w-full h-full flex items-center justify-center bg-ink-950 ${className ?? ""}`}
        >
          <svg
            className="animate-spin h-5 w-5 text-cream mr-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"
            />
          </svg>
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}

export default InteractiveRobotSpline;