# Infinite Gallery in `[06 / Leadership]` Team Section — Design

**Date:** 2026-08-05
**Status:** Approved (pending user review of this spec)
**Scope:** Replace the 4-card `TEAM` grid in the About page's Leadership section with a 3D infinite WebGL gallery.

## Context

The About page (`app/about-us/page.tsx`) presents leadership via a 4-portrait grid (`TEAM` array, lines 107–132) inside section `[06 / Leadership] The team.` (lines 389–457). The grid uses `StaggerChildren`, `Magnetic`, `Parallax`, and `ImageReveal` from the project's motion library.

The user wants to swap that grid for the `InfiniteGallery` React Three Fiber component they supplied. The component supports scroll-driven 3D motion, cloth-ripple shader effects, blur/opacity depth falloff, and a WebGL fallback.

Two integration problems must be solved:

1. **Missing dependencies.** The supplied component imports `@react-three/fiber`, `@react-three/drei`, and `three`. None are in `package.json`.
2. **Scroll coordination.** The component attaches `wheel` and `keydown` listeners to `document`. The page already uses `lenis` for global smooth scrolling. Without gating, the gallery would lock out Lenis for the entire page.

## Goal

Replace the current 4-card team grid with a full-viewport 3D infinite gallery showing 8–12 team portraits. Each plane shows a name + role label. The gallery owns page scroll only while visible; Lenis resumes everywhere else. Reduced-motion users get a static variant. WebGL-unsupported browsers see a fallback grid.

## Non-goals

- No per-plane bio overlay (only name + role).
- No redesign of `[06 / Leadership]` heading or right-side description — they move to an overlay over the canvas.
- No changes to other About sections.
- No data layer or CMS integration — `TEAM` remains an inline constant.
- No shader refactor or perf optimization beyond the reduced-motion branch.

## Design

### Files

**New: `components/ui/3d-gallery-photography.tsx`**
- The supplied component, edited in three places only:
  1. Default `fadeSettings` retuned for portrait photos: `{ fadeIn: { start: 0.05, end: 0.25 }, fadeOut: { start: 0.75, end: 0.95 } }`.
  2. Default `blurSettings` retuned: `{ blurIn: { start: 0.0, end: 0.1 }, blurOut: { start: 0.9, end: 1.0 }, maxBlur: 4.0 }`.
  3. Wheel/keydown listener registration wrapped in an `IntersectionObserver` keyed off a ref to the outer wrapper element (passed via a new `containerRef` prop). The observer enables listeners when the section enters the viewport and disables them when it leaves.
- `ImagePlane` gets an optional `label?: { name: string; role: string }` prop. When present, it renders a `<Html>` element from `@react-three/drei` at the plane's local origin with `center`, `transform`, `distanceFactor`, and `occlude`. Label opacity is bound to the same `opacity` uniform so labels fade with their planes.
- `GalleryScene` reads `prefers-reduced-motion` once via `matchMedia` and skips both the auto-play interval and the `time` uniform advance when reduced motion is on.
- Public exports: default `InfiniteGallery` with the same props signature as supplied, plus the new optional `containerRef?: React.RefObject<HTMLElement>`.

**New: `components/ui/3d-gallery-photography.client.tsx`**
- Thin client wrapper using `next/dynamic`:
  ```tsx
  import dynamic from "next/dynamic";
  const InfiniteGallery = dynamic(() => import("./3d-gallery-photography"), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-ink-900" />,
  });
  export default InfiniteGallery;
  ```
- This is what `app/about-us/page.tsx` imports. It ensures three.js + r3f never enter the SSR or initial client bundle.

**Edited: `app/about-us/page.tsx`**
- Replace the `TEAM` constant with an expanded array of 8–12 `{ name, role, bio, img }` entries. New portraits hosted on Unsplash to match the existing convention.
- Add `import GalleryClient from "@/components/ui/3d-gallery-photography.client";`.
- Replace lines 389–457 with a new section:
  ```tsx
  <section className="relative h-screen overflow-hidden border-b border-cream/10 bg-ink-900">
    <GalleryClient
      images={TEAM.map((m) => ({ src: m.img, alt: m.name }))}
      labels={TEAM.map((m) => ({ name: m.name, role: m.role }))}
      speed={1.2}
      visibleCount={12}
      className="absolute inset-0"
      containerRef={sectionRef}
    />
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 md:p-10 lg:p-14 text-cream">
      <Reveal variant="up" delay={0}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-3">
              [06 / Leadership]
            </div>
            <TextReveal
              as="h2"
              text="The team."
              splitBy="word"
              staggerDelay={100}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-cream leading-[1] mix-blend-exclusion"
            />
          </div>
          <p className="text-cream/80 max-w-md md:text-right mix-blend-exclusion">
            Strategists, engineers, designers, and analysts who've shipped
            500+ projects — and lost count of the late nights.
          </p>
        </div>
      </Reveal>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/70 mix-blend-exclusion">
        Use mouse wheel, arrow keys, or touch to navigate · Auto-play resumes after 3s of inactivity
      </p>
    </div>
  </section>
  ```
- Add a `useRef` for the section so the gallery's IntersectionObserver can target it.

**Edited: `package.json`**
- Add to `dependencies`:
  - `three` (latest stable)
  - `@react-three/fiber` (latest)
  - `@react-three/drei` (latest)
- Add to `devDependencies`:
  - `@types/three`
- Install via `pnpm`. (No `pnpm install` will be run until the implementation plan is approved.)

### Behavior

**Scroll coordination**
- The gallery's `wheel` listener calls `event.preventDefault()` and increments `scrollVelocity`. When the section is outside the viewport, the listener is detached, so Lenis scrolls normally.
- The `keydown` listener for arrow keys is gated the same way.
- The IntersectionObserver uses `{ threshold: 0.5 }` so the gallery only "owns" scrolling when it's at least half visible.

**Auto-play**
- After 3 seconds of no user input, `autoPlay` flips on and the gallery drifts forward slowly.
- `prefers-reduced-motion: reduce` keeps `autoPlay` permanently off.

**Hover behavior**
- Hovering a plane flips `isHovered` on its material, triggering the flag-wave shader animation.
- The label remains visible (already centered over the plane) and is unaffected by hover.

**Reduced motion**
- When `matchMedia('(prefers-reduced-motion: reduce)').matches`:
  - `autoPlay` is forced to `false`.
  - The `time` uniform is not advanced, so cloth ripples freeze.
  - Wheel/keydown still work — user-driven motion is preserved; only auto-motion is suppressed.

**WebGL fallback**
- Existing `FallbackGallery` (grid of images) is preserved. It renders inside the same `bg-ink-900` section so the visual doesn't pop.

### Label styling

Each plane's `<Html>` overlay renders:

```tsx
<div className="text-center pointer-events-none">
  <p className="font-display text-base md:text-lg font-bold text-cream leading-tight">
    {label.name}
  </p>
  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/70 mt-1">
    {label.role}
  </p>
</div>
```

Positioned with `distanceFactor={8}` so labels scale with the plane. `occlude` hides them when behind another plane. Container `<div>` has `pointer-events-none` so the underlying plane can still receive hover events.

### Risks

- **Bundle size.** `three` + `@react-three/fiber` + `@react-three/drei` add ~600 kB minified+gzipped to the dynamic chunk. Acceptable for a hero-style section that lazy-loads.
- **Shader perf.** 12 planes × 32×32 subdivisions running a fragment shader every frame. Will jank on integrated GPUs. Out of scope to optimize now; revisit if it shows up.
- **Aspect ratio.** The component scales planes as `[2 * aspect, 2, 1]` for landscape or `[2, 2 / aspect, 1]` for portrait. With portrait photos, planes get taller than wide. May need a z-spacing tweak if planes visually overlap.
- **SSR/hydration.** The `dynamic` wrapper with `ssr: false` avoids hydration mismatches. The loading skeleton uses the same `bg-ink-900` background so there's no flash.

### Verification

1. `pnpm dev` — section loads with no console errors.
2. Scroll past the section → Lenis resumes normal page scroll.
3. Scroll back → gallery responds to wheel + arrow keys.
4. Hover a plane → label remains visible; cloth flag wave plays.
5. DevTools → Rendering → Emulate `prefers-reduced-motion: reduce` → auto-play stops, ripples freeze.
6. DevTools → block WebGL → fallback grid renders.
7. `pnpm build` succeeds; main bundle excludes three.js (verified via `next build` output).
8. Manual smoke: with DevTools Network throttled to "Slow 3G", the dynamic import doesn't block above-the-fold content.

## Related

- About page section: `app/about-us/page.tsx:389-457`
- About page team data: `app/about-us/page.tsx:107-132`
- Existing 3D pattern (Spline): `components/ui/interactive-3d-robot.tsx`
- Existing team-display pattern: `components/ui/TeamCarousel.tsx`
- Tailwind theme: `tailwind.config.ts` (uses `accent`, `ink-*`, `cream`, `font-display`, `font-mono`)