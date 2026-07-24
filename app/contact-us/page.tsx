import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Tell us about your goals. We'll send back a custom growth plan within 48 hours.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's grow something great together."
        description="Tell us about your goals, your team, and your timeline. We'll respond within 24 hours — usually faster."
      />

      <section className="py-20 md:py-32 border-b border-cream/10">
        <div className="container-x grid gap-12 lg:gap-20 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal variant="up">
              <div className="mb-8">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-3">
                  [01 / Project Enquiry]
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-cream">
                  Tell us about your project.
                </h2>
              </div>
              <ContactForm />
            </Reveal>
          </div>

          {/* Contact info */}
          <aside className="lg:col-span-5 space-y-10">
            <Reveal variant="up" delay={0.15}>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-3">
                  [02 / Direct Lines]
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-cream mb-8">
                  Or reach us directly.
                </h2>
              </div>
            </Reveal>

            <Reveal variant="up" delay={0.2}>
              <ContactRow
                icon={Mail}
                label="Email"
                value={SITE.email}
                href={`mailto:${SITE.email}`}
              />
            </Reveal>
            <Reveal variant="up" delay={0.25}>
              <ContactRow
                icon={Phone}
                label="Phone / WhatsApp"
                value={SITE.phoneHR}
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              />
            </Reveal>
            <Reveal variant="up" delay={0.3}>
              <ContactRow
                icon={MapPin}
                label="Studio"
                value={`${SITE.address.line1}, ${SITE.address.line2}`}
              />
            </Reveal>
            <Reveal variant="up" delay={0.35}>
              <ContactRow
                icon={Clock}
                label="Hours"
                value="Mon – Sat · 10:00 – 19:00 IST"
              />
            </Reveal>

            <Reveal variant="up" delay={0.45}>
              <div className="border-t border-cream/10 pt-8 mt-4">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/50 mb-4">
                  [Response Time]
                </div>
                <div className="font-display text-2xl font-bold text-accent">
                  Under 24 hours
                </div>
                <p className="text-sm text-cream/60 mt-2">
                  Average response: 4.2 hours during business hours.
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: any;
  label: string;
  value: string;
  href?: string;
}) {
  const Inner = (
    <div className="flex items-start gap-4 group">
      <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cream/15 text-accent transition-colors group-hover:border-accent group-hover:bg-accent/5">
        <Icon size={18} />
      </div>
      <div className="flex-1">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/50 mb-1">
          {label}
        </div>
        <div className="font-display text-lg font-semibold text-cream link-underline">
          {value}
        </div>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block">
      {Inner}
    </a>
  ) : (
    Inner
  );
}