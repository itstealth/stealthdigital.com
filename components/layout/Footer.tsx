"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight, Linkedin, Instagram, Facebook, Youtube } from "lucide-react";
import { SITE } from "@/data/site";
import { SERVICES } from "@/data/services";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 pt-24 md:pt-40 pb-8 border-t border-cream/10">
      <div className="container-fluid mb-20 md:mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <Reveal variant="up">
            <h2 className="font-display text-[15vw] md:text-[8vw] font-bold leading-[0.9] tracking-[-0.04em] text-cream">
              Let's talk.
            </h2>
          </Reveal>
          
          <Reveal variant="up" delay={0.2}>
            <Link
              href="/contact-us"
              className="group inline-flex items-center justify-center h-32 w-32 md:h-40 md:w-40 rounded-full bg-cream text-ink-950 font-display text-lg font-bold transition-transform hover:scale-110"
            >
              Get in Touch
            </Link>
          </Reveal>
        </div>
      </div>

      {/* Link columns */}
      <div className="container-fluid grid gap-12 md:grid-cols-12 md:gap-8 pb-20">
        {/* Brand */}
        <div className="md:col-span-4">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="font-display text-2xl font-bold text-cream">
              Stealth Digital
            </span>
          </Link>
          <p className="text-cream/50 text-sm md:text-base leading-relaxed max-w-sm mb-8 font-sans">
            A Delhi NCR-based digital marketing agency. We help ambitious brands
            grow through SEO, paid media, social, and unforgettable websites.
          </p>
          <div className="flex items-center gap-4">
            {[
              { icon: Linkedin, href: SITE.social.linkedin, label: "LinkedIn" },
              { icon: Instagram, href: SITE.social.instagram, label: "Instagram" },
              { icon: Facebook, href: SITE.social.facebook, label: "Facebook" },
              { icon: Youtube, href: SITE.social.youtube, label: "YouTube" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-cream/40 transition-colors hover:text-cream"
              >
                <s.icon size={20} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="md:col-span-3 md:col-start-6">
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cream/40 mb-6">Services</h4>
          <ul className="space-y-4">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="font-display text-xl text-cream/70 hover:text-cream transition-colors link-underline"
                >
                  {s.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company & Legal */}
        <div className="md:col-span-2">
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cream/40 mb-6">Company</h4>
          <ul className="space-y-4 text-cream/70 font-display text-xl">
            <li><Link href="/about-us" className="link-underline hover:text-cream">About</Link></li>
            <li><Link href="/blog" className="link-underline hover:text-cream">Journal</Link></li>
            <li><Link href="/#work" className="link-underline hover:text-cream">Work</Link></li>
            <li><Link href="/contact-us" className="link-underline hover:text-cream">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-cream/40 mb-6">Legal</h4>
          <ul className="space-y-4 text-cream/70 font-display text-xl">
            <li><Link href="/privacy-policy" className="link-underline hover:text-cream">Privacy</Link></li>
            <li><Link href="/terms" className="link-underline hover:text-cream">Terms</Link></li>
          </ul>
        </div>
      </div>

      {/* Massive wordmark & Bottom strip */}
      <div className="container-fluid pt-8 border-t border-cream/10">
        <Reveal variant="up">
          <h2 className="font-display text-[16vw] md:text-[22vw] font-bold leading-[0.75] tracking-tight text-cream/[0.03] select-none text-center">
            STEALTH
          </h2>
        </Reveal>
        <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-cream/30">
            © {new Date().getFullYear()} Stealth Digital. All rights reserved.
          </p>
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-cream/30">
            Based in Delhi NCR
          </p>
        </div>
      </div>
    </footer>
  );
}