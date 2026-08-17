"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export interface TeamMember {
    name: string;
    role: string;
    bio: string;
    img: string;
}

interface TeamMarqueeProps {
    team: TeamMember[];
}

/**
 * TeamMarquee — replaces the previous 3D gallery with a 2-up vertical
 * marquee. The left half of the section is the heading + CTA, the right
 * half is a two-column infinite scroll of team-member cards. The right
 * column is offset by a negative `animation-delay` so the two columns
 * read as out of phase.
 *
 * Cards keep their photo, show name + a row of brand-coloured social
 * icons in the bottom-right, and pause on hover via the underlying
 * `<Marquee>` component.
 */
export function TeamMarquee({ team }: TeamMarqueeProps) {
    const half = Math.max(1, Math.ceil(team.length / 2));
    const leftColumn = team.slice(0, half);
    const rightColumn = team.length > half ? team.slice(half) : team;

    return (
        <section className="relative overflow-hidden border-b border-ink-950/10 bg-cream py-24 md:py-40">
            <div className="container-x grid gap-12 lg:gap-20 lg:grid-cols-12 items-center">
                {/* Left: heading + subtitle + CTA */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                    <Reveal variant="up" delay={0}>
                        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-4">
                            [06 / Leadership]
                        </div>
                    </Reveal>
                    <Reveal variant="up" delay={80}>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ink-950 leading-[1.05] tracking-tight mb-6 text-balance">
                            Our outstanding, strong, and inspired team
                        </h2>
                    </Reveal>
                    <Reveal variant="up" delay={160}>
                        <p className="text-ink-700 text-base md:text-lg leading-relaxed mb-8 max-w-md">
                            These team members strive to ensure our product is the best it can be.
                        </p>
                    </Reveal>
                </div>

                {/* Right: 2-column vertical marquee */}
                <div className="lg:col-span-7">
                    <div className="grid grid-cols-2 gap-4 h-[560px]">
                        <Marquee vertical speed={30} className="h-full">
                            {leftColumn.map((member, i) => (
                                <TeamCard key={`L-${member.name}-${i}`} member={member} />
                            ))}
                        </Marquee>
                        <Marquee
                            vertical
                            speed={30}
                            reverse
                            className="h-full"
                            // Negative delay so the right column reads
                            // out of phase with the left even after we
                            // reverse its direction.
                            style={{ animationDelay: "-12s" }}
                        >
                            {rightColumn.map((member, i) => (
                                <TeamCard key={`R-${member.name}-${i}`} member={member} />
                            ))}
                        </Marquee>
                    </div>
                </div>
            </div>
        </section>
    );
}

function TeamCard({ member }: { member: TeamMember }) {
    return (
        <div className="relative w-full max-w-[200px] aspect-[3/4] rounded-2xl overflow-hidden bg-ink-800 shrink-0 shadow-md">
            <Image
                src={member.img}
                alt={member.name}
                fill
                sizes="(min-width: 1024px) 20vw, 50vw"
                className="object-cover"
            />
            {/* Bottom gradient for name/icon legibility */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
            {/* Name */}
            <p className="absolute bottom-4 left-4 text-white font-medium text-sm md:text-base z-10">
                {member.name}
            </p>
            {/* Social icons — brand-coloured chips, lucide glyphs on top */}
            <div className="absolute bottom-3 right-3 flex gap-1.5 z-10">
                <a
                    href="#"
                    aria-label={`${member.name} on Facebook`}
                    className="h-7 w-7 rounded-full bg-[#1877F2] flex items-center justify-center hover:scale-110 transition-transform"
                >
                    <Facebook size={13} className="text-white fill-white" />
                </a>
                <a
                    href="#"
                    aria-label={`${member.name} on Instagram`}
                    className="h-7 w-7 rounded-full bg-gradient-to-br from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] flex items-center justify-center hover:scale-110 transition-transform"
                >
                    <Instagram size={13} className="text-white" />
                </a>
                <a
                    href="#"
                    aria-label={`${member.name} on LinkedIn`}
                    className="h-7 w-7 rounded-full bg-[#0A66C2] flex items-center justify-center hover:scale-110 transition-transform"
                >
                    <Linkedin size={13} className="text-white fill-white" />
                </a>
            </div>
        </div>
    );
}