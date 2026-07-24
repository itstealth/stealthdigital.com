"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * ShowreelScroll — cinematic scroll-driven video, placed directly below
 * the hero. The video is a true inline element in the "We [video] Do."
 * heading, animated purely with a GSAP scale transform.
 *
 *   Stage 1 (0 → 20%):  Video holds as a centered rounded card (~80vw).
 *   Stage 2 (20 → 80%): Video scales to 2.5x → fills the screen.
 *   Stage 3 (80 → 100%): Video scales to 1x, settles inline in heading.
 */
export function ShowreelScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoBoxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Sync with Lenis smooth scroll
    const lenis = (window as any).lenis;
    const onLenisScroll = () => ScrollTrigger.update();
    if (lenis?.on) lenis.on("scroll", onLenisScroll);

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const videoBox = videoBoxRef.current!;

      // Init: scale the inline video to its initial centered-card size.
      gsap.set(videoBox, {
        scale: 2,
        borderRadius: "12px",
        force3D: true,
        transformOrigin: "center center",
      });

      const tl = gsap.timeline({
        defaults: { force3D: true },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=180%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: true,
        },
      });

      // Stage 2: expand to fullscreen (scale 2 → 2.5)
      tl.to(
        videoBox,
        {
          scale: 2.5,
          borderRadius: "0px",
          ease: "power2.out",
          duration: 0.5,
        },
        0
      );

      // Stage 3: shrink to final inline size (scale 2.5 → 1) — slow easing
      // so the shrink feels gradual and cinematic at the end.
      tl.to(
        videoBox,
        {
          scale: 1,
          borderRadius: "20px",
          ease: "power2.inOut",
          duration: 0.4,
        },
        0.6
      );
    }, sectionRef);

    return () => {
      if (lenis?.off) lenis.off("scroll", onLenisScroll);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-ink-950"
    >
      {/* Centered: heading with inline video */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4">
        <h2 className="flex items-center justify-center font-display text-[10vw] font-semibold leading-none tracking-[-0.03em] text-cream md:text-[8vw]">
          <span className="shrink-0">We</span>

          {/* Video slot — always 40vw in layout; inner video is GSAP-scaled */}
          <span className="relative mx-[0.25em] inline-block aspect-video w-[40vw] shrink-0 align-middle">
            <div
              ref={videoBoxRef}
              className="absolute inset-0 overflow-hidden shadow-2xl shadow-black/50 will-change-transform"
            >
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                src="/videos/showreel.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </span>

          <span className="shrink-0">Do.</span>
        </h2>
      </div>
    </section>
  );
}
