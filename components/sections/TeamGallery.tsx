"use client";

import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
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
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 md:p-10 lg:p-14">
                <Reveal variant="up" delay={0}>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-3">
                                [06 / Leadership]
                            </div>
                            <TextReveal
                                as="h2"
                                text="The team."
                                splitBy="word"
                                staggerDelay={100}
                                className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-cream leading-[1] mix-blend-exclusion"
                            />
                        </div>
                        <p className="text-cream max-w-md md:text-right mix-blend-exclusion">
                            Strategists, engineers, designers, and analysts who've shipped
                            500+ projects — and lost count of the late nights.
                        </p>
                    </div>
                </Reveal>

                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream mix-blend-exclusion">
                    Use mouse wheel, arrow keys, or touch to navigate · Auto-play resumes after 3s of inactivity
                </p>
            </div>
        </section>
    );
}