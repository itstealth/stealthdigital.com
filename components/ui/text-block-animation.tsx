"use client";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

// Ensure plugins are registered exactly once on the client.
if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger);
}

// Class on our manual wrappers so we can find and remove them on cleanup.
// Without this, React throws "removeChild: node is not a child of this node"
// on unmount because the DOM tree no longer matches React's virtual tree.
const WRAPPER_CLASS = "tba-line-wrapper";

interface TextBlockAnimationProps {
  children: React.ReactNode;
  /** Animate when the element scrolls into view. Default true. */
  animateOnScroll?: boolean;
  /** Delay before the timeline starts (seconds). */
  delay?: number;
  /** Color of the sweeping reveal block. */
  blockColor?: string;
  /** Per-line stagger in seconds. Lower = snappier. */
  stagger?: number;
  /** Per-step duration in seconds. */
  duration?: number;
  className?: string;
}

/**
 * TextBlockAnimation — wraps any heading and reveals it with a block-wipe
 * animation: a solid block of `blockColor` scales from left to right
 * across each line, then retracts right-to-left, leaving the text
 * revealed beneath. Powered by GSAP SplitText.
 *
 * Usage:
 *   <TextBlockAnimation blockColor="#FFD60A">
 *     <h2 className="font-display ...">What we do</h2>
 *   </TextBlockAnimation>
 */
export default function TextBlockAnimation({
  children,
  animateOnScroll = true,
  delay = 0,
  blockColor = "#000000",
  stagger = 0.04,
  duration = 0.35,
  className,
}: TextBlockAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root) return;

      // Split the wrapped element by line. The `linesClass` is a hook
      // for any future styling of the per-line wrappers.
      const split = new SplitText(root, {
        type: "lines",
        linesClass: "block-line-parent",
      });

      const lines = Array.from(split.lines) as HTMLElement[];
      const blocks: HTMLDivElement[] = [];

      // For each line, manually wrap it with an overflow-hidden div and
      // inject an absolutely-positioned revealer block on top of it.
      lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.className = WRAPPER_CLASS;
        wrapper.style.position = "relative";
        wrapper.style.display = "block";
        wrapper.style.overflow = "hidden";

        const block = document.createElement("div");
        block.style.position = "absolute";
        block.style.top = "0";
        block.style.left = "0";
        block.style.width = "100%";
        block.style.height = "100%";
        block.style.backgroundColor = blockColor;
        block.style.zIndex = "2";
        block.style.transform = "scaleX(0)";
        block.style.transformOrigin = "left center";

        line.parentNode?.insertBefore(wrapper, line);
        wrapper.appendChild(line);
        wrapper.appendChild(block);

        // Hide the line text until the block has covered it.
        gsap.set(line, { opacity: 0 });

        blocks.push(block);
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: animateOnScroll
          ? {
              trigger: root,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          : undefined,
        delay,
      });

      // Step A: Block scales 0 → 1 left-to-right, covering each line.
      tl.to(blocks, {
        scaleX: 1,
        duration,
        stagger,
        transformOrigin: "left center",
      })
        // Step B: Once the block is fully covering, the text becomes
        // visible underneath.
        .set(
          lines,
          { opacity: 1, stagger },
          `<${duration / 2}`
        )
        // Step C: Block retracts right-to-left, leaving the text.
        .to(
          blocks,
          {
            scaleX: 0,
            duration,
            stagger,
            transformOrigin: "right center",
          },
          `<${duration * 0.4}`
        );

      return () => {
        // CRITICAL: Restore the DOM to what React expects BEFORE
        // SplitText reverts. Otherwise React throws "removeChild: node
        // is not a child of this node" on unmount because the manual
        // wrappers we inserted are still in the DOM tree.
        root.querySelectorAll(`.${WRAPPER_CLASS}`).forEach((wrapper) => {
          const parent = wrapper.parentNode;
          if (!parent) return;
          // Move the SplitText line wrapper back to its original slot,
          // then remove our wrapper. The block (last child) is discarded.
          while (wrapper.firstChild) {
            parent.insertBefore(wrapper.firstChild, wrapper);
          }
          parent.removeChild(wrapper);
        });
        // Now safe to revert SplitText — it unwraps the line divs.
        split.revert();
      };
    },
    {
      scope: containerRef,
      dependencies: [animateOnScroll, delay, blockColor, stagger, duration],
    }
  );

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative" }}
    >
      {children}
    </div>
  );
}
