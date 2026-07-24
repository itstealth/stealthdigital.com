import { Hero } from "@/components/sections/Hero";
import { ShowreelScroll } from "@/components/sections/ShowreelScroll";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { Testimonials } from "@/components/sections/Testimonials";
import { Awards } from "@/components/sections/Awards";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { StatsMarquee } from "@/components/sections/StatsMarquee";
import { AgencyStats } from "@/components/sections/AgencyStats";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ShowreelScroll />
      <WhatWeDo />
      <Testimonials />
      <Awards />
      <Process />
      <About />
      <StatsMarquee />
      <AgencyStats />
      <FeaturedWork />
      <CTA />
    </>
  );
}