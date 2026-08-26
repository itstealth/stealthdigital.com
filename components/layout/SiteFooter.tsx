"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Plus,
  Twitter,
  Youtube,
} from "lucide-react";
import { SITE } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { InfiniteGrid } from "@/components/ui/the-infinite-grid";
import { cn } from "@/lib/utils";

/**
 * SiteFooter
 * ----------
 * Single responsive footer for the whole site. Replaces the old
 * CinematicFooter (desktop) / MobileFooter (mobile) split.
 *
 * Layout mirrors the Digital Gravity footer: centred wordmark, a social
 * row flanked by hairlines, five link columns, an oversized STEALTH
 * wordmark, then a bottom legal bar. Under `md` the columns collapse
 * into accordions driven by a grid-template-rows 0fr -> 1fr transition.
 *
 * Colours come from the ink/cream CSS variables so the footer flips
 * with the site's light/dark theme toggle.
 */

const SOCIALS = [
  { icon: Linkedin, href: SITE.social.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: SITE.social.instagram, label: "Instagram" },
  { icon: Facebook, href: SITE.social.facebook, label: "Facebook" },
  { icon: Youtube, href: SITE.social.youtube, label: "YouTube" },
  { icon: Twitter, href: SITE.social.x, label: "X" },
];

const MAPS_URL = `https://maps.google.com/?q=${encodeURIComponent(
  `${SITE.address.line1}, ${SITE.address.line2}`
)}`;

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Contact Us",
    links: [
      {
        label: `${SITE.address.line1}, ${SITE.address.line2}`,
        href: MAPS_URL,
        external: true,
      },
      { label: SITE.email, href: `mailto:${SITE.email}` },
      { label: SITE.phone, href: `tel:${SITE.phone.replace(/\s+/g, "")}` },
    ],
  },
  {
    title: "Overview",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Our Agency", href: "/our-digital-agency" },
      { label: "Services", href: "/services" },
      { label: "Our Work", href: "/#work" },
      { label: "Blog", href: "/blog" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
  {
    title: "Digital Growth & Marketing",
    links: [
      {
        label: "Search Engine Optimization",
        href: "/services/search-engine-optimization",
      },
      {
        label: "Performance Marketing",
        href: "/services/search-engine-marketing",
      },
      {
        label: "Social Media Optimization",
        href: "/services/social-media-marketing",
      },
    ],
  },
  {
    title: "Creative & Technology",
    links: [
      { label: "Web Development", href: "/services/website-design-development" },
      { label: "UI/UX Design", href: "/services/ui-ux-design" },
      { label: "Video Production", href: "/services/video-production" },
    ],
  },
  {
    title: "What We Do",
    links: [
      { label: "Local SEO", href: "/services/search-engine-optimization" },
      { label: "E-commerce SEO", href: "/services/search-engine-optimization" },
      {
        label: "Online Reputation Management",
        href: "/services/search-engine-optimization",
      },
      { label: "Google Ads", href: "/services/search-engine-marketing" },
      { label: "Meta Ads", href: "/services/search-engine-marketing" },
      { label: "Content Creation", href: "/services/social-media-marketing" },
    ],
  },
];

const LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

/** Link with an underline that wipes in left-to-right and out right-to-left. */
function UnderlineLink({ link, className }: { link: FooterLink; className?: string }) {
  const classes = cn(
    "relative inline-block text-cream/80 transition-colors hover:text-cream",
    "after:absolute after:bottom-0 after:left-auto after:right-0 after:h-px after:w-0 after:bg-cream",
    "after:transition-[width] after:duration-[400ms] after:ease-[cubic-bezier(0.135,0.9,0.15,1)]",
    "hover:after:left-0 hover:after:right-auto hover:after:w-full",
    className
  );

  if (link.external || link.href.startsWith("mailto:") || link.href.startsWith("tel:")) {
    return (
      <a
        href={link.href}
        className={classes}
        {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={classes}>
      {link.label}
    </Link>
  );
}

export function SiteFooter() {
  // Which accordions are expanded. Only meaningful below `md` — from `md`
  // up the list wrapper is forced open by a responsive grid-rows utility.
  const [open, setOpen] = useState<string[]>([]);

  const toggle = (title: string) =>
    setOpen((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );

  return (
    <footer className="relative overflow-hidden bg-[radial-gradient(16.5%_16%_at_50%_5.8%,rgb(var(--ink-800))_0%,rgb(var(--ink-950))_100%)]">
      {/* Scrolling grid backdrop; brightens under the cursor. */}
      <InfiniteGrid className="text-cream" />

      <div className="container-fluid relative z-10 pt-12 md:pt-[4.6875rem]">
        {/* Wordmark */}
        <Reveal variant="up">
          <div className="mb-8 flex justify-center md:mb-10">
            <Link
              href="/"
              className="font-display text-3xl font-bold tracking-[-0.03em] text-cream md:text-5xl"
            >
              Stealth Digital
            </Link>
          </div>
        </Reveal>

        {/* Socials flanked by hairlines */}
        <Reveal variant="up" delay={100}>
          <div className="mb-8 flex items-center md:mb-[3.125rem]">
            <span className="h-px w-full bg-cream/25" />
            <ul className="flex shrink-0 items-center gap-3 px-4 md:px-[3.125rem]">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group relative flex h-10 w-10 items-center justify-center"
                  >
                    {/* Always filled on mobile, fills on hover from md up. */}
                    <span className="absolute inset-0 rounded-full bg-accent transition-transform duration-300 md:scale-0 md:group-hover:scale-100" />
                    <s.icon
                      size={18}
                      strokeWidth={1.5}
                      className="relative z-10 text-ink-950 transition-colors duration-300 md:text-cream md:group-hover:text-ink-950"
                    />
                  </a>
                </li>
              ))}
            </ul>
            <span className="h-px w-full bg-cream/25" />
          </div>
        </Reveal>

        {/* Link columns / mobile accordions */}
        <div className="flex w-full flex-wrap justify-between">
          {COLUMNS.map((col, i) => {
            const isOpen = open.includes(col.title);
            return (
              <Reveal
                key={col.title}
                variant="up"
                delay={100 + i * 60}
                className="w-full max-md:border-b max-md:border-cream/20 max-md:pb-3 max-md:mb-3 md:mb-12 md:w-[47%] lg:mb-0 lg:w-max lg:max-w-[14em] xl:max-w-[20em]"
              >
                <button
                  type="button"
                  onClick={() => toggle(col.title)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between border-l-2 border-cream py-1 pl-2 pr-1 text-left md:mb-5 md:cursor-default md:pointer-events-none"
                >
                  <h5 className="font-display text-base font-semibold text-cream md:text-lg">
                    {col.title}
                  </h5>
                  <Plus
                    size={15}
                    className={cn(
                      "shrink-0 text-cream transition-transform duration-[400ms] md:hidden",
                      isOpen && "rotate-45"
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-[400ms] ease-out md:grid-rows-[1fr]",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <ul className="overflow-hidden">
                    {col.links.map((link) => (
                      <li
                        key={link.label}
                        className="mb-[1.125rem] first:mt-3 md:mb-6 md:first:mt-0"
                      >
                        <UnderlineLink
                          link={link}
                          className="text-base leading-tight md:text-[1.125rem]"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Oversized wordmark */}
        <Reveal variant="fade" delay={200}>
          <h2
            aria-hidden="true"
            className="select-none bg-gradient-to-b from-cream/90 to-cream/10 bg-clip-text text-center font-display text-[19vw] font-bold leading-[0.8] tracking-[-0.045em] text-transparent"
          >
            STEALTH
          </h2>
        </Reveal>
      </div>

      {/* Bottom legal bar */}
      <div className="relative z-10 border-t border-cream/20 bg-ink-950">
        <div className="container-fluid flex flex-col items-center justify-between gap-4 py-[1.4375rem] md:flex-row">
          <Reveal variant="up">
            <ul className="flex items-center">
              {LEGAL_LINKS.map((link, i) => (
                <li
                  key={link.label}
                  className={cn(
                    i !== LEGAL_LINKS.length - 1 && "border-r border-cream/60 pr-4 md:pr-8",
                    i !== 0 && "pl-4 md:pl-8"
                  )}
                >
                  <UnderlineLink link={link} className="text-sm md:text-base" />
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal variant="up" delay={100}>
            <p className="text-sm text-cream/80 md:text-base">
              © {new Date().getFullYear()}.{" "}
              <UnderlineLink
                link={{ label: "Stealth Digital.", href: "/" }}
                className="text-cream"
              />
            </p>
          </Reveal>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
