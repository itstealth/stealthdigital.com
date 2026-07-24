"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic, type MagneticStrength } from "@/components/motion/Magnetic";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  showArrow?: boolean;
  magnetic?: boolean;
  magneticStrength?: MagneticStrength | number;
  onClick?: () => void;
  type?: "button" | "submit";
}

/**
 * Button — primary, secondary, ghost, and outline variants.
 * Supports magnetic hover and inline arrow. Wraps in <Link> when href provided.
 */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  showArrow = false,
  magnetic = false,
  magneticStrength = 30,
  onClick,
  type = "button",
}: ButtonProps) {
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3.5 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variants = {
    primary:
      "bg-accent text-ink-950 hover:bg-accent-400 rounded-full font-semibold tracking-tight",
    secondary:
      "bg-cream text-ink-950 hover:bg-cream/90 rounded-full font-semibold tracking-tight",
    ghost:
      "bg-transparent text-cream border border-cream/20 hover:border-accent hover:text-accent rounded-full font-medium",
    outline:
      "bg-transparent text-cream border border-cream/30 hover:border-accent hover:bg-accent/5 rounded-none font-medium uppercase tracking-[0.15em] text-xs",
  };

  const inner = (
    <span
      className={cn(
        "relative z-10 inline-flex items-center gap-2 transition-colors",
        className
      )}
    >
      {children}
      {showArrow && (
        <motion.span
          aria-hidden
          initial={{ x: 0, y: 0 }}
          whileHover={{ x: 3, y: -3 }}
          className="inline-flex"
        >
          <ArrowUpRight size={16} strokeWidth={2.5} />
        </motion.span>
      )}
    </span>
  );

  const wrapped = magnetic ? (
    <Magnetic strength={magneticStrength} as="span">
      {href ? (
        <Link
          href={href}
          className={cn(
            "group inline-flex items-center justify-center transition-all duration-300",
            sizes[size],
            variants[variant]
          )}
        >
          {inner}
        </Link>
      ) : (
        <button
          type={type}
          onClick={onClick}
          className={cn(
            "group inline-flex items-center justify-center transition-all duration-300",
            sizes[size],
            variants[variant]
          )}
        >
          {inner}
        </button>
      )}
    </Magnetic>
  ) : href ? (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center justify-center transition-all duration-300",
        sizes[size],
        variants[variant]
      )}
    >
      {inner}
    </Link>
  ) : (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "group inline-flex items-center justify-center transition-all duration-300",
        sizes[size],
        variants[variant]
      )}
    >
      {inner}
    </button>
  );

  return wrapped;
}