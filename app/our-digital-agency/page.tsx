import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlurWordReveal } from "@/components/motion/BlurWordReveal";
import { RollingDigit } from "@/components/motion/RollingDigit";
import { StatementSwap } from "@/components/motion/StatementSwap";
import { Reveal, type FadeDelay } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Magnetic } from "@/components/motion/Magnetic";
import { ThinkingTabs } from "@/components/ui/ThinkingTabs";
import { DifferenceCarousel, type DifferenceCard } from "@/components/ui/DifferenceCarousel";
import { EsgPillars, type EsgPillar } from "@/components/ui/EsgPillars";
import { TeamCarousel, type Department } from "@/components/ui/TeamCarousel";
import { PartnerLogos } from "@/components/ui/PartnerLogos";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Our Digital Agency",
  description:
    "Stealth Digital is a Delhi NCR-based digital marketing agency built to outthink, outcreate, and outperform — blending strategy, design, media, and AI.",
};

const STATS = [
  { value: "₹100Cr+", label: "Ad Spend Managed" },
  { value: "200+", label: "Brands Scaled" },
  { value: "40+", label: "Specialists" },
];

const DIFFERENCE: DifferenceCard[] = [
  {
    n: "01",
    title: "Smarter, Leaner Execution",
    description:
      "We operate with speed, focus, and precision. Our agile squads eliminate unnecessary layers and delays, delivering strategic, high-impact solutions faster than traditional agencies.",
  },
  {
    n: "02",
    title: "Radical Honesty, Always",
    description:
      "We tell you what works, what doesn't, and what's a waste of money. Even when it's not what you want to hear. Trust is built on truth, not flattery.",
  },
  {
    n: "03",
    title: "Beyond the Brief Mentality",
    description:
      "We don't just tick boxes. We look around corners, challenge assumptions, and proactively suggest what will actually move the needle for your business.",
  },
  {
    n: "04",
    title: "Tailored Strategies, Built to Perform",
    description:
      "No copy-paste playbooks. Every engagement starts from your business, your market, your audience — and ends with strategies engineered for your specific growth.",
  },
];

const DIFFERENCE_ICONS = ["Zap", "Heart", "BookOpen", "Trophy"] as const;

const THINKING_TABS = [
  {
    title: "Clarity & Open Communication",
    description:
      "We believe the best results come from honest, transparent relationships. No jargon, no hidden agendas. We keep you informed at every stage, so you always know where things stand and why decisions are being made.",
  },
  {
    title: "Obsess Over the Details",
    description:
      "Big-picture thinking matters. But so does the comma in your CTA, the loading speed of your landing page, the keyword density of your pillar content. We're obsessive about details because they compound.",
  },
  {
    title: "Growth Is Our Operating System",
    description:
      "We're not a branding agency, a creative shop, or a media house. We're a growth studio. Every decision flows through one filter: does this grow the business? If not, it's cut.",
  },
  {
    title: "Client Centric by Design",
    description:
      "We win when you win. Our compensation models align with your outcomes — revenue, leads, ROAS. We're not interested in retainers that don't move numbers.",
  },
  {
    title: "Challenge the Default",
    description:
      "Conventional wisdom is a starting point, not a destination. We constantly test, iterate, and flip playbooks when the data tells us to. Best practices are yesterday's news.",
  },
  {
    title: "Relentlessly Future Focused",
    description:
      "AI, automation, privacy-first marketing, zero-click search — the landscape shifts every quarter. We're obsessed with what's next so we can position you there first.",
  },
];

const ESG_PILLARS: EsgPillar[] = [
  {
    title: "Environmental",
    body: "Carbon-aware hosting, remote-first operations, paperless client engagements. We measure and offset our digital footprint annually.",
    iconKey: "Leaf",
  },
  {
    title: "Social",
    body: "40% of our team is women — industry-leading. Equal pay audited yearly. Pro bono work for education non-profits and climate startups.",
    iconKey: "Users",
  },
  {
    title: "Governance",
    body: "Transparent reporting on every engagement. Privacy-by-design across our data practices. Annual third-party security audits.",
    iconKey: "Shield",
  },
];

const ESG_STATS = [
  { value: "100%", label: "Carbon-Neutral Hosting" },
  { value: "40%", label: "Women in Leadership" },
  { value: "1,200+", label: "Pro Bono Hours / Year" },
  { value: "100%", label: "Privacy-First Stack" },
  { value: "Zero", label: "Data Breach Incidents" },
];

const DEPARTMENTS: Department[] = [
  {
    key: "senior-leadership",
    label: "Senior Leadership",
    members: [
      {
        name: "Rachit Agarwal",
        role: "Founder & CEO",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Megha Kapoor",
        role: "Head of SEO",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Vikram Singh",
        role: "Performance Lead",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Ananya Joshi",
        role: "Creative Director",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    key: "marketing-officers",
    label: "Marketing Officers",
    members: [
      {
        name: "Priya Sharma",
        role: "Senior SEO Strategist",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Rohan Mehta",
        role: "Performance Marketing Manager",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Aisha Khan",
        role: "Social Media Lead",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    key: "creative",
    label: "Creative",
    members: [
      {
        name: "Ananya Joshi",
        role: "Creative Director",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Kabir Malhotra",
        role: "Senior Designer",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Tara Iyer",
        role: "Motion Designer",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    key: "development",
    label: "Development",
    members: [
      {
        name: "Arjun Reddy",
        role: "Tech Lead · Next.js",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Neha Patel",
        role: "Senior Frontend Engineer",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Sahil Verma",
        role: "Full-Stack Engineer",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    key: "operations",
    label: "Operations",
    members: [
      {
        name: "Pooja Singh",
        role: "Head of Operations",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Karan Joshi",
        role: "Client Success Manager",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
];

const OFFICES = [
  { city: "Noida (HQ)", address: "C-23, Sector 62\nNoida, Delhi NCR" },
  { city: "Mumbai", address: "WeWork BKC\nBandra Kurla Complex" },
  { city: "Bengaluru", address: "91springboard\nKoramangala" },
  { city: "Dubai", address: "DMCC Free Zone\nJumeirah Lakes Towers" },
];

export default function OurAgencyPage() {
  return (
    <>
      {/* ═══════════════════════ 01 · HERO ═══════════════════════ */}
      <section
        data-testid="about-hero"
        className="relative overflow-hidden pt-32 md:pt-44 pb-16 md:pb-24 border-b border-cream/10"
      >
        <Parallax
          distance={30}
          className="absolute inset-0 -z-10 pointer-events-none"
        >
          <div className="absolute right-[-15%] top-[5%] h-[60vh] w-[60vh] rounded-full bg-accent/15 blur-[150px]" />
          <div className="absolute left-[-10%] bottom-[-15%] h-[40vh] w-[40vh] rounded-full bg-accent/10 blur-[120px]" />
        </Parallax>

        <div className="container-x relative text-center">
          {/* Eyebrow — Atomic uses data-hero-animate fade-up */}
          <Reveal variant="up" delay={0}>
            <p
              data-hero-animate="true"
              data-testid="text-about-tagline"
              className="text-accent font-mono text-sm tracking-tight font-bold mb-6"
            >
              About Us
            </p>
          </Reveal>

          {/* H1 — Per-word blur(10px) + translateY(50px) reveal */}
          <BlurWordReveal
            as="h1"
            text="The People Behind the Performance"
            className="text-cream text-[28px] sm:text-[36px] md:text-[48px] lg:text-[64px] xl:text-[80px] font-bold leading-[1.05] tracking-tight max-w-[1100px] mx-auto mb-6"
            stagger={100}
          />

          {/* Description */}
          <Reveal variant="up" delay={500}>
            <p
              data-hero-animate="true"
              data-testid="text-about-description"
              className="text-cream/70 text-base md:text-lg leading-snug max-w-[600px] mx-auto mb-10"
            >
              Stealth Digital is an award-winning, full-service digital marketing
              agency delivering strategy, creativity, and technology to ambitious
              brands across India and beyond.
            </p>
          </Reveal>

          {/* Magnetic CTA */}
          <Reveal variant="up" delay={650}>
            <Magnetic strength={50} innerTarget innerStrength={25}>
              <Link
                href="/contact-us"
                data-testid="btn-about-hero-cta"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-accent px-8 text-base font-semibold text-ink-950"
              >
                Work With Us
                <ArrowUpRight
                  size={18}
                  strokeWidth={2.5}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ 02 · STATEMENT SWAP ═══════════════════ */}
      <section
        data-testid="about-statement"
        className="py-24 md:py-40 border-b border-cream/10 bg-ink-900 relative overflow-hidden"
      >
        <div className="container-x relative">
          <StatementSwap
            text1="We Don't Just Follow the Same Playbook."
            text2="We Write a Better One."
            className="text-accent text-[2.5em] sm:text-[3.5em] md:text-[4.5em] lg:text-[5.5em] xl:text-[6.5em] font-bold leading-[1] tracking-tight text-center max-w-6xl mx-auto"
          />
        </div>
      </section>

      {/* ════════════════════ 03 · STATISTICS ════════════════════ */}
      <section
        data-testid="about-statistics"
        className="py-20 md:py-32 border-b border-cream/10"
      >
        <div className="container-x">
          <Reveal variant="up" delay={0}>
            <div className="mb-12 max-w-2xl">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-3">
                [By the Numbers]
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-cream leading-[1.1]">
                A decade compounding.
              </h2>
            </div>
          </Reveal>

          <StaggerGrid delay={120}>
            {STATS.map((s, i) => (
              <StatCard key={s.label} index={i} value={s.value} label={s.label} />
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ════════════════════ 04 · SHOWREEL ════════════════════ */}
      <section
        data-testid="about-showreel"
        className="py-20 md:py-32 border-b border-cream/10"
      >
        <div className="container-x">
          <Reveal variant="up">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[10px] bg-ink-800 group">
              <Parallax distance={20} className="w-full h-full">
                <Image
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=80"
                  alt="Stealth Digital in action"
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Parallax>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Magnetic strength={50} innerTarget innerStrength={25}>
                  <button
                    type="button"
                    className="group/play inline-flex h-20 w-20 md:h-28 md:w-28 items-center justify-center rounded-full bg-accent text-ink-950 shadow-2xl shadow-accent/30 transition-transform hover:scale-110"
                    aria-label="Play showreel"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </Magnetic>
              </div>

              <div className="absolute bottom-8 left-8 right-8 flex flex-wrap items-end justify-between gap-4">
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-cream/80">
                  [Showreel · 2025]
                </div>
                <div className="font-display text-2xl md:text-4xl font-bold text-cream tracking-tight">
                  90 seconds of work that compounds.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════ 05 · DIFFERENCE ════════════════════ */}
      <section
        data-testid="about-difference"
        className="py-20 md:py-32 border-b border-cream/10 bg-ink-900"
      >
        <div className="container-x">
          <Reveal variant="up">
            <div className="mb-12 max-w-3xl">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-3">
                [What Makes Us Different]
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white leading-[1.05]">
                The Stealth Difference.
              </h2>
            </div>
          </Reveal>
        </div>
        <DifferenceCarousel cards={DIFFERENCE} iconKeys={DIFFERENCE_ICONS as any} />
      </section>

      {/* ════════════════════ 06 · THINKING ════════════════════ */}
      <section
        data-testid="about-thinking"
        className="py-24 md:py-40 border-b border-cream/10"
      >
        <div className="container-x">
          <Reveal variant="up">
            <div className="grid gap-8 lg:gap-16 lg:grid-cols-12 mb-16">
              <div className="lg:col-span-5">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-3">
                  [How We Think]
                </div>
                <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-cream leading-[1.05]">
                  The principles that shape every decision.
                </h2>
              </div>
              <p className="text-cream/70 text-base md:text-lg max-w-xl lg:col-span-6 lg:col-start-7 self-end">
                Six non-negotiables. Read at every team offsite. Used in every
                hiring decision. Embedded in every client engagement.
              </p>
            </div>
          </Reveal>

          <ThinkingTabs tabs={THINKING_TABS} />
        </div>
      </section>

      {/* ════════════════════ 07 · ESG ════════════════════ */}
      <section
        data-testid="about-esg"
        className="py-24 md:py-40 border-b border-cream/10 bg-ink-900"
      >
        <div className="container-x">
          <Reveal variant="up">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-3">
                  [ESG · Our Commitments]
                </div>
                <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-cream leading-[1.05] max-w-2xl">
                  Principles we don't compromise on.
                </h2>
              </div>
              <p className="text-cream/70 max-w-md md:text-right">
                Growth is great. Growth without integrity isn't worth it. Here's
                where we stand.
              </p>
            </div>
          </Reveal>

          {/* Pillars */}
          <Reveal variant="up" delay={120}>
            <EsgPillars pillars={ESG_PILLARS} />
          </Reveal>

          {/* Stats */}
          <Reveal variant="up" delay={200}>
            <div className="grid gap-px bg-cream/10 border border-cream/10 md:grid-cols-5">
              {ESG_STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="bg-ink-950 p-6 md:p-8 text-center"
                  data-esg-fade="true"
                >
                  <div className="font-display text-3xl md:text-5xl font-bold text-accent leading-none mb-3 tracking-tight">
                    <RollingDigit value={s.value} />
                  </div>
                  <div className="font-mono text-xs uppercase tracking-[0.18em] text-cream/60">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════ 08 · TEAM ════════════════════ */}
      <section
        data-testid="about-team"
        className="py-24 md:py-40 border-b border-cream/10"
      >
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <Reveal variant="up">
              <h2
                className="text-cream text-[40px] sm:text-[56px] md:text-[80px] lg:text-[100px] font-bold leading-[1.0] tracking-tight flex-shrink-0"
                data-testid="text-team-heading"
              >
                Meet the Team
              </h2>
            </Reveal>
            <Reveal variant="up" delay={150}>
              <p
                className="text-cream/70 text-base md:text-lg max-w-md md:text-right"
                data-testid="text-team-description"
              >
                Specialists, not generalists. Each team is led by someone who's
                done the work at scale.
              </p>
            </Reveal>
          </div>

          <TeamCarousel departments={DEPARTMENTS} />
        </div>
      </section>

      {/* ════════════════════ 09 · PARTNERS ════════════════════ */}
      <div data-testid="about-partner-logos">
        <PartnerLogos
          heading="Plays nicely with the world's best platforms."
          logos={[
            "Google Premier Partner",
            "Meta Business Partner",
            "HubSpot Solutions Partner",
            "Shopify Partners",
            "LinkedIn Marketing Partner",
            "Ahrefs Authoritative",
            "Semrush Agency Partner",
            "Webflow Expert",
            "Adobe Partner",
            "Figma Preferred",
          ]}
        />
      </div>

      {/* ════════════════════ 10 · OFFICES ════════════════════ */}
      <section
        data-testid="about-offices"
        className="py-20 md:py-32 border-y border-cream/10"
      >
        <div className="container-x">
          <Reveal variant="up">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-3">
                  [Where We Work]
                </div>
                <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-cream">
                  Offices across the world.
                </h2>
              </div>
              <p className="text-cream/70 max-w-md md:text-right text-sm md:text-base">
                Remote-first. Office-flexible. Most of our team works from
                wherever they do their best thinking.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {OFFICES.map((o, i) => (
              <Reveal
                key={o.city}
                variant="up"
                delay={(i * 80) as FadeDelay}
                className="bg-ink-900 border border-cream/10 p-6 md:p-8 hover:border-accent/30 transition-colors group"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-3">
                  [0{i + 1}]
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-cream mb-3 tracking-tight">
                  Stealth {o.city}
                </h3>
                <p className="text-cream/60 text-sm leading-relaxed whitespace-pre-line">
                  {o.address}
                </p>
                <div className="mt-6 h-px w-12 bg-accent/30 group-hover:w-full group-hover:bg-accent transition-all duration-700" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ CTA ════════════════════ */}
      <section className="py-28 md:py-48 text-center relative overflow-hidden">
        <Parallax
          distance={40}
          className="absolute inset-0 -z-10 pointer-events-none"
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[80vh] w-[80vh] rounded-full bg-accent/10 blur-[120px]" />
        </Parallax>

        <div className="container-x relative">
          <Reveal variant="up">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-8 bg-accent" />
              <span className="eyebrow">Let's Talk</span>
              <span className="h-px w-8 bg-accent" />
            </div>
          </Reveal>

          <Reveal variant="up" delay={100}>
            <BlurWordReveal
              as="h2"
              text="Let's build something worth talking about."
              className="font-display text-[44px] md:text-[80px] lg:text-[112px] font-bold leading-[0.95] tracking-[-0.04em] text-balance text-cream max-w-5xl mx-auto"
              stagger={80}
            />
          </Reveal>

          <Reveal variant="up" delay={600}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Button
                href="/contact-us"
                variant="primary"
                size="lg"
                showArrow
                magnetic
                magneticStrength={30}
              >
                Start a Project
              </Button>
              <Button
                href="/services"
                variant="ghost"
                size="lg"
                magnetic
                magneticStrength={25}
              >
                See Our Work
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ─────── Helper: stat card with rolling digit counter ─────── */
function StatCard({
  index,
  value,
  label,
}: {
  index: number;
  value: string;
  label: string;
}) {
  return (
    <Reveal
      variant="up"
      delay={(index * 120) as FadeDelay}
      className="bg-[#FEE2E2] rounded-[10px] p-8 md:p-10 text-center"
    >
      <div className="flex items-center justify-center overflow-hidden leading-none text-accent text-[40px] sm:text-[52px] md:text-[64px] font-bold tracking-tight leading-none mb-4">
        <RollingDigit value={value} />
      </div>
      <p className="text-[#1F1E1E] text-sm md:text-base font-normal">{label}</p>
    </Reveal>
  );
}

/* ─────── Helper: stagger grid (3 col) ─────── */
function StaggerGrid({
  children,
  delay = 120,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      className="grid gap-4 md:gap-6 md:grid-cols-3"
      data-stagger={`${delay}`}
    >
      {children}
    </div>
  );
}