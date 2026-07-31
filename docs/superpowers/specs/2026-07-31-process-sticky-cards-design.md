# Process Sticky Cards — Design Spec

**Date:** 2026-07-31
**Status:** Draft, awaiting user review
**Replaces:** Current `Process` section (FlowArt + AdmitOneTicket grid + step descriptions)

---

## 1. Goal

Replace the current GSAP-driven `FlowArt` story-scroll + `AdmitOneTicket` WebGL grid in the **Process** section with a pure-CSS sticky stacking-cards experience inspired by the ui-layout "CSS Sticky Properties for Stacking Cards" pattern. Each of the four process phases becomes a full-bleed, full-viewport sticky card that overlays its predecessor as the user scrolls.

---

## 2. Scope

**In scope**
- Rewriting `components/sections/Process.tsx` end-to-end.
- Internalising all phase data, icons, and breakdown copy in the same file.
- Keeping the existing export name `Process` and the same import path so that `app/page.tsx` and `app/services/page.tsx` continue to work without edits.

**Out of scope**
- Any change to surrounding sections (Hero, Awards, CTA).
- Any new shared component library primitives. The new section is self-contained.
- Animation libraries. No GSAP, no Framer Motion, no Lenis for this section.
- Touch changes to `admit-one-ticket.tsx`, `story-scroll.tsx` consumers, or other sections.

---

## 3. Architecture

A single `<section>` with two children:

```
<section id="process" class="bg-ink-950">
  <ProcessIntro />          // "The Process." + intro paragraph
  <ul class="process-stack relative">
    <ProcessCard phase={p1} />
    <ProcessCard phase={p2} />
    <ProcessCard phase={p3} />
    <ProcessCard phase={p4} />
  </ul>
</section>
```

`.process-stack` is the tall scroll container. Each child `ProcessCard` is `sticky top-0 h-screen` with its own full-bleed background. Subsequent cards overlay earlier ones via natural document order — pure CSS, no scroll library, no JS.

Scroll budget: roughly `intro height + 4 × 100vh`. Same total height class as the current Process section.

---

## 4. Components

`components/sections/Process.tsx` (single file, no new subcomponent files)

### 4.1 `ProcessIntro`

- Uses the existing `TextBlockAnimation` with block color `#FFD60A` to write "The Process."
- One paragraph underneath: "A proven four-phase methodology. Built from 500+ engagements — refined into a system that compounds growth." (verbatim from current Process)
- Wrapped in `Reveal variant="up"` for entry.
- Sits in the same `container-fluid` wrapper as before, px-4 md:px-8.
- Scrolls away naturally once the stack begins filling the viewport.

### 4.2 `ProcessCard`

Props interface:

```ts
interface ProcessCardProps {
  step: string;                // "01" .. "04"
  kicker: string;              // "Phase 01 — Stealth Process"
  title: string;               // "Discover" / "Strategise" / "Execute" / "Optimise"
  actionVerbs: string[];       // e.g. ["Listen.", "Audit.", "Map."] with optional accent on the last
  description: string;         // paragraph copy
  bg: string;                  // background hex (full-bleed)
  fg: string;                  // primary text color on this card
  inkMuted: string;            // muted text color (rgba or hex)
  dividerColor: string;        // rgba/hex for hr line
  icon: LucideIcon;
  rows: { period: string; title: string; body: string }[];
  closing: string;             // bottom-right punchline
}
```

Render structure (mirrors current FlowArt section markup):

```
<section
  aria-label={kicker}
  class="process-card sticky top-0 h-screen w-full"
  style={{ background: bg, color: fg }}
>
  <div class="flow-art-container relative flex min-h-screen w-full flex-col justify-between gap-6 px-[4vw] pt-[clamp(2rem,8vw,4vw)] pb-[4vw]">
    <p class="font-mono text-xs font-bold uppercase tracking-[0.2em] {kickerClass}">{kicker}</p>
    <hr class="my-[2vw] border-none border-t" style={{ borderColor: divider }} />

    <h3
      id={`phase-${step}-title`}
      class="text-[clamp(3.5rem,12vw,9rem)] font-display font-bold leading-[0.85] uppercase tracking-tight"
    >
      {actionVerbs.map((v, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {i === actionVerbs.length - 1 && accent ? (
            <span class="text-accent">{v}</span>
          ) : (
            v
          )}
        </span>
      ))}
    </h3>

    <hr class="my-[2vw] border-none border-t" style={{ borderColor: divider }} />

    <p class="max-w-[50ch] text-[clamp(1rem,2.2vw,1.6rem)] font-sans leading-relaxed {bodyClass}">
      {description}
    </p>

    <hr class="my-[2vw] border-none border-t" style={{ borderColor: divider }} />

    <div class="flex flex-wrap gap-[3vw]">
      {rows[0] && (
        <div class="min-w-[180px] flex-1">
          <Icon class="mb-3 h-6 w-6 {iconColor}" strokeWidth={1.5} />
          <p class="mb-1 text-sm font-mono uppercase tracking-[0.2em] {metaClass}">{rows[0].period}</p>
          <p class="text-sm leading-relaxed {metaClass}">{rows[0].body}</p>
        </div>
      )}
      {rows.slice(1).map(r => (
        <div key={r.period} class="min-w-[180px] flex-1">
          <p class="mb-1 text-sm font-mono uppercase tracking-[0.2em] {metaClass}">{r.period}</p>
          <p class="text-sm leading-relaxed {metaClass}">{r.body}</p>
        </div>
      ))}
    </div>

    <hr class="my-[2vw] border-none border-t" style={{ borderColor: divider }} />

    <p class="mt-auto max-w-[50ch] ml-auto text-right text-[clamp(1rem,2.2vw,1.6rem)] font-sans leading-relaxed {bodyClass}">
      {closing}
    </p>
  </div>
</section>
```

Where:
- `kickerClass` = the kicker's color treatment (e.g. `text-accent` on dark cards, `text-ink-950` on yellow card, etc.)
- `bodyClass` = main body color (e.g. `text-cream/70` on dark, `text-ink-950/80` on yellow)
- `metaClass` = kicker + small label color (e.g. `text-cream/40` on dark, `text-ink-950/50` on yellow)
- `iconColor` = icon stroke color matching the kickerClass on each phase
- `divider` = the rgba string for the hr lines

The actual class strings live in the per-phase config object so they can vary per phase without prop-drilling.

### 4.3 `PROCESS_PHASES`

Inline literal array of four `ProcessCardProps` objects, sitting in the same file. Drives all four cards.

Copy is unchanged from the current FlowArt panels — Discover/Strategise/Execute/Optimise including the closing taglines, weekly breakdowns, and accent colors. Phase backgrounds and muted text colors map directly:

| Phase     | bg          | fg       | divider       | muted text         |
|-----------|-------------|----------|---------------|--------------------|
| 01 Discover  | `#0A0A0A` | `#FFFFFF`| `cream/15`    | `cream/70` muted, `cream/40` for kicker |
| 02 Strategise | `#FFD60A` | `#0A0A0A`| `ink-950/30`  | `ink-950/80` / `ink-950/50` for kicker |
| 03 Execute  | `#F5F0E8`   | `#0A0A0A`| `ink-950/20`  | `ink-950/80` / `ink-950/50` for kicker |
| 04 Optimise | `#111111`   | `#FFFFFF`| `cream/15`    | `cream/70` muted, `cream/40` for kicker, `text-accent` (`#FC6D3A`) for accent verbs and icon |

`text-accent` is the existing Tailwind token in the project for `#FC6D3A`.

Card action-verb accent (last word colored):
- 01: `Map.` → accent
- 02: none (all plain)
- 03: none (all plain)
- 04: `Compound.` → accent

---

## 5. Sticky mechanics — concrete details

### 5.1 Wrapper

```css
.process-stack { position: relative; }
.process-card { position: sticky; top: 0; height: 100vh; width: 100%; }
```

Each card occupies `100vh`. As you scroll, each `<figure>` sticks to `top: 0` while the next `<figure>` flows up from below and covers it.

### 5.2 iOS Safari mitigations

- Use `<figure>` (not `<li>`) — Safari has historic `sticky` issues on `<li>`.
- No ancestor with `overflow: hidden` between `<section>` and `.process-card`. Verify after layout.
- Avoid `transform` on the same element that has `sticky`; it disconnects the containing block.
- Use `-webkit-overflow-scrolling: touch` only if needed; avoid by not enabling overflow on parents.

### 5.3 Mobile (<768px)

- Drop `sticky top-0`; cards render as a vertical list. `height: auto; min-height: 80vh` instead.
- Same content, just reads top-to-bottom without the stacking effect.

### 5.4 Reduced motion

No JS-driven motion. `prefers-reduced-motion: reduce` is honored automatically — the section reads as a static stack either way.

---

## 6. Accessibility

- Each card is a `<section aria-label={kicker}>` — same pattern the current `FlowSection` uses. The kicker text ("Phase 01 — Stealth Process") serves as the section's accessible name.
- The DOM order equals the scroll order equals the visual order — screen readers traverse linearly.
- The `<h3>` inside the card has an `id="phase-{step}-title"` for any deep-link / labelledby needs (currently unused but kept for consistency with the existing `FlowSection` markup).
- Color contrast: each card's `fg` / `muted` pair was already chosen for contrast in the current FlowArt. We carry those over verbatim. Yellow card uses `#0A0A0A` text (sufficient contrast).
- No focusable elements inside cards; nothing to skip past in keyboard nav.

---

## 7. Cleanup

**Files to delete:**
- `components/ui/story-scroll.tsx` — entire `FlowArt` + `FlowSection` exports. Verified no other callers via `grep`.

**Files to leave intact:**
- `components/ui/admit-one-ticket.tsx` — not deleted (WebGL ticket component remains available). Note: after this change it has no callers. Acceptable to keep around for future use.
- `components/ui/text-block-animation.tsx` — still used by `ProcessIntro`.

**Files that import `Process`:**
- `app/page.tsx` (home): `import { Process } from "@/components/sections/Process"` — unchanged.
- `app/services/page.tsx` (services): `import { Process } from "@/components/sections/Process"` — unchanged.
- Both call sites: `<Process />` — unchanged.

Because the export name and import path stay the same, both pages pick up the new implementation with zero edits to those files.

---

## 8. Risks & open questions

1. **iOS Safari sticky on iPad / iPhone** — Tested-without-device risk. Mitigation: write a small `useEffect` that logs `IntersectionObserver` entry positions on mount, so we can verify in-browser. No public-facing fallback planned; if iOS shows a regression, fall back is the prior FlowArt (kept in git history).
2. **Content overflow on shorter viewports (≤700px tall)** — Phase 01 has the most rows (two breakdown blocks). On a 13" laptop at default zoom this fits at `clamp(2rem,8vw,4vw)` padding. If a real device shows clipping, the mitigation is to drop one breakdown row on smaller heights via `@media (max-height: 800px)`.
3. **Reduced-motion users get the same experience** by accident (good outcome here, not a risk).
4. **AdmitOneTicket becomes dead code** — `admit-one-ticket.tsx` and its shader will ship unused. Acceptable per user decision to "replace entirely". Could be removed in a follow-up PR.

---

## 9. Definition of done

- [ ] `components/sections/Process.tsx` rewritten per above.
- [ ] `components/ui/story-scroll.tsx` deleted.
- [ ] `pnpm build` passes with zero TypeScript errors.
- [ ] `app/page.tsx` and `app/services/page.tsx` continue to render `<Process />` without edits.
- [ ] Dev verification in Chrome desktop, Chrome mobile emulation, and Safari iOS simulator (if available): sticky stacking works, each card fully readable, last card scrolls past cleanly.
- [ ] No console errors in any of the four phases.
