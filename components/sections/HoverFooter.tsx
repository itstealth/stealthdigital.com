"use client";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  ArrowUpRight,
} from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";
import { SITE } from "@/data/site";
import { SERVICES } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

/**
 * HoverFooter
 * ----------
 * A Stealth Digital-branded demo of the hover-footer primitives
 * (TextHoverEffect + FooterBackgroundGradient) from
 * @/components/ui/hover-footer.
 *
 * Drop this into any page where you want a big interactive wordmark
 * above the link grid.
 */
export function HoverFooter() {
  // Footer link data — pulled from real site content
  const serviceLinks = SERVICES.map((s) => ({
    label: s.shortTitle,
    href: `/services/${s.slug}`,
  }));

  const footerLinks = [
    {
      title: "Services",
      links: serviceLinks,
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about-us" },
        { label: "Work", href: "/#work" },
        { label: "Journal", href: "/blog" },
        { label: "Contact", href: "/contact-us" },
      ],
    },
  ];

  // Contact info
  const contactInfo = [
    {
      icon: <Mail size={18} className="text-accent" />,
      text: SITE.email,
      href: `mailto:${SITE.email}`,
    },
    {
      icon: <Phone size={18} className="text-accent" />,
      text: SITE.phone,
      href: `tel:${SITE.phone.replace(/\s/g, "")}`,
    },
    {
      icon: <MapPin size={18} className="text-accent" />,
      text: SITE.address.line1,
    },
  ];

  // Social media icons
  const socialLinks = [
    {
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      href: SITE.social.linkedin,
    },
    {
      icon: <Instagram size={20} />,
      label: "Instagram",
      href: SITE.social.instagram,
    },
    {
      icon: <Facebook size={20} />,
      label: "Facebook",
      href: SITE.social.facebook,
    },
    {
      icon: <Youtube size={20} />,
      label: "YouTube",
      href: SITE.social.youtube,
    },
  ];

  return (
    <footer className="bg-ink-950/10 relative h-fit rounded-3xl overflow-hidden m-4 md:m-8 border border-cream/10">
      <div className="max-w-7xl mx-auto p-8 md:p-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-accent text-3xl font-extrabold">
                &hearts;
              </span>
              <span className="text-cream text-3xl font-bold">
                {SITE.name}
              </span>
            </Link>
            <p className="text-cream/60 text-sm leading-relaxed max-w-xs">
              {SITE.description}
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-cream text-lg font-semibold mb-6 font-display">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-cream/70 hover:text-accent transition-colors font-sans"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h4 className="text-cream text-lg font-semibold mb-6 font-display">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-cream/70 hover:text-accent transition-colors text-sm"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-cream/70 hover:text-accent transition-colors text-sm">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-cream/10 my-8" />

        {/* CTA strip */}
        <Reveal variant="up">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                [Ready when you are]
              </div>
              <h3 className="font-display text-2xl md:text-4xl font-bold text-cream tracking-tight">
                Let's build something <span className="text-accent italic">stealth</span>.
              </h3>
            </div>
            <Button
              href="/contact-us"
              variant="primary"
              size="md"
              showArrow
              magnetic
            >
              Start a Project
            </Button>
          </div>
        </Reveal>

        <hr className="border-t border-cream/10 my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          {/* Social icons */}
          <div className="flex space-x-6 text-cream/40">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="hover:text-accent transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-cream/40 text-center md:text-left font-mono text-[10px] uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>

      {/* Text hover effect — interactive wordmark below the link grid */}
      <div className="lg:flex hidden h-[20rem] mt-8 mb-12 items-end justify-center px-8">
        <TextHoverEffect
          text={SITE.shortName.toUpperCase()}
          className="z-50"
          duration={0.3}
        />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}

export default HoverFooter;