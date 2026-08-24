"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { SERVICES } from "@/data/services";

export function ServiceTabs() {
  const [active, setActive] = useState(0);
  const service = SERVICES[active];

  // Image override for the home page only — Web Development uses a local file.
  const serviceImage =
    service.slug === "website-design-development"
      ? "/images/web developmentt.jpg"
      : service.image;

  return (
    <section id="services" className="relative py-24 md:py-40 bg-ink-950">
      <div className="container-fluid">
        <Reveal variant="up">
          <div className="flex flex-col gap-4 mb-16 md:mb-20 max-w-4xl">
            <h2 className="font-display text-[44px] sm:text-[64px] md:text-[88px] font-bold leading-[0.95] tracking-[-0.03em] text-balance text-cream">
              What we do.
            </h2>
            <p className="font-sans text-xl md:text-2xl text-cream/50 max-w-2xl">
              From strategy to execution, we craft digital products that redefine what's possible for your brand.
            </p>
          </div>
        </Reveal>

        <LayoutGroup>
          {/* Tab buttons */}
          <div className="border-t border-cream/10 mt-12">
            {SERVICES.map((s, i) => (
              <button
                key={s.slug}
                onClick={() => setActive(i)}
                className="group relative block w-full border-b border-cream/10 py-8 md:py-12 text-left transition-colors hover:bg-ink-900"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 md:px-8">
                  <div className="flex items-center gap-8 md:gap-16">
                    <span
                      className="font-mono text-sm uppercase tracking-[0.2em] text-cream/40"
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={`font-display text-4xl sm:text-5xl md:text-7xl font-semibold tracking-[-0.03em] transition-all duration-500 ${
                        active === i ? "text-cream pl-4" : "text-cream/30 group-hover:text-cream group-hover:pl-4"
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                  <motion.div
                    animate={{
                      rotate: active === i ? 45 : 0,
                      opacity: active === i ? 1 : 0.2,
                    }}
                    transition={{ duration: 0.4 }}
                    className="shrink-0 hidden md:block text-cream"
                  >
                    <ArrowUpRight size={48} strokeWidth={1} />
                  </motion.div>
                </div>
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 overflow-hidden"
            >
              <div className="grid gap-8 md:grid-cols-12 md:gap-12 px-4 md:px-8 pb-12">
                {/* Content */}
                <div className="md:col-span-5 flex flex-col justify-center gap-8 order-2 md:order-1">
                  <h3 className="font-display text-3xl md:text-5xl font-bold leading-tight tracking-tight text-cream">
                    {service.tagline}
                  </h3>
                  <p className="text-cream/60 leading-relaxed text-lg font-sans">
                    {service.description}
                  </p>
                  <ul className="mt-4 grid gap-4">
                    {service.features.map((f, i) => (
                      <motion.li
                        key={f}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.06 }}
                        className="flex items-center gap-4 text-base font-medium text-cream/90"
                      >
                        <span className="inline-flex h-2 w-2 shrink-0 items-center justify-center rounded-full bg-cream"></span>
                        {f}
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-4">
                     <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-cream hover:opacity-70 transition-opacity font-mono uppercase text-sm tracking-wider">
                       Explore Service <ArrowUpRight size={16} />
                     </Link>
                  </div>
                </div>

                {/* Image with parallax */}
                <div className="md:col-span-7 relative aspect-[4/3] overflow-hidden bg-ink-900 order-1 md:order-2">
                  <Parallax distance={15}>
                    <Image
                      src={serviceImage}
                      alt={service.title}
                      fill
                      sizes="(min-width: 768px) 60vw, 100vw"
                      className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                    />
                  </Parallax>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
}