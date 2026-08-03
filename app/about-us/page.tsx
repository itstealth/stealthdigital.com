import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal, type FadeDelay } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Parallax } from "@/components/motion/Parallax";
import { Magnetic } from "@/components/motion/Magnetic";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { Testimonials } from "@/components/sections/Testimonials";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Timeline } from "@/components/ui/timeline";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Stealth Digital is a Delhi NCR-based digital marketing agency. 10+ years, 500+ projects, one obsession: growth.",
};

const TIMELINE = [
  {
    year: "2014",
    title: "The first office",
    body: "Two marketers, one rented desk in Sector 62, Noida. First SEO client: a local institute. Six months later they were ranking #1 for their highest-intent keywords.",
    points: [
      "Founded in Sector 62, Noida — one desk, two marketers",
      "First SEO client: a local coaching institute",
      "Ranked #1 for highest-intent keywords in 6 months",
      "Built our first playbook — it's still in use today",
    ],
  },
  {
    year: "2017",
    title: "Paid media joins the mix",
    body: "Added Google Ads and Meta Ads management. Hired our first performance specialist. Revenue tripled in 18 months.",
    points: [
      "Launched Google Ads & Meta Ads practices",
      "First performance specialist joined the team",
      "Revenue tripled in 18 months",
      "Built our first paid-media reporting dashboard",
    ],
  },
  {
    year: "2020",
    title: "Full-stack studio",
    body: "Landed our first 50-person client engagement. Brought design, content, and web in-house. Crossed ₹5Cr annual revenue.",
    points: [
      "Landed our first 50-person client engagement",
      "Brought design, content, and web fully in-house",
      "Crossed ₹5Cr annual revenue",
      "Hired the founding leadership team that's still with us",
    ],
  },
  {
    year: "2024",
    title: "200+ brands · 40 specialists",
    body: "Now serving brands across India, the Middle East, and Southeast Asia. Fully remote-capable. Still founder-led.",
    points: [
      "200+ brands served across India, MENA, and SEA",
      "40+ specialists across 6 cities, fully remote-capable",
      "₹100Cr+ in ad spend managed across the team",
      "Still founder-led, still independent, still hiring",
    ],
  },
];

const VALUES = [
  {
    n: "01",
    title: "Clarity over cleverness",
    desc: "We explain what we're doing, why, and what to expect. No jargon. No smoke. No mystery.",
    tag: "Communicate openly",
  },
  {
    n: "02",
    title: "Numbers don't lie",
    desc: "Every recommendation is tied to a business outcome. Vanity metrics don't pay salaries.",
    tag: "Tie work to revenue",
  },
  {
    n: "03",
    title: "Bias for shipping",
    desc: "Done beats perfect. We test, learn, iterate — at speed. That's how growth compounds.",
    tag: "Move fast, iterate faster",
  },
  {
    n: "04",
    title: "Long-term partners",
    desc: "Most clients have been with us 3+ years. We build relationships, not transactions.",
    tag: "Earn trust daily",
  },
  {
    n: "05",
    title: "Specialists, not generalists",
    desc: "SEO is one discipline. PPC is another. Design is another. Each team is led by people who've done it at scale.",
    tag: "Depth > breadth",
  },
  {
    n: "06",
    title: "Transparent by default",
    desc: "You see our work, our tactics, our links, our dashboards. No black boxes. No retainers on autopilot.",
    tag: "Always show your work",
  },
];

const TEAM = [
  {
    name: "Rachit Agarwal",
    role: "Founder & CEO",
    bio: "10+ years scaling D2C and B2B brands. Previously led growth at two funded startups.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Megha Kapoor",
    role: "Head of SEO",
    bio: "Built SEO functions at 3 agencies from scratch. Specialist in technical SEO and content strategy.",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Vikram Singh",
    role: "Performance Lead",
    bio: "₹100Cr+ in ad spend managed. ROAS nerd. Sleeps in Looker Studio dashboards.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Ananya Joshi",
    role: "Creative Director",
    bio: "Ex-editorial designer. Believes good design is invisible — until it's not.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
  },
];

const AGENCY_FACTS = [
  { value: "10+", label: "Years" },
  { value: "200+", label: "Brands" },
  { value: "40+", label: "Specialists" },
  { value: "₹100Cr+", label: "Ad Spend Managed" },
];

export default function AboutPage() {
  return (
    <>
      {/* ────────────────────────── HERO ────────────────────────── */}
      <section className="relative overflow-hidden border-b border-cream/10">
        <BackgroundPaths
          compact
          eyebrow={
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-accent" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                [About / 01]
              </span>
            </div>
          }
          lines={[
            [
              { text: "We're" },
              { text: "the" },
              { text: "team" },
              { text: "that" },
            ],
            [
              { text: "makes", className: "text-cream/40" },
              { text: "growth.", className: "text-cream/40" },
              { text: "real.", className: "text-accent italic" },
            ],
          ]}
        >
          {/* Description */}
          <Reveal variant="up" delay={400}>
            <p className="mt-12 text-lg md:text-2xl text-cream/70 leading-relaxed max-w-3xl mx-auto text-pretty font-display">
              A Delhi NCR-based growth studio founded in 2014. Specialists in
              SEO, performance media, social, and web. Built for ambitious brands
              who measure success in revenue, not vanity.
            </p>
          </Reveal>

          {/* Stat band */}
          <StaggerChildren
            className="mt-16 md:mt-20 grid gap-px bg-cream/10 md:grid-cols-4 border border-cream/10"
            delay={120}
            startDelay={500}
          >
            {AGENCY_FACTS.map((s, i) => (
              <StaggerItem
                key={s.label}
                className="bg-ink-950 p-5 md:p-6 lg:p-8 hover:bg-ink-900 transition-colors group"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/40 mb-3">
                  [0{i + 1}]
                </div>
                <div className="font-display text-[clamp(2.25rem,5vw,4.25rem)] font-bold text-accent leading-none mb-2 whitespace-nowrap tracking-tight">
                  {s.value}
                </div>
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-cream/60 mt-3">
                  {s.label}
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </BackgroundPaths>
      </section>

      {/* ────────────────────── STORY ────────────────────── */}
      <section className="py-24 md:py-40 border-b border-cream/10">
        <div className="container-x grid gap-16 md:gap-20 lg:grid-cols-12 lg:gap-24">
          <Reveal variant="up" delay={0} className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-4">
                [02 / Our Story]
              </div>
              <TextReveal
                as="h2"
                text="From a rented desk to 200+ brands."
                splitBy="word"
                staggerDelay={80}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-cream"
              />
              <Reveal variant="up" delay={300}>
                <p className="mt-6 text-cream/60 font-mono text-sm uppercase tracking-[0.18em]">
                  A 10-year arc · still climbing
                </p>
              </Reveal>
            </div>
          </Reveal>

          <div className="lg:col-span-7 space-y-12 md:space-y-16">
            <Reveal variant="up" delay={120}>
              <p className="text-lg md:text-xl text-cream/80 leading-relaxed">
                In 2014, we were two marketers in a 200-square-foot rented
                office in Sector 62, Noida. Our first client was a local
                institute that needed SEO help. Within 6 months, they were
                ranking #1 for their highest-intent keywords. <span className="text-accent">That was our proof of concept.</span>
              </p>
            </Reveal>
            <Reveal variant="up" delay={200}>
              <p className="text-lg md:text-xl text-cream/80 leading-relaxed">
                Over the next decade, we grew — adding performance marketing,
                social media, content, design, and web development. We worked
                with education brands, D2C startups, real estate developers,
                B2B SaaS companies, hospitality groups. We hired brilliant
                people. We lost some. We shipped a lot. We learned more.
              </p>
            </Reveal>
            <Reveal variant="up" delay={300}>
              <p className="text-lg md:text-xl text-cream/80 leading-relaxed">
                Today, Stealth Digital is one of Delhi NCR's most awarded
                independent digital agencies. We're still independent. Still
                founder-led. Still obsessed with the same question we started
                with:{" "}
                <span className="font-display text-3xl md:text-4xl text-cream block mt-4">
                  how do we grow this business?
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ────────────────────── TIMELINE ────────────────────── */}
      <section className="py-24 md:py-40 border-b border-cream/10 bg-ink-900">
        <div className="container-x">
          <Reveal variant="up" delay={0}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-3">
                  [03 / The Arc]
                </div>
                <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight text-cream">
                  A decade in four chapters.
                </h2>
              </div>
              <p className="text-cream/60 max-w-md md:text-right">
                The work compounds. The team compounds. The reputation
                compounds. Here's the shape of it.
              </p>
            </div>
          </Reveal>

          <Timeline
            data={TIMELINE.map((t) => ({
              title: t.year,
              content: (
                <div>
                  <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-cream mb-4">
                    {t.title}
                  </h3>
                  <p className="text-cream/70 text-base md:text-lg leading-relaxed mb-6">
                    {t.body}
                  </p>
                  <ul className="space-y-3 border-l border-cream/15 pl-5">
                    {t.points.map((p, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-cream/80 text-sm md:text-base leading-relaxed"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            }))}
          />
        </div>
      </section>

      {/* ────────────────────── IMAGE BREAK ────────────────────── */}
      <section className="py-16 md:py-32">
        <div className="container-x">
          <Reveal variant="up" delay={0}>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-6">
              [04 / Inside the studio]
            </div>
          </Reveal>
          <Reveal variant="up" delay={80}>
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight tracking-tight text-cream max-w-2xl mb-10 md:mb-14">
              A 40-person team obsessed with the same craft.
            </h2>
          </Reveal>
          <Reveal variant="up" delay={150}>
            <ImageReveal
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80"
              alt="Stealth Digital team at work"
              aspect="16/7"
              direction="up"
              delay={0.1}
              scaleIn
            />
          </Reveal>
        </div>
      </section>

      {/* ────────────────────── VALUES ────────────────────── */}
      <section className="py-24 md:py-40 border-y border-cream/10">
        <div className="container-x">
          <Reveal variant="up" delay={0}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24 max-w-5xl">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-3">
                  [05 / Values]
                </div>
                <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.0] tracking-tight text-cream">
                  How we work, <span className="text-accent italic">every day.</span>
                </h2>
              </div>
              <p className="text-cream/60 max-w-md md:text-right">
                Six principles. Memos on the wall. Read at every team offsite.
                Used in every hiring decision.
              </p>
            </div>
          </Reveal>

          <StaggerChildren
            className="grid gap-px bg-cream/10 md:grid-cols-2 lg:grid-cols-3 border border-cream/10"
            delay={100}
          >
            {VALUES.map((v, i) => (
              <StaggerItem
                key={v.n}
                className="bg-ink-950 p-8 md:p-12 group hover:bg-ink-900 transition-colors relative overflow-hidden"
              >
                {/* Hover background parallax ghost number */}
                <div className="absolute -top-10 -right-6 font-display text-[12rem] font-bold text-cream/[0.02] leading-none select-none group-hover:text-accent/[0.04] transition-colors duration-700">
                  {v.n}
                </div>

                <div className="relative">
                  <div className="flex items-baseline justify-between mb-8">
                    <span className="font-mono text-sm text-accent">{v.n}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40">
                      {v.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-cream mb-3 tracking-tight leading-tight">
                    {v.title}
                  </h3>
                  <p className="text-cream/70 leading-relaxed">{v.desc}</p>
                  <div className="mt-6 h-px w-12 bg-accent/30 group-hover:w-full group-hover:bg-accent transition-all duration-700" />
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ────────────────────── TEAM ────────────────────── */}
      <section className="py-24 md:py-40 border-b border-cream/10 bg-ink-900">
        <div className="container-x">
          <Reveal variant="up" delay={0}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-3">
                  [06 / Leadership]
                </div>
                <TextReveal
                  as="h2"
                  text="The team."
                  splitBy="word"
                  staggerDelay={100}
                  className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-cream leading-[1]"
                />
              </div>
              <p className="text-cream/70 max-w-md md:text-right">
                Strategists, engineers, designers, and analysts who've shipped
                500+ projects — and lost count of the late nights.
              </p>
            </div>
          </Reveal>

          <StaggerChildren
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            delay={120}
          >
            {TEAM.map((m) => (
              <StaggerItem key={m.name} className="group">
                <Magnetic strength={25} innerTarget innerStrength={15} as="div">
                  <Link
                    href="/contact-us"
                    className="block relative overflow-hidden rounded-sm bg-ink-800"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Parallax distance={20}>
                        <Image
                          src={m.img}
                          alt={m.name}
                          fill
                          sizes="(min-width: 1024px) 25vw, 50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </Parallax>
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />

                      {/* Bottom content reveals on hover */}
                      <div className="absolute inset-x-0 bottom-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <p className="text-xs text-cream/80 leading-snug bg-ink-950/80 backdrop-blur p-3 rounded border border-cream/10">
                          {m.bio}
                        </p>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-xl font-bold text-cream tracking-tight">
                        {m.name}
                      </h3>
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/50 mt-1">
                        {m.role}
                      </p>
                    </div>
                  </Link>
                </Magnetic>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <Testimonials />

      {/* ────────────────────── CTA ────────────────────── */}
      <section className="py-28 md:py-48 text-center relative overflow-hidden">
        <Parallax
          distance={40}
          className="absolute inset-0 -z-10 pointer-events-none"
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[80vh] w-[80vh] rounded-full bg-accent/10 blur-[120px]" />
        </Parallax>

        <div className="container-x relative">
          <Reveal variant="up" delay={0}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-8 bg-accent" />
              <span className="eyebrow">Let's Talk</span>
              <span className="h-px w-8 bg-accent" />
            </div>
          </Reveal>

          <Reveal variant="up" delay={100}>
            <h2 className="font-display text-[44px] md:text-[88px] lg:text-[120px] font-bold leading-[0.92] tracking-[-0.04em] text-balance text-cream max-w-5xl mx-auto">
              Want to work{" "}
              <span className="text-accent italic">with us?</span>
            </h2>
          </Reveal>

          <Reveal variant="up" delay={200}>
            <p className="mt-8 text-lg text-cream/70 max-w-xl mx-auto">
              We're selective about who we partner with — but when it's a fit,
              we go all in. Let's talk.
            </p>
          </Reveal>

          <Reveal variant="up" delay={300}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Button
                href="/contact-us"
                variant="primary"
                size="lg"
                showArrow
                magnetic
                magneticStrength={30}
              >
                Start the Conversation
              </Button>
              <Button
                href="/services"
                variant="ghost"
                size="lg"
                magnetic
                magneticStrength={25}
              >
                See Our Services
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}