"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";
import { SITE } from "@/data/site";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().min(1, "Please enter your company"),
  phone: z.string().min(7, "Please enter a valid phone"),
  service: z.string().min(1, "Please choose a service"),
  budget: z.string().optional(),
  message: z.string().min(10, "Tell us a bit more about your project"),
});

type FormData = z.infer<typeof schema>;

const SERVICES = [
  "Search Engine Optimization",
  "Search Engine Marketing (PPC)",
  "Social Media Marketing",
  "Website Design & Development",
  "Full-Funnel Growth",
  "Other",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      // FormSubmit.co requires form-encoded data (not JSON) so that
      // _subject, _honey, and other special fields are recognised.
      const body = new URLSearchParams({
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        service: data.service,
        budget: data.budget ?? "",
        message: data.message,
        _subject: "New Lead — /contact-us page",
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
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-sm border border-accent/30 bg-accent/5 p-10 text-center"
      >
        <CheckCircle2 size={48} className="text-accent mx-auto mb-4" />
        <h3 className="font-display text-3xl font-bold text-cream mb-3">
          Message received.
        </h3>
        <p className="text-cream/70 max-w-md mx-auto">
          We'll get back to you within 24 hours. In the meantime, follow us on
          LinkedIn for the latest growth ideas.
        </p>
        <a
          href={SITE.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-accent link-underline"
        >
          Follow on LinkedIn <ArrowUpRight size={14} />
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* FormSubmit subject tag + honeypot spam trap. */}
      <input type="hidden" name="_subject" value="New Lead — /contact-us page" />
      <input
        type="text"
        name="_honey"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input
            {...register("name")}
            placeholder="Priya Sharma"
            className="form-input"
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            placeholder="[email protected]"
            className="form-input"
          />
        </Field>
        <Field label="Company" error={errors.company?.message}>
          <input
            {...register("company")}
            placeholder="Acme Pvt Ltd"
            className="form-input"
          />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input
            {...register("phone")}
            type="tel"
            placeholder="+91 8700781135"
            className="form-input"
          />
        </Field>
        <Field label="Service of Interest" error={errors.service?.message}>
          <select {...register("service")} className="form-input">
            <option value="">Choose a service</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Monthly Budget">
          <select {...register("budget")} className="form-input">
            <option value="">Select budget (optional)</option>
            <option>Under ₹50,000</option>
            <option>₹50,000 – ₹2,00,000</option>
            <option>₹2,00,000 – ₹5,00,000</option>
            <option>₹5,00,000 – ₹15,00,000</option>
            <option>₹15,00,000+</option>
          </select>
        </Field>
      </div>

      <Field label="Project Brief" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={6}
          placeholder="Tell us about your business, goals, and what you're trying to achieve..."
          className="form-input resize-none"
        />
      </Field>

      <Magnetic strength={20} as="span">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex h-14 items-center gap-3 rounded-full bg-accent px-8 text-base font-semibold text-ink-950 transition-all hover:bg-accent-400 disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send Enquiry
              <ArrowUpRight
                size={18}
                strokeWidth={2.5}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </>
          )}
        </button>
      </Magnetic>

      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong. Please email us at{" "}
          <a href={`mailto:${SITE.email}`} className="underline">
            {SITE.email}
          </a>
          .
        </p>
      )}

      <style jsx>{`
        :global(.form-input) {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(245, 241, 234, 0.12);
          padding: 14px 16px;
          font-size: 14px;
          color: #f5f1ea;
          border-radius: 4px;
          transition: border-color 0.3s ease;
          font-family: var(--font-sans), system-ui, sans-serif;
        }
        :global(.form-input::placeholder) {
          color: rgba(245, 241, 234, 0.35);
        }
        :global(.form-input:focus) {
          outline: none;
          border-color: #fc6d3a;
        }
        :global(select.form-input) {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23EF4444' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          padding-right: 40px;
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/60 block mb-2">
        {label}
      </span>
      {children}
      {error && (
        <span className="text-xs text-red-400 mt-2 block">{error}</span>
      )}
    </label>
  );
}