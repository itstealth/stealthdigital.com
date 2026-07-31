"use client";

import { Reveal } from "@/components/motion/Reveal";
import { AdmitOneTicket } from "@/components/ui/admit-one-ticket";

type Step = Omit<React.ComponentProps<typeof AdmitOneTicket>, "tilt"> & {
  step: string;
  title: string;
  description: string;
};

/**
 * Process — "The Process." section, placed just below the Awards section.
 *
 * Each step is rendered as an interactive AdmitOneTicket (paper-shader
 * WebGL ticket with 3D tilt-on-hover). The ticket carries the step's
 * title as the main "name" line, with phase / venue / dates on the
 * metadata rows.
 */

const PROCESS: Step[] = [
  {
    step: "01",
    title: "Discover",
    description:
      "We dig into your business, audience, competitors, and numbers. The audit reveals opportunities and gaps most teams never see.",
    name: "Discover",
    presenter: "Phase 01 — Stealth Process",
    event: "Foundation audit",
    venue: "Delhi NCR",
    dates: "Week 1–2",
    stubText: "Audit",
    watermark: "2026",
    texture: {
      engine: "generative",
      colorBack: "#080808",
      colorFront: "#FC6D3A",
      colorHighlight: "#ffdcbe",
      shape: "warp",
      type: "random",
      size: 0.6,
      colorSteps: 4,
      originalColors: true,
      scale: 1,
      rotation: 0,
      offsetX: 0,
      offsetY: 0,
      speed: 0.4,
    },
    layout: {
      padding: 57 / 741,
      labelTop: 58 / 741,
      labelSize: 22 / 741,
      labelLead: 28 / 741,
      labelTracking: 0.04,
      nameTop: 165 / 741,
      nameSize: 78 / 741,
      nameLead: 65 / 741,
      nameTracking: -0.01,
      footerTop: 318 / 741,
      footerSize: 18 / 741,
      footerTracking: 0.04,
      stubSize: 60 / 741,
      stubTracking: 0,
      stubOpacity: 0.85,
      watermarkSize: 130 / 741,
      watermarkOpacity: 0.55,
      watermarkColor: "#ffdcbe",
      inkColor: "#ffdcbe",
    },
  },
  {
    step: "02",
    title: "Strategise",
    description:
      "A bespoke plan — channel mix, budget allocation, KPIs, and a 90-day roadmap. Every recommendation tied to revenue.",
    name: "Strategise",
    presenter: "Phase 02 — Stealth Process",
    event: "90-day roadmap",
    venue: "Delhi NCR",
    dates: "Week 3–4",
    stubText: "Plan",
    watermark: "2026",
    texture: {
      engine: "generative",
      colorBack: "#0a0a0a",
      colorFront: "#eab308",
      colorHighlight: "#fef3c7",
      shape: "ripple",
      type: "4x4",
      size: 1.2,
      colorSteps: 4,
      originalColors: true,
      scale: 1,
      rotation: 0,
      offsetX: 0,
      offsetY: 0,
      speed: 0.35,
    },
    layout: {
      padding: 57 / 741,
      labelTop: 58 / 741,
      labelSize: 22 / 741,
      labelLead: 28 / 741,
      labelTracking: 0.04,
      nameTop: 165 / 741,
      nameSize: 78 / 741,
      nameLead: 65 / 741,
      nameTracking: -0.01,
      footerTop: 318 / 741,
      footerSize: 18 / 741,
      footerTracking: 0.04,
      stubSize: 60 / 741,
      stubTracking: 0,
      stubOpacity: 0.85,
      watermarkSize: 130 / 741,
      watermarkOpacity: 0.55,
      watermarkColor: "#fef3c7",
      inkColor: "#fef3c7",
    },
  },
  {
    step: "03",
    title: "Execute",
    description:
      "We ship creative, build landing pages, launch campaigns, write code. Fast turnaround. High standards. Transparent reporting.",
    name: "Execute",
    presenter: "Phase 03 — Stealth Process",
    event: "Build & launch",
    venue: "Delhi NCR",
    dates: "Week 5–10",
    stubText: "Ship",
    watermark: "2026",
    texture: {
      engine: "generative",
      colorBack: "#080808",
      colorFront: "#FC6D3A",
      colorHighlight: "#ffdcbe",
      shape: "swirl",
      type: "2x2",
      size: 1.8,
      colorSteps: 5,
      originalColors: true,
      scale: 1.1,
      rotation: 0,
      offsetX: 0,
      offsetY: 0,
      speed: 0.5,
    },
    layout: {
      padding: 57 / 741,
      labelTop: 58 / 741,
      labelSize: 22 / 741,
      labelLead: 28 / 741,
      labelTracking: 0.04,
      nameTop: 165 / 741,
      nameSize: 78 / 741,
      nameLead: 65 / 741,
      nameTracking: -0.01,
      footerTop: 318 / 741,
      footerSize: 18 / 741,
      footerTracking: 0.04,
      stubSize: 60 / 741,
      stubTracking: 0,
      stubOpacity: 0.85,
      watermarkSize: 130 / 741,
      watermarkOpacity: 0.55,
      watermarkColor: "#ffdcbe",
      inkColor: "#ffdcbe",
    },
  },
  {
    step: "04",
    title: "Optimise",
    description:
      "Weekly experiments. Quarterly reviews. We double down on what works, cut what doesn't, and compound growth month over month.",
    name: "Optimise",
    presenter: "Phase 04 — Stealth Process",
    event: "Compounding growth",
    venue: "Delhi NCR",
    dates: "Ongoing",
    stubText: "Scale",
    watermark: "2026",
    texture: {
      engine: "generative",
      colorBack: "#0a0a0a",
      colorFront: "#eab308",
      colorHighlight: "#fef3c7",
      shape: "sphere",
      type: "8x8",
      size: 1.5,
      colorSteps: 5,
      originalColors: true,
      scale: 1,
      rotation: 0,
      offsetX: 0,
      offsetY: 0,
      speed: 0.3,
    },
    layout: {
      padding: 57 / 741,
      labelTop: 58 / 741,
      labelSize: 22 / 741,
      labelLead: 28 / 741,
      labelTracking: 0.04,
      nameTop: 165 / 741,
      nameSize: 78 / 741,
      nameLead: 65 / 741,
      nameTracking: -0.01,
      footerTop: 318 / 741,
      footerSize: 18 / 741,
      footerTracking: 0.04,
      stubSize: 60 / 741,
      stubTracking: 0,
      stubOpacity: 0.85,
      watermarkSize: 130 / 741,
      watermarkOpacity: 0.55,
      watermarkColor: "#fef3c7",
      inkColor: "#fef3c7",
    },
  },
];

export function Process() {
  return (
    <section className="relative py-24 md:py-40 bg-ink-950">
      <div className="container-fluid">
        <Reveal variant="up">
          <div className="max-w-4xl mb-16 md:mb-24 px-4 md:px-8">
            <h2 className="font-display text-[9vw] font-bold leading-[0.9] tracking-[-0.04em] text-cream">
              The Process.
            </h2>
            <p className="mt-8 text-xl md:text-2xl text-cream/50 max-w-2xl font-sans">
              A proven four-phase methodology. Built from 500+ engagements — refined into a system that compounds growth.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 md:gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-4 px-4 md:px-8">
          {PROCESS.map((p, i) => (
            <Reveal
              key={p.step}
              variant="up"
              delay={i * 0.08}
              className="flex justify-center"
            >
              <AdmitOneTicket
                name={p.name}
                presenter={p.presenter}
                event={p.event}
                venue={p.venue}
                dates={p.dates}
                stubText={p.stubText}
                watermark={p.watermark}
                texture={p.texture}
                layout={p.layout}
                width={320}
                tilt
              />
            </Reveal>
          ))}
        </div>

        {/* Step descriptions — kept below the tickets so users can read
            the methodology summary without the description text fighting
            the ticket's own typography. */}
        <div className="mt-12 md:mt-16 grid gap-8 md:gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-4 px-4 md:px-8">
          {PROCESS.map((p) => (
            <div key={p.step} className="text-center">
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-cream/40 mb-3">
                Step {p.step}
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-cream mb-3 tracking-tight">
                {p.title}
              </h3>
              <p className="text-cream/60 leading-relaxed text-sm font-sans max-w-xs mx-auto">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}