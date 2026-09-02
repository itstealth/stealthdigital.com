'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Animated "silk" canvas background — a slow-moving generative noise
 * pattern rendered to a full-bleed <canvas>. Pure background layer: no
 * text/content of its own, so it can sit behind any hero content
 * (headline, CTAs, 3D scenes, etc.) via `absolute inset-0`.
 *
 * The pattern is generated pixel-by-pixel on the CPU, so it is drawn into a
 * small offscreen buffer (a quarter of the display size per axis, i.e. 1/16th
 * the pixels) and upscaled by the GPU on draw — the texture is soft enough
 * that the upscale is not visible. The buffer is allocated once per resize
 * instead of once per frame, the loop is capped at 30fps, and it suspends
 * whenever the hero scrolls out of view or the tab is hidden.
 *
 * Previously this allocated a full-size ImageData every frame (~8MB per frame
 * at 1080p) and ran ~500k trig-heavy iterations at 60fps, which saturated a
 * core and janked the whole page.
 */

// Linear downscale factor for the generated pattern. 0.25 => 1/16th the pixels.
const RES_SCALE = 0.25;
// The pattern drifts slowly; 30fps is indistinguishable from 60 here.
const FRAME_MS = 1000 / 30;

export const Component = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const speed = 0.02;
    const scale = 2;
    const noiseIntensity = 0.8;

    // Offscreen buffer the pattern is generated into, then upscaled from.
    const buffer = document.createElement('canvas');
    const bctx = buffer.getContext('2d');
    if (!bctx) return;

    let imageData: ImageData | null = null;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth;
      const height = parent ? parent.clientHeight : window.innerHeight;
      if (width === 0 || height === 0) return;

      canvas.width = width;
      canvas.height = height;

      buffer.width = Math.max(1, Math.round(width * RES_SCALE));
      buffer.height = Math.max(1, Math.round(height * RES_SCALE));
      // Allocated once per resize, then reused every frame.
      imageData = bctx.createImageData(buffer.width, buffer.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Simple noise function
    const noise = (x: number, y: number) => {
      const G = 2.71828;
      const rx = G * Math.sin(G * x);
      const ry = G * Math.sin(G * y);
      return (rx * ry * (1 + x)) % 1;
    };

    const renderFrame = () => {
      if (!imageData) return;
      const bw = buffer.width;
      const bh = buffer.height;
      const data = imageData.data;
      const tOffset = speed * time;

      for (let y = 0; y < bh; y++) {
        const v = (y / bh) * scale;
        for (let x = 0; x < bw; x++) {
          const u = (x / bw) * scale;

          const tex_x = u;
          const tex_y = v + 0.03 * Math.sin(8.0 * tex_x - tOffset);

          const pattern =
            0.6 +
            0.4 *
              Math.sin(
                5.0 *
                  (tex_x +
                    tex_y +
                    Math.cos(3.0 * tex_x + 5.0 * tex_y) +
                    0.02 * tOffset) +
                  Math.sin(20.0 * (tex_x + tex_y - 0.1 * tOffset))
              );

          const rnd = noise(x, y);
          const intensity = Math.max(0, pattern - (rnd / 15.0) * noiseIntensity);

          // Purple-gray silk color
          const index = (y * bw + x) * 4;
          data[index] = 123 * intensity;
          data[index + 1] = 116 * intensity;
          data[index + 2] = 129 * intensity;
          data[index + 3] = 255;
        }
      }

      bctx.putImageData(imageData, 0, 0);

      // Upscale the small buffer across the full canvas (GPU-side).
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(buffer, 0, 0, canvas.width, canvas.height);

      // Add subtle overlay for depth
      const { width, height } = canvas;
      const overlayGradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) / 2
      );
      overlayGradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
      overlayGradient.addColorStop(1, 'rgba(0, 0, 0, 0.4)');

      ctx.fillStyle = overlayGradient;
      ctx.fillRect(0, 0, width, height);
    };

    // Users who ask for reduced motion get a single static frame.
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reducedMotion) {
      renderFrame();
      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }

    // Only animate while the hero is actually on screen and the tab is
    // visible — otherwise the loop keeps burning CPU behind other sections.
    let onScreen = true;
    let lastFrame = 0;

    const animate = (now: number) => {
      animationRef.current = requestAnimationFrame(animate);
      if (!onScreen || document.hidden) return;
      if (now - lastFrame < FRAME_MS) return;
      lastFrame = now;

      renderFrame();
      time += 2; // keep the drift rate identical at half the frame rate
    };

    animationRef.current = requestAnimationFrame(animate);

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
};
