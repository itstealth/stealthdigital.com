"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Check, AlertCircle, Wrench } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";

interface FAQ {
  q: string;
  a: string;
}

interface PainPoint {
  title: string;
  description: string;
}

interface Tool {
  name: string;
  category: string;
}

interface ServiceDetailProps {
  service: {
    slug: string;
    title: string;
    shortTitle: string;
    tagline: string;
    description: string;
    image: string;
    features: string[];
  };
  intro: string;
  subservices: { title: string; description: string; deliverables: string[] }[];
  process: { step: string; title: string; description: string }[];
  faqs: FAQ[];
  caseStudy: {
    client: string;
    metric: string;
    description: string;
  };
  painPoints: PainPoint[];
  tools: Tool[];
}

export function ServiceDetail({
  service,
  intro,
  subservices,
  process,
  faqs,
  caseStudy,
  painPoints,
  tools,
}: ServiceDetailProps) {
  return (
    <>
      {/* Service hero */}
      <section className="relative pt-32 md:pt-44 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.12, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute right-[-10%] top-[10%] h-[60vh] w-[60vh] rounded-full bg-accent blur-[140px]"
          />
        </div>

        <div className="container-x">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="h-px w-10 bg-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              [{service.shortTitle} / 01]
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-[44px] sm:text-[64px] md:text-[88px] lg:text-[112px] font-bold leading-[0.95] tracking-[-0.04em] text-balance text-cream max-w-5xl"
          >
            {service.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 text-lg md:text-2xl text-cream/70 leading-relaxed max-w-3xl text-pretty font-display"
          >
            {service.tagline}
          </motion.p>
        </div>
      </section>

      {/* Image break */}
      <section className="py-8 md:py-12">
        <div className="container-x">
          <Reveal variant="up">
            <div className="relative aspect-[16/8] overflow-hidden rounded-sm bg-ink-800">
              <Parallax distance={30}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              </Parallax>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                    Featured Service
                  </div>
                  <div className="font-display text-3xl md:text-5xl font-bold text-cream tracking-tight">
                    {service.shortTitle}
                  </div>
                </div>
                <span className="pill">{service.shortTitle}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 md:py-32 border-b border-cream/10">
        <div className="container-x grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal variant="up" className="md:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-4">
              [Overview]
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight tracking-tight text-cream">
              What we do.
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.15} className="md:col-span-7 space-y-6 text-cream/70 text-lg leading-relaxed">
            <p>{intro}</p>
            <p className="text-cream text-xl font-display font-medium leading-snug">
              {service.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pain Points — six2eight pattern */}
      <section className="py-20 md:py-32 border-b border-cream/10 bg-ink-900/50">
        <div className="container-x">
          <Reveal variant="up">
            <div className="mb-16 max-w-3xl">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-4 flex items-center gap-2">
                <AlertCircle size={14} strokeWidth={2} />
                [02 / Pain Points]
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight text-cream">
                Common {service.shortTitle} challenges we tackle head-on.
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-px bg-cream/10 md:grid-cols-2 border border-cream/10">
            {painPoints.map((p, i) => (
              <Reveal
                key={p.title}
                variant="up"
                delay={i * 0.05}
                className="bg-ink-950 p-8 md:p-10 group hover:bg-ink-900 transition-colors"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-3">
                  0{i + 1}
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-cream mb-3 tracking-tight">
                  {p.title}
                </h3>
                <p className="text-cream/70 leading-relaxed">
                  {p.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Subservices */}
      <section className="py-20 md:py-32 border-b border-cream/10">
        <div className="container-x">
          <Reveal variant="up">
            <div className="mb-16 max-w-3xl">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-4">
                [03 / What's Included]
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight text-cream">
                A complete {service.shortTitle.toLowerCase()} stack.
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-px bg-cream/10 md:grid-cols-2 border border-cream/10">
            {subservices.map((sub, i) => (
              <Reveal
                key={sub.title}
                variant="up"
                delay={i * 0.06}
                className="bg-ink-950 p-8 md:p-10 group hover:bg-ink-900 transition-colors"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-3">
                  0{i + 1}
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-cream mb-3 tracking-tight">
                  {sub.title}
                </h3>
                <p className="text-cream/70 leading-relaxed mb-6">
                  {sub.description}
                </p>
                <ul className="space-y-2">
                  {sub.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-3 text-sm text-cream/80"
                    >
                      <Check
                        size={14}
                        className="mt-1 text-accent shrink-0"
                        strokeWidth={3}
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-32 border-b border-cream/10">
        <div className="container-x">
          <Reveal variant="up">
            <div className="mb-16 max-w-3xl">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-4">
                [04 / Our Process]
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight text-cream">
                How we deliver.
              </h2>
            </div>
          </Reveal>

          <div className="space-y-px">
            {process.map((p, i) => (
              <Reveal
                key={p.step}
                variant="up"
                delay={i * 0.05}
                className="border border-cream/10 bg-ink-950 group hover:bg-ink-900 transition-colors"
              >
                <div className="grid gap-6 p-8 md:p-10 md:grid-cols-12 md:items-center">
                  <div className="md:col-span-1">
                    <span className="font-mono text-3xl md:text-4xl font-bold text-accent">
                      {p.step}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-cream tracking-tight">
                      {p.title}
                    </h3>
                  </div>
                  <div className="md:col-span-7 text-cream/70 leading-relaxed">
                    {p.description}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case study highlight */}
      <section className="py-20 md:py-32 border-b border-cream/10 bg-ink-900">
        <div className="container-x">
          <Reveal variant="up">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-4">
              [05 / Proof]
            </div>
          </Reveal>
          <div className="grid gap-10 md:grid-cols-12 md:gap-16 items-end">
            <Reveal variant="up" className="md:col-span-5">
              <h2 className="font-display text-[44px] md:text-[80px] font-bold leading-[0.95] tracking-[-0.03em] text-accent">
                {caseStudy.metric}
              </h2>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-cream/50 mt-3">
                {caseStudy.client}
              </div>
            </Reveal>
            <Reveal variant="up" delay={0.15} className="md:col-span-7">
              <p className="text-xl md:text-2xl text-cream leading-relaxed font-display text-balance">
                {caseStudy.description}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Tools / Stack — six2eight pattern */}
      <section className="py-20 md:py-32 border-b border-cream/10">
        <div className="container-x">
          <Reveal variant="up">
            <div className="mb-16 max-w-3xl">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-4 flex items-center gap-2">
                <Wrench size={14} strokeWidth={2} />
                [06 / Tools & Stack]
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight text-cream">
                The tools behind our {service.shortTitle.toLowerCase()} process.
              </h2>
              <p className="mt-6 text-cream/60 text-lg leading-relaxed max-w-2xl">
                We invest in the right tools so the work ships faster, cleaner, and with fewer surprises. No fluff — every platform earns its place.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-px bg-cream/10 md:grid-cols-2 lg:grid-cols-4 border border-cream/10">
            {tools.map((tool, i) => (
              <Reveal
                key={tool.name}
                variant="up"
                delay={i * 0.03}
                className="bg-ink-950 p-6 md:p-8 group hover:bg-ink-900 transition-colors"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40 mb-3">
                  {tool.category}
                </div>
                <div className="font-display text-lg md:text-xl font-bold text-cream group-hover:text-accent transition-colors">
                  {tool.name}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 md:py-32 border-b border-cream/10">
        <div className="container-x max-w-4xl">
          <Reveal variant="up">
            <div className="mb-12">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-4">
                [07 / FAQs]
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-cream">
                Frequently asked.
              </h2>
            </div>
          </Reveal>
          <div className="space-y-2">
            {faqs.map((f, i) => (
              <FAQItem key={i} faq={f} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 text-center border-b border-cream/10">
        <div className="container-x">
          <Reveal variant="up">
            <h2 className="font-display text-4xl md:text-7xl font-bold tracking-tight text-cream max-w-3xl mx-auto leading-tight">
              Ready to start with <span className="text-accent italic">{service.shortTitle}?</span>
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

function FAQItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal variant="up">
      <div className="border-b border-cream/10">
        <button
          onClick={() => setOpen(!open)}
          className="w-full py-6 flex items-start justify-between gap-6 text-left group"
        >
          <span className="font-display text-lg md:text-xl font-medium text-cream pr-4 group-hover:text-accent transition-colors">
            {faq.q}
          </span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full border border-cream/20 text-cream group-hover:border-accent group-hover:text-accent"
          >
            <ArrowUpRight size={14} />
          </motion.span>
        </button>
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <p className="pb-6 text-cream/70 leading-relaxed pr-12 max-w-2xl">
            {faq.a}
          </p>
        </motion.div>
      </div>
    </Reveal>
  );
}
