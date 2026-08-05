'use client';

import type React from 'react';
import { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Html } from '@react-three/drei';
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

export interface InfiniteGalleryProps {
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
    /** Fade in/out settings with ranges based on depth range percentage (default: { fadeIn: { start: 0.05, end: 0.25 }, fadeOut: { start: 0.75, end: 0.95 } }) */
    fadeSettings?: FadeSettings;
    /** Blur in/out settings with ranges based on depth range percentage (default: { blurIn: { start: 0.0, end: 0.1 }, blurOut: { start: 0.9, end: 1.0 }, maxBlur: 4.0 }) */
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
    containerRef?: React.RefObject<HTMLElement | null>;
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
/**
 * Number of consecutive same-direction wheel events the gallery keeps
 * ownership of before handing the page scroll back to Lenis, letting the
 * user scroll past the section. Resets whenever the section re-enters view.
 */
const WHEEL_RELEASE_THRESHOLD = 5;

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
    groupRef,
    labelRef,
}: {
    texture: THREE.Texture;
    position: [number, number, number];
    scale: [number, number, number];
    material: THREE.ShaderMaterial;
    label?: PlaneLabel;
    groupRef?: (el: THREE.Group | null) => void;
    labelRef?: (el: HTMLDivElement | null) => void;
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
        <group ref={groupRef} position={position}>
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
                        ref={labelRef}
                        className="text-center whitespace-nowrap select-none"
                        style={{ opacity: 1 }}
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
}

interface GallerySceneProps extends Omit<InfiniteGalleryProps, 'className' | 'style'> {
    /**
     * Called when the gallery gains (`true`) or gives up (`false`) ownership of
     * the wheel. The parent uses this to toggle `data-lenis-prevent-wheel`,
     * since Lenis ignores `event.preventDefault()` and only honours that
     * attribute when deciding whether to skip a wheel event.
     */
    onWheelOwnershipChange?: (owned: boolean) => void;
}

function GalleryScene({
    images,
    labels,
    speed = 1,
    visibleCount = 8,
    containerRef,
    onWheelOwnershipChange,
    fadeSettings = {
        fadeIn: { start: 0.05, end: 0.25 },
        fadeOut: { start: 0.75, end: 0.95 },
    },
    blurSettings = {
        blurIn: { start: 0.0, end: 0.1 },
        blurOut: { start: 0.9, end: 1.0 },
        maxBlur: 4.0,
    },
}: GallerySceneProps) {
    const [isInView, setIsInView] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    // Refs (mutated in useFrame / handlers without triggering re-renders).
    const scrollVelocityRef = useRef(0);
    const autoPlayRef = useRef(true);
    const lastInteraction = useRef(Date.now());
    /** Consecutive same-direction wheel events consumed in this in-view session. */
    const wheelEventCount = useRef(0);
    /** Direction of the last wheel event: 0 = none yet, 1 = down, -1 = up. */
    const wheelDirection = useRef(0);
    /** True once ownership has been handed back to Lenis for this session. */
    const wheelReleased = useRef(false);
    /** Per-plane imperative refs: parent writes position/opacity; children forward via callback refs. */
    const groupRefs = useRef<(THREE.Group | null)[]>([]);
    const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    // Dispose materials on unmount / when the pool is recreated.
    useEffect(() => () => {
        materials.forEach((m) => m.dispose());
    }, [materials]);

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
                    if (entry.isIntersecting) {
                        // Re-entering the section: reclaim scroll ownership and
                        // reset the release counter for this in-view session.
                        wheelEventCount.current = 0;
                        wheelDirection.current = 0;
                        wheelReleased.current = false;
                        onWheelOwnershipChange?.(true);
                    }
                }
            },
            { threshold: 0.5 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [containerRef, onWheelOwnershipChange]);

    // Handle scroll input
    const handleWheel = useCallback(
        (event: WheelEvent) => {
            if (wheelReleased.current) {
                // Lenis already owns the page scroll — don't preventDefault so the
                // browser/Lenis can process the event normally.
                return;
            }
            event.preventDefault();
            scrollVelocityRef.current += event.deltaY * 0.01 * speed;
            autoPlayRef.current = false;
            lastInteraction.current = Date.now();

            // Track consecutive same-direction wheel events. A direction change
            // resets the counter — the user's intent here is "scroll past the
            // section", which only manifests as sustained motion in one way.
            const direction = event.deltaY > 0 ? 1 : event.deltaY < 0 ? -1 : 0;
            if (direction !== 0) {
                if (direction !== wheelDirection.current) {
                    wheelDirection.current = direction;
                    wheelEventCount.current = 1;
                } else {
                    wheelEventCount.current += 1;
                }
                if (wheelEventCount.current >= WHEEL_RELEASE_THRESHOLD) {
                    wheelReleased.current = true;
                    onWheelOwnershipChange?.(false);
                }
            }
        },
        [speed, onWheelOwnershipChange]
    );

    // Handle keyboard input
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                scrollVelocityRef.current -= 2 * speed;
                autoPlayRef.current = false;
                lastInteraction.current = Date.now();
            } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                scrollVelocityRef.current += 2 * speed;
                autoPlayRef.current = false;
                lastInteraction.current = Date.now();
            }
        },
        [speed]
    );

    useEffect(() => {
        if (!isInView) return;
        const el = containerRef?.current;
        if (!el) return;
        const wheelTarget: HTMLElement = el;
        wheelTarget.addEventListener('wheel', handleWheel as EventListener, { passive: false });
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            wheelTarget.removeEventListener('wheel', handleWheel as EventListener);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleWheel, handleKeyDown, isInView, containerRef]);

    // Auto-play logic — disabled when reduced-motion is on.
    useEffect(() => {
        const interval = setInterval(() => {
            if (reducedMotion) return;
            if (!isInView) return;
            if (Date.now() - lastInteraction.current > 3000) {
                autoPlayRef.current = true;
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [reducedMotion, isInView]);

    useFrame((state, delta) => {
        // Apply auto-play (skipped under reduced-motion)
        if (autoPlayRef.current && !reducedMotion) {
            scrollVelocityRef.current += 0.3 * delta;
        }

        // Damping
        scrollVelocityRef.current *= 0.95;

        const scrollVelocity = scrollVelocityRef.current;

        // Update time uniform for all materials (skip under reduced-motion)
        const time = reducedMotion ? 0 : state.clock.getElapsedTime();
        materials.forEach((material) => {
            if (material && material.uniforms) {
                material.uniforms.time.value = time;
                material.uniforms.scrollForce.value = scrollVelocity;
            }
        });

        // Update plane positions AND label opacity imperatively (no React state).
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

            // Imperative writes: group position, shader uniforms, label opacity.
            const group = groupRefs.current[i];
            if (group) group.position.set(plane.x, plane.y, worldZ);

            const material = materials[i];
            if (material && material.uniforms) {
                material.uniforms.opacity.value = opacity;
                material.uniforms.blurAmount.value = blur;
            }

            const label = labelRefs.current[i];
            if (label) label.style.opacity = String(opacity);
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
                const img = texture.image as
                    | { width: number; height: number }
                    | undefined;
                const aspect = img ? img.width / img.height : 1;
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
                        groupRef={(el) => {
                            groupRefs.current[i] = el;
                        }}
                        labelRef={(el) => {
                            labelRefs.current[i] = el;
                        }}
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
    speed,
    visibleCount,
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
    /**
     * When true, the wrapper carries `data-lenis-prevent-wheel` so Lenis
     * skips wheel events while the gallery consumes them. Flipped to false
     * by `GalleryScene` after `WHEEL_RELEASE_THRESHOLD` consecutive
     * same-direction wheel events, handing the page scroll back to Lenis.
     */
    const [ownsWheel, setOwnsWheel] = useState(true);

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
            <div
                className={className}
                style={style}
                ref={containerRef as React.RefObject<HTMLDivElement>}
                {...(ownsWheel ? { 'data-lenis-prevent-wheel': '' } : {})}
            >
                <FallbackGallery images={images} />
            </div>
        );
    }

    return (
        <div
            className={className}
            style={style}
            ref={containerRef as React.RefObject<HTMLDivElement>}
            {...(ownsWheel ? { 'data-lenis-prevent-wheel': '' } : {})}
        >
            <Canvas
                camera={{ position: [0, 0, 0], fov: 55 }}
                gl={{ antialias: true, alpha: true }}
            >
                <GalleryScene
                    images={images}
                    labels={labels}
                    speed={speed}
                    visibleCount={visibleCount}
                    fadeSettings={fadeSettings}
                    blurSettings={blurSettings}
                    containerRef={containerRef}
                    onWheelOwnershipChange={setOwnsWheel}
                />
            </Canvas>
        </div>
    );
}
