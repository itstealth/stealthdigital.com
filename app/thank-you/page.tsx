import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Thank You",
};

export default function ThankYouPage() {
  return (
    <section className="relative min-h-[80vh] flex items-center pt-32 pb-20">
      <div className="container-x text-center max-w-3xl">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full border border-accent/30 bg-accent/10 mb-8">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#EF4444"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="font-display text-[44px] md:text-[80px] font-bold leading-[0.95] tracking-[-0.04em] text-cream mb-6">
          Thank you.
        </h1>
        <p className="text-lg md:text-xl text-cream/70 leading-relaxed max-w-xl mx-auto mb-10">
          Your message is on its way to our team. Expect a reply within 24
          hours — usually faster.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href="/" variant="primary" size="lg" showArrow magnetic>
            Back to Home
          </Button>
          <Button href="/services" variant="ghost" size="lg" magnetic>
            Explore Services
          </Button>
        </div>
      </div>
    </section>
  );
}