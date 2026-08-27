"use client";

import { Marquee } from "@/components/motion/Marquee";
import { BrandLogo } from "@/components/ui/BrandLogo";
import TextBlockAnimation from "@/components/ui/text-block-animation";
import { SplineScene } from "@/components/ui/splite";
import { Component as SilkBackground } from "@/components/ui/silk-background-animation";
import { Button } from "@/components/ui/Button";
import { CLIENT_LOGOS } from "@/data/clientLogos";

export function Hero() {
  // Open the floating lead-capture form from the hero. LeadCapturePopup
  // listens for this window event (same always-open path as its edge button).
  const openLeadForm = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("stealth:open-lead-form"));
    }
  };

  return (
    <section className="relative min-h-screen bg-ink-950 flex flex-col overflow-hidden">
      {/* Animated silk canvas background — sits behind all hero content */}
      <SilkBackground />

      {/* Text left / 3D robot right — headline kept as-is, just left-aligned */}
      <div className="relative z-10 flex-1 w-full max-w-[1500px] mx-auto grid lg:grid-cols-2 items-center lg:items-end gap-12 lg:gap-8 px-4 md:px-8 pt-32 pb-0">
        {/* Left column — text */}
        <div className="text-left pb-16 lg:pb-24">
          <button className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-ink-950 mb-6 rounded-full px-4 py-1.5 bg-gradient-to-r from-accent-400 via-accent to-accent-600 hover:opacity-90 transition-opacity">
            Dubai | India | Canada
          </button>
          <TextBlockAnimation
            blockColor="#FFD60A"
            animateOnScroll={false}
            delay={0.2}
            duration={0.8}
          >
            <h1 className="font-display text-[10vw] md:text-[8vw] lg:text-[4.5vw] xl:text-[4vw] font-bold leading-[0.9] tracking-[-0.04em] text-cream">
              Your Strategic Partner in Brand Growth
            </h1>
          </TextBlockAnimation>
          <p className="mt-8 text-lg text-cream/70 font-sans max-w-2xl">
            Your Strategic Partner in Brand Growth
          </p>

          {/* CTAs — Get Started opens the floating lead form, Work jumps to
              the featured-work section */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button onClick={openLeadForm} variant="primary" size="lg" showArrow magnetic>
              Get Started
            </Button>
            <Button href="/#work" variant="outline" size="lg" magnetic>
              Work
            </Button>
          </div>
        </div>

        {/* Right column — interactive 3D robotic scene, anchored to the
            bottom edge of the hero so it reads as standing on the floor
            rather than floating mid-section */}
        <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[72vh] self-end">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="absolute inset-x-0 bottom-0 w-full h-full"
          />
        </div>
      </div>

      {/* Marquee Ticker at the bottom of hero — logo wall on a black
          glass strip. Semi-transparent ink-950 with backdrop blur and
          hairline border, so it reads as a floating panel over whatever
          sits behind. */}
      <div className="relative z-20 w-full bg-ink-950/60 backdrop-blur-md pt-12 pb-10 border-y border-white/10 shadow-2xl">
        <div className="container-fluid flex items-center mb-6">
          <span className="font-display text-xs uppercase tracking-[0.2em] text-cream/50">
            Trusted by ambitious brands
          </span>
        </div>
        <Marquee speed={35}>
          {CLIENT_LOGOS.map((logo, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center px-6 py-2"
            >
              <BrandLogo logo={logo} size={56} />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
