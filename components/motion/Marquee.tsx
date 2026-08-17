"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  /** Animation duration in seconds. Lower = faster. */
  speed?: number;
  /** Direction of scroll. */
  reverse?: boolean;
  /** Pause on hover. */
  pauseOnHover?: boolean;
  /**
   * When true, switches to a JS-driven animation path that supports
   * click+drag (and touch drag). Off by default — existing usages keep
   * the CSS animation path with zero behavior change.
   */
  draggable?: boolean;
  /**
   * When true, scrolls vertically instead of horizontally. Uses the
   * `marquee-vertical` keyframe and a top/bottom mask-image fade.
   * Draggable path is horizontal-only for now.
   */
  vertical?: boolean;
  /** Inline style merged onto the animated track (e.g. `animationDelay`). */
  style?: React.CSSProperties;
}

/**
 * Marquee — infinite horizontal ticker.
 *
 * Two render paths:
 *   • CSS path (default)  — pure keyframe animation, hover-pause via
 *     `group-hover:[animation-play-state:paused]`. Used by the logo /
 *     stats / awards / partners tickers.
 *   • JS path (`draggable`) — `requestAnimationFrame` loop with pointer
 *     event drag. Used by `WhatWeDo` so users can manually scroll the
 *     service-card row.
 */
export function Marquee(props: MarqueeProps) {
  const { draggable, ...rest } = props;
  if (draggable) return <DraggableMarquee {...rest} />;
  return <CssMarquee {...rest} />;
}

/* ------------------------------------------------------------------ */
/* CSS path — preserved verbatim from the previous implementation.    */
/* ------------------------------------------------------------------ */

function CssMarquee({
  children,
  className,
  speed = 40,
  reverse = false,
  pauseOnHover = true,
  vertical = false,
  style,
}: Omit<MarqueeProps, "draggable">) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--gap:1rem]",
        vertical
          ? "h-full flex-col [mask-image:linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)]"
          : "w-full [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 gap-[--gap]",
          vertical
            ? "flex-col items-center pb-[--gap]"
            : "items-center pr-[--gap]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `${vertical ? "marquee-vertical" : "marquee"} ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
          ...style,
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* JS path — RAF auto-scroll + pointer-event drag.                    */
/* ------------------------------------------------------------------ */

function DraggableMarquee({
  children,
  className,
  speed = 40,
  reverse = false,
  pauseOnHover = true,
}: Omit<MarqueeProps, "draggable">) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [singleWidth, setSingleWidth] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dragRef = useRef<{ startX: number; startOffset: number } | null>(
    null
  );

  const direction = reverse ? 1 : -1;

  // Measure one set's width on mount + window resize. The track contains
  // `{children}{children}`, so one set = scrollWidth / 2.
  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      setSingleWidth(el.scrollWidth / 2);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Auto-scroll loop. Skipped while dragging or (when `pauseOnHover`)
  // while hovered. Offset is wrapped into [-singleWidth, 0] every frame.
  useEffect(() => {
    if (singleWidth <= 0) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!isDragging && !(pauseOnHover && isHovered)) {
        setOffset((prev) => {
          let next = prev + (direction * singleWidth / speed) * dt;
          if (next < -singleWidth) next += singleWidth;
          else if (next > 0) next -= singleWidth;
          return next;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [singleWidth, direction, speed, isDragging, isHovered, pauseOnHover]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (singleWidth <= 0) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startOffset: offset };
    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    let next = dragRef.current.startOffset + dx;
    // Clamp to ±singleWidth so the visible window always has content
    // (the track is duplicated 2×).
    if (next > singleWidth) next = singleWidth;
    else if (next < -singleWidth) next = -singleWidth;
    setOffset(next);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* capture may already be released on touchend in some browsers */
    }
    dragRef.current = null;
    setIsDragging(false);
    // Snap offset back into the [-singleWidth, 0] loop range so the
    // auto-scroll resumes from a valid position.
    setOffset((prev) => {
      let next = prev;
      while (next < -singleWidth) next += singleWidth;
      while (next > 0) next -= singleWidth;
      return next;
    });
  };

  return (
    <div
      className={cn(
        "group flex w-full overflow-hidden [--gap:1rem] [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] select-none touch-pan-y",
        isDragging ? "cursor-grabbing" : "cursor-grab",
        className
      )}
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={trackRef}
        className="flex shrink-0 items-center gap-[--gap] pr-[--gap] will-change-transform"
        style={{ transform: `translate3d(${offset}px, 0, 0)` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {children}
        {children}
      </div>
    </div>
  );
}