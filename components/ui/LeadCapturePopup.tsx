"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  MessageSquareText,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SITE } from "@/data/site";

/**
 * LeadCapturePopup — homepage-only lead-capture modal with a floating
 * edge button so visitors can open it on demand.
 *
 * Behaviour:
 *   - Auto-opens 3.5s after homepage mount (client-only).
 *   - Floating pill button on the right edge opens the form manually.
 *   - Form fields use the shadcn Input/Textarea/Checkbox primitives, with
 *     the "I'm looking for..." project-type multi-select from the contact
 *     section template.
 *   - Sends a FormSubmit.co POST (form-encoded, not JSON — the service
 *     requires urlencoded/form-data for _subject / _honey to work).
 *   - Once submitted, hides forever (localStorage flag) and won't reopen
 *     on subsequent visits. Without submit, dismiss closes for this
 *     visit only and reappears next visit.
 */

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone"),
  brief: z.string().min(10, "Tell us a bit more about your project"),
});

type FormData = z.infer<typeof schema>;

const PROJECT_TYPES = [
  "Website",
  "SEO",
  "Social Media Marketing",
  "Performance Marketing (PPC)",
  "Mobile App",
  "Brand Identity",
  "Other",
];

const SUBMITTED_KEY = "stealth:leadPopupSubmitted";

export function LeadCapturePopup() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [projectTypes, setProjectTypes] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // Schedule the auto-open once on mount, after the page has settled.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(SUBMITTED_KEY) === "true") return;

    const t = setTimeout(() => setOpen(true), 3500);
    return () => clearTimeout(t);
  }, []);

  // Manual open via floating button — always allowed. The submitted flag
  // only suppresses the auto-open popup; an explicit click must always work.
  const manualOpen = () => {
    setOpen(true);
  };

  // Lock body scroll while the modal is open so the page behind
  // doesn't shift when the scrollbar disappears.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggleProjectType = (type: string, checked: boolean) => {
    setProjectTypes((prev) =>
      checked ? [...prev, type] : prev.filter((t) => t !== type),
    );
  };

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      // FormSubmit.co requires form-encoded data (not JSON) so that
      // _subject, _honey, and other special fields are recognised.
      const body = new URLSearchParams({
        name: data.name,
        email: data.email,
        phone: data.phone,
        brief: data.brief,
        projectType: projectTypes.join(", "),
        _subject: "New Lead — Homepage Popup",
        source: "homepage-popup",
      });

      const res = await fetch(SITE.formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: body.toString(),
      });
      const json = await res.json().catch(() => null);
      const sent =
        res.ok &&
        json != null &&
        (json.success === "true" || json.success === true);
      if (sent) {
        setStatus("success");
        reset();
        setProjectTypes([]);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(SUBMITTED_KEY, "true");
        }
        // Auto-close after a short success pause.
        setTimeout(() => setOpen(false), 1800);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* ── Floating edge button ──────────────────────────────────── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            onClick={manualOpen}
            initial={{ opacity: 0, x: 20, y: "-50%" }}
            animate={{ opacity: 1, x: 0, y: "-50%" }}
            exit={{ opacity: 0, x: 20, y: "-50%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="
							fixed right-0 top-1/2 z-[110]
							flex items-center gap-2.5
							pl-4 pr-5 py-3.5
							bg-accent text-ink-950
							rounded-l-full
							shadow-lg shadow-accent/25
							hover:pl-5 hover:pr-6 hover:shadow-accent/40
							transition-all duration-300
							group/corner
						"
            aria-label="Open enquiry form"
          >
            <MessageSquareText
              size={18}
              strokeWidth={2}
              className="shrink-0 transition-transform group-hover/corner:scale-110"
            />
            <span className="font-semibold text-sm whitespace-nowrap tracking-tight">
              Quick Enquiry
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Modal ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="lead-popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 sm:py-12"
            aria-modal="true"
            role="dialog"
          >
            {/* Backdrop */}
            <motion.button
              type="button"
              aria-label="Close popup"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-ink-950/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg rounded-sm border border-cream/15 bg-ink-900 shadow-2xl"
            >
              {/* Decorative top accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />

              <div className="relative max-h-[85vh] overflow-y-auto p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-cream leading-[1.05] tracking-tight">
                      Let&apos;s scope your project.
                    </h2>
                    <p className="mt-2 text-sm text-cream/60 leading-relaxed">
                      Share a few details — we&apos;ll send back a custom growth
                      plan within 48 hours.
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="Close"
                    onClick={() => setOpen(false)}
                    className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/60 hover:text-cream hover:border-cream/30 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                {status === "success" ? (
                  <div className="rounded-sm border border-accent/30 bg-accent/5 p-6 text-center">
                    <CheckCircle2 size={40} className="text-accent mx-auto mb-3" />
                    <h3 className="font-display text-xl font-bold text-cream mb-2">
                      Message received.
                    </h3>
                    <p className="text-sm text-cream/70">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Honeypot — invisible to humans, ignored by
                      legit autofill. Bots that fill it get caught
                      by FormSubmit's spam filter. */}
                    <input
                      type="text"
                      name="_honey"
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Name" error={errors.name?.message} htmlFor="name">
                        <Input
                          id="name"
                          {...register("name")}
                          placeholder="Your name"
                          autoComplete="name"
                        />
                      </Field>
                      <Field label="Email" error={errors.email?.message} htmlFor="email">
                        <Input
                          id="email"
                          {...register("email")}
                          type="email"
                          placeholder="Email"
                          autoComplete="email"
                        />
                      </Field>
                    </div>
                    <Field label="Phone / WhatsApp" error={errors.phone?.message} htmlFor="phone">
                      <Input
                        id="phone"
                        {...register("phone")}
                        type="tel"
                        placeholder="+91 8700781135"
                        autoComplete="tel"
                      />
                    </Field>
                    <Field label="Project Brief" error={errors.brief?.message} htmlFor="brief">
                      <Textarea
                        id="brief"
                        {...register("brief")}
                        rows={3}
                        placeholder="Tell us about your goals, timelines, and what you're trying to achieve..."
                      />
                    </Field>

                    {/* I'm looking for... */}
                    <div className="space-y-2">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-cream/60">
                        I&apos;m looking for...
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {PROJECT_TYPES.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={`proj-${option.replace(/\s/g, "-").toLowerCase()}`}
                              checked={projectTypes.includes(option)}
                              onCheckedChange={(checked) =>
                                toggleProjectType(option, checked as boolean)
                              }
                            />
                            <Label
                              htmlFor={`proj-${option.replace(/\s/g, "-").toLowerCase()}`}
                              className="text-xs font-normal text-cream/70"
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 pt-2">
                      <p className="text-[10px] text-cream/40 max-w-[55%]">
                        By submitting, you agree to our follow-up via email or
                        call. No spam.
                      </p>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group inline-flex h-11 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-ink-950 transition-all hover:bg-accent-400 disabled:opacity-60"
                      >
                        {status === "sending" ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            Send Enquiry
                            <ArrowUpRight
                              size={16}
                              strokeWidth={2.5}
                              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                          </>
                        )}
                      </button>
                    </div>

                    {status === "error" && (
                      <p className="text-xs text-red-400 pt-2">
                        Something went wrong. Please email us at{" "}
                        <a href={`mailto:${SITE.email}`} className="underline">
                          {SITE.email}
                        </a>
                        .
                      </p>
                    )}
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label
        htmlFor={htmlFor}
        className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/60"
      >
        {label}
      </Label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
