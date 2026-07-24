"use client";

import { TextReveal } from "@/components/motion/TextReveal";
import { Marquee } from "@/components/motion/Marquee";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { CLIENT_LOGOS } from "@/data/clientLogos";

export function Hero() {
  return (
    <section className="relative min-h-screen bg-ink-950 flex flex-col">
      {/* Centered headline */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-32 pb-16 text-center">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-6">
          Your Strategic Partner in Brand Growth
        </span>
        <div className="container-fluid max-w-[1500px]">
          <TextReveal
            as="h1"
            text="Let your brand own the spotlight."
            splitBy="word"
            className="font-display text-[10vw] md:text-[8vw] font-bold leading-[0.9] tracking-[-0.04em] text-cream"
          />
        </div>
        <p className="mt-8 text-lg text-cream/70 font-sans max-w-2xl">
          Transforming 100+ Brands to Dominate the Next-Gen Era. 
        </p>
      </div>

      {/* Marquee Ticker at the bottom of hero */}
      <div className="w-full bg-ink-950 pt-16 pb-12 border-t border-cream/10">
        <div className="container-fluid flex items-center mb-6">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-cream/50">Trusted by ambitious brands</span>
        </div>
        <Marquee speed={35}>
          {CLIENT_LOGOS.map((logo, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center px-6 py-2"
              style={{ color: "rgb(245 240 230 / 0.8)" }}
            >
              <BrandLogo logo={logo} size={28} />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
