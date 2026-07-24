"use client";

import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";

interface PartnerLogosProps {
  heading?: string;
  logos?: string[];
}

// Simple logo SVGs (we'll use text marks as placeholders since we shouldn't reuse copyrighted logos)
const DEFAULT_LOGOS = [
  { name: "Google", label: "Google" },
  { name: "Meta", label: "Meta" },
  { name: "HubSpot", label: "HubSpot" },
  { name: "Shopify", label: "Shopify" },
  { name: "LinkedIn", label: "LinkedIn" },
  { name: "Ahrefs", label: "Ahrefs" },
  { name: "Semrush", label: "Semrush" },
  { name: "Webflow", label: "Webflow" },
  { name: "Adobe", label: "Adobe" },
  { name: "Figma", label: "Figma" },
  { name: "Notion", label: "Notion" },
  { name: "Slack", label: "Slack" },
];

export function PartnerLogos({
  heading = "Trusted by industry leaders",
  logos,
}: PartnerLogosProps) {
  const items = logos ?? DEFAULT_LOGOS.map((l) => l.label);

  return (
    <section className="py-16 md:py-20 border-t border-cream/10">
      <div className="container-x mb-10">
        <Reveal variant="up">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-px w-8 bg-accent" />
              <span className="eyebrow">Partners</span>
              <span className="h-px w-8 bg-accent" />
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-cream max-w-3xl mx-auto leading-tight">
              {heading}
            </h2>
          </div>
        </Reveal>
      </div>

      <Marquee speed={50} className="mb-4">
        {[...items, ...items].map((name, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-3 px-8 py-4 border border-cream/10 rounded-full"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-display text-lg md:text-xl font-semibold text-cream/70 whitespace-nowrap tracking-tight">
              {name}
            </span>
          </div>
        ))}
      </Marquee>

      <Marquee speed={55} reverse>
        {[...items.slice().reverse(), ...items.slice().reverse()].map((name, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-3 px-8 py-4 border border-cream/10 rounded-full"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-display text-lg md:text-xl font-semibold text-cream/70 whitespace-nowrap tracking-tight">
              {name}
            </span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}