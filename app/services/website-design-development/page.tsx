import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { getServiceBySlug } from "@/data/services";

export const metadata: Metadata = {
  title: "Website Design & Development — Sites That Convert",
  description:
    "Websites and web apps built for speed, conversion, and scale. Next.js, React, Shopify, WordPress — pixel-perfect design, rock-solid engineering.",
};

export default function WebDesignPage() {
  const service = getServiceBySlug("website-design-development")!;

  return (
    <ServiceDetail
      service={service}
      intro="Your website is your hardest-working salesperson. It works 24/7, doesn't take lunch breaks, and either builds trust or loses it in 3 seconds. We've designed and built 300+ websites — from ₹50L marketing sites to complex e-commerce platforms handling ₹50Cr+ in annual GMV — and we know what separates a website that converts from one that just exists. It's not the design (though that matters). It's the combination of strategy, UX, performance, and engineering that makes every visitor count."
      painPoints={[
        {
          title: "Slow load times killing conversions",
          description:
            "Every 100ms of latency costs you 7% of conversions. We rebuild sites that hit Core Web Vitals green: 90+ Lighthouse scores, sub-2-second load times, optimised images and assets. The technical foundation that makes everything else work.",
        },
        {
          title: "Not mobile-friendly",
          description:
            "60%+ of your traffic is mobile. If your site isn't built mobile-first, you're losing half your audience before they even see your content. We design and engineer for mobile from day one — not as an afterthought.",
        },
        {
          title: "Poor user experience",
          description:
            "Confusing navigation, dead-end pages, friction in the conversion path. We run UX audits, map user journeys, and rebuild the experience around how people actually use your site — not how you wish they would.",
        },
        {
          title: "Generic template look",
          description:
            "Your site looks like every other template in your industry. We design bespoke — research, strategy, and custom visual identity that makes you look like the obvious choice, not the cheapest option.",
        },
        {
          title: "Hard to update content",
          description:
            "Every text change requires a developer. We build with headless CMS (Sanity, Contentful, Strapi) or modern WordPress so your team can ship updates without touching code. Faster for you, fewer billable hours for us.",
        },
        {
          title: "Not SEO-friendly",
          description:
            "Your site looks great but doesn't rank. We bake SEO into every build: semantic HTML, schema markup, clean URL structure, sitemap, Core Web Vitals, on-page optimisation. SEO isn't a plugin — it's an architecture decision.",
        },
      ]}
      subservices={[
        {
          title: "UX/UI Design",
          description:
            "User research, journey mapping, wireframing, and high-fidelity design. Every decision backed by data and best-practice UX patterns — not just what looks good in a Figma file.",
          deliverables: [
            "User research & persona development",
            "Information architecture",
            "Wireframing & prototyping",
            "High-fidelity visual design",
            "Design system & component library",
            "Usability testing & iteration",
          ],
        },
        {
          title: "Next.js / React Development",
          description:
            "Blazing-fast, SEO-friendly, infinitely scalable. We build on the modern stack — Next.js, React, TypeScript, Tailwind — engineered for performance and developer experience.",
          deliverables: [
            "Next.js / React development",
            "TypeScript & modern tooling",
            "Headless CMS integration",
            "API design & integration",
            "Authentication & user accounts",
            "Performance optimisation",
          ],
        },
        {
          title: "Shopify & E-commerce",
          description:
            "D2C brands, B2B portals, custom Shopify themes, headless commerce — we build stores that convert browsers into buyers and survive traffic spikes on launch day.",
          deliverables: [
            "Shopify theme development",
            "Shopify Plus & headless",
            "WooCommerce development",
            "Custom checkout & flows",
            "Payment gateway integration",
            "Subscription & membership sites",
          ],
        },
        {
          title: "WordPress Development",
          description:
            "Custom themes, Gutenberg blocks, WooCommerce, and ACF-powered sites. For when WordPress is the right tool for the job — we build fast, secure, easy-to-edit sites.",
          deliverables: [
            "Custom theme development",
            "Gutenberg block development",
            "WooCommerce stores",
            "Advanced Custom Fields (ACF)",
            "Multilingual & multi-site",
            "Maintenance & security",
          ],
        },
        {
          title: "Performance & Core Web Vitals",
          description:
            "Every site we ship hits 90+ on Lighthouse. Core Web Vitals green. Schema markup done right. Image optimisation, lazy loading, CDN, caching — all tuned to make your site the fastest in your category.",
          deliverables: [
            "Core Web Vitals optimisation",
            "On-page SEO foundations",
            "Schema markup & structured data",
            "Image optimisation & lazy loading",
            "CDN & caching setup",
            "Lighthouse 90+ guarantee",
          ],
        },
        {
          title: "Maintenance & Support",
          description:
            "Once your site is live, we keep it fast, secure, and updated. SLA-backed support with monthly reports, security monitoring, and feature enhancements as you grow.",
          deliverables: [
            "Monthly performance reports",
            "Security monitoring & updates",
            "Content updates & edits",
            "Feature enhancements",
            "Uptime monitoring",
            "Quarterly strategy reviews",
          ],
        },
      ]}
      process={[
        {
          step: "01",
          title: "Discovery & Strategy",
          description:
            "We learn your business, your users, your competitors, your goals. Audit your current site (if any). Map user journeys. Output: a clear brief and sitemap that becomes our shared north star.",
        },
        {
          step: "02",
          title: "Design & Prototype",
          description:
            "Wireframes → design system → high-fidelity mockups. We prototype key flows so you can click through before we write code. Revisions are part of the process, not scope creep.",
        },
        {
          step: "03",
          title: "Develop & Test",
          description:
            "Sprint-based development with weekly demos. We test across devices, browsers, and edge cases. Code reviews, accessibility checks, performance audits — all before launch.",
        },
        {
          step: "04",
          title: "Launch & Optimise",
          description:
            "Deployment, monitoring, post-launch optimisation. We track real-user metrics, run A/B tests, and iterate based on data — not opinions.",
        },
      ]}
      caseStudy={{
        client: "Indo Global Group",
        metric: "6 Verticals. 1 Brand System.",
        description:
          "We designed and built the digital home for Indo Global Group's six verticals — from real estate to education. Unified brand system, six bespoke websites, and a paid acquisition engine. Result: +260% branded search and +95% lead volume in 9 months.",
      }}
      tools={[
        { name: "Next.js", category: "Frontend Framework" },
        { name: "React / TypeScript", category: "Core Stack" },
        { name: "Tailwind CSS", category: "Styling" },
        { name: "Figma", category: "Design" },
        { name: "Sanity / Contentful", category: "Headless CMS" },
        { name: "Shopify / Shopify Plus", category: "E-commerce" },
        { name: "Vercel / AWS", category: "Hosting & Infrastructure" },
        { name: "Lighthouse / WebPageTest", category: "Performance Testing" },
      ]}
      faqs={[
        {
          q: "How much does a website cost?",
          a: "Marketing sites typically start at ₹2,50,000. E-commerce stores: ₹5,00,000 - ₹25,00,000. Custom web apps: scope-dependent. We provide detailed quotes after discovery — no surprise invoices. You know what you're paying and what you're getting.",
        },
        {
          q: "How long does it take to build a website?",
          a: "Marketing sites: 6–10 weeks. E-commerce: 10–16 weeks. Custom platforms: 4–9 months. Rush delivery is possible but adds cost. We prioritise quality over speed — but we don't waste time either. You get a clear timeline upfront and weekly demos so you always know where we are.",
        },
        {
          q: "Will my site be SEO-friendly?",
          a: "Yes — it's non-negotiable for us. Every site ships with technical SEO foundations: schema markup, semantic HTML, fast Core Web Vitals, clean URL structure, sitemap, and on-page optimisation. We don't 'add SEO later' — it's built into the architecture from day one.",
        },
        {
          q: "Do you use templates or build from scratch?",
          a: "Both, depending on the project. For most clients, we build custom designs tailored to their brand. For smaller budgets, we use premium templates (like Tailwind UI or Untitled UI) and customise heavily. We never use off-the-shelf stock designs that look like everyone else.",
        },
        {
          q: "What if I need to update content after launch?",
          a: "We build with headless CMS (Sanity, Contentful, Strapi) or WordPress so non-technical team members can update content easily. We also offer ongoing maintenance retainers if you'd rather we handle it. Either way, you're never locked out of your own site.",
        },
        {
          q: "Do you provide hosting?",
          a: "We don't host directly, but we set up and manage hosting on Vercel, AWS, or your preferred provider. Most clients prefer us to handle infrastructure as part of ongoing support. We optimise for the platform that fits your stack and budget.",
        },
        {
          q: "What platforms do you build on?",
          a: "Next.js / React for custom sites and web apps. Shopify / Shopify Plus for e-commerce. WordPress when it's the right tool. We don't force a stack — we recommend the one that fits your business, content team, and growth plans. If you have an existing platform you love, we'll build on that.",
        },
        {
          q: "Do you work with existing brands or only new ones?",
          a: "Both. About 60% of our work is redesigning or rebuilding existing sites that aren't performing. We treat every project as a chance to improve the business outcome — whether that means a complete rebuild or surgical optimisation of what's already there.",
        },
        {
          q: "How can you help my business get more customers online?",
          a: "We create tailored digital strategies that combine SEO, paid advertising, social media, and content marketing. By targeting the right audience and optimizing every channel, we attract qualified leads and convert them into loyal customers.",
        },
      ]}
    />
  );
}
