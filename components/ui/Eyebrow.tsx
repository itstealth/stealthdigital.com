import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

/**
 * SectionHeader — eyebrow label + large title + optional description.
 * Reused across all sections for visual rhythm.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 md:gap-6",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      {eyebrow && (
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-accent" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      )}
      <h2 className="font-display text-[44px] sm:text-[64px] md:text-[80px] lg:text-[100px] font-bold leading-[0.95] tracking-[-0.03em] text-balance text-cream">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-base md:text-lg text-cream/70 leading-relaxed",
            align === "center" && "text-center"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}