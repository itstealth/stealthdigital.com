import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Search Engine Optimization Services — Rank, Get Found, Grow",
  description:
    "E-commerce SEO, Generative Search Optimization, Answer Engine Optimization, Online Reputation Management, and Local SEO. We build organic visibility that compounds.",
};

const SUB_SERVICES = [
  {
    title: "E-commerce SEO",
    description:
      "E-commerce success requires more than ranking on Google Search. We optimize product pages, category pages, and technical SEO to improve visibility and drive more sales.",
  },
  {
    title: "Generative Search Optimization",
    description:
      "Your brand needs visibility beyond traditional search. We optimize content for AI platforms like Perplexity AI and Google AI Overviews so your website appears in AI-powered answers.",
  },
  {
    title: "Answer Engine Optimization",
    description:
      "We optimize your content to appear in AI answers, voice search, and featured snippets so your brand becomes the trusted source for quick information.",
  },
  {
    title: "Online Reputation Management (ORM)",
    description:
      "We protect and improve your brand's online image by managing reviews, addressing negative content, and promoting positive search results.",
  },
  {
    title: "Local SEO",
    description:
      "We optimize your local listings, reviews, and business signals to improve map visibility and drive more local traffic and calls.",
  },
];

export default function SEOPage() {
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
                [SEO / Services]
              </span>
            </div>
          </Reveal>

          <Reveal variant="up">
            <h1 className="font-display text-[44px] sm:text-[64px] md:text-[88px] lg:text-[112px] font-bold leading-[0.95] tracking-[-0.04em] text-balance text-cream max-w-5xl">
              Search Engine Optimization
            </h1>
          </Reveal>

          <Reveal variant="up" delay={0.2}>
            <p className="mt-10 text-lg md:text-2xl text-cream/70 leading-relaxed max-w-3xl text-pretty font-display">
              Rank higher. Get found. Grow organic. From technical foundations
              to AI-powered search, we engineer visibility that compounds.
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
              What we do.
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.15} className="md:col-span-7 text-cream/70 text-lg leading-relaxed">
            <p>
              Search has evolved beyond ten blue links. Today, your customers
              find answers through Google, AI assistants, voice search, and
              featured snippets — and the brands that win are the ones that
              show up everywhere. We optimize your entire search footprint, from
              the technical foundations of your website to the AI answers your
              customers read.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Sub-services */}
      <section className="py-20 md:py-32 border-t border-cream/10">
        <div className="container-x">
          <Reveal variant="up">
            <div className="mb-16 max-w-3xl">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-4">
                [Services]
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight text-cream">
                Our SEO services.
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-px bg-cream/10 md:grid-cols-2 border border-cream/10">
            {SUB_SERVICES.map((sub, i) => (
              <Reveal
                key={sub.title}
                variant="up"
                delay={i * 0.06}
                className="bg-ink-950 p-8 md:p-10 group hover:bg-ink-900 transition-colors"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent shrink-0 mt-1">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-cream tracking-tight">
                    {sub.title}
                  </h3>
                </div>
                <p className="text-cream/70 leading-relaxed pl-10">
                  {sub.description}
                </p>
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
              Ready to grow with <span className="text-accent italic">SEO?</span>
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.15}>
            <p className="mt-6 text-cream/70 max-w-xl mx-auto">
              Free 30-minute audit. No commitment. No deck.
            </p>
          </Reveal>
          <Reveal variant="up" delay={0.25}>
            <div className="mt-10">
              <Button href="/contact-us" variant="primary" size="lg" showArrow magnetic>
                Book a Free Audit
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
