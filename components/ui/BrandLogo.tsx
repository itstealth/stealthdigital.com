"use client";

import Image from "next/image";
import type { ClientLogo } from "@/data/clientLogos";

interface BrandLogoProps {
  logo: ClientLogo;
  /** Pixel height the mark + wordmark should occupy. */
  size?: number;
  /** Text color for the wordmark. */
  textColor?: string;
}

/**
 * BrandLogo — renders a single brand identity for the marquee.
 * If `logo.src` is provided, uses the real image. Otherwise renders
 * the inline SVG mark + styled wordmark placeholder.
 */
export function BrandLogo({ logo, size = 28, textColor }: BrandLogoProps) {
  const wordmarkClass =
    logo.wordmarkStyle === "serif"
      ? "font-serif"
      : logo.wordmarkStyle === "display"
      ? "font-display"
      : "font-sans";

  // Real image path provided — use it
  if (logo.src) {
    return (
      <div className="flex shrink-0 items-center gap-3">
        <Image
          src={logo.src}
          alt={logo.name}
          width={size * 2}
          height={size}
          className="h-auto w-auto"
          style={{ height: `${size}px` }}
        />
      </div>
    );
  }

  // Placeholder: inline SVG mark + wordmark
  return (
    <div className="flex shrink-0 items-center gap-3">
      <span
        className="flex shrink-0 items-center justify-center"
        style={{ width: size, height: size, color: logo.markColor }}
      >
        {logo.mark}
      </span>
      <span
        className={`${wordmarkClass} whitespace-nowrap font-semibold tracking-tight`}
        style={{
          fontSize: `${size}px`,
          lineHeight: 1,
          color: textColor ?? "currentColor",
        }}
      >
        {logo.name}
      </span>
    </div>
  );
}
