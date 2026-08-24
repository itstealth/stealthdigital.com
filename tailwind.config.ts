import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  // `animate-marquee-vertical` is referenced via inline `style={{ animation: ... }}`
  // in the Marquee component, which Tailwind's JIT can't see. Safelist it so
  // the keyframe + utility class make it into the bundle.
  safelist: ["animate-marquee-vertical", "animate-marquee-vertical-slow"],
  theme: {
    extend: {
      colors: {
        // shadcn-style theme aliases — read from CSS variables defined in
        // app/globals.css. Used by the body's `bg-background text-foreground`.
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        ring: "var(--ring)",
        input: "var(--input)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
        },
        // ink/cream read from CSS variables (app/globals.css) so the whole
        // site flips between the black and white themes via the `dark` class.
        // Stored as RGB triplets + <alpha-value> so opacity modifiers
        // (bg-ink-950/85, text-cream/50) keep working in both themes.
        ink: {
          950: "rgb(var(--ink-950) / <alpha-value>)",
          900: "rgb(var(--ink-900) / <alpha-value>)",
          800: "rgb(var(--ink-800) / <alpha-value>)",
          700: "rgb(var(--ink-700) / <alpha-value>)",
          600: "rgb(var(--ink-600) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "#FFD60A", // Hi-vis Stealth Yellow
          50: "#FFFAE0",
          100: "#FFF4B8",
          400: "#FFE34D",
          500: "#FFD60A",
          600: "#D9A300",
          700: "#997700",
        },
        cream: {
          DEFAULT: "rgb(var(--cream) / <alpha-value>)",
          dim: "rgb(var(--cream-dim) / <alpha-value>)",
          mute: "rgb(var(--cream-mute) / <alpha-value>)",
        },
      },
      borderRadius: {
        sm: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        baskerville: ["var(--font-baskerville)", "Georgia", "serif"],
      },
      fontSize: {
        "10xl": ["10rem", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "11xl": ["12rem", { lineHeight: "0.9", letterSpacing: "-0.045em" }],
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        "marquee-vertical": "marquee-vertical 40s linear infinite",
        "marquee-vertical-slow": "marquee-vertical 60s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-vertical": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "grain": "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"2\" stitchTiles=\"stitch\"/><feColorMatrix values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0\"/></filter><rect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/></svg>')",
        "radial-glow":
          "radial-gradient(ellipse at center, rgba(255,214,10,0.18) 0%, transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;