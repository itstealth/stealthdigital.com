import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { INDUSTRIES, getIndustryBySlug } from "@/data/industries";

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return {
    title: `${industry.name} — Industries`,
    description: industry.subheading,
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 md:pt-44 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute right-[-10%] top-[10%] h-[60vh] w-[60vh] rounded-full bg-accent blur-[140px] opacity-20" />
        </div>

        <div className="container-x">
          <Reveal variant="up">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-10 bg-accent" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                [{industry.name} / Industries]
              </span>
            </div>
          </Reveal>

          <Reveal variant="up">
            <h1 className="font-display text-[38px] sm:text-[52px] md:text-[72px] lg:text-[84px] font-bold leading-[0.98] tracking-[-0.04em] text-balance text-cream max-w-5xl">
              {industry.headline}
            </h1>
          </Reveal>

          <Reveal variant="up" delay={0.2}>
            <p className="mt-10 text-lg md:text-2xl text-cream/70 leading-relaxed max-w-3xl text-pretty font-display">
              {industry.subheading}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-24 border-t border-cream/10">
        <div className="container-x grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal variant="up" className="md:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-4">
              [Overview]
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight tracking-tight text-cream">
              {industry.introTitle}
            </h2>
          </Reveal>
          <Reveal
            variant="up"
            delay={0.15}
            className="md:col-span-7 text-cream/70 text-lg leading-relaxed space-y-5"
          >
            {industry.introParagraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 md:py-32 border-t border-cream/10">
        <div className="container-x">
          <Reveal variant="up">
            <div className="mb-16 max-w-3xl">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-4">
                [Core Services]
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight text-cream">
                What we do for {industry.name.toLowerCase()}.
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-px bg-cream/10 md:grid-cols-2 border border-cream/10">
            {industry.coreServices.map((service, i) => (
              <Reveal
                key={service.title}
                variant="up"
                delay={i * 0.06}
                className="bg-ink-950 p-8 md:p-10 group hover:bg-ink-900 transition-colors"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent shrink-0 mt-1">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-cream tracking-tight">
                    {service.title}
                  </h3>
                </div>
                <p className="text-cream/70 leading-relaxed pl-10">{service.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 md:py-32 border-t border-cream/10">
        <div className="container-x">
          <Reveal variant="up">
            <div className="mb-16 max-w-3xl">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-4">
                [Process]
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight text-cream">
                How we work.
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-3">
            {industry.howWeWork.map((step, i) => (
              <Reveal key={step.title} variant="up" delay={i * 0.08}>
                <div className="font-mono text-4xl text-accent font-bold mb-4">0{i + 1}</div>
                <h3 className="font-display text-2xl font-bold text-cream tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-cream/70 leading-relaxed">{step.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 border-t border-cream/10">
        <div className="container-x">
          <Reveal variant="up">
            <div className="mb-16 max-w-3xl">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-4">
                [Why Stealth Digital]
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight text-cream">
                Why choose Stealth Digital.
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-px bg-cream/10 border border-cream/10 md:grid-cols-2 lg:grid-cols-3">
            {industry.whyChooseUs.map((reason, i) => (
              <Reveal
                key={reason.title}
                variant="up"
                delay={i * 0.06}
                className="bg-ink-950 p-8 hover:bg-ink-900 transition-colors"
              >
                <h3 className="font-display text-xl font-bold text-cream tracking-tight mb-3">
                  {reason.title}
                </h3>
                <p className="text-cream/70 leading-relaxed">{reason.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20 md:py-32 border-t border-cream/10">
        <div className="container-x">
          <Reveal variant="up">
            <div className="mb-16 max-w-3xl">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-4">
                [Services At A Glance]
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight text-cream">
                Built for results.
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {industry.serviceCards.map((card, i) => (
              <Reveal
                key={card.title}
                variant="up"
                delay={i * 0.06}
                className="border border-cream/10 bg-ink-950 p-6 hover:border-accent/30 transition-colors"
              >
                <h3 className="font-display text-lg font-bold text-cream tracking-tight mb-2">
                  {card.title}
                </h3>
                <p className="text-cream/70 text-sm leading-relaxed">{card.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 text-center border-t border-cream/10">
        <div className="container-x">
          <Reveal variant="up">
            <h2 className="font-display text-4xl md:text-7xl font-bold tracking-tight text-cream max-w-3xl mx-auto leading-tight">
              {industry.ctaTitle}
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.15}>
            <p className="mt-6 text-cream/70 max-w-xl mx-auto">{industry.ctaDescription}</p>
          </Reveal>
          <Reveal variant="up" delay={0.25}>
            <div className="mt-10">
              <Button href="/contact-us" variant="primary" size="lg" showArrow magnetic>
                Start a Project
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
