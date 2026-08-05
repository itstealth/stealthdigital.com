"use client";

import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import GalleryClient from "@/components/ui/3d-gallery-photography.client";

export interface TeamMember {
    name: string;
    role: string;
    bio: string;
    img: string;
}

interface TeamGalleryProps {
    team: TeamMember[];
}

export function TeamGallery({ team }: TeamGalleryProps) {
    const sectionRef = useRef<HTMLElement | null>(null);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen overflow-hidden border-b border-cream/10 bg-ink-900"
        >
            <GalleryClient
                images={team.map((m) => ({ src: m.img, alt: m.name }))}
                labels={team.map((m) => ({ name: m.name, role: m.role }))}
                speed={1.2}
                visibleCount={8}
                className="absolute inset-0"
                containerRef={sectionRef}
            />

            {/* Foreground overlay — pointer-events-none so the canvas keeps hover */}
            <div className="pointer-events-none absolute inset-0 flex flex-col p-6 md:p-10 lg:p-14">
                {/* Top row: eyebrow + description frame the centre heading */}
                <Reveal variant="up" delay={0}>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                            [06 / Leadership]
                        </div>
                        <p className="text-cream/70 max-w-md md:text-right">
                            Strategists, engineers, designers, and analysts who've shipped
                            500+ projects — and lost count of the late nights.
                        </p>
                    </div>
                </Reveal>

                {/* Centre: huge heading. Cards approaching this position
                    blur and vanish inside the gallery so the text stays
                    legible. */}
                <div className="flex-1 flex items-center justify-center">
                    <Reveal variant="up" delay={120}>
                        <h2 className="font-display text-[clamp(4.5rem,14vw,12rem)] font-bold tracking-tight text-cream leading-[0.95] mix-blend-exclusion text-center select-none">
                            The teams
                        </h2>
                    </Reveal>
                </div>

                {/* Bottom: navigation hint */}
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/60 text-center mix-blend-exclusion">
                    Use mouse wheel, arrow keys, or touch to navigate · Auto-play resumes after 3s of inactivity
                </p>
            </div>
        </section>
    );
}