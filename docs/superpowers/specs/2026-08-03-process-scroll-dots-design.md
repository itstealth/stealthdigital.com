# Process Section — Scroll-Driven Arrow Along Dotted Path

**Date:** 2026-08-03
**Status:** Draft, awaiting user review

---

## 1. Goal

Three changes to the **Process** section:

1. Replace the current continuous "marching-ants" dash animation on the dotted path between the four phase cards with **a single scroll-driven arrow** that travels along the path as the user scrolls. The arrow's position is tied 1:1 to scroll progress — slow scroll, slow arrow; fast scroll, fast arrow; no scroll, no movement.
2. Switch the **background** of the pin-cards area from `bg-white dark:bg-black` to **pure black in all modes** so the whole section reads as one dark canvas.
3. Make the existing **dotted path** brighter so it's clearly visible against pure black and the arrow reads as travelling *on* the path.

Outcome: a darker, more cinematic Process section. The arrow is a tangible progress cue — it leaves Discover, sweeps through Strategise and Execute, and parks at Optimise as the user scrolls the section through view.

---

## 2. Scope

**In scope**
- `components/ui/how-it-works.tsx` — background, path colour, path animation, new arrow layer, glow filter.
- `components/sections/Process.tsx` — one-line background tweak to belt-and-suspender the black canvas.

**Out of scope**
- Other consumers of `HowItWorks` (none today, but the component stays generic).
- Card layouts, copy, colours, rotations — unchanged.
- The 3D pin SVG, the `Reveal` entrance animation, the `TextBlockAnimation` heading — unchanged.
- Anything in the surrounding sections (Hero, Awards, CTA, Footer).

---

## 3. Architecture

```
<section id="process" class="bg-black">        ← was bg-ink-950
  <ProcessIntro />                             ← unchanged
  <HowItWorks
    features={STEALTH_PROCESS}
    background="black"                         ← NEW prop, default "auto"
    scrollArrow={{                             ← NEW prop, default off
      enabled: true,
      color: "#FFD60A",
      glowRadius: 4,
    }}
  />
</section>
```

The arrow is rendered **inside the same SVG as the path**, above it in z-order. Its position and rotation are Framer Motion values driven by `useScroll`.

---

## 4. Components

### 4.1 `HowItWorks` — prop additions

```ts
type Background = "auto" | "black";
type ScrollArrowConfig = {
  enabled: boolean;
  color?: string;          // default "#FFD60A"
  glowRadius?: number;     // default 4 (stdDeviation)
  size?: number;           // default 14 (half-width of chevron in viewBox units)
};

interface HowItWorksProps {
  features?: Step[];
  className?: string;
  stepPositions?: StepPosition[];
  background?: Background;            // NEW
  scrollArrow?: ScrollArrowConfig;    // NEW
}
```

Defaults preserve the current visual exactly when the new props are omitted. `Process.tsx` opts in.

### 4.2 Background

**Goal:** when `background === "black"`, every visible pixel inside the section is pure flat black — no grid lines (neither the black-line layer nor the white-line layer), no edge gradients, no theme-variable leaks. The dotted path between the cards and the arrow travelling along it are the only markings on the canvas.

The current component has five layers that can leak non-black surfaces. Each is fixed when the prop is `"black"`:

| Layer | Current code | When `background="black"` |
|-------|--------------|---------------------------|
| Section wrapper (`Process.tsx`) | `bg-ink-950` (very dark gray) | `bg-black` |
| Outer container | `bg-white dark:bg-black` | `bg-black` (always) |
| Grid pattern — black lines | `opacity-[0.08]` always on | **removed from DOM** (don't render) |
| Grid pattern — white lines | `opacity-0 dark:opacity-[0.1]` | **removed from DOM** (don't render) |
| Gradient edge masks | `from-background bg-gradient-to-r/l` | **removed from DOM** (don't render) |

The `from-background` → remove-entirely change is the most important: that class pulls from the CSS `--background` variable, which the site theme sets to white in light mode. Without removing the masks, the edge-fade would render as soft **white** gradients on the section edges in light mode.

The grid pattern (both the always-visible black-line layer and the dark-mode-only white-line layer) is removed entirely — neither is wanted on pure black.

Card surfaces (outer `bg-white dark:bg-neutral-900` wrappers, inner pastel panels) are unchanged — they already have `dark:` variants that look correct on black, and when light mode somehow applies the white cards look like floating cards on a black canvas (intentional premium contrast).

### 4.3 Dotted path

| Aspect          | Before                                      | After                                                  |
|-----------------|---------------------------------------------|--------------------------------------------------------|
| Color          | `text-neutral-300 dark:text-neutral-700`    | `text-neutral-500` (single class, always medium-gray) |
| Dash pattern   | `strokeDasharray="8 6"`                     | unchanged                                              |
| Width          | `2`                                         | unchanged                                              |
| Animation      | continuous `strokeDashoffset` loop, 3s      | **removed** — static dashes                            |
| Linecap        | `round`                                     | unchanged                                              |

`neutral-500` is `#737373` — clearly readable on `#000` without competing with the arrow.

### 4.4 Scroll-driven arrow — the new layer

**Rendered inside the existing `<svg>` that draws the path**, above it in DOM order so it paints on top.

**Visual:**
- A chevron/triangle arrowhead, drawn as an SVG `<path>` so it can be oriented along the path tangent.
- Anchor design (in viewBox units; will be scaled by the parent SVG):

  ```
  M -size, -size/2
  L  size,  0
  L -size,  size/2
  Z
  ```

  With `size = 14`, this is a 28×14 chevron pointing right at the origin. We rotate the group so the arrow points in the direction of travel.

- Fill `#FFD60A` (matches `Process.tsx`'s `blockColor` accent).
- Glow filter (defined once in `<defs>`):

  ```svg
  <filter id="scroll-arrow-glow" x="-200%" y="-200%" width="500%" height="500%">
    <feGaussianBlur stdDeviation="4" result="blur" />
    <feMerge>
      <feMergeNode in="blur" />
      <feMergeNode in="blur" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
  ```

  Doubled `feMergeNode in="blur"` gives the bloom a touch more punch. Generous filter region (500%) so the glow isn't clipped at the arrow's bounding box.

**Driver:**
- `useScroll({ target: sectionRef, offset: ["start center", "end center"] })` — `start center` = arrow is at path start when the section's top edge reaches the viewport centre; `end center` = arrow is at path end when the section's bottom edge reaches the viewport centre. This ties the arrow's life to the section being actively scrolled through, not just brushing past the viewport.
- `scrollYProgress` is `MotionValue<number>` 0–1.
- `useEffect` subscribes via `scrollYProgress.on("change", progress => …)`.

**Position math (per scroll update):**

```ts
const totalLength = pathRef.current.getTotalLength();

// Sample the path at three nearby lengths to compute both position and tangent.
const length  = progress * totalLength;
const ahead   = pathRef.current.getPointAtLength(Math.min(length + 1, totalLength));
const current = pathRef.current.getPointAtLength(length);
const behind  = pathRef.current.getPointAtLength(Math.max(length - 1, 0));

// Tangent = average of forward and backward vectors (smoother at sharp curves).
const dx = ahead.x - behind.x;
const dy = ahead.y - behind.y;
const angle = Math.atan2(dy, dx);   // radians, 0 = pointing right

arrow.x.set(current.x);
arrow.y.set(current.y);
arrow.rotate.set((angle * 180) / Math.PI);
```

The `±1` sample window avoids degenerate tangents at sharp path corners.

**Reactivity:** Arrow is rendered as a `<g>` whose `transform` is bound to motion values:

```tsx
<g filter="url(#scroll-arrow-glow)">
  <motion.path
    d={chevronD}
    fill="#FFD60A"
    style={{
      translateX: arrow.x,
      translateY: arrow.y,
      rotate: arrow.rotate,
    }}
  />
</g>
```

Framer Motion binds SVG `transform` to the motion values, so updates flush per-frame without re-rendering React.

**Initial state:** Before the path ref attaches, the arrow sits at the path's start point (`getPointAtLength(0)`), rotation 0. A first `useEffect` pass sets this synchronously once the ref exists, eliminating the `(0, 0)` flash.

### 4.5 Reduced motion

`useReducedMotion()` (from `motion/react`). If `true`:
- Skip the scroll subscription.
- Render the arrow statically at the path midpoint (`getPointAtLength(totalLength / 2)`) with no rotation, OR hide the arrow entirely.
- Recommendation: **hide the arrow** for reduced-motion users. The dotted path alone communicates the journey; movement is what's being opted out of.

### 4.6 Cleanup hooks

- `useEffect` returns `scrollYProgress.on("change", …)` — Framer Motion's `.on()` returns an unsubscribe function. Cleanup is automatic.
- Path ref + arrow motion values are scoped to the component instance.

---

## 5. Process section wiring

`components/sections/Process.tsx`:

```tsx
<section id="process" className="relative bg-black">  {/* was bg-ink-950 */}
  <div className="container-fluid">…intro…</div>
  <HowItWorks
    features={STEALTH_PROCESS}
    background="black"                                          {/* forces pure-black under cards */}
    scrollArrow={{ enabled: true, color: "#FFD60A", glowRadius: 4 }}
  />
</section>
```

The data array (`STEALTH_PROCESS`) is unchanged.

`HowItWorks` applies all five background-layer changes from §4.2 when `background="black"`. No theme variable is consulted for the section's background; pure black is unconditional.

---

## 6. Accessibility

- The arrow is decorative — wrapped in `<g aria-hidden="true">` so screen readers skip it.
- The path's `<m.path>` keeps its current decorative status.
- No new focusable elements. Keyboard / screen-reader behaviour identical to current.

---

## 7. Risks & mitigations

1. **`getPointAtLength` on a `<path>` with cubic Béziers** — fully supported in all evergreen browsers; the tangent math is two extra samples on the same API. No issues.
2. **Resize / orientation change** — `totalLength` is read once on mount. The SVG uses `preserveAspectRatio="none"`, so coordinates stretch with the viewport but the length in viewBox units stays the same. The arrow therefore scales with the path visually, but its viewBox position doesn't recompute on resize. Acceptable because the path geometry is fixed; out of scope today.
3. **Initial paint flash** — Mitigated by setting the arrow's initial position synchronously in the effect's first call.
4. **Performance** — One arrow, one tangent sample per frame. `feGaussianBlur` stdDeviation=4 is light. No concerns.
5. **Path change of direction** — Cubic Bézier reversals would produce unstable tangents; the existing path geometry has none. Worth a quick visual sanity check during dev.
6. **Other consumers of `HowItWorks`** — none today (`grep` confirms). Even if added later, default props keep current behaviour.

---

## 8. Definition of done

- [ ] `how-it-works.tsx`: new `background` and `scrollArrow` props with safe defaults.
- [ ] `how-it-works.tsx`: marching-ants animation removed from the path.
- [ ] `how-it-works.tsx`: scroll-driven chevron arrow rendered inside the SVG, position + rotation bound to scroll.
- [ ] `how-it-works.tsx`: path color is `text-neutral-500` (visible on black).
- [ ] `how-it-works.tsx`: reduced-motion fallback hides the arrow.
- [ ] `Process.tsx`: section is `bg-black`; `HowItWorks` receives the new props.
- [ ] `how-it-works.tsx`: both grid pattern layers (black-line and white-line) are not rendered when `background="black"`.
- [ ] `how-it-works.tsx`: both edge gradient masks are not rendered when `background="black"`.
- [ ] Visual check in both light and dark site themes: section under and around cards is pure flat `#000` in both cases. No grid lines (black or white), no edge gradients — only the dotted path between cards and the arrow are visible against black.
- [ ] `pnpm build` passes with zero TS errors.
- [ ] Dev verification (Chrome desktop): scroll the section top→bottom. Arrow appears at Discover, follows the path tangent, sweeps through Strategise → Execute, parks at Optimise. Stops moving when scroll stops. No console errors.
- [ ] Reduced-motion verification: with `prefers-reduced-motion: reduce`, arrow is hidden; dotted path still visible.