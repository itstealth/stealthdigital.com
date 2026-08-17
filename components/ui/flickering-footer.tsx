"use client";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import { ClassValue, clsx } from "clsx";
import * as Color from "color-bits";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getRGBA = (
    cssColor: React.CSSProperties["color"],
    fallback: string = "rgba(180, 180, 180)",
): string => {
    if (typeof window === "undefined") return fallback;
    if (!cssColor) return fallback;
    try {
        if (typeof cssColor === "string" && cssColor.startsWith("var(")) {
            const element = document.createElement("div");
            element.style.color = cssColor;
            document.body.appendChild(element);
            const computedColor = window.getComputedStyle(element).color;
            document.body.removeChild(element);
            return Color.formatRGBA(Color.parse(computedColor));
        }
        return Color.formatRGBA(Color.parse(cssColor));
    } catch (e) {
        return fallback;
    }
};

export const colorWithOpacity = (color: string, opacity: number): string => {
    if (!color.startsWith("rgb")) return color;
    return Color.formatRGBA(Color.alpha(Color.parse(color), opacity));
};

export const focusInput = [
    "focus:ring-2",
    "focus:ring-blue-200 focus:dark:ring-blue-700/30",
    "focus:border-blue-500 focus:dark:border-blue-700",
];

export const focusRing = [
    "outline outline-offset-2 outline-0 focus-visible:outline-2",
    "outline-blue-500 dark:outline-blue-500",
];

export const hasErrorInput = [
    "ring-2",
    "border-red-500 dark:border-red-700",
    "ring-red-200 dark:ring-red-700/30",
];

// Minimal icon placeholders. Replace these with the full SVGs from the
// original snippet when you have time — only the `logo`, `soc2`, and `gdpr`
// variants are referenced from the demo `Component` below.
export const Icons = {
    logo: ({ className }: { className?: string }) => (
        <svg width="42" height="24" viewBox="0 0 42 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("size-4 fill-[var(--secondary)]", className)}>
            <path d="M22.35.97C22.91.39 23.66.07 24.45.07h10.14C41.18.07 44.48 8.36 39.82 13.21L29.66 23.77c-.47.49-1.26.14-1.26-.83V13.92l1.17-1.22c.93-.97.27-2.63-1.05-2.63H13.6L22.35.97z" fill="current" />
            <path d="M19.65 23.03c-.56.58-1.31.9-2.1.9H7.41C.82 23.93-2.48 15.64 2.18 10.79L12.34.23c.47-.49 1.26-.09 1.26-.77v9.3l-1.17 1.22c-.93.97-.27 2.63 1.05 2.63h14.93L19.65 23.03z" fill="current" />
        </svg>
    ),
    soc2: ({ className }: { className?: string }) => (
        <svg width="46" height="45" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("size-4", className)}>
            <rect x="3" y="0.86" width="40" height="40" rx="20" fill="#E5E7EB" />
            <text x="23" y="26" textAnchor="middle" fontSize="12" fontWeight="700" fill="#101828">SOC2</text>
        </svg>
    ),
    soc2Dark: ({ className }: { className?: string }) => (
        <svg width="46" height="45" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("size-4", className)}>
            <rect x="3" y="0.86" width="40" height="40" rx="20" fill="#27272A" />
            <text x="23" y="26" textAnchor="middle" fontSize="12" fontWeight="700" fill="#F4F4F5">SOC2</text>
        </svg>
    ),
    hipaa: ({ className }: { className?: string }) => (
        <svg width="46" height="45" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <rect x="3" y="0.86" width="40" height="40" rx="20" fill="#E5E7EB" />
            <text x="23" y="26" textAnchor="middle" fontSize="11" fontWeight="700" fill="#101828">HIPAA</text>
        </svg>
    ),
    hipaaDark: ({ className }: { className?: string }) => (
        <svg width="46" height="45" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <rect x="3" y="0.86" width="40" height="40" rx="20" fill="#27272A" />
            <text x="23" y="26" textAnchor="middle" fontSize="11" fontWeight="700" fill="#E4E4E7">HIPAA</text>
        </svg>
    ),
    gdpr: ({ className }: { className?: string }) => (
        <svg width="46" height="45" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("size-4", className)}>
            <rect x="3" y="0.86" width="40" height="40" rx="20" fill="#E5E7EB" />
            <text x="23" y="26" textAnchor="middle" fontSize="12" fontWeight="700" fill="#101828">GDPR</text>
        </svg>
    ),
    gdprDark: ({ className }: { className?: string }) => (
        <svg width="46" height="45" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("size-4", className)}>
            <rect x="3" y="0.86" width="40" height="40" rx="20" fill="#27272A" />
            <text x="23" y="26" textAnchor="middle" fontSize="12" fontWeight="700" fill="#D4D4D8">GDPR</text>
        </svg>
    ),
};

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
    squareSize?: number;
    gridGap?: number;
    flickerChance?: number;
    color?: string;
    width?: number;
    height?: number;
    className?: string;
    maxOpacity?: number;
    text?: string;
    textColor?: string;
    fontSize?: number;
    fontWeight?: number | string;
}

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
    squareSize = 3, gridGap = 3, flickerChance = 0.2, color = "#B4B4B4",
    width, height, className, maxOpacity = 0.15, text = "",
    fontSize = 140, fontWeight = 600, ...props
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

    const memoizedColor = useMemo(() => getRGBA(color), [color]);

    const drawGrid = useCallback(
        (ctx: CanvasRenderingContext2D, width: number, height: number, cols: number, rows: number, squares: Float32Array, dpr: number) => {
            ctx.clearRect(0, 0, width, height);
            const maskCanvas = document.createElement("canvas");
            maskCanvas.width = width;
            maskCanvas.height = height;
            const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });
            if (!maskCtx) return;
            if (text) {
                maskCtx.save();
                maskCtx.scale(dpr, dpr);
                maskCtx.fillStyle = "white";
                maskCtx.font = `${fontWeight} ${fontSize}px "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
                maskCtx.textAlign = "center";
                maskCtx.textBaseline = "middle";
                maskCtx.fillText(text, width / (2 * dpr), height / (2 * dpr));
                maskCtx.restore();
            }
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * (squareSize + gridGap) * dpr;
                    const y = j * (squareSize + gridGap) * dpr;
                    const sw = squareSize * dpr;
                    const sh = squareSize * dpr;
                    const md = maskCtx.getImageData(x, y, sw, sh).data;
                    const hasText = md.some((v, i) => i % 4 === 0 && v > 0);
                    const op = squares[i * rows + j];
                    const finalOp = hasText ? Math.min(1, op * 3 + 0.4) : op;
                    ctx.fillStyle = colorWithOpacity(memoizedColor, finalOp);
                    ctx.fillRect(x, y, sw, sh);
                }
            }
        },
        [memoizedColor, squareSize, gridGap, text, fontSize, fontWeight],
    );

    const setupCanvas = useCallback(
        (canvas: HTMLCanvasElement, w: number, h: number) => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            const cols = Math.ceil(w / (squareSize + gridGap));
            const rows = Math.ceil(h / (squareSize + gridGap));
            const squares = new Float32Array(cols * rows);
            for (let i = 0; i < squares.length; i++) squares[i] = Math.random() * maxOpacity;
            return { cols, rows, squares, dpr };
        },
        [squareSize, gridGap, maxOpacity],
    );

    const updateSquares = useCallback(
        (squares: Float32Array, dt: number) => {
            for (let i = 0; i < squares.length; i++) {
                if (Math.random() < flickerChance * dt) squares[i] = Math.random() * maxOpacity;
            }
        },
        [flickerChance, maxOpacity],
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        let animationFrameId: number;
        let gridParams: ReturnType<typeof setupCanvas> | null = null;
        const updateCanvasSize = () => {
            const w = width || container.clientWidth;
            const h = height || container.clientHeight;
            setCanvasSize({ width: w, height: h });
            gridParams = setupCanvas(canvas, w, h);
        };
        updateCanvasSize();

        // Respect prefers-reduced-motion: render one frame and stop so the
        // canvas is still drawn (so the text mask + grid colour show) but
        // we don't run a continuous animation that the user opted out of.
        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const reducedMotion = motionQuery.matches;

        let lastTime = 0;
        const animate = (time: number) => {
            if (!isInView || !gridParams) return;
            if (reducedMotion) return;
            const dt = (time - lastTime) / 1000;
            lastTime = time;
            updateSquares(gridParams.squares, dt);
            drawGrid(ctx, canvas.width, canvas.height, gridParams.cols, gridParams.rows, gridParams.squares, gridParams.dpr);
            animationFrameId = requestAnimationFrame(animate);
        };
        const ro = new ResizeObserver(updateCanvasSize);
        ro.observe(container);
        const io = new IntersectionObserver(([e]) => setIsInView(e.isIntersecting), { threshold: 0 });
        io.observe(canvas);
        if (isInView) {
            // Force a sizing pass so gridParams is populated before drawing.
            updateCanvasSize();
            // gridParams is guaranteed non-null here because updateCanvasSize
            // assigns it; TS just can't follow the closure assignment.
            const gp = gridParams!;
            // Always draw one initial frame so the grid is visible.
            drawGrid(ctx, canvas.width, canvas.height, gp.cols, gp.rows, gp.squares, gp.dpr);
            // Then start the animation loop only if motion is allowed.
            if (!reducedMotion) {
                animationFrameId = requestAnimationFrame(animate);
            }
        }
        return () => {
            cancelAnimationFrame(animationFrameId);
            ro.disconnect();
            io.disconnect();
        };
    }, [setupCanvas, updateSquares, drawGrid, width, height, isInView]);

    return (
        <div ref={containerRef} className={cn(`h-full w-full ${className}`)} {...props}>
            <canvas ref={canvasRef} className="pointer-events-none" style={{ width: canvasSize.width, height: canvasSize.height }} />
        </div>
    );
};

export function useMediaQuery(query: string) {
    const [value, setValue] = useState(false);
    useEffect(() => {
        function check() {
            setValue(window.matchMedia(query).matches);
        }
        check();
        window.addEventListener("resize", check);
        const mq = window.matchMedia(query);
        mq.addEventListener("change", check);
        return () => {
            window.removeEventListener("resize", check);
            mq.removeEventListener("change", check);
        };
    }, [query]);
    return value;
}

export const Highlight = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span className={cn("p-1 py-0.5 font-medium dark:font-semibold text-secondary", className)}>
        {children}
    </span>
);

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
    hero: {
        badge: "Introducing custom automations",
        title: "Meet your AI Agent Streamline your workflow",
        description: "AI assistant designed to streamline your digital workflows and handle mundane tasks, so you can focus on what truly matters matters",
        cta: {
            primary: { text: "Try for Free", href: "#" },
            secondary: { text: "Log in", href: "#" },
        },
    },
    footerLinks: [
        { title: "Company", links: [
            { id: 1, title: "About", url: "#" },
            { id: 2, title: "Contact", url: "#" },
            { id: 3, title: "Blog", url: "#" },
            { id: 4, title: "Story", url: "#" },
        ]},
        { title: "Products", links: [
            { id: 5, title: "Company", url: "#" },
            { id: 6, title: "Product", url: "#" },
            { id: 7, title: "Press", url: "#" },
            { id: 8, title: "More", url: "#" },
        ]},
        { title: "Resources", links: [
            { id: 9, title: "Press", url: "#" },
            { id: 10, title: "Careers", url: "#" },
            { id: 11, title: "Newsletters", url: "#" },
            { id: 12, title: "More", url: "#" },
        ]},
    ],
};

export type SiteConfig = typeof siteConfig;

export const Component = () => {
    const tablet = useMediaQuery("(max-width: 1024px)");

    return (
        <footer id="footer" className="w-full pb-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between p-10">
                <div className="flex flex-col items-start justify-start gap-y-5 max-w-xs mx-0">
                    <Link href="/" className="flex items-center gap-2">
                        <Icons.logo className="size-8" />
                        <p className="text-xl font-semibold text-primary">Footer</p>
                    </Link>
                    <p className="tracking-tight text-muted-foreground font-medium">
                        {siteConfig.hero.description}
                    </p>
                    <div className="flex items-center gap-2 dark:hidden">
                        <Icons.soc2 className="size-12" />
                        <Icons.hipaa className="size-12" />
                        <Icons.gdpr className="size-12" />
                    </div>
                    <div className="dark:flex items-center gap-2 hidden">
                        <Icons.soc2Dark className="size-12" />
                        <Icons.hipaaDark className="size-12" />
                        <Icons.gdprDark className="size-12" />
                    </div>
                </div>
                <div className="pt-5 md:w-1/2">
                    <div className="flex flex-col items-start justify-start md:flex-row md:items-center md:justify-between gap-y-5 lg:pl-10">
                        {siteConfig.footerLinks.map((column, i) => (
                            <ul key={i} className="flex flex-col gap-y-2">
                                <li className="mb-2 text-sm font-semibold text-primary">{column.title}</li>
                                {column.links.map((link) => (
                                    <li
                                        key={link.id}
                                        className="group inline-flex cursor-pointer items-center justify-start gap-1 text-[15px]/snug text-muted-foreground"
                                    >
                                        <Link href={link.url}>{link.title}</Link>
                                        <div className="flex size-4 items-center justify-center border border-border rounded translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100">
                                            <ChevronRightIcon className="h-4 w-4" />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full h-48 md:h-64 relative mt-24 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-background z-10 from-40%" />
                <div className="absolute inset-0 mx-6">
                    <FlickeringGrid
                        text={tablet ? "Footer" : "Streamline your workflow"}
                        fontSize={tablet ? 70 : 90}
                        className="h-full w-full"
                        squareSize={2}
                        gridGap={tablet ? 2 : 3}
                        color="#6B7280"
                        maxOpacity={0.3}
                        flickerChance={0.1}
                    />
                </div>
            </div>
        </footer>
    );
};
