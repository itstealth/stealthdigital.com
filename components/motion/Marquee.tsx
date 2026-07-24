"use client";

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
}

/**
 * Marquee — infinite horizontal ticker. Used by StatsMarquee for the
 * scrolling stats carousel. Duplicates content so the loop is seamless.
 */
export function Marquee({
  children,
  className,
  speed = 40,
  reverse = false,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex w-full overflow-hidden [--gap:1rem] [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-[--gap] pr-[--gap]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}