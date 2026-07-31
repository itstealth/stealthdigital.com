/**
 * Client logo data — used by the "Trusted by ambitious brands" marquee.
 * Each logo is an inline SVG mark + wordmark, designed to look like a
 * minimal brand identity. Replace these with the client's actual logo
 * files when available.
 *
 * To swap in real logos: add an `src` field pointing to a file in
 * /public, and update the <BrandLogo /> renderer to use <img> instead
 * of <svg> when src is present.
 */

export type ClientLogo = {
  name: string;
  /** Path to logo image under /public, e.g. "/logos/google.svg". Optional. */
  src?: string;
  /** Inline SVG mark (rendered to the left of the wordmark). Required when
   *  no `src` is provided — i.e., for the placeholder logo set. */
  mark?: React.ReactNode;
  /** Wordmark text styling. */
  wordmarkStyle?: "serif" | "sans" | "display";
  /** Optional accent color for the mark (defaults to currentColor). */
  markColor?: string;
};

import type React from "react";

// Helper: small abstract mark (used when no real logo is provided)
const Dot = ({ color }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="6" fill={color ?? "currentColor"} />
  </svg>
);

const Square = ({ color }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="14" height="14" rx="2" fill={color ?? "currentColor"} />
  </svg>
);

const Triangle = ({ color }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 3L17 16H3L10 3Z" fill={color ?? "currentColor"} />
  </svg>
);

const Ring = ({ color }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="6" stroke={color ?? "currentColor"} strokeWidth="2.5" fill="none" />
  </svg>
);

const Bar = ({ color }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="3" y="6" width="14" height="2.5" fill={color ?? "currentColor"} />
    <rect x="3" y="11" width="10" height="2.5" fill={color ?? "currentColor"} />
  </svg>
);

const Leaf = ({ color }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M4 16C4 9 9 4 16 4C16 11 11 16 4 16Z"
      fill={color ?? "currentColor"}
    />
  </svg>
);

const Cross = ({ color }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M10 2V18M2 10H18"
      stroke={color ?? "currentColor"}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

const Spark = ({ color }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M10 2L12 8L18 10L12 12L10 18L8 12L2 10L8 8L10 2Z"
      fill={color ?? "currentColor"}
    />
  </svg>
);

const Wave = ({ color }: { color?: string }) => (
  <svg width="22" height="20" viewBox="0 0 22 20" fill="none" aria-hidden="true">
    <path
      d="M2 10C4 6 6 6 8 10C10 14 12 14 14 10C16 6 18 6 20 10"
      stroke={color ?? "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const Hex = ({ color }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M10 2L17 6V14L10 18L3 14V6L10 2Z"
      stroke={color ?? "currentColor"}
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

const Arc = ({ color }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M3 16C3 9 7 4 13 4C16 4 18 5 18 7"
      stroke={color ?? "currentColor"}
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const Drop = ({ color }: { color?: string }) => (
  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" aria-hidden="true">
    <path
      d="M9 2C9 2 3 9 3 13C3 16.5 5.5 19 9 19C12.5 19 15 16.5 15 13C15 9 9 2 9 2Z"
      fill={color ?? "currentColor"}
    />
  </svg>
);

export const CLIENT_LOGOS: ClientLogo[] = [
  { name: "BFIS", src: "/images/BFIS.webp" },
  { name: "Col Brown", src: "/images/Col_Brown.png" },
  { name: "DDUMC", src: "/images/DDUMC.jpg" },
  { name: "GLA", src: "/images/GLA.png" },
  { name: "GL Bajaj", src: "/images/GLBAJAJ.jpg" },
  { name: "IG", src: "/images/IG.jpg" },
  { name: "IMS", src: "/images/IMS.png" },
  { name: "LBSIM", src: "/images/LBSIM.jpeg" },
  { name: "PE", src: "/images/PE.jpeg" },
  { name: "SIA", src: "/images/SIA.jpg" },
  { name: "TDV", src: "/images/TDV.jpg" },
];
