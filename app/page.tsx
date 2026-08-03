import { Hero } from "@/components/sections/Hero";
import { ShowreelScroll } from "@/components/sections/ShowreelScroll";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { Testimonials } from "@/components/sections/Testimonials";
import { Awards } from "@/components/sections/Awards";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
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
      <FeaturedWork />
      <CTA />
    </>
  );
}