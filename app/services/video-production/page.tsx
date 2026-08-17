import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { getServiceBySlug } from "@/data/services";

export const metadata: Metadata = {
    title: "Video Production — Captivating Content That Converts",
    description:
        "High-quality, professional videos that capture attention, communicate your brand story, and inspire action. From short-form social reels to corporate films and motion graphics.",
};

const WHY_CHOOSE_US = [
    {
        n: "01",
        title: "Story-first, not just pretty footage",
        body: "Every video starts with a script and storyboard. We obsess over the hook, the narrative arc, and the call-to-action before a single frame is shot — so the edit isn't salvage duty, it's the final shape of a clear idea.",
    },
    {
        n: "02",
        title: "In-house crew, broadcast-grade gear",
        body: "Sony FX3 + Canon R5 for capture, pro lighting and audio, dedicated editors in Premiere Pro, DaVinci Resolve, and After Effects. No freelance handoffs, no surprise subcontractor on your shoot day.",
    },
    {
        n: "03",
        title: "Platform-native delivery",
        body: "9:16 for Reels and TikTok. 1:1 and 4:5 for LinkedIn. 16:9 for YouTube. Native captions, hook-first edits, and CTA-end frames — every export is tuned for where it will actually be watched.",
    },
    {
        n: "04",
        title: "Two rounds of revisions, no scope creep",
        body: "Script and storyboard get two rounds before shooting. The rough cut gets two rounds before final delivery. Everything else is built into the timeline so you always know what's next.",
    },
];

export default function VideoProductionPage() {
    const service = getServiceBySlug("video-production")!;

    return (
        <>
            <ServiceDetail
            service={service}
            intro="Video is one of the most powerful tools to engage audiences, convey messages quickly, and leave a lasting impact. A compelling video can explain complex ideas, showcase products, or evoke emotion — all while boosting engagement and conversions. At Stealth Digital, we create high-quality, professional videos that capture attention, communicate your brand story, and inspire action. From short-form social videos to corporate presentations, we ensure every frame serves a purpose and drives results."
            painPoints={[
                {
                    title: "Low-quality video hurts brand credibility",
                    description:
                        "Viewers form opinions in seconds. Poor lighting, muddy audio, shaky footage, or sloppy editing signals 'amateur' — and amateur doesn't sell premium. We bring broadcast-grade production to every shoot so your brand looks like the obvious choice.",
                },
                {
                    title: "Inconsistent video content across platforms",
                    description:
                        "Each platform has its own format, aspect ratio, and audience behaviour. We optimise for Instagram (9:16), YouTube (16:9), LinkedIn (1:1 or 4:5), and TikTok — with platform-native editing, captions, and pacing — so your video actually performs where it lives.",
                },
                {
                    title: "No clear story or call-to-action",
                    description:
                        "A pretty video that doesn't move the viewer is wasted budget. Every frame we shoot answers one of three questions: 'what is this?', 'why should I care?', and 'what do I do next?' Script-first, storyboard-driven, CTA-clear.",
                },
                {
                    title: "Wasted budget on unusable footage",
                    description:
                        "Most amateur shoots throw away 70% of what's captured — wrong takes, bad lighting, focus misses. Our pre-production planning, multi-cam setups, and shot lists deliver 90%+ usable footage in a single shoot day.",
                },
                {
                    title: "Editing bottleneck — footage sits unused",
                    description:
                        "You shot a great library of footage but never had time to cut it. We handle the entire post-production pipeline — rough cut, fine cut, colour, sound, motion graphics, captions — and deliver platform-ready exports on a fixed schedule.",
                },
                {
                    title: "No measurement of video ROI",
                    description:
                        "Views, watch time, click-through, conversion — we instrument every video with the analytics and tracking your team needs to prove ROI and iterate. Video isn't a black box anymore.",
                },
            ]}
            subservices={[
                {
                    title: "Corporate & Brand Videos",
                    description:
                        "Polished videos that communicate your brand's values, mission, and vision — perfect for presentations, websites, investor decks, and campaigns.",
                    deliverables: [
                        "Brand manifesto & culture films",
                        "Founder/executive interview videos",
                        "Office & studio tours",
                        "Investor & stakeholder presentations",
                        "Internal comms & onboarding videos",
                    ],
                },
                {
                    title: "Social Media Videos",
                    description:
                        "Engaging short-form content for Instagram Reels, TikTok, LinkedIn, and YouTube Shorts — built to stop the scroll and drive engagement.",
                    deliverables: [
                        "Instagram Reels (9:16)",
                        "TikTok-native edits",
                        "LinkedIn thought-leadership clips",
                        "YouTube Shorts & pre-roll",
                        "Platform-optimised captions & hooks",
                    ],
                },
                {
                    title: "Explainer & Product Videos",
                    description:
                        "Videos that simplify complex products or services — helping potential customers understand your offering quickly, clearly, and memorably.",
                    deliverables: [
                        "Animated explainer videos (60–120s)",
                        "Product demo & walkthrough videos",
                        "Feature highlight reels",
                        "How-it-works animations",
                        "SaaS onboarding videos",
                    ],
                },
                {
                    title: "Animation & Motion Graphics",
                    description:
                        "Custom animations and motion graphics that make your message more dynamic, visually appealing, and memorable — without the cost of a full live shoot.",
                    deliverables: [
                        "2D & 3D motion graphics",
                        "Logo stings & brand idents",
                        "Kinetic typography",
                        "Data visualisation animations",
                        "Animated infographics",
                    ],
                },
                {
                    title: "Event & Testimonial Videos",
                    description:
                        "Captured events, customer stories, and testimonials that enhance credibility, social proof, and connection with your audience.",
                    deliverables: [
                        "Conference & product launch coverage",
                        "Customer testimonial films",
                        "Behind-the-scenes event recaps",
                        "Highlight reels & sizzle edits",
                        "Multi-cam live event capture",
                    ],
                },
                {
                    title: "Editing & Post-Production",
                    description:
                        "Color grading, sound design, and visual effects — all the polish that turns raw footage into a professional final cut.",
                    deliverables: [
                        "Rough cut → fine cut editing",
                        "Color grading & correction",
                        "Sound design & mixing",
                        "Motion graphics & VFX",
                        "Multi-format export delivery",
                    ],
                },
            ]}
            process={[
                {
                    step: "01",
                    title: "Concept & Storyboarding",
                    description:
                        "We collaborate with you to define the story, script, and creative vision for the video, ensuring it aligns with your goals and target audience. Output: an approved script, shot list, and storyboard.",
                },
                {
                    step: "02",
                    title: "Filming & Animation",
                    description:
                        "Our team captures high-quality footage or creates custom animations, focusing on visuals, sound, and storytelling that engages viewers. Multi-cam setups, professional lighting, broadcast audio.",
                },
                {
                    step: "03",
                    title: "Editing & Post-Production",
                    description:
                        "We refine the video with professional editing, motion graphics, sound design, and effects to produce a polished final product. Two rounds of revisions included.",
                },
                {
                    step: "04",
                    title: "Delivery & Optimization",
                    description:
                        "Videos are delivered in formats optimized for websites, social media, advertising, or presentations — ready to maximize impact across all channels. We also provide thumbnail, caption, and platform-cut variants.",
                },
            ]}
            caseStudy={{
                client: "Multiple D2C & B2B clients",
                metric: "Engagement up 3.4× vs static posts.",
                description:
                    "Across 200+ video projects, our work consistently outperforms static creative on the same channels — averaging 3–4× higher engagement, 2× higher watch-through, and meaningfully better assisted and direct conversions on ad-spend campaigns.",
            }}
            tools={[
                { name: "Adobe Premiere Pro", category: "Editing" },
                { name: "After Effects", category: "Motion Graphics" },
                { name: "DaVinci Resolve", category: "Colour Grading" },
                { name: "Final Cut Pro", category: "Editing" },
                { name: "Cinema 4D / Blender", category: "3D Animation" },
                { name: "Frame.io", category: "Review & Collaboration" },
                { name: "Sony FX3 / Canon R5", category: "Capture" },
                { name: "Rode / Sennheiser", category: "Audio" },
            ]}
            faqs={[
                {
                    q: "What types of videos do you produce?",
                    a: "We produce corporate videos, social media content, product explainers, animations, testimonials, event coverage, and more. If it can be filmed, animated, or edited, we do it.",
                },
                {
                    q: "Can you create videos for social media platforms?",
                    a: "Yes. Every video we deliver is optimised for the intended platform — including Instagram (9:16), TikTok, LinkedIn, YouTube, and Facebook — with platform-native aspect ratios, captions, hooks, and pacing.",
                },
                {
                    q: "Do you handle the entire production process?",
                    a: "Absolutely. We manage concept, scripting, storyboarding, filming (or animation), editing, post-production, and final delivery. You get a single point of contact for the entire project.",
                },
                {
                    q: "How long does a video project take?",
                    a: "Short-form social videos typically take 1–2 weeks. Corporate films and explainer videos take 3–6 weeks. Complex animation projects can take 6–10 weeks. We provide a clear schedule during the planning stage.",
                },
                {
                    q: "Do you provide the script and storyboard?",
                    a: "Yes. We collaborate with you on the script and storyboard before any filming begins, so you approve the creative direction first. Two rounds of revisions on the script and storyboard are included.",
                },
                {
                    q: "Can you work with footage we already have?",
                    a: "Definitely. We offer full post-production services — editing, colour grading, sound design, motion graphics — using your existing footage. Great for getting value out of libraries that have been sitting unused.",
                },
            ]}
        />

            {/* Why Choose Us — 4 reasons we deliver video differently */}
            <section className="py-24 md:py-40 border-t border-cream/10 bg-ink-950">
                <div className="container-x">
                    <Reveal variant="up" delay={0}>
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24 max-w-5xl">
                            <div>
                                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-3">
                                    [Why Stealth / Video]
                                </div>
                                <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.0] tracking-tight text-cream">
                                    Why teams pick us for video.
                                </h2>
                            </div>
                            <p className="text-cream/60 max-w-md md:text-right">
                                Four reasons we deliver video that actually performs — not just looks good in the review room.
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid gap-px bg-cream/10 md:grid-cols-2 lg:grid-cols-4 border border-cream/10">
                        {WHY_CHOOSE_US.map((item) => (
                            <div
                                key={item.n}
                                className="bg-ink-950 p-8 md:p-10 group hover:bg-ink-900 transition-colors"
                            >
                                <div className="flex items-baseline justify-between mb-8">
                                    <span className="font-mono text-sm text-accent">{item.n}</span>
                                </div>
                                <h3 className="font-display text-xl md:text-2xl font-bold text-cream mb-3 tracking-tight leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-cream/70 leading-relaxed text-sm md:text-base">
                                    {item.body}
                                </p>
                                <div className="mt-6 h-px w-12 bg-accent/30 group-hover:w-full group-hover:bg-accent transition-all duration-700" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Closing CTA — bring your brand story to life */}
            <section className="py-28 md:py-48 text-center relative overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[80vh] w-[80vh] rounded-full bg-accent/10 blur-[140px]" />
                </div>

                <div className="container-x relative">
                    <Reveal variant="up" delay={0}>
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <span className="h-px w-8 bg-accent" />
                            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                                [Start a project]
                            </span>
                            <span className="h-px w-8 bg-accent" />
                        </div>
                    </Reveal>

                    <Reveal variant="up" delay={100}>
                        <h2 className="font-display text-[44px] md:text-[88px] lg:text-[120px] font-bold leading-[0.92] tracking-[-0.04em] text-balance text-cream max-w-5xl mx-auto">
                            Bring your brand story{" "}
                            <span className="text-accent italic">to life.</span>
                        </h2>
                    </Reveal>

                    <Reveal variant="up" delay={200}>
                        <p className="mt-8 text-lg md:text-xl text-cream/70 max-w-2xl mx-auto leading-relaxed">
                            Video has the power to engage, inform, and inspire your audience
                            like no other medium. At Stealth Digital, we produce creative,
                            professional, and high-impact videos that communicate your brand
                            message effectively and leave a lasting impression.
                        </p>
                    </Reveal>

                    <Reveal variant="up" delay={300}>
                        <p className="mt-6 text-base text-cream/50 max-w-xl mx-auto">
                            Tell your story visually and captivate your audience today.
                        </p>
                    </Reveal>

                    <Reveal variant="up" delay={400}>
                        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                            <Button
                                href="/contact-us"
                                variant="primary"
                                size="lg"
                                showArrow
                                magnetic
                                magneticStrength={30}
                            >
                                Start Your Project
                            </Button>
                            <Button
                                href="/services"
                                variant="ghost"
                                size="lg"
                                magnetic
                                magneticStrength={25}
                            >
                                See All Services
                            </Button>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}