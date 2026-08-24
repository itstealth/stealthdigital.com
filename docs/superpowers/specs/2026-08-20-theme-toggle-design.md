# Design: Black ⇄ White Theme Toggle

**Date:** 2026-08-20
**Status:** Approved (user-confirmed decisions: whole-site flip, sun/moon pill, remember + follow system, CSS-variable remap, toggle visible at all sizes, instant swap, deliberate dark blocks stay dark)

## Goal

Add a Sun/Moon theme switch in the navbar, immediately to the right of the digital clock, that toggles the entire site between the current **black** theme and a new **white** theme. The choice persists in `localStorage` and falls back to the visitor's OS `prefers-color-scheme`.

## Current State

- Digital clock: `components/layout/Clock.tsx`, rendered in the navbar right section (`components/layout/Navbar.tsx`) inside a `hidden xl:block` wrapper.
- The site is hardcoded dark: `bg-ink-950` (black) and `text-cream` (white) appear ~550 times across 51 files. `accent` (yellow `#FFD60A`) is the constant brand color.
- Tailwind v3.4.17. A `.dark` CSS class + shadcn-style CSS variables already exist in `app/globals.css`; a few components (`how-it-works.tsx`, `hover-footer.tsx`) already use `dark:` variants and would flip automatically.
- ~40 literal `bg-black` / `text-white` / `bg-white` spots do not reference the palette and need a manual pass (most are deliberate dark blocks).

## Approach: CSS-variable remap (A)

Make the `ink` and `cream` palettes read from CSS variables, then define white-theme values in `:root` and black-theme values in `.dark`. All existing `ink-*` / `cream-*` usages flip automatically when the `dark` class is toggled on `<html>`.

### 1. `tailwind.config.ts`

Replace the literal hex values with the Tailwind v3 CSS-variable + `<alpha-value>` pattern so opacity modifiers (`bg-ink-950/85`, `text-cream/50`, `border-cream/10`) keep working:

```ts
ink: {
  950: "rgb(var(--ink-950) / <alpha-value>)",
  900: "rgb(var(--ink-900) / <alpha-value>)",
  800: "rgb(var(--ink-800) / <alpha-value>)",
  700: "rgb(var(--ink-700) / <alpha-value>)",
  600: "rgb(var(--ink-600) / <alpha-value>)",
},
cream: {
  DEFAULT: "rgb(var(--cream) / <alpha-value>)",
  dim: "rgb(var(--cream-dim) / <alpha-value>)",
  mute: "rgb(var(--cream-mute) / <alpha-value>)",
},
```

`accent` stays a literal color (constant in both themes).

### 2. `app/globals.css`

Add the palette variables as RGB triplets (required for the `/ <alpha-value>` pattern):

```css
:root {
  --ink-950: 255 255 255;  /* page background (white theme) */
  --ink-900: 242 242 242;  /* raised surfaces / hovers */
  --ink-800: 230 230 230;
  --ink-700: 217 217 217;
  --ink-600: 204 204 204;
  --cream: 0 0 0;          /* primary text */
  --cream-dim: 26 26 26;
  --cream-mute: 85 85 85;
}

.dark {
  --ink-950: 0 0 0;        /* today's look */
  --ink-900: 17 17 17;
  --ink-800: 28 28 28;
  --ink-700: 38 38 38;
  --ink-600: 51 51 51;
  --cream: 255 255 255;
  --cream-dim: 229 229 229;
  --cream-mute: 163 163 163;
}
```

### 3. ThemeToggle — new `components/ui/ThemeToggle.tsx`

- `"use client"`.
- A ~72px rounded-full pill in the navbar style (`bg-ink-900 border border-cream/10`) with a `Sun` icon (left) and `Moon` icon (right) from `lucide-react`, and a framer-motion knob (`motion.span`, `animate={{ x }}`) that slides to the active side. Colors auto-adapt via the CSS variables.
- Theme resolution on mount: read `localStorage.theme`; if absent, use `matchMedia("(prefers-color-scheme: dark)").matches`.
- Toggle: flip `dark` class on `document.documentElement`, save `"light" | "dark"` to `localStorage.theme`.
- No context provider needed — everything else reacts purely via the CSS class.
- Accessible: `aria-label="Toggle theme"`, `role="switch"`, `aria-checked` reflecting the active theme.

### 4. FOUC guard — `app/layout.tsx`

Inline `<script>` in `<head>` that applies the saved/system theme before paint:

```html
<script dangerouslySetInnerHTML={{
  __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})();`
}} />
```

### 5. Navbar wiring — `Navbar.tsx`

Place `<ThemeToggle />` in the right section immediately after the Clock, **outside** the `hidden xl:block` wrapper so it is visible at all breakpoints. On xl screens it sits exactly right of the clock; on smaller screens it fills that spot. Keep the existing `gap-3` rhythm.

### 6. QA pass — literal-color spots (~40)

Rule: keep deliberate dark/accent blocks as permanent contrast; convert anything sitting on a flipping surface to the themed `cream`/`ink` classes.

| Location | Current | Action |
|---|---|---|
| `components/layout/MobileFooter.tsx` | `bg-black text-white` | Keep — permanent dark footer in both themes. No change. |
| `components/ui/motion-footer.tsx` | `bg-black text-white` | Keep — permanent dark footer. No change. |
| `components/sections/Process.tsx` | `bg-black` section + `text-cream` | Section stays black; change its `text-cream` → `text-white` so it reads in white theme. |
| `components/sections/CTA.tsx` | `text-white` on `bg-accent` | Keep — yellow constant. No change. |
| `components/ui/layout-grid.tsx` | `bg-black` image dim overlay | Keep — intentional dimming. No change. |
| `components/sections/TeamMarquee.tsx` | `text-white` on social gradients | Keep — gradient constant. No change. |
| `components/ui/how-it-works.tsx` | `bg-white dark:bg-neutral-900`, `dark:` variants | Already theme-aware; verify contrast in both themes. |
| `components/ui/TeamCarousel.tsx` | card `bg-white/5`; `text-white` on gradient fills | Change card bg to `bg-ink-900/40` (flips); keep `text-white` on gradients. |
| `app/our-digital-agency/page.tsx` | `text-white` on a flipping section | Convert to `text-cream` so it flips. |
| `components/ui/ThinkingTabs.tsx`, `components/sections/ServiceTabs.tsx`, `components/motion/CustomCursor.tsx`, misc | literal white/black | Verify each during implementation; convert to themed classes where on flipping surfaces; keep where on constant backgrounds. |

### 7. Behavior decisions (confirmed)

- **Instant swap** — no transition animation on theme change.
- **Deliberate dark blocks** (footers, Process section, CTA yellow, image dims) stay as-is in both themes for contrast.
- **Persistence** — explicit toggle saves to `localStorage`; first-time visitors follow `prefers-color-scheme`.

## Files touched

- `tailwind.config.ts` — ink/cream → `rgb(var(--x) / <alpha-value>)`
- `app/globals.css` — add palette vars to `:root` and `.dark`
- `components/ui/ThemeToggle.tsx` — new toggle component
- `app/layout.tsx` — FOUC head script
- `components/layout/Navbar.tsx` — insert `<ThemeToggle />` right of Clock
- ~5–8 component/page files — literal-color QA fixes (see table)

## Verification

1. `npm run build` succeeds; no Tailwind class errors from the variable remap.
2. Run dev server; toggle on desktop and mobile at several breakpoints.
3. Walk every section/route (`/`, `/services/*`, `/about-us`, `/our-digital-agency`, `/contact-us`, blog, thank-you) in both themes and confirm contrast.
4. Reload after toggling → choice persists. Fresh profile → follows OS preference. No flash-of-wrong-theme on load.
5. Check focus/aria on the toggle (keyboard operable, announced correctly).

## Out of scope

- Semantic-token refactor (Approach B) and `dark:`-everywhere rewrite (Approach C) — rejected for diff size/risk.
- Smooth color-transition animation — rejected (instant swap confirmed).
- System-preference live-listening after first explicit choice — not needed; an explicit toggle always wins.
