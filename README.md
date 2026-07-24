# Stealth Digital Website

A production-grade marketing website for **Stealth Digital**, a Delhi NCR-based digital marketing agency. Built with Next.js 15, Tailwind CSS, and Framer Motion — visually inspired by [Atomic Digital Marketing](https://atomicdigitalmarketing.co.uk/) with Stealth's content, branding, and identity.

## ✨ Highlights

- **Full site** — Homepage, About, Services overview, 4 service detail pages, Blog index, 6 blog posts, Contact, Thank-you
- **Heavy animations matching Atomic's design language**:
  - Custom arrow cursor (snappy lerp tracking)
  - Magnetic buttons (configurable strength)
  - Per-word text reveal masks
  - Staggered scroll-triggered fade-ins
  - Parallax depth on images and sections
  - Infinite stats & awards marquees
  - Animated number counters
  - Lenis-powered smooth scroll
  - Tab transitions with shared `layoutId`
  - Sticky nav with hide-on-scroll-down
  - Asymmetric editorial layouts
- **Distinctive design system**:
  - Display: Bricolage Grotesque (variable)
  - Mono: JetBrains Mono
  - Sans: Inter Tight
  - Palette: Ink black + saffron orange (#FC6D3A) + cream
  - Subtle grain overlay site-wide
  - Editorial number markers (01, 02, 03)
- **Production-ready** — TypeScript strict mode, SEO meta, OpenGraph, static export-friendly

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve production build
```

## 📁 Project structure

```
app/
├── layout.tsx              # Root layout (fonts, nav, footer, cursor)
├── page.tsx                # Homepage
├── about-us/page.tsx
├── contact-us/page.tsx
├── services/page.tsx       # Services overview
├── services/[slug]/page.tsx × 4   # SEO, SEM, SMM, Web Design
├── blog/page.tsx           # Blog index
├── blog/[slug]/page.tsx    # Blog post template
├── thank-you/page.tsx
└── globals.css             # Design tokens, prose styles

components/
├── layout/                 # Navbar, Footer
├── motion/                 # Animation primitives
│   ├── SmoothScroll.tsx    # Lenis
│   ├── CustomCursor.tsx
│   ├── Reveal.tsx
│   ├── TextReveal.tsx
│   ├── Magnetic.tsx
│   ├── Parallax.tsx
│   ├── Counter.tsx
│   └── Marquee.tsx
├── sections/               # Hero, ServiceTabs, StatsMarquee, etc.
└── ui/                     # Button, Eyebrow primitives

content/blog/*.md           # 6 sample blog posts (markdown + frontmatter)
data/                       # Typed content (services, stats, testimonials, etc.)
lib/                        # Utilities, blog loader
```

## 🛠 Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSG + image optimization + SEO |
| Language | TypeScript (strict) | Type safety |
| Styling | Tailwind CSS 3 | Atomic-style design system |
| Animations | Framer Motion + Lenis | Heavy motion, layout animations |
| Forms | react-hook-form + Zod | Type-safe validation |
| Icons | lucide-react | Modern, consistent |
| Content | Markdown + gray-matter + remark | Simple blog authoring |

## 🎨 Design system

- **Colors**: `ink-950` (#080808) backgrounds, `accent` (#FC6D3A) for highlights, `cream` (#F5F1EA) for text
- **Typography scale**: hero display up to 112px, balanced with editorial mono labels
- **Spacing**: generous editorial whitespace, asymmetric grids
- **Effects**: grain overlay, radial glows, parallax depth, magnetic interactions

## 📝 Customising content

- **Services**: edit `data/services.ts`
- **Stats**: edit `data/stats.ts`
- **Testimonials**: edit `data/testimonials.ts`
- **Case studies**: edit `data/caseStudies.ts`
- **Awards**: edit `data/awards.ts`
- **Site info** (phone, email, address): edit `data/site.ts`
- **Blog posts**: add/edit `.md` files in `content/blog/`

## 🔧 Before going live

1. **Replace the Formspree endpoint** in `data/site.ts` (`formspreeEndpoint`) with your real Formspree form ID
2. **Swap Unsplash placeholders** with real client/team photography
3. **Update team photos** in `app/about-us/page.tsx` (`TEAM` array)
4. **Set production metadata** in `app/layout.tsx` (OG image, verification tags)
5. **Add legal pages**: `/privacy-policy`, `/terms`, `/cookies`, `/disclaimer`
6. **Add real sitemap** at `app/sitemap.ts`
7. **Add `robots.txt`** at `app/robots.ts`
8. **Update social links** in `data/site.ts`

## 📄 License

Source code is yours to use. Replace all Stealth branding and content before deployment.