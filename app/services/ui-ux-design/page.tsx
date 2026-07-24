import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { getServiceBySlug } from "@/data/services";

export const metadata: Metadata = {
  title: "UI/UX Design — Design That Works as Good as It Looks",
  description:
    "Responsive web design, UX research, landing pages, graphic design, and video production — design that converts, not just decorates.",
};

export default function UIUXDesignPage() {
  const service = getServiceBySlug("ui-ux-design")!;

  return (
    <ServiceDetail
      service={service}
      intro="Design is a business function, not a decoration. Every layout choice, every colour, every interaction either earns attention or loses it. We design user experiences that are intuitive, beautiful, and conversion-focused — backed by research, tested in the wild, and built to perform. From responsive websites to landing pages and brand visuals, our design work earns its place on the balance sheet."
      painPoints={[
        {
          title: "Pretty designs that don't convert",
          description:
            "Your site looks beautiful but visitors aren't taking action. Usually the problem is no research behind the design — pretty pixels without a strategy. We start with user journeys and conversion paths, then design the visuals.",
        },
        {
          title: "Inconsistent brand visuals",
          description:
            "Your website says one thing, your social says another, your pitch deck says a third. We build design systems and brand guidelines so every touchpoint — web, social, ads, print — looks like the same company.",
        },
        {
          title: "Mobile experience is an afterthought",
          description:
            "Most of your traffic is on mobile, but your design was built for desktop and 'scaled down'. We design mobile-first — the way people actually use your product — then enhance for larger screens.",
        },
        {
          title: "Landing pages that leak conversions",
          description:
            "Your ads get clicks but the landing page kills the sale. We design high-converting landing pages with clear message match, strong visual hierarchy, and frictionless flows — then A/B test to keep improving.",
        },
        {
          title: "No design system, every page is a one-off",
          description:
            "Your site has 47 different button styles and nobody knows which is right. We build design systems — tokens, components, patterns — so every page is consistent, every developer can ship faster, and every update doesn't break the brand.",
        },
        {
          title: "Video content that's expensive and forgettable",
          description:
            "You commissioned a ₹5L brand video and nobody watched it. We produce video content designed for the platforms where it lives — short-form for social, explainer for landing pages, testimonial for trust — not vanity reels for the boardroom.",
        },
      ]}
      subservices={[
        {
          title: "Responsive Web Design",
          description:
            "We design responsive websites that adapt seamlessly to all screen sizes, ensuring a smooth and consistent experience across desktops, tablets, and mobile devices.",
          deliverables: [
            "Mobile-first design approach",
            "Breakpoint-specific layouts",
            "Touch-friendly interaction patterns",
            "Cross-device testing & QA",
            "Performance-optimised assets",
            "Accessibility compliance (WCAG 2.1 AA)",
          ],
        },
        {
          title: "UX Design & Research",
          description:
            "Our UX design process focuses on creating intuitive user journeys, improving usability, and ensuring visitors can easily navigate your website and complete desired actions.",
          deliverables: [
            "User research & persona development",
            "Information architecture",
            "Wireframing & user flows",
            "Usability testing & iteration",
            "Journey mapping",
            "Conversion path optimisation",
          ],
        },
        {
          title: "Landing Page Design",
          description:
            "We design high-converting landing pages tailored for marketing campaigns, focusing on clear messaging, strong visuals, and user-focused layouts that drive leads and conversions.",
          deliverables: [
            "Campaign-specific landing pages",
            "A/B testing-ready variants",
            "Message-match design",
            "Frictionless form flows",
            "Social proof integration",
            "Mobile-first conversion design",
          ],
        },
        {
          title: "Graphic Design & Brand Assets",
          description:
            "Our creative team develops impactful visual designs including brand graphics, marketing materials, and digital assets that strengthen your brand identity.",
          deliverables: [
            "Brand identity & guidelines",
            "Social media graphics",
            "Marketing collateral",
            "Pitch decks & presentations",
            "Display & social ad creatives",
            "Illustration & iconography",
          ],
        },
        {
          title: "Video Production",
          description:
            "We create engaging video content that helps brands communicate their message effectively, boost engagement, and capture audience attention across digital platforms.",
          deliverables: [
            "Brand videos & explainers",
            "Short-form social content (Reels, TikTok)",
            "Product demos & walkthroughs",
            "Testimonial & case study videos",
            "Motion graphics & animation",
            "Video ad creative",
          ],
        },
      ]}
      process={[
        {
          step: "01",
          title: "Research & Discovery",
          description:
            "We learn your brand, your users, your competitors, your goals. Audit existing design assets, run stakeholder interviews, and map user journeys. Output: a creative brief that becomes our shared north star.",
        },
        {
          step: "02",
          title: "Concept & Wireframe",
          description:
            "We explore visual directions, test layouts in low-fidelity wireframes, and validate the user flow before any pixel is pushed. Design decisions backed by research, not opinions.",
        },
        {
          step: "03",
          title: "Design & Iterate",
          description:
            "High-fidelity mockups, design system tokens, component libraries. We ship in sprints with weekly reviews. Revisions are part of the process, not scope creep.",
        },
        {
          step: "04",
          title: "Handoff & Optimise",
          description:
            "Developer-ready assets, design tokens, and documentation. After launch, we track real-user metrics and iterate based on data — design is never 'done'.",
        },
      ]}
      caseStudy={{
        client: "Aarka Hospitality",
        metric: "+180% Booking Conversion",
        description:
          "Aarka Hospitality came to us with a 2% booking conversion rate on a beautiful but dysfunctional website. We ran user research, redesigned the booking flow mobile-first, built a new design system, and shipped 12 landing pages for individual properties. Result: 5.6% booking conversion, +180% revenue per visitor, and a 40% reduction in support tickets about the booking process.",
      }}
      tools={[
        { name: "Figma", category: "Design & Prototyping" },
        { name: "Adobe Creative Suite", category: "Visual Design" },
        { name: "After Effects", category: "Motion & Video" },
        { name: "Premiere Pro", category: "Video Editing" },
        { name: "Figma Make / ProtoPie", category: "Interactive Prototypes" },
        { name: "Webflow", category: "Design-to-Code (when needed)" },
        { name: "Hotjar", category: "Heatmaps & User Testing" },
        { name: "Maze", category: "Usability Research" },
      ]}
      faqs={[
        {
          q: "What's the difference between UI and UX design?",
          a: "UX (User Experience) is the strategy — how the product feels, flows, and solves problems. UI (User Interface) is the visual layer — colours, typography, spacing, components. Great design needs both: research and strategy first (UX), then beautiful execution (UI). We do both, in that order.",
        },
        {
          q: "How much does UI/UX design cost?",
          a: "Depends on scope. A landing page redesign: ₹50,000–₹1,50,000. A full website UX + UI: ₹3,00,000–₹10,00,000. A complete design system: ₹5,00,000+. We scope every project against your goals, not generic hourly rates. You get a detailed quote after discovery.",
        },
        {
          q: "How long does the design process take?",
          a: "A landing page: 2–3 weeks. A full website: 6–10 weeks. A design system: 8–16 weeks. Rush delivery is possible but adds cost and risks quality. We prioritise craft over speed — but we don't waste time either.",
        },
        {
          q: "Do you provide the design files, or do you also build the site?",
          a: "Both, depending on what you need. We can deliver Figma files for your in-house team, or we can build the site ourselves (we have engineers on staff). Most clients prefer the full package — design + build, single point of accountability.",
        },
        {
          q: "Will my design be unique, or use a template?",
          a: "Always custom. We never start from a template or theme. Every project begins with research and strategy, then we design from a blank canvas. You'll get something that looks like your brand, not like everyone else in your category.",
        },
        {
          q: "How do you make sure the design actually works?",
          a: "We test. Heatmaps, session recordings, A/B tests, usability sessions with real users. We design with intent, then validate with data. If something doesn't convert, we iterate until it does.",
        },
        {
          q: "Can you redesign just one page of my existing site?",
          a: "Yes. We do everything from single landing page redesigns to full site overhauls. Smaller scoped work typically starts at ₹50,000 and takes 2–3 weeks.",
        },
        {
          q: "Do you design for accessibility?",
          a: "Yes — it's non-negotiable. Every design we ship meets WCAG 2.1 AA standards: proper colour contrast, keyboard navigation, screen reader support, focus states, and alt text. Accessibility is a design constraint we design within, not an afterthought.",
        },
      ]}
    />
  );
}
