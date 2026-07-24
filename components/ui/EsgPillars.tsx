"use client";

import { Leaf, Users, Shield } from "lucide-react";

const ICONS = { Leaf, Users, Shield };

export interface EsgPillar {
  title: string;
  body: string;
  iconKey: keyof typeof ICONS;
}

interface EsgPillarsProps {
  pillars: EsgPillar[];
}

export function EsgPillars({ pillars }: EsgPillarsProps) {
  return (
    <div className="grid gap-px bg-cream/10 md:grid-cols-3 border border-cream/10 mb-16">
      {pillars.map((p) => {
        const Icon = ICONS[p.iconKey];
        return (
          <div
            key={p.title}
            data-esg-fade="true"
            className="bg-ink-950 p-8 md:p-12 group hover:bg-ink-900 transition-colors"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 text-accent">
                <Icon size={20} strokeWidth={1.5} />
              </div>
              <h3 className="text-accent text-xl md:text-2xl font-bold leading-[1.15] tracking-tight">
                {p.title}
              </h3>
            </div>
            <p className="text-cream/70 leading-relaxed text-base">{p.body}</p>
          </div>
        );
      })}
    </div>
  );
}