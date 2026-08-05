# Infinite Gallery Leadership Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 4-card team grid in the About page's `[06 / Leadership] The team.` section with a 3D infinite WebGL gallery.

**Architecture:** Drop in a `@react-three/fiber` + `@react-three/drei` infinite gallery, lazy-load it via `next/dynamic` so three.js doesn't enter the SSR or initial bundle, gate the wheel/keydown listeners behind an `IntersectionObserver` so the page's `lenis` smooth-scroll resumes everywhere except inside the gallery, and overlay the existing heading + description via `mix-blend-exclusion` matching the demo.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, `three`, `@react-three/fiber`, `@react-three/drei`, `lenis` (existing).

**Spec:** `docs/superpowers/specs/2026-08-05-infinite-gallery-leadership-design.md`

---

## File Structure

| File | Change | Responsibility |
| --- | --- | --- |
| `components/ui/3d-gallery-photography.tsx` | Create | R3F infinite gallery with shaders, image cycling, hover, scroll. Exposes `containerRef` and `labels` props. |
| `components/ui/3d-gallery-photography.client.tsx` | Create | `next/dynamic` wrapper that defers the gallery to the client. Default export consumed by the About page. |
| `app/about-us/page.tsx` | Modify | Expand `TEAM` array to 8 entries. Replace the leadership `<section>` markup with the gallery + overlay. |
| `package.json` | Modify | Add `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`. |
| `pnpm-lock.yaml` | Regenerate | From `pnpm install`. |

---

## Task 1: Add three.js dependencies

**Files:**
- Modify: `package.json` (add three entries under `dependencies`, one under `devDependencies`)
- Regenerate: `pnpm-lock.yaml`

- [ ] **Step 1: Add the three runtime deps to `package.json`**

Open `package.json` and add these three lines to the `dependencies` block (alphabetical position — between `tailwind-merge` and `tw-animate-css`):

```json
    "@react-three/drei": "^10.0.0",
    "@react-three/fiber": "^9.0.0",
    "three": "^0.171.0",
```

The exact `^X.Y.Z` versions will be what `pnpm view <pkg> version` returns at install time. Use those.

- [ ] **Step 2: Add `@types/three` to devDependencies**

Add to the `devDependencies` block (alphabetical position — between `@types/react-dom` and `autoprefixer`):

```json
    "@types/three": "^0.171.0",
```

- [ ] **Step 3: Install via pnpm**

Run from project root:

```bash
pnpm install
```

Expected: `pnpm-lock.yaml` updates, no errors. Confirm the new packages appear in `node_modules`:

```bash
ls node_modules/three node_modules/@react-three/fiber node_modules/@react-three/drei node_modules/@types/three
```

- [ ] **Step 4: Sanity check the imports resolve**

Run a one-off TS resolution check by running the typecheck target. Since there's no `typecheck` script, use:

```bash
pnpm exec tsc --noEmit
```

Expected: passes (no new type errors yet — we haven't added any code that imports them).

- [ ] **Step 5: Commit**

Per the user's saved memory ("No commits or pushes without permission"), **do not commit yet**. Wait for explicit user instruction before committing. After user approves, run:

```bash
git add package.json pnpm-lock.yaml
git commit -m "feat: add three.js + react-three-fiber deps for gallery"
```

---

## Task 2: Create the InfiniteGallery component file

**Files:**
- Create: `components/ui/3d-gallery-photography.tsx`

This is the bulk of the work. Write the full file in one shot — paste the user-supplied component verbatim, then apply three surgical edits (the fourth edit — labels — comes in Task 3 once the component file exists, since it imports from `@react-three/drei` which is now installed).

- [ ] **Step 1: Write the file with edits #1, #2, #3 applied**

Create `components/ui/3d-gallery-photography.tsx` with this exact content:

```tsx
'use client';

import type React from 'react';
import { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

type ImageItem = string | { src: string; alt?: string };

interface FadeSettings {
    /** Fade in range as percentage of depth range (0-1) */
    fadeIn: {
        start: number;
        end: number;
    };
    /** Fade out range as percentage of depth range (0-1) */
    fadeOut: {
        start: number;
        end: number;
    };
}

interface BlurSettings {
    /** Blur in range as percentage of depth range (0-1) */
    blurIn: {
        start: number;
        end: number;
    };
    /** Blur out range as percentage of depth range (0-1) */
    blurOut: {
        start: number;
        end: number;
    };
    /** Maximum blur amount (0-10, higher values = more blur) */
    maxBlur: number;
}

export interface PlaneLabel {
    name: string;
    role: string;
}

interface InfiniteGalleryProps {
    images: ImageItem[];
    /** Per-plane labels, parallel to `images`. */
    labels?: PlaneLabel[];
    /** Speed multiplier applied to scroll delta (default: 1) */
    speed?: number;
    /** Spacing between images along Z in world units (default: 2.5) */
    zSpacing?: number;
    /** Number of visible planes (default: clamp to images.length, min 8) */
    visibleCount?: number;
    /** Near/far distances for opacity/blur easing (default: { near: 0.5, far: 12 }) */
    falloff?: { near: number; far: number };
    /** Fade in/out settings with ranges based on depth range percentage (default: { fadeIn: { start: 0.05, end: 0.15 }, fadeOut: { start: 0.85, end: 0.95 } }) */
    fadeSettings?: FadeSettings;
    /** Blur in/out settings with ranges based on depth range percentage (default: { blurIn: { start: 0.0, end: 0.1 }, blurOut: { start: 0.9, end: 1.0 }, maxBlur: 3.0 }) */
    blurSettings?: BlurSettings;
    /** Optional className for outer container */
    className?: string;
    /** Optional style for outer container */
    style?: React.CSSProperties;
    /**
     * Optional ref to the outer wrapper element. When provided, the
     * wheel/keydown listeners only register while this element is
     * ≥ 50% intersecting the viewport — so the page's Lenis scroll
     * keeps working everywhere else.
     */
    containerRef?: React.RefObject<HTMLElement>;
}

interface PlaneData {
    index: number;
    z: number;
    imageIndex: number;
    x: number;
    y: number; // Added y property for vertical positioning
}

const DEFAULT_DEPTH_RANGE = 50;
const MAX_HORIZONTAL_OFFSET = 8;
const MAX_VERTICAL_OFFSET = 8;

// Custom shader material for blur, opacity, and cloth folding effects
const createClothMaterial = () => {
    return new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
            map: { value: null },
            opacity: { value: 1.0 },
            blurAmount: { value: 0.0 },
            scrollForce: { value: 0.0 },
            time: { value: 0.0 },
            isHovered: { value: 0.0 },
        },
        vertexShader: `
      uniform float scrollForce;
      uniform float time;
      uniform float isHovered;
      varying vec2 vUv;
      varying vec3 vNormal;

      void main() {
        vUv = uv;
        vNormal = normal;

        vec3 pos = position;

        // Create smooth curving based on scroll force
        float curveIntensity = scrollForce * 0.3;

        // Base curve across the plane based on distance from center
        float distanceFromCenter = length(pos.xy);
        float curve = distanceFromCenter * distanceFromCenter * curveIntensity;

        // Add gentle cloth-like ripples
        float ripple1 = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02;
        float ripple2 = sin(pos.y * 2.5 + scrollForce * 2.0) * 0.015;
        float clothEffect = (ripple1 + ripple2) * abs(curveIntensity) * 2.0;

        // Flag waving effect when hovered
        float flagWave = 0.0;
        if (isHovered > 0.5) {
          // Create flag-like wave from left to right
          float wavePhase = pos.x * 3.0 + time * 8.0;
          float waveAmplitude = sin(wavePhase) * 0.1;
          // Damping effect - stronger wave on the right side (free edge)
          float dampening = smoothstep(-0.5, 0.5, pos.x);
          flagWave = waveAmplitude * dampening;

          // Add secondary smaller waves for more realistic flag motion
          float secondaryWave = sin(pos.x * 5.0 + time * 12.0) * 0.03 * dampening;
          flagWave += secondaryWave;
        }

        // Apply Z displacement for curving effect (inverted) with cloth ripples and flag wave
        pos.z -= (curve + clothEffect + flagWave);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
        fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      varying vec2 vUv;
      varying vec3 vNormal;

      void main() {
        vec4 color = texture2D(map, vUv);

        // Simple blur approximation
        if (blurAmount > 0.0) {
          vec2 texelSize = 1.0 / vec2(textureSize(map, 0));
          vec4 blurred = vec4(0.0);
          float total = 0.0;

          for (float x = -2.0; x <= 2.0; x += 1.0) {
            for (float y = -2.0; y <= 2.0; y += 1.0) {
              vec2 offset = vec2(x, y) * texelSize * blurAmount;
              float weight = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + offset) * weight;
              total += weight;
            }
          }
          color = blurred / total;
        }

        // Add subtle lighting effect based on curving
        float curveHighlight = abs(scrollForce) * 0.05;
        color.rgb += vec3(curveHighlight * 0.1);

        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
    });
};

function ImagePlane({
    texture,
    position,
    scale,
    material,
    label,
}: {
    texture: THREE.Texture;
    position: [number, number, number];
    scale: [number, number, number];
    material: THREE.ShaderMaterial;
    label?: PlaneLabel;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (material && texture) {
            material.uniforms.map.value = texture;
        }
    }, [material, texture]);

    useEffect(() => {
        if (material && material.uniforms) {
            material.uniforms.isHovered.value = isHovered ? 1.0 : 0.0;
        }
    }, [material, isHovered]);

    return (
        <mesh
            ref={meshRef}
            position={position}
            scale={scale}
            material={material}
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={() => setIsHovered(false)}
        >
            <planeGeometry args={[1, 1, 32, 32]} />
        </mesh>
    );
}

function GalleryScene({
    images,
    labels,
    speed = 1,
    visibleCount = 8,
    containerRef,
    fadeSettings = {
        fadeIn: { start: 0.05, end: 0.15 },
        fadeOut: { start: 0.85, end: 0.95 },
    },
    blurSettings = {
        blurIn: { start: 0.0, end: 0.1 },
        blurOut: { start: 0.9, end: 1.0 },
        maxBlur: 3.0,
    },
}: Omit<InfiniteGalleryProps, 'className' | 'style'>) {
    const [scrollVelocity, setScrollVelocity] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
    const [isInView, setIsInView] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const lastInteraction = useRef(Date.now());

    // Normalize images to objects
    const normalizedImages = useMemo(
        () =>
            images.map((img) =>
                typeof img === 'string' ? { src: img, alt: '' } : img
            ),
        [images]
    );

    // Load textures
    const textures = useTexture(normalizedImages.map((img) => img.src));

    // Create materials pool
    const materials = useMemo(
        () => Array.from({ length: visibleCount }, () => createClothMaterial()),
        [visibleCount]
    );

    const spatialPositions = useMemo(() => {
        const positions: { x: number; y: number }[] = [];
        const maxHorizontalOffset = MAX_HORIZONTAL_OFFSET;
        const maxVerticalOffset = MAX_VERTICAL_OFFSET;

        for (let i = 0; i < visibleCount; i++) {
            // Create varied distribution patterns for both axes
            const horizontalAngle = (i * 2.618) % (Math.PI * 2); // Golden angle for natural distribution
            const verticalAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2); // Offset angle for vertical

            const horizontalRadius = (i % 3) * 1.2; // Vary the distance from center
            const verticalRadius = ((i + 1) % 4) * 0.8; // Different pattern for vertical

            const x =
                (Math.sin(horizontalAngle) * horizontalRadius * maxHorizontalOffset) /
                3;
            const y =
                (Math.cos(verticalAngle) * verticalRadius * maxVerticalOffset) / 4;

            positions.push({ x, y });
        }

        return positions;
    }, [visibleCount]);

    const totalImages = normalizedImages.length;
    const depthRange = DEFAULT_DEPTH_RANGE;

    // Initialize plane data
    const planesData = useRef<PlaneData[]>(
        Array.from({ length: visibleCount }, (_, i) => ({
            index: i,
            z: visibleCount > 0 ? ((depthRange / visibleCount) * i) % depthRange : 0,
            imageIndex: totalImages > 0 ? i % totalImages : 0,
            x: spatialPositions[i]?.x ?? 0, // Use spatial positions for x
            y: spatialPositions[i]?.y ?? 0, // Use spatial positions for y
        }))
    );

    useEffect(() => {
        planesData.current = Array.from({ length: visibleCount }, (_, i) => ({
            index: i,
            z:
                visibleCount > 0
                    ? ((depthRange / Math.max(visibleCount, 1)) * i) % depthRange
                    : 0,
            imageIndex: totalImages > 0 ? i % totalImages : 0,
            x: spatialPositions[i]?.x ?? 0,
            y: spatialPositions[i]?.y ?? 0,
        }));
    }, [depthRange, spatialPositions, totalImages, visibleCount]);

    // Detect reduced-motion preference
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mql.matches);
        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

    // IntersectionObserver: only "own" the page scroll while the gallery is visible.
    useEffect(() => {
        const el = containerRef?.current;
        if (!el || typeof IntersectionObserver === 'undefined') return;
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    setIsInView(entry.isIntersecting);
                }
            },
            { threshold: 0.5 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [containerRef]);

    // Handle scroll input
    const handleWheel = useCallback(
        (event: WheelEvent) => {
            event.preventDefault();
            setScrollVelocity((prev) => prev + event.deltaY * 0.01 * speed);
            setAutoPlay(false);
            lastInteraction.current = Date.now();
        },
        [speed]
    );

    // Handle keyboard input
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                setScrollVelocity((prev) => prev - 2 * speed);
                setAutoPlay(false);
                lastInteraction.current = Date.now();
            } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                setScrollVelocity((prev) => prev + 2 * speed);
                setAutoPlay(false);
                lastInteraction.current = Date.now();
            }
        },
        [speed]
    );

    useEffect(() => {
        if (!isInView) return;
        const canvas = document.querySelector('canvas');
        const wheelTarget: HTMLElement | Window = canvas ?? window;
        wheelTarget.addEventListener('wheel', handleWheel as EventListener, { passive: false });
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            wheelTarget.removeEventListener('wheel', handleWheel as EventListener);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleWheel, handleKeyDown, isInView]);

    // Auto-play logic — disabled when reduced-motion is on.
    useEffect(() => {
        const interval = setInterval(() => {
            if (reducedMotion) return;
            if (Date.now() - lastInteraction.current > 3000) {
                setAutoPlay(true);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [reducedMotion]);

    useFrame((state, delta) => {
        // Apply auto-play (skipped under reduced-motion)
        if (autoPlay && !reducedMotion) {
            setScrollVelocity((prev) => prev + 0.3 * delta);
        }

        // Damping
        setScrollVelocity((prev) => prev * 0.95);

        // Update time uniform for all materials (skip under reduced-motion)
        const time = reducedMotion ? 0 : state.clock.getElapsedTime();
        materials.forEach((material) => {
            if (material && material.uniforms) {
                material.uniforms.time.value = time;
                material.uniforms.scrollForce.value = scrollVelocity;
            }
        });

        // Update plane positions
        const imageAdvance =
            totalImages > 0 ? visibleCount % totalImages || totalImages : 0;
        const totalRange = depthRange;
        const halfRange = totalRange / 2;

        planesData.current.forEach((plane, i) => {
            let newZ = plane.z + scrollVelocity * delta * 10;
            let wrapsForward = 0;
            let wrapsBackward = 0;

            if (newZ >= totalRange) {
                wrapsForward = Math.floor(newZ / totalRange);
                newZ -= totalRange * wrapsForward;
            } else if (newZ < 0) {
                wrapsBackward = Math.ceil(-newZ / totalRange);
                newZ += totalRange * wrapsBackward;
            }

            if (wrapsForward > 0 && imageAdvance > 0 && totalImages > 0) {
                plane.imageIndex =
                    (plane.imageIndex + wrapsForward * imageAdvance) % totalImages;
            }

            if (wrapsBackward > 0 && imageAdvance > 0 && totalImages > 0) {
                const step = plane.imageIndex - wrapsBackward * imageAdvance;
                plane.imageIndex = ((step % totalImages) + totalImages) % totalImages;
            }

            plane.z = ((newZ % totalRange) + totalRange) % totalRange;
            plane.x = spatialPositions[i]?.x ?? 0;
            plane.y = spatialPositions[i]?.y ?? 0;

            const worldZ = plane.z - halfRange;

            // Calculate opacity based on fade settings
            const normalizedPosition = plane.z / totalRange; // 0 to 1
            let opacity = 1;

            if (
                normalizedPosition >= fadeSettings.fadeIn.start &&
                normalizedPosition <= fadeSettings.fadeIn.end
            ) {
                // Fade in: opacity goes from 0 to 1 within the fade in range
                const fadeInProgress =
                    (normalizedPosition - fadeSettings.fadeIn.start) /
                    (fadeSettings.fadeIn.end - fadeSettings.fadeIn.start);
                opacity = fadeInProgress;
            } else if (normalizedPosition < fadeSettings.fadeIn.start) {
                // Before fade in starts: fully transparent
                opacity = 0;
            } else if (
                normalizedPosition >= fadeSettings.fadeOut.start &&
                normalizedPosition <= fadeSettings.fadeOut.end
            ) {
                // Fade out: opacity goes from 1 to 0 within the fade out range
                const fadeOutProgress =
                    (normalizedPosition - fadeSettings.fadeOut.start) /
                    (fadeSettings.fadeOut.end - fadeSettings.fadeOut.start);
                opacity = 1 - fadeOutProgress;
            } else if (normalizedPosition > fadeSettings.fadeOut.end) {
                // After fade out ends: fully transparent
                opacity = 0;
            }

            // Clamp opacity between 0 and 1
            opacity = Math.max(0, Math.min(1, opacity));

            // Calculate blur based on blur settings
            let blur = 0;

            if (
                normalizedPosition >= blurSettings.blurIn.start &&
                normalizedPosition <= blurSettings.blurIn.end
            ) {
                // Blur in: blur goes from maxBlur to 0 within the blur in range
                const blurInProgress =
                    (normalizedPosition - blurSettings.blurIn.start) /
                    (blurSettings.blurIn.end - blurSettings.blurIn.start);
                blur = blurSettings.maxBlur * (1 - blurInProgress);
            } else if (normalizedPosition < blurSettings.blurIn.start) {
                // Before blur in starts: full blur
                blur = blurSettings.maxBlur;
            } else if (
                normalizedPosition >= blurSettings.blurOut.start &&
                normalizedPosition <= blurSettings.blurOut.end
            ) {
                // Blur out: blur goes from 0 to maxBlur within the blur out range
                const blurOutProgress =
                    (normalizedPosition - blurSettings.blurOut.start) /
                    (blurSettings.blurOut.end - blurSettings.blurOut.start);
                blur = blurSettings.maxBlur * blurOutProgress;
            } else if (normalizedPosition > blurSettings.blurOut.end) {
                // After blur out ends: full blur
                blur = blurSettings.maxBlur;
            }

            // Clamp blur to reasonable values
            blur = Math.max(0, Math.min(blurSettings.maxBlur, blur));

            // Update material uniforms
            const material = materials[i];
            if (material && material.uniforms) {
                material.uniforms.opacity.value = opacity;
                material.uniforms.blurAmount.value = blur;
            }
        });
    });

    if (normalizedImages.length === 0) return null;

    return (
        <>
            {planesData.current.map((plane, i) => {
                const texture = textures[plane.imageIndex];
                const material = materials[i];
                const label = labels?.[plane.imageIndex];

                if (!texture || !material) return null;

                const worldZ = plane.z - depthRange / 2;

                // Calculate scale to maintain aspect ratio
                const aspect = texture.image
                    ? texture.image.width / texture.image.height
                    : 1;
                const scale: [number, number, number] =
                    aspect > 1 ? [2 * aspect, 2, 1] : [2, 2 / aspect, 1];

                return (
                    <ImagePlane
                        key={plane.index}
                        texture={texture}
                        position={[plane.x, plane.y, worldZ]} // Position planes relative to camera center
                        scale={scale}
                        material={material}
                        label={label}
                    />
                );
            })}
        </>
    );
}

// Fallback component for when WebGL is not available
function FallbackGallery({ images }: { images: ImageItem[] }) {
    const normalizedImages = useMemo(
        () =>
            images.map((img) =>
                typeof img === 'string' ? { src: img, alt: '' } : img
            ),
        [images]
    );

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-4">
            <p className="text-gray-600 mb-4">
                WebGL not supported. Showing image list:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {normalizedImages.map((img, i) => (
                    <img
                        key={i}
                        src={img.src || '/placeholder.svg'}
                        alt={img.alt}
                        className="w-full h-32 object-cover rounded"
                    />
                ))}
            </div>
        </div>
    );
}

export default function InfiniteGallery({
    images,
    labels,
    className = 'h-96 w-full',
    style,
    containerRef,
    fadeSettings = {
        fadeIn: { start: 0.05, end: 0.25 },
        fadeOut: { start: 0.75, end: 0.95 },
    },
    blurSettings = {
        blurIn: { start: 0.0, end: 0.1 },
        blurOut: { start: 0.9, end: 1.0 },
        maxBlur: 4.0,
    },
}: InfiniteGalleryProps) {
    const [webglSupported, setWebglSupported] = useState(true);

    useEffect(() => {
        // Check WebGL support
        try {
            const canvas = document.createElement('canvas');
            const gl =
                canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!gl) {
                setWebglSupported(false);
            }
        } catch (e) {
            setWebglSupported(false);
        }
    }, []);

    if (!webglSupported) {
        return (
            <div className={className} style={style} ref={containerRef as React.RefObject<HTMLDivElement>}>
                <FallbackGallery images={images} />
            </div>
        );
    }

    return (
        <div className={className} style={style} ref={containerRef as React.RefObject<HTMLDivElement>}>
            <Canvas
                camera={{ position: [0, 0, 0], fov: 55 }}
                gl={{ antialias: true, alpha: true }}
            >
                <GalleryScene
                    images={images}
                    labels={labels}
                    fadeSettings={fadeSettings}
                    blurSettings={blurSettings}
                    containerRef={containerRef}
                />
            </Canvas>
        </div>
    );
}
```

The diffs vs the user-supplied component are:

- `InfiniteGalleryProps` gained two fields: `labels?: PlaneLabel[]` and `containerRef?: React.RefObject<HTMLElement>`.
- New `PlaneLabel` interface (exported).
- `ImagePlane` gained a `label?: PlaneLabel` prop (passed through, rendered in Task 3).
- `GalleryScene` gained `labels` and `containerRef` in its props destructure.
- New `isInView` and `reducedMotion` state + matching effects (IntersectionObserver + matchMedia).
- The wheel/keydown listener registration is gated by `isInView`.
- `useFrame` skips auto-play and time-advance under `reducedMotion`.
- The auto-play interval skips under `reducedMotion`.
- Default `fadeSettings` and `blurSettings` retuned for portrait photos.
- The outer `<div>` in the default export forwards `containerRef`.

- [ ] **Step 2: Confirm the file compiles in isolation**

```bash
pnpm exec tsc --noEmit
```

Expected: passes. (No `ImagePlane` yet uses the `label` prop in JSX, so unused-prop warnings should not appear — but the destructuring is in place.)

---

## Task 3: Render labels via drei `Html`

**Files:**
- Modify: `components/ui/3d-gallery-photography.tsx` (`ImagePlane` only)

- [ ] **Step 1: Import `Html` from drei**

Change the existing import line:

```tsx
import { useTexture } from '@react-three/drei';
```

to:

```tsx
import { useTexture, Html } from '@react-three/drei';
```

- [ ] **Step 2: Wrap the plane mesh in a group and add the label**

Replace the current `ImagePlane` body return statement (the `<mesh ...>` block) with:

```tsx
    const labelOpacity = material?.uniforms?.opacity?.value ?? 1;

    return (
        <group position={position}>
            <mesh
                ref={meshRef}
                scale={scale}
                material={material}
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
            >
                <planeGeometry args={[1, 1, 32, 32]} />
            </mesh>
            {label && (
                <Html
                    center
                    transform
                    distanceFactor={6}
                    occlude
                    style={{ pointerEvents: 'none' }}
                    position={[0, -0.7, 0.01]}
                >
                    <div
                        className="text-center whitespace-nowrap select-none"
                        style={{ opacity: labelOpacity }}
                    >
                        <p className="font-display text-base md:text-lg font-bold text-cream leading-tight">
                            {label.name}
                        </p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/70 mt-1">
                            {label.role}
                        </p>
                    </div>
                </Html>
            )}
        </group>
    );
```

The `labelOpacity` is read once at render time. Because R3F re-renders the scene on each frame anyway (via `useFrame` mutating material uniforms), the label fade will track the plane's opacity within a frame or two. If it looks laggy in testing, swap to a small `useFrame` inside `ImagePlane` that updates a local `opacity` state — but only do that if needed.

- [ ] **Step 3: Verify type-check still passes**

```bash
pnpm exec tsc --noEmit
```

Expected: passes.

---

## Task 4: Create the dynamic-import wrapper

**Files:**
- Create: `components/ui/3d-gallery-photography.client.tsx`

- [ ] **Step 1: Write the file**

```tsx
'use client';

import dynamic from 'next/dynamic';
import type { InfiniteGalleryProps } from './3d-gallery-photography';

const Gallery = dynamic(
    () => import('./3d-gallery-photography').then((m) => m.default),
    {
        ssr: false,
        loading: () => (
            <div className="absolute inset-0 bg-ink-900 animate-pulse" />
        ),
    }
);

export default function GalleryClient(props: InfiniteGalleryProps) {
    return <Gallery {...props} />;
}
```

Note: `next/dynamic` is the legacy dynamic import API but it's the supported way to do `ssr: false` in Next 15+. The newer `lazy()` from React doesn't expose the SSR opt-out.

- [ ] **Step 2: Confirm type-check passes**

```bash
pnpm exec tsc --noEmit
```

Expected: passes.

---

## Task 5: Expand the TEAM array in the About page

**Files:**
- Modify: `app/about-us/page.tsx` (the `TEAM` constant near line 107)

- [ ] **Step 1: Replace the 4-entry TEAM array with an 8-entry version**

Find the existing block starting at line 107:

```tsx
const TEAM = [
  {
    name: "Rachit Agarwal",
    role: "Founder & CEO",
    bio: "10+ years scaling D2C and B2B brands. Previously led growth at two funded startups.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
  },
  // ... 3 more entries
];
```

Replace the entire `const TEAM = [...]` block with this 8-entry version:

```tsx
const TEAM = [
  {
    name: "Rachit Agarwal",
    role: "Founder & CEO",
    bio: "10+ years scaling D2C and B2B brands. Previously led growth at two funded startups.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Megha Kapoor",
    role: "Head of SEO",
    bio: "Built SEO functions at 3 agencies from scratch. Specialist in technical SEO and content strategy.",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Vikram Singh",
    role: "Performance Lead",
    bio: "₹100Cr+ in ad spend managed. ROAS nerd. Sleeps in Looker Studio dashboards.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Ananya Joshi",
    role: "Creative Director",
    bio: "Ex-editorial designer. Believes good design is invisible — until it's not.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Kabir Mehta",
    role: "Head of Paid Media",
    bio: "Spent 6 years at Meta. Knows every audience-signal trick in the book.",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Priya Nair",
    role: "Head of Content",
    bio: "Ex-editor at a top business publication. Writes briefs editors actually want.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Arjun Bhatt",
    role: "Head of Design",
    bio: "Brand systems for D2C and SaaS. Believes a grid solves most problems.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Saanvi Rao",
    role: "Head of Web",
    bio: "Full-stack. Builds the dashboards the rest of us stare at.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
  },
];
```

The names + roles for entries 5–8 are placeholders. The user can edit them later.

- [ ] **Step 2: Add the dynamic-import near the top of the file**

Find the existing import block (lines 1–13) and add one new import. Insert this line:

```tsx
import GalleryClient from "@/components/ui/3d-gallery-photography.client";
```

alphabetically between the existing `from "@/components/motion/..."` imports. A reasonable position: right after `import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";`.

---

## Task 6: Replace the `[06 / Leadership]` section markup

**Files:**
- Modify: `app/about-us/page.tsx` (the section starting at line 389, ending at line 457)

- [ ] **Step 1: Find and replace the section**

Replace the entire block from `      {/* ────────────────────── TEAM ────────────────────── */}` (line 389) through the closing `      </section>` (line 457) with the new section below. The new section keeps the eyebrow, `TextReveal` heading, and right-side description; removes the 4-card grid; adds the gallery + overlay.

Add `useRef` to the existing `react` import line (the file currently imports nothing from React directly — so add a new line):

```tsx
import { useRef } from "react";
```

Then replace lines 389–457 with:

```tsx
      {/* ────────────────────── TEAM ────────────────────── */}
      <section
        ref={sectionRef}
        className="relative h-screen overflow-hidden border-b border-cream/10 bg-ink-900"
      >
        <GalleryClient
          images={TEAM.map((m) => ({ src: m.img, alt: m.name }))}
          labels={TEAM.map((m) => ({ name: m.name, role: m.role }))}
          speed={1.2}
          visibleCount={12}
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
```

- [ ] **Step 2: Add the `sectionRef` declaration**

Inside the `AboutPage` component function body, before the `return`, add:

```tsx
  const sectionRef = useRef<HTMLElement>(null);
```

A clean place is just above the `return (` statement.

- [ ] **Step 3: Verify type-check**

```bash
pnpm exec tsc --noEmit
```

Expected: passes.

---

## Task 7: Production build verification

**Files:** none (build-only)

- [ ] **Step 1: Run the production build**

```bash
pnpm build
```

Expected: completes with exit code 0. Look at the build output — the about-us page should not have grown significantly, and there should be a new dynamic chunk for the gallery (named something like `chunks/...3d-gallery-photography.js`).

- [ ] **Step 2: Confirm three.js is NOT in the main bundle**

```bash
pnpm build 2>&1 | grep -E "(three|fiber|drei)" | head -20
```

(Or, on Windows: `pnpm build 2>&1 | findstr /i "three fiber drei"`.)

Expected: the strings appear in dynamic-chunk filenames, not in the main page bundle.

- [ ] **Step 3: If the build fails on type errors, fix and re-run**

Common fixes:
- "Cannot find module '@react-three/drei'" → re-run `pnpm install`.
- "Property 'label' does not exist on type" → re-check Task 2's `ImagePlane` props.
- "Type 'RefObject<HTMLDivElement | null>' is not assignable to RefObject<HTMLElement>" → narrow with `as React.RefObject<HTMLDivElement>` in the cast site (already done in the wrapper component above).

---

## Task 8: Dev server smoke test

**Files:** none

- [ ] **Step 1: Start the dev server**

```bash
pnpm dev
```

Expected: starts on `http://localhost:3000`.

- [ ] **Step 2: Visit the about page**

Open `http://localhost:3000/about-us` in a browser. Scroll to the `[06 / Leadership]` section.

Expected:
- Full-viewport dark section with the 3D gallery filling it.
- `[06 / Leadership]` eyebrow + `The team.` heading + description overlay on top.
- 8+ portrait photos drifting through the depth field.
- Each plane shows a name + role label at its center.

- [ ] **Step 3: Verify scroll handoff with Lenis**

While at the section: scroll the mouse wheel — gallery advances. Scroll past the section so it's no longer in view — wheel events should now scroll the page normally (Lenis takes over). Scroll back — gallery resumes control.

- [ ] **Step 4: Verify reduced-motion**

DevTools → ⋮ → More tools → Rendering → "Emulate CSS media feature `prefers-reduced-motion: reduce`".

Expected: gallery no longer auto-plays; cloth ripples freeze. Wheel scroll still works.

- [ ] **Step 5: Verify WebGL fallback**

DevTools → ⋮ → More tools → Rendering → "Disable WebGL" (or block the canvas via an extension).

Expected: section shows the fallback image grid instead of the 3D gallery.

- [ ] **Step 6: Stop the dev server**

`Ctrl+C` in the terminal running `pnpm dev`.

---

## Task 9: Commit

**Files:** all the ones we created/modified.

- [ ] **Step 1: Stage and commit (only after the user has explicitly asked for it)**

Per the user's saved memory ("No commits or pushes without permission"), do **not** commit unless the user asks. Once they do:

```bash
git add components/ui/3d-gallery-photography.tsx \
        components/ui/3d-gallery-photography.client.tsx \
        app/about-us/page.tsx \
        package.json \
        pnpm-lock.yaml

git commit -m "feat: replace leadership team grid with 3D infinite gallery"
```

---

## Self-Review Notes (already applied)

- **Spec coverage:**
  - 8–12 team portraits → Task 5 (8 entries).
  - Full-screen canvas + overlay text → Task 6.
  - Heading + description stay → Task 6.
  - Name + role label per plane → Task 3.
  - Lenis coexistence via IntersectionObserver → Task 2 (`isInView` gate).
  - Reduced-motion disables auto-play and cloth ripples → Task 2 (`reducedMotion`).
  - WebGL fallback preserved → Task 2 (`FallbackGallery`).
  - Dynamic import → Task 4.
  - Dependencies added → Task 1.
  - Verification (dev smoke + build) → Tasks 7 + 8.

- **Placeholder scan:** none.

- **Type consistency:**
  - `PlaneLabel` defined in Task 2, used in Task 2 (`ImagePlane` prop), passed through `GalleryScene`, then read by `ImagePlane` JSX in Task 3.
  - `containerRef?: React.RefObject<HTMLElement>` declared in `InfiniteGalleryProps` (Task 2), read in `GalleryScene` (Task 2), forwarded to the outer `<div>` in default export (Task 2), passed by the consumer in Task 6.
  - `labels?: PlaneLabel[]` declared, threaded through `GalleryScene`, into `ImagePlane`.