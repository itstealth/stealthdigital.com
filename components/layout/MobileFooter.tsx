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