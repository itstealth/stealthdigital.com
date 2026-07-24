"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface Department {
  key: string;
  label: string;
  members: TeamMember[];
}

interface TeamCarouselProps {
  departments: Department[];
}

const SLIDE_DELAY = 80; // ms between each card animation

/**
 * TeamCarousel — atomic's team section pattern:
 * - Department dropdown/tabs
 * - Horizontal scroll carousel of team member cards
 * - Each card: grayscale photo, animated gradient fill below name
 * - Cards animate in with staggered delays
 */
export function TeamCarousel({ departments }: TeamCarouselProps) {
  const [activeDept, setActiveDept] = useState<string>(departments[0].key);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeDepartment =
    departments.find((d) => d.key === activeDept) ?? departments[0];

  function scrollBy(direction: "left" | "right") {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth ?? 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  }

  return (
    <div className="space-y-10">
      {/* Department dropdown */}
      <div className="relative max-w-md">
        <button
          type="button"
          data-testid="button-dept-dropdown"
          onClick={() => setDropdownOpen((o) => !o)}
          className="w-full flex items-center justify-between gap-3 rounded-full border border-cream/20 bg-ink-900 px-6 py-4 text-left text-base md:text-lg font-medium text-cream hover:border-accent transition-colors"
        >
          <span>{activeDepartment.label}</span>
          <ChevronDown
            size={18}
            className={`transition-transform ${
              dropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-full z-10 mt-2 max-h-72 overflow-y-auto rounded-2xl border border-cream/15 bg-ink-900 shadow-2xl shadow-black/40"
            >
              {departments.map((d) => (
                <li key={d.key}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveDept(d.key);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-5 py-3 text-sm md:text-base transition-colors hover:bg-cream/5 ${
                      d.key === activeDept ? "text-accent" : "text-cream/80"
                    }`}
                  >
                    {d.label}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* Carousel */}
      <div className="relative -mx-5 md:-mx-8 lg:-mx-12">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 px-5 md:px-8 lg:px-12 snap-x snap-mandatory scrollbar-none pb-4"
        >
          {activeDepartment.members.map((m, i) => (
            <motion.div
              key={`${activeDept}-${m.name}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: i * (SLIDE_DELAY / 1000),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="team-card shrink-0 w-[78vw] sm:w-[260px] md:w-[300px] lg:w-[320px] xl:w-[340px] snap-start"
            >
              <div className="relative rounded-[5px] overflow-hidden bg-white/5 backdrop-blur-xl">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="(min-width: 1024px) 320px, 78vw"
                    className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>

                {/* Animated gradient fill below name */}
                <div className="animated-gradient-fill mt-3 rounded-[5px] px-5 py-4 relative overflow-hidden">
                  <p className="text-white font-bold text-base md:text-lg leading-tight relative z-10">
                    {m.name}
                  </p>
                  <p className="text-white/90 font-mono text-xs md:text-sm font-bold mt-1 leading-tight relative z-10">
                    {m.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-20 bg-gradient-to-r from-ink-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-20 bg-gradient-to-l from-ink-950 to-transparent" />
      </div>

      {/* Arrows */}
      <div className="flex items-center justify-center gap-3 pt-4">
        <button
          type="button"
          onClick={() => scrollBy("left")}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream hover:border-accent hover:text-accent transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => scrollBy("right")}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream hover:border-accent hover:text-accent transition-colors"
          aria-label="Next"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <style jsx>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .animated-gradient-fill {
          background: linear-gradient(
            120deg,
            #0d0d0d 0%,
            #1f1f1f 25%,
            #2d2d2d 50%,
            #1f1f1f 75%,
            #0d0d0d 100%
          );
          background-size: 300% 100%;
          animation: gradientShift 6s ease-in-out infinite;
          position: relative;
        }
        .animated-gradient-fill::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(252, 109, 58, 0.4) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: gradientShift 6s ease-in-out infinite;
          opacity: 0.6;
        }
        @keyframes gradientShift {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
    </div>
  );
}