"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { MAIN_NAV, CORE_SERVICES, BUSINESS_OBJECTIVES } from "@/data/nav";
import { SITE } from "@/data/site";
import { Magnetic } from "@/components/motion/Magnetic";
import { SplitTextHover } from "@/components/motion/SplitTextHover";
import { cn } from "@/lib/utils";
import { Clock } from "./Clock";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  // Background on scroll + hide-on-scroll-down / reveal-on-scroll-up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // Only toggle after clearing the header height to avoid jitter at the top
      if (y > 120 && y > lastScrollY.current) {
        setHidden(true); // scrolling down -> hide
      } else if (y < lastScrollY.current) {
        setHidden(false); // scrolling up -> reveal
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !mobileOpen ? "-140%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed left-0 right-0 top-0 px-4 pt-4 md:pt-6 transition-[z-index] duration-0",
          mobileOpen ? "z-[200]" : "z-[100]"
        )}
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between gap-6 rounded-full border border-cream/10 px-4 py-3 md:pl-6 md:pr-3 transition-colors duration-500",
            "max-w-[1100px] backdrop-blur-md",
            scrolled ? "bg-ink-950/85 shadow-2xl shadow-black/30" : "bg-ink-950/60"
          )}
        >
          {/* Logo */}
          <Link href="/" className="z-[210] flex flex-col leading-none">
            <span className="font-display text-2xl font-bold tracking-tight text-cream">
              Stealth
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/50">
              Digital
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 lg:flex">
            {MAIN_NAV.map((item) => (
              <Magnetic key={item.href} strength={15} as="span">
                <Link
                  href={item.href}
                  className="font-sans text-[15px] font-medium text-cream hover:text-accent transition-colors"
                >
                  <SplitTextHover>{item.label}</SplitTextHover>
                </Link>
              </Magnetic>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3 z-[210]">
            <div className="hidden xl:block">
              <Clock />
            </div>

            {/* Sits right of the clock on xl; visible at all sizes so
                mobile users can switch too */}
            <ThemeToggle />

            <Magnetic strength={20} as="span">
              <Link
                href="/contact-us"
                className="hidden md:inline-flex h-11 items-center gap-2 rounded-full bg-cream px-6 text-[15px] font-medium text-ink-950 transition-all hover:bg-cream-dim"
              >
                Start a Project
              </Link>
            </Magnetic>

            {/* Custom Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative flex h-11 w-11 items-center justify-center rounded-full bg-ink-900 border border-cream/10 hover:border-cream/30 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-[5px]">
                <motion.div
                  animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className="h-[2px] w-5 bg-cream rounded-full origin-center"
                />
                <motion.div
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="h-[2px] w-5 bg-cream rounded-full origin-center"
                />
                <motion.div
                  animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className="h-[2px] w-5 bg-cream rounded-full origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full Screen Overlay Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-[150] bg-ink-950 flex flex-col justify-center px-5 md:px-12"
          >
            {/* Close button — sits at top-right of the overlay, inside the menu
                so it's always reachable. Mirrors the hamburger style. */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 flex h-11 w-11 items-center justify-center rounded-full bg-ink-900 border border-cream/10 hover:border-cream/30 transition-colors group z-[210]"
              aria-label="Close menu"
            >
              <X
                size={18}
                strokeWidth={2}
                className="text-cream transition-transform duration-300 group-hover:rotate-90"
              />
            </motion.button>

            <div className="container-fluid grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
              {/* Menu Links */}
              <div className="flex flex-col gap-6">
                <span className="eyebrow text-cream/40 border-b border-cream/10 pb-4">Menu</span>
                <div className="flex flex-col gap-4">
                  {MAIN_NAV.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="group flex items-center gap-4 font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-cream"
                      >
                        <span className="text-xl md:text-2xl font-mono text-cream/30 group-hover:text-cream transition-colors">
                          0{i + 1}
                        </span>
                        <span className="hover:pl-4 transition-all duration-300">{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Contact Info & Details */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-col gap-10 mt-12 md:mt-0"
              >
                <div>
                  <span className="eyebrow text-cream/40 mb-4 block">Get in Touch</span>
                  <div className="flex flex-col gap-2">
                    <Link href={`mailto:${SITE.email}`} className="text-xl md:text-2xl font-sans text-cream hover:opacity-70 transition-opacity">
                      {SITE.email}
                    </Link>
                    <Link href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="text-xl md:text-2xl font-sans text-cream hover:opacity-70 transition-opacity">
                      {SITE.phone}
                    </Link>
                  </div>
                </div>
                
                <div>
                  <span className="eyebrow text-cream/40 mb-4 block">Social</span>
                  <div className="flex flex-wrap gap-4">
                    {Object.entries(SITE.social).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-sm text-cream hover:text-cream/70 transition-colors uppercase"
                      >
                        {platform}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}