---
title: "Core Web Vitals in 2025: What Actually Matters (And What's Just Noise)"
excerpt: "INP replaced FID in March 2024. Most agencies are still optimising for the wrong metrics. Here's the current state of Core Web Vitals and the changes we made for our clients."
date: "2026-05-31"
author: "Ananya Joshi"
authorRole: "Creative Director, Stealth Digital"
category: "Web Development"
readTime: "7 min read"
coverImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1600&q=80"
tags: ["Core Web Vitals", "Performance", "Web Development", "INP"]
---

In March 2024, Google officially replaced FID (First Input Delay) with INP (Interaction to Next Paint) as a Core Web Vital. Most of the SEO and dev world is still optimising for the wrong things.

Here's what's changed and what actually matters in 2025.

## The current Core Web Vitals

Google uses three metrics:

1. **LCP (Largest Contentful Paint)** — measures loading performance. Should be under 2.5 seconds.
2. **INP (Interaction to Next Paint)** — measures interactivity. Should be under 200 milliseconds.
3. **CLS (Cumulative Layout Shift)** — measures visual stability. Should be under 0.1.

## What changed with INP

FID measured only the first interaction. INP measures responsiveness throughout the entire page lifecycle. It's a stricter metric and catches issues FID missed:

- Long-running JavaScript tasks
- Heavy event handlers
- Third-party scripts blocking the main thread
- Slow form interactions

For most sites we audit, INP is the new bottleneck. Getting green INP requires fixing things most developers haven't thought about.

## What still matters (and what's noise)

### Noise
- **Micro-optimisations to LCP by 50ms.** If you're under 2.5s, focus elsewhere.
- **Image format wars** (AVIF vs WebP). Both are fine. Pick one and move on.
- **CDN micro-optimisations.** Pick a good CDN. Don't obsess over edge locations.

### What actually matters
- **JavaScript bundle size.** The single biggest lever for INP.
- **Third-party scripts.** Tag managers, chat widgets, analytics — each one costs you 50-200ms.
- **Server response time.** TTFB under 800ms is the new baseline.
- **Render-blocking resources.** CSS and JS in the head block rendering.
- **Layout stability from late-loading content.** Ads, fonts, embeds.

## The audit framework we use

For every client site, we run the same audit:

### Week 1: Measurement
- Lighthouse audits on mobile and desktop
- Real User Monitoring (RUM) via Chrome UX Report or SpeedCurve
- WebPageTest filmstrips for top 10 pages
- CrUX data for the past 28 days

### Week 2: Prioritisation
We don't chase every metric. We rank issues by:
1. **Traffic impact** — fix what's wrong on the pages that matter most
2. **Effort vs. impact** — quick wins first, then deeper work
3. **CWV threshold** — how far over budget are we

### Week 3-4: Fixes
Standard playbook:

**JavaScript optimisation:**
- Code-split heavy bundles
- Defer non-critical scripts
- Self-host or proxy third-party scripts
- Remove unused libraries (looking at you, jQuery in 2025)

**Third-party script audit:**
- Tag manager audit (we typically cut 30-50% of tags)
- Lazy-load below-the-fold widgets
- Replace chat widgets with on-demand loaders

**Image optimisation:**
- Responsive images with proper srcset
- Lazy loading for below-fold images
- Modern formats (AVIF or WebP)
- CDN-served images with auto-optimisation

**CSS optimisation:**
- Inline critical CSS
- Defer non-critical CSS
- Remove unused styles

**Font strategy:**
- Preload primary fonts
- Font-display: swap
- Subset fonts (Latin only if Hindi/EUR users aren't your audience)

**Server optimisation:**
- CDN setup (Cloudflare, Fastly, BunnyCDN)
- Edge caching for HTML on appropriate pages
- Image optimisation at the edge

### Month 2: Verification
- Re-run audits
- Compare RUM data (not just synthetic tests)
- Track organic traffic and conversions

## Real results

For one client (a B2B SaaS platform):

**Before:**
- LCP: 4.2s
- INP: 380ms
- CLS: 0.18
- Organic traffic: declining 2% monthly

**After (90 days):**
- LCP: 1.8s
- INP: 145ms
- CLS: 0.04
- Organic traffic: +38% (12 months after fixes)
- Conversion rate: +22%

For an e-commerce client:

**Before:**
- LCP: 6.1s on mobile
- INP: 520ms
- Cart abandonment: 78%

**After (60 days):**
- LCP: 2.3s on mobile
- INP: 165ms
- Cart abandonment: 64%
- Mobile revenue: +71%

## The framework that works

Stop chasing "perfect" Lighthouse scores. Chase business outcomes:

1. **Measure** with real user data, not just synthetic tests
2. **Prioritise** by traffic and revenue impact
3. **Fix** the bottlenecks (usually JS bundle and third-party scripts)
4. **Verify** with RUM data over 28-day windows
5. **Iterate** — performance is never "done"

The sites that win on CWV aren't the ones with 100/100 scores. They're the ones that hit "good" thresholds consistently for real users on real devices on real networks.

## Your move

If you haven't audited your CWV in the past 6 months, you're flying blind. Run PageSpeed Insights on your top 10 pages. Look at your CrUX data in Search Console. If you're failing INP (which most sites are), the fix is usually JavaScript audit and third-party script cleanup.

Need help? Our performance team audits and optimises sites as part of every web build and SEO engagement. Performance isn't a one-time project — it's a discipline.