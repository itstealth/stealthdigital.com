# Mobile Footer Design — 2026-07-30

## Goal

Provide a mobile-only footer that replaces the cinematic desktop footer on viewports narrower than 768px (`md`). The desktop CinematicFooter is too tall, too dense, and too animation-heavy for phones — this design swaps in a minimal, static alternative.

## Constraints

- **No animation.** No GSAP, no framer-motion, no MagneticButton, no Spline, no transitions beyond the browser default link underline.
- **No client-side JS.** Pure server component. Zero React hooks, no `"use client"` directive.
- **No icons.** Plain text labels only.
- **Stacked link layout.** Each link on its own line for tap-friendliness.
- **Consistent with desktop palette.** Black background, white text, saffron accent reserved for hover.

## Architecture

Two components rendered side-by-side in `app/layout.tsx`, swapped via Tailwind's responsive `md:` prefix:

```tsx
<div className="hidden md:block"><CinematicFooter /></div>
<div className="md:hidden"><MobileFooter /></div>
```

Both components ship in the bundle, but only one is visible per viewport. The mobile component imports no animation libraries, so phones don't pay for GSAP / framer-motion / Spline parsing cost.

### Files

| File | Status | Purpose |
|---|---|---|
| `components/layout/MobileFooter.tsx` | **NEW** | Minimal mobile footer (server component) |
| `app/layout.tsx` | MODIFIED | Wrap existing CinematicFooter in `hidden md:block`, add `<MobileFooter />` with `md:hidden` |
| `components/ui/motion-footer.tsx` | unchanged | Desktop CinematicFooter untouched |
| `data/services.ts` | read-only | Source of service list |
| `data/site.ts` | read-only | Source of social URLs |

## Visual specification

Mobile viewport (≤768px wide):

```
┌─────────────────────────────────┐
│                                 │
│  Stealth Digital                │  ← h2, text-2xl, font-bold
│  Delhi NCR-based digital        │  ← p, text-sm, text-white/60
│  marketing agency.              │
│                                 │
│  Services                       │  ← eyebrow, font-mono, uppercase
│  SEO                            │       tracking-widest, text-xs,
│  Performance Marketing          │       text-white/40, mb-3
│  Social Media                   │  ← links: text-base, text-white,
│  Web Design                     │       hover:underline underline-offset-4
│                                 │
│  Company                        │
│  About                          │
│  Journal                        │
│  Work                           │
│  Contact                        │
│                                 │
│  Legal                          │
│  Privacy                        │
│  Terms                          │
│  Support                        │
│                                 │
│  Follow                         │
│  LinkedIn                       │
│  Instagram                      │
│  Facebook                       │
│  YouTube                        │
│                                 │
│  © 2026 Stealth Digital         │  ← p, text-xs, text-white/40
│                                 │
└─────────────────────────────────┘
```

### Spacing

- Outer padding: `px-6 py-12`
- Between sections: `mt-10`
- Between eyebrow label and links: `mb-3`
- Between links: `mt-2`
- Total height target: 150–200px tall on a typical phone (depends on copy length)

### Typography

| Element | Tailwind classes |
|---|---|
| Brand heading | `text-2xl font-bold text-white` |
| Tagline | `text-sm text-white/60 leading-relaxed mt-2 max-w-sm` |
| Section label | `font-mono text-[11px] uppercase tracking-[0.2em] text-white/40` |
| Link | `text-base text-white hover:underline underline-offset-4` |
| Copyright | `text-xs text-white/40 mt-10` |

## Behavior

- **Tap:** standard `<Link>` / `<a>` navigation. No JS.
- **Hover/focus:** browser default underline on links.
- **No back-to-top button.** Mobile users rely on browser chrome / pull-to-refresh.
- **No collapsible sections.** Everything visible at once.

## Data flow

```
SERVICES (data/services.ts)
  ↓ map to { shortTitle, slug }
MobileFooter.tsx → renders Services list

SITE (data/site.ts)
  ↓ { linkedin, instagram, facebook, youtube }
MobileFooter.tsx → renders Follow list (text only, no icons)
```

Both data sources already exist and are typed. No schema changes.

## Routing

| Link | href |
|---|---|
| SEO / SEM / SMM / Web Design | `/services/${slug}` |
| About | `/about-us` |
| Journal | `/blog` |
| Work | `/#work` |
| Contact | `/contact-us` |
| Privacy | `#` (placeholder, real page not built) |
| Terms | `#` |
| Support | `#` |
| LinkedIn | `SITE.social.linkedin` |
| Instagram | `SITE.social.instagram` |
| Facebook | `SITE.social.facebook` |
| YouTube | `SITE.social.youtube` |

## Testing / verification

1. `tsc --noEmit` → 0 errors
2. `next build` → all 22 routes generate as static
3. Visual check (any browser DevTools mobile emulation):
   - < 768px viewport: shows MobileFooter only
   - ≥ 768px viewport: shows CinematicFooter only
   - Black background, white text, no animation
   - All links navigable

## Out of scope

- Back-to-top button
- Newsletter signup
- Cookie consent banner
- Locale switcher
- Theme toggle

These can be added later if requested; the current design is intentionally lean.

## Open questions

None — user confirmed all key decisions in brainstorm:
- Problem scope: too tall / cramped / heavy animation
- Shape: compact minimal
- Layout: stacked one-per-line
- Animation: none
- Implementation approach: separate components + CSS swap
- Breakpoint: 768px (`md`)