import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { getServiceBySlug } from "@/data/services";

export const metadata: Metadata = {
  title: "Search Engine Marketing (SEM / PPC) — Performance Paid Media",
  description:
    "Google Ads, Meta Ads, LinkedIn Ads — performance-led paid campaigns engineered for ROAS, not vanity metrics.",
};

export default function SEMPage() {
  const service = getServiceBySlug("search-engine-marketing")!;

  return (
    <ServiceDetail
      service={service}
      intro="Paid media is the fastest way to put your brand in front of the people who matter — but it's also the fastest way to burn through budget if you don't know what you're doing. We've managed ₹50Cr+ in ad spend across Google, Meta, LinkedIn, and programmatic — and we treat every rupee like it's our own. No bloated media plans, no 'brand awareness' campaigns that can't be tied to revenue. Just performance: bids, creative, landing pages, and conversion paths engineered for ROAS."
      painPoints={[
        {
          title: "Wasted ad spend with no clear ROI",
          description:
            "You're spending on Google Ads but can't tell which campaigns are actually driving revenue. We rebuild your account with proper conversion tracking, attribution, and a campaign structure that makes every rupee accountable.",
        },
        {
          title: "High CPCs, low conversion rates",
          description:
            "Bids keep climbing while conversions stay flat. Usually it's a quality score problem, a landing page problem, or a search intent mismatch. We diagnose the real blocker and fix it — without just throwing more budget at it.",
        },
        {
          title: "Landing pages that don't convert",
          description:
            "Your ads are getting clicks but the landing page kills the conversion. We audit the full post-click journey — page speed, message match, form friction, social proof, CTA hierarchy — and rebuild for conversion.",
        },
        {
          title: "iOS 14.5+ attribution chaos",
          description:
            "Facebook attribution broke in 2021 and most accounts still haven't recovered. We implement CAPI, server-side tracking, and conversion modelling so you can trust your numbers again — and stop optimising blind.",
        },
        {
          title: "Creative fatigue",
          description:
            "Your CTR is dropping because your audience has seen the same ad 47 times. We build creative iteration systems: hooks, formats, UGC, motion, static, carousel — tested weekly so your ads never go stale.",
        },
        {
          title: "Scaling without breaking ROAS",
          description:
            "You've found something that works, but every time you increase budget, ROAS collapses. We engineer scaling playbooks: audience expansion, bid strategy shifts, campaign duplication, and incremental testing — so growth is predictable, not a lottery.",
        },
      ]}
      subservices={[
        {
          title: "Google Ads Management",
          description:
            "Search, Display, Shopping, YouTube, Performance Max — managed with surgical precision. We obsess over quality score, search term reports, and auction insights to squeeze every rupee of value from your spend.",
          deliverables: [
            "Search, Display, Shopping & YouTube",
            "Performance Max campaigns",
            "Bid strategy optimisation",
            "Negative keyword sculpting",
            "Quality Score improvement",
            "Monthly performance reviews",
          ],
        },
        {
          title: "Meta Ads (Facebook + Instagram)",
          description:
            "Conversion-led campaigns across the Meta ecosystem. We test creative angles, audiences, and placements systematically — building a winning ad portfolio that scales profitably.",
          deliverables: [
            "Campaign strategy & structure",
            "Creative testing frameworks",
            "Audience segmentation & lookalikes",
            "CAPI & server-side tracking",
            "Reels & Stories ad production",
            "Weekly creative refreshes",
          ],
        },
        {
          title: "LinkedIn Ads (B2B)",
          description:
            "For B2B brands where decision-makers live on LinkedIn. Account-based marketing, lead gen forms, conversation ads, and thought leadership amplification — built for pipeline, not vanity metrics.",
          deliverables: [
            "Account-based marketing (ABM)",
            "Lead Gen Form campaigns",
            "Conversation & message ads",
            "Sponsored content & InMail",
            "Matched Audiences & lookalikes",
            "Pipeline attribution reporting",
          ],
        },
        {
          title: "Landing Page CRO",
          description:
            "Your ads deserve landing pages that convert. We design, build, and A/B test high-converting landing pages — tight message match, clear hierarchy, frictionless forms, and fast load times.",
          deliverables: [
            "Landing page design & build",
            "A/B testing framework",
            "Heatmap & session recording analysis",
            "Form friction reduction",
            "Page speed optimisation",
            "Conversion copywriting",
          ],
        },
        {
          title: "Conversion Tracking & Attribution",
          description:
            "You can't optimise what you can't measure. We set up GA4, Google Ads conversions, Meta CAPI, LinkedIn Insights Tag, and a unified attribution model so every conversion is tracked end-to-end.",
          deliverables: [
            "GA4 implementation",
            "Google Ads conversion tracking",
            "Meta Conversions API (CAPI)",
            "LinkedIn Insight Tag",
            "Offline conversion import",
            "Attribution modelling",
          ],
        },
        {
          title: "Programmatic & Display",
          description:
            "Brand-aware reach across the open web. Programmatic display, native advertising, and retargeting campaigns — managed with the same performance discipline as your search and social.",
          deliverables: [
            "Programmatic display campaigns",
            "Native advertising",
            "Retargeting & remarketing",
            "Audience targeting strategy",
            "Creative production",
            "Brand safety & viewability",
          ],
        },
      ]}
      process={[
        {
          step: "01",
          title: "Audit & Opportunity Mapping",
          description:
            "We audit your current account structure, tracking, creative, and landing pages. Map the highest-leverage opportunities — wasted spend, missed keywords, untested audiences. Output: a 90-day optimisation plan.",
        },
        {
          step: "02",
          title: "Restructure & Rebuild",
          description:
            "We rebuild the account from the ground up if needed — clean campaign structure, tight ad groups, proper conversion tracking, server-side pixels. Foundation first, then scale.",
        },
        {
          step: "03",
          title: "Launch & Test",
          description:
            "Launch with a clear testing roadmap: creative angles, audiences, bids, landing pages. Document every test, ship the winners, kill the losers. Data-driven iteration at speed.",
        },
        {
          step: "04",
          title: "Scale & Optimise",
          description:
            "Once we've found what works, we scale methodically — budget increases, audience expansion, creative diversification. Always protecting ROAS, always reporting on incrementality.",
        },
      ]}
      caseStudy={{
        client: "Nua Wellness",
        metric: "4.8× ROAS in 90 Days",
        description:
          "Nua came to us burning ₹8L/month on Meta with a 1.2× ROAS — basically breaking even after COGS. We rebuilt their campaign structure, implemented CAPI for clean attribution, shipped 60+ creative variations across 4 product lines, and built a landing page system that A/B tested itself. Result: 4.8× ROAS, ₹38L monthly revenue from paid, and a CAC that dropped by 62%.",
      }}
      tools={[
        { name: "Google Ads", category: "Search & Display" },
        { name: "Meta Ads Manager", category: "Social Advertising" },
        { name: "LinkedIn Campaign Manager", category: "B2B Advertising" },
        { name: "Google Analytics 4", category: "Attribution" },
        { name: "Meta Conversions API", category: "Server-side Tracking" },
        { name: "Unbounce / Webflow", category: "Landing Pages" },
        { name: "Hotjar", category: "Heatmaps & Recordings" },
        { name: "Optmyzr", category: "Bid Optimisation" },
      ]}
      faqs={[
        {
          q: "How much should I budget for paid ads?",
          a: "There's no magic number — it depends on your industry, customer LTV, and growth goals. As a rule of thumb, B2C e-commerce should be ready to spend 10–20% of revenue on ads; B2B lead gen typically needs ₹3–5L/month minimum to generate meaningful data. We'll help you model the right budget during the audit.",
        },
        {
          q: "How quickly will I see results?",
          a: "Paid media is the fastest channel — you'll see traffic and conversions within days of launch. The real question is profitability: we'll have a clear read on ROAS within 2–4 weeks, and we'll know if the campaigns are scalable within 60–90 days.",
        },
        {
          q: "Google Ads or Meta Ads?",
          a: "It depends on your business. Google Ads captures existing demand (people searching for what you sell). Meta Ads creates demand (interruptive, visual, great for D2C and brand awareness). Most B2C brands need both; most B2B brands focus on Google + LinkedIn. We recommend based on your goals, not our preferences.",
        },
        {
          q: "What's a good ROAS?",
          a: "Industry-dependent. D2C e-commerce: 3× minimum to be profitable after COGS. B2B SaaS: pipeline value matters more than ROAS — a ₹50L deal can justify ₹5L in ad spend. Lead gen: CPL vs LTV is the right lens. We benchmark against your industry, not generic averages.",
        },
        {
          q: "Do you do creative production?",
          a: "Yes. We have an in-house creative team for static, motion, and UGC ads. We work with your brand guidelines and ship 30–60 creative variations per month per account — because creative is the #1 lever in 2025, not targeting.",
        },
        {
          q: "What if my current agency is underperforming?",
          a: "We've inherited dozens of accounts from agencies who were burning budget. We start with a forensic audit, identify the leaks, and rebuild. Most accounts see a 40–80% improvement in ROAS within 90 days. We also offer month-to-month contracts — we earn your business every month.",
        },
        {
          q: "Do you work with small budgets?",
          a: "We do, but we have a minimum engagement of ₹75,000/month in ad spend for new clients. Below that, the data signal is too weak to optimise effectively, and we'd rather be honest about that than take your money and guess.",
        },
        {
          q: "How do you measure success?",
          a: "Revenue, not clicks. We track conversions end-to-end, attribute them back to campaigns, and report on ROAS, CAC, and incrementality. Vanity metrics (impressions, reach, engagement) are secondary — we optimise for the number that pays your bills.",
        },
        {
          q: "How do you decide which channels are right for my brand?",
          a: "We study your target audience, industry, and competitors to identify the platforms and strategies that deliver the best results. Every recommendation is data-driven, ensuring your marketing reaches the right people at the right time.",
        },
        {
          q: "Will I see real results, or is it just clicks and impressions?",
          a: "We focus on measurable outcomes, not just vanity metrics. Every campaign is tracked for conversions, leads, sales, and ROI, so you can see exactly how your investment drives tangible business growth.",
        },
        {
          q: "How do you track if a campaign is actually generating sales?",
          a: "We use analytics and tracking tools to monitor conversions, leads, and customer actions. Detailed reports show exactly which channels and campaigns are delivering results, so you know your marketing is working.",
        },
      ]}
    />
  );
}
