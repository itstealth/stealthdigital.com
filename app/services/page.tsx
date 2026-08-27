import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { SERVICES } from "@/data/services";
import { Process } from "@/components/sections/Process";
import { LetsWorkTogether } from "@/components/ui/lets-work-section";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";

export const metadata: Metadata = {
  title: "Services",
  description:
    "SEO, SEM/PPC, Social Media, and Web Design — full-stack growth services from Delhi NCR.",
};

// Spline scene for the interactive 3D robot sitting on the right side
// of the services hero. Lazy-loaded via React.lazy inside the wrapper.
const ROBOT_SCENE_URL =
  "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Full-stack growth, four disciplines deep."
        description="We don't do 'marketing'. We do SEO, paid media, social, and web — integrated into a single growth system. Pick one, or all."
        compact
        aside={
          <InteractiveRobotSpline
            scene={ROBOT_SCENE_URL}
            className="absolute inset-0 w-full h-full"
          />
        }
      />

      <section className="py-20 md:py-32">
        <div className="container-x space-y-px">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} variant="up" delay={i * 0.05}>
              <Link
                href={`/services/${s.slug}`}
                className="group block bg-ink-950 border border-cream/10 hover:border-accent/30 transition-colors"
              >
                <div className="grid gap-8 p-8 md:p-12 lg:grid-cols-12 lg:gap-12 lg:items-center">
                  <div className="lg:col-span-2">
                    <div className="font-mono text-3xl md:text-4xl text-accent font-bold">
                      0{i + 1}
                    </div>
                  </div>
                  <div className="lg:col-span-6">
                    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/50 mb-3">
                      {s.shortTitle}
                    </div>
                    <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-cream mb-3">
                      {s.title}
                    </h2>
                    <p className="text-cream/70 text-lg leading-relaxed max-w-2xl">
                      {s.tagline}
                    </p>
                  </div>
                  <div className="lg:col-span-3 relative aspect-[4/3] overflow-hidden rounded-sm bg-ink-800">
                    <Parallax distance={20}>
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </Parallax>
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