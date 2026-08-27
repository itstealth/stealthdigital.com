"use client";

import { Button } from "@/components/ui/Button";
import {
  FaReact,
  FaAws,
  FaDocker,
  FaNodeJs,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaGoogle,
  FaApple,
  FaVuejs,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiVercel,
  SiRedux,
  SiTypescript,
  SiFacebook,
  SiTailwindcss,
} from "react-icons/si";

/**
 * Tech-stack orbit + feature section, adapted from the RUIXEN template to the
 * site's ink/cream theme.
 *
 * - TechOrbit — a self-contained 30rem spinning ring of the platforms Stealth
 *   builds on. Sized to sit in the hero's right column.
 * - FeatureSection — the full-width card (heading + CTAs + orbit) for use as a
 *   standalone section.
 *
 * Notes on the adaptation:
 *   - Uses the site's existing Button (href-based), not a shadcn button file —
 *     a lowercase `button.tsx` would collide with `Button.tsx` on Windows.
 *   - The template's two `img`-fallback slots are replaced with real brand
 *     icons so the orbit has no external-image dependencies.
 *   - Black-only brand marks (Next.js, Vercel, GitHub, Apple) render white so
 *     they stay visible on the dark ink badges.
 *   - @keyframes are emitted via a plain <style> tag because styled-jsx drops
 *     keyframes in this project's Turbopack setup.
 */

const iconConfigs = [
  { Icon: FaReact, color: "#61DAFB" },
  { Icon: FaAws, color: "#FF9900" },
  { Icon: FaDocker, color: "#2496ED" },
  { Icon: FaNodeJs, color: "#339933" },
  { Icon: SiNextdotjs, color: "#FFFFFF" },
  { Icon: SiVercel, color: "#FFFFFF" },
  { Icon: SiRedux, color: "#764ABC" },
  { Icon: SiTypescript, color: "#3178C6" },
  { Icon: FaGithub, color: "#FFFFFF" },
  { Icon: FaTwitter, color: "#1DA1F2" },
  { Icon: FaLinkedin, color: "#0077B5" },
  { Icon: FaInstagram, color: "#E1306C" },
  { Icon: FaGoogle, color: "#DB4437" },
  { Icon: FaApple, color: "#FFFFFF" },
  { Icon: SiFacebook, color: "#1877F2" },
  { Icon: SiTailwindcss, color: "#38BDF8" },
  { Icon: FaVuejs, color: "#42B883" },
];

const keyframes = `
@keyframes stack-orbit-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;

/**
 * Spinning orbit of the tech-stack icons — sized for the hero's right column
 * (rings 15/21/27rem inside a 30rem canvas). Also used inside FeatureSection.
 */
export function TechOrbit() {
  const orbitCount = 3;
  const orbitGap = 6; // rem between rings
  const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount);

  return (
    <div className="relative w-[30rem] h-[30rem] flex items-center justify-center">
      {/* Center circle */}
      <div className="w-24 h-24 rounded-full bg-ink-800 border border-cream/15 shadow-lg flex items-center justify-center">
        <FaReact className="w-12 h-12 text-[#61DAFB]" />
      </div>

      {/* Generate orbits */}
      {[...Array(orbitCount)].map((_, orbitIdx) => {
        const size = `${9 + orbitGap * (orbitIdx + 1)}rem`; // 15 / 21 / 27
        const angleStep = (2 * Math.PI) / iconsPerOrbit;

        return (
          <div
            key={orbitIdx}
            className="absolute rounded-full border-2 border-dotted border-cream/15"
            style={{
              width: size,
              height: size,
              animation: `stack-orbit-spin ${12 + orbitIdx * 6}s linear infinite`,
            }}
          >
            {iconConfigs
              .slice(
                orbitIdx * iconsPerOrbit,
                orbitIdx * iconsPerOrbit + iconsPerOrbit
              )
              .map((cfg, iconIdx) => {
                const angle = iconIdx * angleStep;
                const x = 50 + 50 * Math.cos(angle);
                const y = 50 + 50 * Math.sin(angle);

                return (
                  <div
                    key={iconIdx}
                    className="absolute bg-ink-800 border border-cream/10 rounded-full p-1.5 shadow-md"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <cfg.Icon
                      className="w-7 h-7 sm:w-8 sm:h-8"
                      style={{ color: cfg.color }}
                    />
                  </div>
                );
              })}
          </div>
        );
      })}

      {/* Animation keyframes — plain <style> so the name stays global and
        matches the inline animation references above. */}
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
    </div>
  );
}

/**
 * Full-width feature section: heading + CTAs on the left, the orbit on the
 * right. Uses TechOrbit so the animation and keyframes are shared.
 */
export default function FeatureSection() {
  return (
    <section className="relative max-w-6xl mx-auto my-20 md:my-28 flex flex-col md:flex-row md:items-center md:h-[30rem] overflow-hidden rounded-sm border border-cream/10 bg-ink-900/40">
      {/* Left side: heading + CTAs */}
      <div className="relative z-10 w-full md:w-1/2 px-6 py-12 md:py-0 md:pl-14">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-4">
          [Our Stack]
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-bold mb-4 text-cream leading-[1.05] tracking-tight">
          We build on the modern stack.
        </h1>
        <p className="text-cream/60 mb-8 max-w-lg leading-relaxed">
          React, Next.js, Node, and AWS — the platforms behind every site,
          product, and campaign we ship. Fast, reliable, and built to scale
          with you.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button href="/contact-us" variant="primary" size="lg" showArrow>
            Start a project
          </Button>
          <Button href="/services" variant="outline" size="lg">
            Explore services
          </Button>
        </div>
      </div>

      {/* Right side: orbit */}
      <div className="hidden md:flex relative w-1/2 h-full items-center justify-center overflow-hidden">
        <TechOrbit />
      </div>
    </section>
  );
}
