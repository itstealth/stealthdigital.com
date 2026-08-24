"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

/**
 * Sun/Moon pill switch that flips the whole site between the black and white
 * themes. The `dark` class on <html> is the source of truth — every ink/cream
 * color reads from CSS variables that flip with it. Choice is persisted in
 * localStorage; first-time visitors follow their OS prefers-color-scheme.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initial: Theme =
      stored === "dark" || stored === "light"
        ? stored
        : prefersDark
          ? "dark"
          : "light";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggle = () => {
    if (theme === null) return;
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem(STORAGE_KEY, next);
  };

  // Render nothing until mounted to avoid a hydration mismatch — the FOUC
  // guard script in layout.tsx has already applied the correct theme by now.
  if (theme === null) return null;

  const knobOffset = theme === "dark" ? 36 : 0;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === "dark"}
      aria-label="Toggle theme"
      onClick={toggle}
      className="relative flex h-9 w-[72px] shrink-0 items-center rounded-full border border-cream/10 bg-ink-900 transition-colors"
    >
      {/* Static track icons — dimmed until the knob slides over them */}
      <Sun
        size={14}
        strokeWidth={2}
        className="absolute left-2.5 z-10 text-cream/50"
      />
      <Moon
        size={14}
        strokeWidth={2}
        className="absolute right-2.5 z-10 text-cream/50"
      />

      {/* Sliding knob — carries the active icon; auto-colors via CSS vars */}
      <motion.span
        aria-hidden
        className="absolute left-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-cream text-ink-950 shadow-md"
        animate={{ x: knobOffset }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
      >
        {theme === "dark" ? <Moon size={13} /> : <Sun size={13} />}
      </motion.span>
    </button>
  );
}
