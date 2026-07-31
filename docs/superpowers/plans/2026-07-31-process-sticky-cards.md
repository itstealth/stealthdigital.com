# Process Sticky Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the GSAP-driven `FlowArt` + `AdmitOneTicket` Process section with a pure-CSS sticky stacking-cards experience — four full-bleed phase cards that overlay each other as the user scrolls. No new dependencies.

**Architecture:** A single rewrite of `components/sections/Process.tsx`. One internal `ProcessCard` component renders each of four phases with `sticky top-0 h-screen` and its own full-bleed brand background. The parent `<ul>` is taller than its children, so subsequent cards naturally cover their predecessors. `components/ui/story-scroll.tsx` is deleted afterwards. Both `app/page.tsx` and `app/services/page.tsx` import `{ Process }` from the same path and continue to work without edits.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS 3, TypeScript strict. No new deps. No GSAP, no Framer Motion, no Lenis in the new section.

---

## File Structure

| File | Status | Responsibility |
|---|---|---|
| `components/sections/Process.tsx` | REWRITTEN | Renders `<ProcessIntro>` + a `<ul>` of four `<ProcessCard>` items with sticky CSS stacking. Carries the `PROCESS_PHASES` config array. Keeps the export name `Process` and same import path. |
| `components/ui/story-scroll.tsx` | DELETED | The `FlowArt` / `FlowSection` machinery — no other callers after this change. |
| `app/page.tsx` | UNCHANGED | Already imports `{ Process }` from `@/components/sections/Process`. |
| `app/services/page.tsx` | UNCHANGED | Same import. |

No schema changes. No new dependencies. No tests added (the codebase has no test infrastructure; verification is `tsc` + `next build` + DevTools scroll testing, per the prior `2026-07-30-mobile-footer.md` plan).

---

## Task 1: Rewrite `components/sections/Process.tsx`

**Files:**
- Modify: `components/sections/Process.tsx` (replace the entire file)

- [ ] **Step 1: Open the file, confirm current shape, then replace its contents**

Open `D:\stealth digital\stealth website\components\sections\Process.tsx` and verify it currently exports `Process` (function, no default). Then replace its entire content with the file shown below in Step 2.

- [ ] **Step 2: Write the new file**

Replace the entire content of `components/sections/Process.tsx` with:

```tsx
"use client";

import { Search, Target, Code, TrendingUp, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { TextBlockAnimation } from "@/components/ui/text-block-animation";

type PhaseRow = { period: string; title: string; body: string };

interface ProcessCardProps {
  step: string;
  kicker: string;
  title: string;
  actionVerbs: { text: string; accent?: boolean }[];
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
      className="process-card sticky top-0 h-screen w-full"
      style={{ backgroundColor: bg, color: fg }}
    >
      <div className="relative flex h-full w-full flex-col justify-between gap-6 overflow-y-auto px-[4vw] pt-[clamp(2rem,8vw,4vw)] pb-[4vw]">
        <p
          className={`font-mono text-xs font-bold uppercase tracking-[0.2em] ${kickerClass}`}
        >
          {kicker}
        </p>

        <hr className="my-[1.5vw] border-none border-t" style={{ borderColor: divider }} />

        <h3
          id={`phase-${step}-title`}
          className="text-[clamp(3.5rem,12vw,9rem)] font-display font-bold uppercase leading-[0.85] tracking-tight"
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
          <div className="max-w-4xl mb-16 px-4 md:mb-24 md:px-8">
            <TextBlockAnimation blockColor="#FFD60A">
              <h2 className="font-display text-[9vw] font-bold leading-[0.9] tracking-[-0.04em] text-cream">
                The Process.
              </h2>
            </TextBlockAnimation>
            <p className="mt-8 max-w-2xl text-xl text-cream/50 font-sans md:text-2xl">
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
      <div className="process-stack relative w-full">
        {PROCESS_PHASES.map((p) => (
          <ProcessCard key={p.step} {...p} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add the mobile drop-rule for sticky and the column-stacking fallback**

Open `app/globals.css` (or the project's Tailwind layer file) and append the following CSS inside the appropriate `@layer` or `:root` block. Confirm the file already exists; do not create a new one.

Append (do not replace existing content):

```css
/*
 * Process stack — sticky desktop, normal flow on mobile.
 * Applied via the .process-card / .process-stack utility classes added
 * to components/sections/Process.tsx.
 */
.process-stack > .process-card {
  position: relative;
  width: 100%;
}

@media (min-width: 768px) {
  .process-stack > .process-card {
    position: sticky;
    top: 0;
    height: 100vh;
  }
}

@media (max-width: 767px) {
  .process-stack > .process-card {
    position: relative;
    height: auto;
    min-height: 80vh;
  }
}
```

Place the snippet at the end of the file, after any existing CSS. Leave a blank line before the comment so it stays readable.

- [ ] **Step 4: Run a TypeScript check**

Run:

```bash
cd "D:/stealth digital/stealth website" && pnpm tsc --noEmit
```

Expected: zero errors. If there are TS errors, fix them in `components/sections/Process.tsx` (likely a missing import or a typo) until `tsc` passes.

- [ ] **Step 5: Confirm the export shape and import sites are unchanged**

Run:

```bash
grep -n 'export function Process' "D:/stealth digital/stealth website/components/sections/Process.tsx"
grep -rn 'from "@/components/sections/Process"' "D:/stealth digital/stealth website/app"
```

Expected:
- The first command prints exactly one line: `export function Process() {`.
- The second prints two files (or whatever it printed before this change — `app/page.tsx` and `app/services/page.tsx`). The import path `@/components/sections/Process` should still resolve and the import sites should not need editing.

---

## Task 2: Delete `components/ui/story-scroll.tsx`

**Files:**
- Delete: `components/ui/story-scroll.tsx`

- [ ] **Step 1: Verify no remaining importers**

Run:

```bash
grep -rn 'story-scroll\|FlowArt\|FlowSection' "D:/stealth digital/stealth website" --include='*.ts' --include='*.tsx' --include='*.md'
```

Expected: this returns NO hits in `app/` or `components/` other than possibly a mention in `docs/superpowers/specs/2026-07-31-process-sticky-cards-design.md` (the spec itself). If any other code file references `story-scroll`/`FlowArt`/`FlowSection`, stop and decide whether to keep that usage by retaining an alternative or making a sibling component. Only proceed if app code has zero hits.

- [ ] **Step 2: Delete the file**

Run:

```bash
rm "D:/stealth digital/stealth website/components/ui/story-scroll.tsx"
```

Expected: no output (rm on Windows / Git Bash prints nothing on success).

- [ ] **Step 3: Re-run TypeScript check**

Run:

```bash
cd "D:/stealth digital/stealth website" && pnpm tsc --noEmit
```

Expected: zero errors. If `tsc` complains about a missing import, find that import in `app/` and rewrite it — it should be a leftover from a copy-paste of the prior Process section.

- [ ] **Step 4: Run the production build**

Run:

```bash
cd "D:/stealth digital/stealth website" && pnpm build
```

Expected: build succeeds. The Process section will appear in the home and services routes, rendered from the new component.

---

## Task 3: Browser verification

**Files:** none — verification only.

- [ ] **Step 1: Start the dev server**

Run (in the background):

```bash
cd "D:/stealth digital/stealth website" && pnpm dev
```

Wait for it to print a `Local:` URL.

- [ ] **Step 2: Open the home page, scroll to the Process section**

In a browser, navigate to the home page (e.g., http://localhost:3000). Scroll until the "The Process." heading is just above the fold, then continue scrolling slowly.

Verify:
1. The intro "The Process." heading and intro paragraph scroll away.
2. The first sticky card (Discover — dark with orange kicker) pins to the top of the viewport.
3. Continue scrolling — the Strategise card (yellow) comes up from below and fully covers the Discover card.
4. Same for Execute (cream) and Optimise (dark).
5. After Optimise, the page continues to scroll into the next section (CTA).

- [ ] **Step 3: Mobile emulation**

In DevTools, switch to a mobile viewport (e.g., 375 × 812). Scroll through the section.

Verify:
1. No sticky behavior — the cards stack and the user scrolls past each one naturally.
2. Each card remains readable; text doesn't overflow horizontally.
3. The kicker / h3 / description / rows / closing line up vertically without cramping.

- [ ] **Step 4: Repeat on `/services`**

Navigate to `http://localhost:3000/services` and scroll to its Process section.

Verify: same sticky stacking behavior. Both pages use the same component, so they should look identical.

- [ ] **Step 5: Stop the dev server**

Stop the background dev server (Ctrl+C in its shell / use TaskStop).

- [ ] **Step 6: Final build sanity check**

Run:

```bash
cd "D:/stealth digital/stealth website" && pnpm build
```

Expected: build succeeds. This catches any client-bundle regressions (e.g., unused imports caught by Next.js's tree shaking hints).

---

## Notes for the implementer

- The phase config array uses helper classes (`text-cream/70`, `text-ink-950/80`, `text-accent`) which already exist in the project's Tailwind theme. If any of these are missing in `tailwind.config.ts`, swap them for the closest existing equivalents rather than inventing new tokens.
- Do NOT add a `<div className="container-fluid">` wrapper inside the sticky `<ul>`. Sticky stacking breaks if any card has a non-static ancestor with constrained height. The current `FlowArt` worked for the same reason — flowing siblings, not a constrained grid.
- Don't add GSAP, Framer Motion, or Lenis to this section. If the visual feels too plain, the next pass can add a subtle `scale` or `opacity` transition via CSS `animation-timeline: view()` — but only as a follow-up change, not here.
- No tests are written because the codebase has no test infra. Visual verification is the contract.

## Definition of done

- [ ] `components/sections/Process.tsx` matches the file in Task 1 Step 2.
- [ ] `app/globals.css` contains the snippet from Task 1 Step 3 appended at the end.
- [ ] `components/ui/story-scroll.tsx` is deleted.
- [ ] `pnpm tsc --noEmit` exits clean.
- [ ] `pnpm build` exits clean.
- [ ] Desktop scroll-through shows four sticky-stacked full-bleed cards in the right order with the right backgrounds.
- [ ] Mobile scroll-through shows the same cards without sticky behavior.
- [ ] Both home and services pages render the new section identically.
