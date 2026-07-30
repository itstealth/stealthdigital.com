# Mobile Footer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a minimal static mobile footer that replaces the cinematic desktop footer on viewports narrower than 768px, by adding one new server component and swapping the layout.

**Architecture:** Pure server component (`MobileFooter.tsx`) imports from existing `data/services.ts` and `data/site.ts`. `app/layout.tsx` wraps the existing `<CinematicFooter />` in `<div className="hidden md:block">` and adds `<div className="md:hidden"><MobileFooter /></div>`. Both render in the DOM; CSS picks the visible one. No new dependencies.

**Tech Stack:** Next.js 16 App Router, React 19 server components, Tailwind CSS 3, TypeScript strict. No animation libs, no client JS, no `"use client"` directive in the new file.

---

## File Structure

| File | Status | Responsibility |
|---|---|---|
| `components/layout/MobileFooter.tsx` | NEW | Server component rendering the minimal mobile footer (brand / tagline / services / company / legal / social / copyright). |
| `app/layout.tsx` | MODIFIED | Wrap `<CinematicFooter />` in `hidden md:block`, add `<MobileFooter />` in `md:hidden`. |

No other files change. No schema changes. No new dependencies. No tests added (the codebase has no test infrastructure; verification is `tsc` + `next build` + DevTools mobile emulation).

---

## Task 1: Create the MobileFooter component

**Files:**
- Create: `components/layout/MobileFooter.tsx`

- [ ] **Step 1: Create the file with the full server component**

Create `components/layout/MobileFooter.tsx` with this exact content:

```tsx
import Link from "next/link";
import { SERVICES } from "@/data/services";
import { SITE } from "@/data/site";

/**
 * MobileFooter
 * ------------
 * Minimal, static footer rendered on viewports < 768px. Replaces the
 * CinematicFooter on phones. Pure server component — no animation, no
 * client JS, no icons. Reads from the same data sources as the rest
 * of the site so updates propagate automatically.
 */
export function MobileFooter() {
  const companyLinks = [
    { label: "About", href: "/about-us" },
    { label: "Journal", href: "/blog" },
    { label: "Work", href: "/#work" },
    { label: "Contact", href: "/contact-us" },
  ];

  const legalLinks = [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Support", href: "#" },
  ];

  const socialLinks = [
    { label: "LinkedIn", href: SITE.social.linkedin },
    { label: "Instagram", href: SITE.social.instagram },
    { label: "Facebook", href: SITE.social.facebook },
    { label: "YouTube", href: SITE.social.youtube },
  ];

  return (
    <footer className="md:hidden bg-black text-white px-6 py-12 border-t border-white/10">
      {/* Brand */}
      <div>
        <h2 className="text-2xl font-bold text-white">Stealth Digital</h2>
        <p className="text-sm text-white/60 leading-relaxed mt-2 max-w-sm">
          A Delhi NCR-based digital marketing agency. We help ambitious
          brands grow through SEO, paid media, social, and unforgettable
          websites.
        </p>
      </div>

      {/* Services */}
      <div className="mt-10">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 mb-3">
          Services
        </h3>
        <ul className="space-y-2">
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="text-base text-white hover:underline underline-offset-4"
              >
                {s.shortTitle}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Company */}
      <div className="mt-10">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 mb-3">
          Company
        </h3>
        <ul className="space-y-2">
          {companyLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-base text-white hover:underline underline-offset-4"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Legal */}
      <div className="mt-10">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 mb-3">
          Legal
        </h3>
        <ul className="space-y-2">
          {legalLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-base text-white hover:underline underline-offset-4"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Follow */}
      <div className="mt-10">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 mb-3">
          Follow
        </h3>
        <ul className="space-y-2">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-white hover:underline underline-offset-4"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Copyright */}
      <p className="text-xs text-white/40 mt-10">
        © {new Date().getFullYear()} Stealth Digital. All rights reserved.
      </p>
    </footer>
  );
}

export default MobileFooter;
```

Notes on choices:
- **No `"use client"` directive** — pure server component.
- **`md:hidden` on the outer `<footer>`** — Tailwind's `md:` prefix is `≥768px`, so `md:hidden` means "hide at ≥768px", which makes the footer visible only on phones.
- **`border-t border-white/10`** — subtle top divider that matches the desktop footer's separator style.
- **`space-y-2`** on `<ul>` — 8px between stacked links, per the spec's `mt-2` requirement.
- **`max-w-sm` on tagline** — caps line length so the paragraph wraps before reaching the edge of a typical phone.
- **Services loop pulls from `SERVICES`** — uses `shortTitle` for the visible label and `/services/${slug}` for the route.
- **Social links use `<a target="_blank">` not `<Link>`** — external URLs need the noopener/noreferrer pair for security.

- [ ] **Step 2: Verify the file compiles**

Run: `npx tsc --noEmit`
Expected: No errors. (The component is currently unreferenced, so this just verifies the file's internal types.)

- [ ] **Step 3: Commit the new file**

```bash
git add components/layout/MobileFooter.tsx
git commit -m "Add MobileFooter component (minimal, static, <768px)"
```

---

## Task 2: Wire MobileFooter into the root layout

**Files:**
- Modify: `app/layout.tsx` (replace the single `<CinematicFooter />` line with the CSS swap)

- [ ] **Step 1: Read the current layout to confirm the import and the footer line**

Read `app/layout.tsx` and locate:
- The existing import: `import { CinematicFooter } from "@/components/ui/motion-footer";`
- The existing JSX line: `<CinematicFooter />`

- [ ] **Step 2: Add the MobileFooter import**

Add one new import below the existing `CinematicFooter` import:

```tsx
import { CinematicFooter } from "@/components/ui/motion-footer";
import { MobileFooter } from "@/components/layout/MobileFooter";
```

- [ ] **Step 3: Replace the `<CinematicFooter />` line with the CSS-swap pair**

Replace the single line:

```tsx
<CinematicFooter />
```

with:

```tsx
<div className="hidden md:block">
  <CinematicFooter />
</div>
<div className="md:hidden">
  <MobileFooter />
</div>
```

The final `app/layout.tsx` `<body>` block should read:

```tsx
<body className="grain-overlay min-h-screen overflow-x-hidden bg-ink-950">
  <Preloader />
  <SmoothScroll />
  <CustomCursor />
  <Navbar />
  <main className="relative">{children}</main>
  <div className="hidden md:block">
    <CinematicFooter />
  </div>
  <div className="md:hidden">
    <MobileFooter />
  </div>
</body>
```

- [ ] **Step 4: Verify typecheck and build**

Run: `npx tsc --noEmit`
Expected: 0 errors.

Run: `npx next build`
Expected: ✓ all 22 routes generate as static.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx
git commit -m "Swap footers below 768px: CinematicFooter hidden, MobileFooter shown"
```

---

## Task 3: Manual visual verification

**Files:** none (read-only)

- [ ] **Step 1: Start the dev server**

Run: `pnpm run dev`
Expected: Server starts, prints `Local: http://localhost:3000`.

- [ ] **Step 2: Mobile viewport check (≤768px)**

Open `http://localhost:3000` in Chrome DevTools with device emulation set to any phone preset (e.g. iPhone 14 Pro — width 393px).

Scroll to the bottom of any page. Expected:
- Footer background is solid black (`bg-black`).
- "Stealth Digital" heading visible at `text-2xl`, white.
- Tagline paragraph in muted white below.
- Five section groups (Services, Company, Legal, Follow) stacked vertically with mono uppercase labels.
- Each link is its own line, white, hover underlines.
- Copyright at the very bottom.
- No animation, no parallax, no marquee, no giant STEALTH wordmark.
- No CinematicFooter content visible.

- [ ] **Step 3: Desktop viewport check (≥768px)**

Switch DevTools device emulation to "Responsive" at 1024px or pick a desktop preset.

Scroll to the bottom of the same page. Expected:
- CinematicFooter renders as before — marquee, heading, social pills, secondary links, giant yellow STEALTH wordmark at the bottom.
- MobileFooter content is NOT visible.

- [ ] **Step 4: Stop the dev server**

In the terminal where `pnpm run dev` is running, press `Ctrl+C` to shut it down.

---

## Self-Review

**Spec coverage:**

| Spec section | Plan task |
|---|---|
| Goal: replace footer below 768px | Tasks 1 + 2 |
| No animation libs | Task 1 (no imports) |
| No client JS | Task 1 (no `"use client"`) |
| No icons | Task 1 (no `lucide-react` import) |
| Stacked one-per-line | Task 1 (`space-y-2`, single `<li>` per row) |
| Black bg / white text | Task 1 (`bg-black text-white`) |
| Brand heading + tagline | Task 1 (top section) |
| Services from `SERVICES` | Task 1 (loop) |
| Company with About/Journal/Work/Contact | Task 1 (`companyLinks` array) |
| Legal with Privacy/Terms/Support | Task 1 (`legalLinks` array) |
| Follow from `SITE.social` | Task 1 (`socialLinks` array) |
| Copyright with `new Date().getFullYear()` | Task 1 (bottom paragraph) |
| Architecture: CSS swap in layout | Task 2 |
| Verification: tsc + build + manual mobile | Tasks 2 step 4 + Task 3 |

**No placeholders:** all code is shown in full. No "TBD", "add error handling", or "similar to above".

**Type consistency:** `SERVICES`, `SITE.social` keys, `Link` and `<a>` props all match the existing `data/services.ts` / `data/site.ts` types and the rest of the codebase.

**Coverage gaps:** none.