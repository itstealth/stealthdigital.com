# Process Section Scroll-Driven Arrow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a single, scroll-driven chevron arrow that travels the dotted path between the four phase cards of the Process section. Switch the section's background to pure flat black (no grid lines, no edge gradients) in both light and dark themes.

**Architecture:** Extend `components/ui/how-it-works.tsx` with two opt-in props — `background: "auto" | "black"` (default `"auto"`) and `scrollArrow: ScrollArrowConfig | undefined` (default off). When `background === "black"`, three decorative layers (two grid patterns, two edge gradient masks) are removed from the DOM, the container becomes `bg-black` unconditionally, and the marching-ants dash animation is removed. When `scrollArrow.enabled`, an SVG `<g>` containing a chevron path is rendered inside the existing path SVG; its `translate`/`rotate` are Framer Motion values driven by `useScroll` on a section ref, computed each frame via `getPointAtLength` and a tangent sample. `components/sections/Process.tsx` opts in to both props and changes its section root to `bg-black`.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS 3, Framer Motion (`motion/react`), TypeScript strict. No new deps. The codebase has no test infrastructure; verification is `pnpm tsc --noEmit` + `pnpm build` + manual DevTools scroll testing.

---

## File Structure

| File | Status | Responsibility |
|---|---|---|
| `components/ui/how-it-works.tsx` | MODIFY | Add `background` + `scrollArrow` props with safe defaults. Strip grid + gradient layers when `background="black"`. Stop marching-ants animation. Brighter path color. Render scroll-driven chevron arrow inside path SVG with glow filter, motion values, and reduced-motion fallback. |
| `components/sections/Process.tsx` | MODIFY | Change section root from `bg-ink-950` to `bg-black`. Pass `background="black"` and `scrollArrow={{ enabled: true, ... }}` to `HowItWorks`. |
| `docs/superpowers/specs/2026-08-03-process-scroll-dots-design.md` | UNCHANGED | Source of truth for behavior. (Title still says "Dots" — that's a leftover from the earlier draft; behavior described inside is the single-arrow design we agreed on.) |

No new files. No new dependencies. No tests added (per existing repo convention).

---

## Task 1: Add new prop types and force-black layer removal to `how-it-works.tsx`

**Files:**
- Modify: `components/ui/how-it-works.tsx` (add types near top; remove grid/gradient `<div>` elements when `background === "black"`)

- [ ] **Step 1: Read the file to find the exact insertion points**

The file is at `D:\stealth digital\stealth website\components\ui\how-it-works.tsx`. The block to edit is the props interface (~line 108) and the JSX return (~line 176).

- [ ] **Step 2: Add the new prop types below the existing `HowItWorksProps` interface**

After the existing `HowItWorksProps` interface (which ends at `stepPositions?: StepPosition[];`), insert:

```ts
export type Background = "auto" | "black";

export interface ScrollArrowConfig {
  enabled: boolean;
  color?: string;
  glowRadius?: number;
  size?: number;
}
```

Then update the `HowItWorksProps` interface to include the new fields. Replace the existing interface block:

```ts
export interface HowItWorksProps {
  features?: Step[];
  className?: string;
  stepPositions?: StepPosition[];
}
```

with:

```ts
export interface HowItWorksProps {
  features?: Step[];
  className?: string;
  stepPositions?: StepPosition[];
  background?: Background;
  scrollArrow?: ScrollArrowConfig;
}
```

- [ ] **Step 3: Destructure the new props in the function signature**

In the function signature `export default function HowItWorks({ features, className, stepPositions }: HowItWorksProps)`, replace with:

```ts
export default function HowItWorks({
  features,
  className,
  stepPositions,
  background = "auto",
  scrollArrow,
}: HowItWorksProps) {
```

- [ ] **Step 4: Update the container `<div>` to switch background**

Find the line:

```tsx
<div
  className={`bg-white dark:bg-black max-md:pt-10 max-md:pb-25 md:py-20 px-8 relative ${className}`}
>
```

Replace with:

```tsx
<div
  className={`${background === "black" ? "bg-black" : "bg-white dark:bg-black"} max-md:pt-10 max-md:pb-25 md:py-20 px-8 relative ${className}`}
>
```

- [ ] **Step 5: Remove the three decorative layers when `background === "black"`**

Find the three consecutive decorative `<div>` elements (the two grid patterns and the two edge gradient masks). They look like this:

```tsx
<div
  className="absolute inset-0 pointer-events-none opacity-[0.08] dark:opacity-[0.15]"
  style={{
    backgroundImage: "linear-gradient(#000 1px, transparent 1px)",
    backgroundSize: "100% 32px",
    marginTop: "4px",
  }}
></div>
<div
  className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-[0.1]"
  style={{
    backgroundImage: "linear-gradient(#fff 1px, transparent 1px)",
    backgroundSize: "100% 32px",
    marginTop: "4px",
  }}
></div>
<div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r"></div>
<div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l"></div>
```

Wrap all four in a conditional so they're only rendered when `background !== "black"`:

```tsx
{background !== "black" && (
  <>
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.08] dark:opacity-[0.15]"
      style={{
        backgroundImage: "linear-gradient(#000 1px, transparent 1px)",
        backgroundSize: "100% 32px",
        marginTop: "4px",
      }}
    ></div>
    <div
      className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-[0.1]"
      style={{
        backgroundImage: "linear-gradient(#fff 1px, transparent 1px)",
        backgroundSize: "100% 32px",
        marginTop: "4px",
      }}
    ></div>
    <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r"></div>
    <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l"></div>
  </>
)}
```

(The `<>` fragment keeps the conditional terse and avoids adding a wrapper div that would interfere with `relative` positioning.)

- [ ] **Step 6: Type-check**

Run from the project root:

```bash
pnpm tsc --noEmit
```

Expected: zero errors. The new prop types are exported and consumed by the destructured signature; nothing else references them yet.

---

## Task 2: Stop marching-ants animation + brighten path color

**Files:**
- Modify: `components/ui/how-it-works.tsx` (inside the `<svg>` block that draws the dotted path)

- [ ] **Step 1: Find the `<m.path>` element**

It's inside the `data.length > 1 && (<svg …>)` block, around line 224. The element animates `strokeDashoffset` continuously to create the marching-ants effect.

- [ ] **Step 2: Remove the `initial`, `animate`, and `transition` props from the `<m.path>`**

The current element:

```tsx
<m.path
  d={pathD}
  stroke="currentColor"
  className="text-neutral-300 dark:text-neutral-700"
  strokeWidth="2"
  strokeDasharray="8 6"
  fill="none"
  strokeLinecap="round"
  vectorEffect="non-scaling-stroke"
  initial={{ strokeDashoffset: 0 }}
  animate={{
    strokeDashoffset: -140,
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "linear",
  }}
/>
```

Replace with (no animation, brighter color):

```tsx
<m.path
  d={pathD}
  stroke="currentColor"
  className="text-neutral-500"
  strokeWidth="2"
  strokeDasharray="8 6"
  fill="none"
  strokeLinecap="round"
  vectorEffect="non-scaling-stroke"
/>
```

- [ ] **Step 3: Type-check**

```bash
pnpm tsc --noEmit
```

Expected: zero errors. The motion-component type still accepts the trimmed-down props.

---

## Task 3: Add scroll-driven arrow with glow filter

**Files:**
- Modify: `components/ui/how-it-works.tsx` (add imports, refs, motion values, effect, and JSX for the arrow)

- [ ] **Step 1: Update the imports at the top of the file**

Current import line:

```ts
import { LazyMotion, domAnimation, m } from "motion/react";
```

Replace with:

```ts
import { LazyMotion, domAnimation, m, motion, useScroll, useMotionValue, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
```

- [ ] **Step 2: Capture a ref to the path element and add motion values inside the component**

Find the line `return (` inside the `HowItWorks` function body. Just before it, insert:

```ts
const sectionRef = useRef<HTMLDivElement>(null);
const pathRef = useRef<SVGPathElement>(null);
const arrowX = useMotionValue(0);
const arrowY = useMotionValue(0);
const arrowRotate = useMotionValue(0);
const reducedMotion = useReducedMotion();

const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start center", "end center"],
});

useEffect(() => {
  const path = pathRef.current;
  if (!path || reducedMotion) return;

  const totalLength = path.getTotalLength();

  const setInitial = () => {
    const p = path.getPointAtLength(0);
    arrowX.set(p.x);
    arrowY.set(p.y);
    arrowRotate.set(0);
  };
  setInitial();

  const unsubscribe = scrollYProgress.on("change", (progress) => {
    const clamped = Math.max(0, Math.min(1, progress));
    const length = clamped * totalLength;
    const current = path.getPointAtLength(length);
    const ahead = path.getPointAtLength(Math.min(length + 1, totalLength));
    const behind = path.getPointAtLength(Math.max(length - 1, 0));
    const dx = ahead.x - behind.x;
    const dy = ahead.y - behind.y;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    arrowX.set(current.x);
    arrowY.set(current.y);
    arrowRotate.set(angle);
  });

  return unsubscribe;
}, [scrollYProgress, reducedMotion, arrowX, arrowY, arrowRotate]);
```

- [ ] **Step 3: Attach the section ref to the outer container `<div>`**

Find:

```tsx
<div
  className={`${background === "black" ? "bg-black" : "bg-white dark:bg-black"} max-md:pt-10 max-md:pb-25 md:py-20 px-8 relative ${className}`}
>
```

Replace with:

```tsx
<div
  ref={sectionRef}
  className={`${background === "black" ? "bg-black" : "bg-white dark:bg-black"} max-md:pt-10 max-md:pb-25 md:py-20 px-8 relative ${className}`}
>
```

- [ ] **Step 4: Add the ref to the dotted path's `<m.path>` element**

Inside the path SVG block, update the `<m.path>` (the one we trimmed in Task 2). Find the element:

```tsx
<m.path
  d={pathD}
  stroke="currentColor"
  className="text-neutral-500"
  strokeWidth="2"
  strokeDasharray="8 6"
  fill="none"
  strokeLinecap="round"
  vectorEffect="non-scaling-stroke"
/>
```

Replace with:

```tsx
<m.path
  ref={pathRef}
  d={pathD}
  stroke="currentColor"
  className="text-neutral-500"
  strokeWidth="2"
  strokeDasharray="8 6"
  fill="none"
  strokeLinecap="round"
  vectorEffect="non-scaling-stroke"
/>
```

- [ ] **Step 5: Add the glow filter and the arrow `<g>` inside the path's SVG**

Find the closing `</svg>` of the path SVG (the one that wraps the `<m.path>`). Just before that closing tag, insert:

```tsx
{scrollArrow?.enabled && !reducedMotion && (
  <>
    <defs>
      <filter
        id="scroll-arrow-glow"
        x="-200%"
        y="-200%"
        width="500%"
        height="500%"
      >
        <feGaussianBlur stdDeviation={scrollArrow.glowRadius ?? 4} result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#scroll-arrow-glow)" aria-hidden="true">
      <motion.path
        d={`M ${-(scrollArrow.size ?? 14)},${-((scrollArrow.size ?? 14) / 2)} L ${scrollArrow.size ?? 14},0 L ${-(scrollArrow.size ?? 14)},${(scrollArrow.size ?? 14) / 2} Z`}
        fill={scrollArrow.color ?? "#FFD60A"}
        style={{
          translateX: arrowX,
          translateY: arrowY,
          rotate: arrowRotate,
        }}
      />
    </g>
  </>
)}
```

This must be **inside the same `<svg>` element** that already holds the dotted path (i.e. before its closing `</svg>` tag), so the chevron renders in the same viewBox and scales with the path.

- [ ] **Step 6: Type-check**

```bash
pnpm tsc --noEmit
```

Expected: zero errors. The new imports (`motion`, `useScroll`, `useMotionValue`, `useReducedMotion`, `useEffect`, `useRef`) are consumed; the `pathRef` is now attached; arrow JSX is conditional on `scrollArrow?.enabled && !reducedMotion`.

- [ ] **Step 7: Build**

```bash
pnpm build
```

Expected: build succeeds. Framer Motion bundles correctly; no unused-import warnings (the project uses TypeScript's strict mode but doesn't typically error on unused imports — verify the output is clean).

---

## Task 4: Wire the new props through `Process.tsx`

**Files:**
- Modify: `components/sections/Process.tsx`

- [ ] **Step 1: Replace the section root className**

Find:

```tsx
<section id="process" className="relative bg-ink-950">
```

Replace with:

```tsx
<section id="process" className="relative bg-black">
```

- [ ] **Step 2: Pass the new props to `HowItWorks`**

Find:

```tsx
<HowItWorks features={STEALTH_PROCESS} />
```

Replace with:

```tsx
<HowItWorks
  features={STEALTH_PROCESS}
  background="black"
  scrollArrow={{ enabled: true, color: "#FFD60A", glowRadius: 4 }}
/>
```

- [ ] **Step 3: Type-check + build**

```bash
pnpm tsc --noEmit && pnpm build
```

Expected: zero errors, build succeeds.

---

## Task 5: Manual visual verification

**Files:** none — observation only.

- [ ] **Step 1: Start the dev server**

```bash
pnpm dev
```

Expected: server starts on `http://localhost:3000` (or the configured port).

- [ ] **Step 2: Confirm the canvas is pure flat black**

Open the page in Chrome. Scroll to the Process section. Verify:

- Section background is pure `#000` (no `#0a0a0a` ink-950 tint, no grid lines, no edge gradients).
- Both light-mode and dark-mode site themes show the same pure-black canvas (toggle via the site theme switcher if one exists; otherwise inspect `document.documentElement.classList` in DevTools).
- Cards still render correctly on the black canvas (white outer wrappers in light mode, dark `bg-neutral-900` in dark mode; inner pastel panels readable).

- [ ] **Step 3: Confirm the dotted path is visible and static**

- Path is `#737373` (neutral-500), dashed `8 6`, between the four cards.
- Path does NOT animate — dashes stay still even when not scrolling.

- [ ] **Step 4: Confirm the scroll-driven arrow behaviour**

- Scroll slowly from the top of the section to the bottom. The yellow chevron should:
  - Sit at the path start (near the Discover card) when the section is approaching the viewport.
  - Move smoothly along the path tangent as scroll progresses.
  - Rotate to point along the direction of travel (no upside-down or sideways flips).
  - Park at the path end (near the Optimise card) when the section has scrolled past.
  - Stop moving immediately when scroll stops. No inertia, no auto-glide.

- [ ] **Step 5: Confirm reduced-motion behaviour**

In Chrome DevTools, open the Rendering panel and set "Emulate CSS media feature `prefers-reduced-motion: reduce`". Reload the page. Scroll the section.

Expected: arrow is **not visible**. Dotted path is still visible (it's static, not animated). No console errors.

- [ ] **Step 6: Commit (only with explicit user permission — per project memory)**

```bash
git add components/ui/how-it-works.tsx components/sections/Process.tsx
git status   # confirm only the two intended files
git diff --stat   # eyeball the change size
```

**STOP HERE and ask the user** before running `git commit`. The project memory explicitly forbids commits without per-turn permission.

---

## Self-Review

**Spec coverage:**
- §4.2 Background (5 layers force black): Task 1 Steps 4–5.
- §4.3 Path color + animation removal: Task 2.
- §4.4 Scroll-driven arrow (driver, position math, reactivity, initial state): Task 3.
- §4.5 Reduced-motion fallback: Task 3 (the conditional `!reducedMotion` guards both the effect body and the arrow JSX).
- §4.6 Cleanup: Task 3 (the `useEffect` returns `scrollYProgress.on("change", …)` directly, which is Framer Motion's unsubscribe).
- §5 Wiring: Task 4.

**Placeholders:** none — every step shows the exact code or command.

**Type consistency:**
- `pathRef` declared in Task 3 Step 2 and attached in Step 4.
- `arrowX` / `arrowY` / `arrowRotate` declared in Step 2 and consumed in Step 5.
- `sectionRef` declared in Step 2 and attached in Step 3.
- `reducedMotion` declared in Step 2 and consumed in Steps 2 and 5.
- `ScrollArrowConfig` exported in Task 1 Step 2 — currently used only via the `scrollArrow` prop. No external consumers (the only `HowItWorks` caller is `Process.tsx`, which passes a literal object).