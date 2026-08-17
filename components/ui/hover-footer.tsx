"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#80eeb4" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-ink-300 font-[helvetica] text-7xl font-bold"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-[#3ca2fa] font-[helvetica] text-7xl font-bold"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>
    </svg>
  );
};


export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #0F0F1166 50%, #3ca2fa33 100%)",
      }}
    />
  );
};
import {
    Mail, Phone, MapPin, Facebook, Instagram, Linkedin,
    Youtube, Twitter,
} from "lucide-react";
import { SITE } from "@/data/site";

/**
 * HoverFooter — Stealth Digital footer with the TextHoverEffect
 * background. Adapted from the shadcn snippet:
 *   - Brand: Stealth Digital (was Nur/ui)
 *   - Email: SITE.email (the address configured for lead forwarding)
 *   - Phone + address pulled from `data/site.ts`
 *   - Social links pulled from `data/site.ts` (LinkedIn / Instagram /
 *     Facebook / YouTube / X)
 *   - "About Us" and "Helpful Links" columns keep the snippet's IA; the
 *     right-most "Contact Us" column replaces the demo's hard-coded
 *     Sylhet/Bangladesh entry.
 */
export function HoverFooter() {
    const footerLinks = [
        {
            title: "About Us",
            links: [
                { label: "Our Story", href: "/about-us" },
                { label: "Services", href: "/services" },
                { label: "Case Studies", href: "#work" },
                { label: "Careers", href: "#" },
            ],
        },
        {
            title: "Helpful Links",
            links: [
                { label: "FAQs", href: "#" },
                { label: "Support", href: "mailto:" + SITE.email },
                { label: "Live Chat", href: "#", pulse: true },
            ],
        },
    ];

    const contactInfo = [
        {
            icon: <Mail size={18} className="text-[#3ca2fa]" />,
            text: SITE.email,
            href: "mailto:" + SITE.email,
        },
        {
            icon: <Phone size={18} className="text-[#3ca2fa]" />,
            text: SITE.phone,
            href: "tel:" + SITE.phone.replace(/\s/g, ""),
        },
        {
            icon: <MapPin size={18} className="text-[#3ca2fa]" />,
            text: `${SITE.address.line1}, ${SITE.address.line2}`,
        },
    ];

    const socialLinks = [
        { icon: <Linkedin size={20} />, label: "LinkedIn", href: SITE.social.linkedin },
        { icon: <Instagram size={20} />, label: "Instagram", href: SITE.social.instagram },
        { icon: <Facebook size={20} />, label: "Facebook", href: SITE.social.facebook },
        { icon: <Youtube size={20} />, label: "YouTube", href: SITE.social.youtube },
        { icon: <Twitter size={20} />, label: "X / Twitter", href: SITE.social.x },
    ];

    return (
        <footer className="bg-cream relative h-fit rounded-3xl overflow-hidden m-4 sm:m-8 text-ink-950">
            <div className="max-w-7xl mx-auto p-8 sm:p-14 z-40 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
                    {/* Brand section */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-[#3ca2fa] text-3xl font-extrabold">
                                &hearts;
                            </span>
                            <span className="text-ink-950 text-3xl font-bold">
                                Stealth Digital
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-ink-700">
                            A Delhi NCR-based digital marketing agency specialising
                            in SEO, paid media, social, and web. We help ambitious
                            brands grow with bold creative, full-funnel strategy, and
                            specialist-led execution.
                        </p>
                    </div>

                    {/* Footer link sections */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-ink-950 text-lg font-semibold mb-6">
                                {section.title}
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label} className="relative">
                                        <a
                                            href={link.href}
                                            className="text-ink-700 hover:text-[#3ca2fa] transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                        {link.pulse && (
                                            <span className="absolute top-0 right-[-10px] w-2 h-2 rounded-full bg-[#3ca2fa] animate-pulse"></span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact section */}
                    <div>
                        <h4 className="text-ink-950 text-lg font-semibold mb-6">
                            Contact Us
                        </h4>
                        <ul className="space-y-4">
                            {contactInfo.map((item, i) => (
                                <li key={i} className="flex items-center space-x-3">
                                    {item.icon}
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="text-ink-700 hover:text-[#3ca2fa] transition-colors"
                                        >
                                            {item.text}
                                        </a>
                                    ) : (
                                        <span className="text-ink-700 hover:text-[#3ca2fa] transition-colors">
                                            {item.text}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <hr className="border-t border-ink-200 my-8" />

                {/* Footer bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
                    {/* Social icons */}
                    <div className="flex space-x-6 text-ink-500">
                        {socialLinks.map(({ icon, label, href }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="hover:text-[#3ca2fa] transition-colors"
                            >
                                {icon}
                            </a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <p className="text-center md:text-left text-ink-700">
                        &copy; {new Date().getFullYear()} Stealth Digital. All rights
                        reserved.
                    </p>
                </div>
            </div>

            {/* Text hover effect — only visible on lg+ viewports */}
            <div className="lg:flex hidden h-[30rem] -mt-52 -mb-36">
                <TextHoverEffect text="STEALTH" className="z-50" />
            </div>

            <FooterBackgroundGradient />
        </footer>
    );
}

export default HoverFooter;
