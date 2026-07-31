"use client";

import { Search, Target, Code, TrendingUp, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import TextBlockAnimation from "@/components/ui/text-block-animation";

type PhaseRow = { period: string; title: string; body: string };

interface ProcessCardProps {
  step: string;
  kicker: string;
  title: string;
  actionVerbs: { text: string; accent?: boolean }[];
  lede: string;
  description: string;
  bg: string;
  fg: string;
  kickerClass: string;
  bodyClass: string;
  metaClass: string;
  divider: string;
  iconColor: string;
  icon: LucideIcon;
  rows: PhaseRow[];
  closing: string;
}

/**
 * ProcessCard — one full-bleed sticky phase card. Position: sticky keeps each
 * card pinned at top:0 while the next card flows up from below and covers it.
 * iOS Safari caveat: avoid `transform` on the same element as `sticky`,
 * keep ancestors free of `overflow: hidden`.
 */
function ProcessCard({
  step,
  kicker,
  actionVerbs,
  lede,
  description,
  bg,
  fg,
  kickerClass,
  bodyClass,
  metaClass,
  divider,
  iconColor,
  icon: Icon,
  rows,
  closing,
}: ProcessCardProps) {
  return (
    <section
      aria-label={kicker}
      className="process-card w-full"
      style={{ backgroundColor: bg, color: fg }}
    >
      <div className="relative flex h-full w-full flex-col gap-6 overflow-hidden px-[4vw] pt-[clamp(2rem,8vw,4vw)] pb-[4vw]">
        <p
          className={`font-mono text-xs font-bold uppercase tracking-[0.2em] ${kickerClass}`}
        >
          {kicker}
        </p>

        <hr className="my-[1.5vw] border-none border-t" style={{ borderColor: divider }} />

        <h3
          id={`phase-${step}-title`}
          className="text-[clamp(2rem,8vw,5.5rem)] font-display font-bold uppercase leading-[0.9] tracking-tight"
        >
          {actionVerbs.map((v, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {v.accent ? (
                <span className="text-accent">{v.text}</span>
              ) : (
                v.text
              )}
            </span>
          ))}
        </h3>

        <p
          className={`max-w-[42ch] text-[clamp(1.25rem,3vw,2rem)] font-display font-medium leading-[1.15] tracking-tight italic ${bodyClass}`}
        >
          {lede}
        </p>

        <hr className="my-[1.5vw] border-none border-t" style={{ borderColor: divider }} />

        <p
          className={`max-w-[50ch] text-[clamp(1rem,2.2vw,1.6rem)] font-sans leading-relaxed ${bodyClass}`}
        >
          {description}
        </p>

        <hr className="my-[1.5vw] border-none border-t" style={{ borderColor: divider }} />

        <div className="flex flex-wrap gap-[3vw]">
          {rows.map((r, i) => {
            const isFirst = i === 0;
            return (
              <div key={r.period} className="min-w-[180px] flex-1">
                {isFirst && (
                  <Icon
                    className={`mb-3 h-6 w-6 ${iconColor}`}
                    strokeWidth={1.5}
                  />
                )}
                <p
                  className={`mb-1 text-sm font-mono uppercase tracking-[0.2em] ${metaClass}`}
                >
                  {r.period}
                </p>
                <p className={`text-sm leading-relaxed ${metaClass}`}>{r.body}</p>
              </div>
            );
          })}
        </div>

        <hr className="my-[1.5vw] border-none border-t" style={{ borderColor: divider }} />

        <p
          className={`mt-auto ml-auto max-w-[50ch] text-right text-[clamp(1rem,2.2vw,1.6rem)] font-sans leading-relaxed ${bodyClass}`}
        >
          {closing}
        </p>
      </div>
    </section>
  );
}

const PROCESS_PHASES: ProcessCardProps[] = [
  {
    step: "01",
    kicker: "Phase 01 — Stealth Process",
    title: "Discover",
    actionVerbs: [{ text: "Listen." }, { text: "Audit." }, { text: "Map.", accent: true }],
    lede: "We learn who you are — and what you've actually tried — before we propose anything.",
    description:
      "We dig into your business, audience, competitors, and numbers. The audit reveals opportunities and gaps most teams never see.",
    bg: "#0A0A0A",
    fg: "#FFFFFF",
    kickerClass: "text-accent",
    bodyClass: "text-cream/70",
    metaClass: "text-cream/40",
    divider: "rgba(255,255,255,0.15)",
    iconColor: "text-accent",
    icon: Search,
    rows: [
      {
        period: "Week 1",
        title: "Discover week 1",
        body: "Stakeholder interviews, channel audit, competitor teardown.",
      },
      {
        period: "Week 2",
        title: "Discover week 2",
        body: "Funnel review, attribution check, ICP refinement. Findings memo delivered.",
      },
    ],
    closing: "The best strategies start with the best questions.",
  },
  {
    step: "02",
    kicker: "Phase 02 — Stealth Process",
    title: "Strategise",
    actionVerbs: [{ text: "Plan." }, { text: "Prioritise." }, { text: "Commit." }],
    lede: "A 90-day plan you can actually execute against — not a 60-page slide deck that rots in a folder.",
    description:
      "A bespoke plan — channel mix, budget allocation, KPIs, and a 90-day roadmap. Every recommendation tied to revenue.",
    bg: "#FFD60A",
    fg: "#0A0A0A",
    kickerClass: "text-ink-950",
    bodyClass: "text-ink-950/80",
    metaClass: "text-ink-950/50",
    divider: "rgba(10,10,10,0.30)",
    iconColor: "text-ink-950",
    icon: Target,
    rows: [
      {
        period: "Channel mix",
        title: "Strategise channel mix",
        body: "SEO, paid, social, content — weighted by your margin and intent signal.",
      },
      {
        period: "Budget split",
        title: "Strategise budget split",
        body: "Quarterly reforecast based on ROAS by channel. No more spreadsheet archaeology.",
      },
      {
        period: "KPIs",
        title: "Strategise KPIs",
        body: "Pipeline value, CAC payback, blended ROAS. Tied to your finance calendar.",
      },
    ],
    closing: "Done beats perfect. We ship a 90-day plan and start the clock.",
  },
  {
    step: "03",
    kicker: "Phase 03 — Stealth Process",
    title: "Execute",
    actionVerbs: [{ text: "Build." }, { text: "Ship." }, { text: "Measure." }],
    lede: "One team. SEO, paid, design, code — moving in the same direction at the same time.",
    description:
      "We ship creative, build landing pages, launch campaigns, write code. Fast turnaround. High standards. Transparent reporting.",
    bg: "#F5F0E8",
    fg: "#0A0A0A",
    kickerClass: "text-ink-950",
    bodyClass: "text-ink-950/80",
    metaClass: "text-ink-950/50",
    divider: "rgba(10,10,10,0.20)",
    iconColor: "text-ink-950",
    icon: Code,
    rows: [
      {
        period: "Creative",
        title: "Execute creative",
        body: "Ad sets, landing pages, social, email — built in-house, on brand, on time.",
      },
      {
        period: "Engineering",
        title: "Execute engineering",
        body: "Tracking setup, schema, on-page SEO, custom integrations. Clean handoffs.",
      },
      {
        period: "Reporting",
        title: "Execute reporting",
        body: "Live Looker Studio dashboards. Weekly notes, no fluff.",
      },
    ],
    closing:
      "We move as one team — SEO, paid, social, design, and code, integrated under a single strategy.",
  },
  {
    step: "04",
    kicker: "Phase 04 — Stealth Process",
    title: "Optimise",
    actionVerbs: [{ text: "Test." }, { text: "Learn." }, { text: "Compound.", accent: true }],
    lede: "We turn early wins into durable, compounding growth — and we don't ship work that doesn't move a metric.",
    description:
      "Weekly experiments. Quarterly reviews. We double down on what works, cut what doesn't, and compound growth month over month.",
    bg: "#111111",
    fg: "#FFFFFF",
    kickerClass: "text-accent",
    bodyClass: "text-cream/70",
    metaClass: "text-cream/40",
    divider: "rgba(255,255,255,0.15)",
    iconColor: "text-accent",
    icon: TrendingUp,
    rows: [
      {
        period: "Weekly",
        title: "Optimise weekly",
        body: "A/B tests on creative, copy, and landing pages. Documented in a single changelog.",
      },
      {
        period: "Quarterly",
        title: "Optimise quarterly",
        body: "Channel rebalancing, budget reforecast, and strategy review with your leadership team.",
      },
      {
        period: "Annually",
        title: "Optimise annually",
        body: "Brand + market refresh. New positioning, new creative directions, new audiences.",
      },
    ],
    closing: "Most clients stay 3+ years. That's not sales — that's compounding trust.",
  },
];

/**
 * Process — "The Process." section, placed just below the Awards section.
 *
 * Renders the section header, then a sticky-stacked list of four full-bleed
 * phase cards. Each card is `sticky top-0 h-screen`; subsequent cards
 * naturally cover their predecessors as the user scrolls. On mobile (<768px)
 * the sticky is dropped — see globals.css for the responsive behaviour.
 */
export function Process() {
  return (
    <section id="process" className="relative bg-ink-950">
      <div className="container-fluid">
        <Reveal variant="up">
          <div className="max-w-4xl mb-6 px-4 md:mb-10 md:px-8">
            <TextBlockAnimation blockColor="#FFD60A">
              <h2 className="font-display text-[9vw] font-bold leading-[0.9] tracking-[-0.04em] text-cream">
                The Process.
              </h2>
            </TextBlockAnimation>
            <p className="mt-6 max-w-2xl text-xl text-cream/50 font-sans md:text-2xl">
              A proven four-phase methodology. Built from 500+ engagements —
              refined into a system that compounds growth.
            </p>
          </div>
        </Reveal>
      </div>

      {/*
        Sticky stack: four sibling sections inside .process-stack. Each
        section positions itself `sticky top-0` (desktop) so they overlap
        in source order. Globals handle the mobile drop of sticky.
      */}
      {/*
        Sticky stack: four sibling sections inside .process-stack. Each
        card's sticky / height behaviour is owned by globals.css
        (`.process-stack > .process-card`). Do NOT wrap the cards (or
        their inner content) in `TextBlockAnimation`, `Reveal`, or any
        other element that applies a CSS `transform` — that breaks
        `position: sticky` on Safari.
      */}
      <div className="process-stack relative w-full">
        {PROCESS_PHASES.map((p) => (
          <ProcessCard key={p.step} {...p} />
        ))}
      </div>
    </section>
  );
}
