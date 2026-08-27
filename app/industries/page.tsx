import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { INDUSTRIES } from "@/data/industries";
import { Process } from "@/components/sections/Process";
import { LetsWorkTogether } from "@/components/ui/lets-work-section";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Real Estate, Technology, Healthcare, B2B, Hospitality, Education, and E-commerce — industry-focused digital growth strategies from Stealth Digital.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Serve"
        title="Digital strategies built for your industry."
        description="Every industry has its own buyers, trust signals, and growth levers. We tailor campaigns, content, and platforms to how your customers actually decide."
        compact
      />

      <section className="py-20 md:py-32">
        <div className="container-x space-y-px">
          {INDUSTRIES.map((industry, i) => (
            <Reveal key={industry.slug} variant="up" delay={i * 0.05}>
              <Link
                href={`/industries/${industry.slug}`}
                className="group block bg-ink-950 border border-cream/10 hover:border-accent/30 transition-colors"
              >
                <div className="grid gap-8 p-8 md:p-12 lg:grid-cols-12 lg:gap-12 lg:items-center">
                  <div className="lg:col-span-2">
                    <div className="font-mono text-3xl md:text-4xl text-accent font-bold">
                      0{i + 1}
                    </div>
                  </div>
                  <div className="lg:col-span-9">
                    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/50 mb-3">
                      {industry.name}
                    </div>
                    <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-cream mb-3">
                      {industry.headline}
                    </h2>
                    <p className="text-cream/70 text-lg leading-relaxed max-w-2xl">
                      {industry.subheading}
                    </p>
                  </div>
                  <div className="lg:col-span-1 lg:justify-self-end">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 text-cream transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-ink-950">
                      <ArrowUpRight
                        size={18}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <Process />
      <LetsWorkTogether />
    </>
  );
}
