import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { getServiceBySlug } from "@/data/services";

export const metadata: Metadata = {
  title: "Social Media Marketing — Build a Brand People Follow",
  description:
    "Instagram, Facebook, LinkedIn, YouTube, X — strategy, content, community, and influencer partnerships that build brands and drive action.",
};

export default function SocialMediaPage() {
  const service = getServiceBySlug("social-media-marketing")!;

  return (
    <ServiceDetail
      service={service}
      intro="Social media in 2025 isn't about posting more — it's about posting with intent. The brands winning right now treat social as a full-funnel channel: awareness at the top, consideration in the middle, conversion at the bottom. We've built organic and paid social systems for 100+ brands — D2C, B2B, creators, and enterprises — and we know what actually works on each platform. No 'just post reels' advice, no engagement-bait tactics. Strategy, creative, distribution, and measurement — engineered to compound."
      painPoints={[
        {
          title: "Posting into the void",
          description:
            "You're publishing content but engagement is flat, reach is declining, and followers aren't converting. Usually the problem isn't volume — it's a strategy that doesn't match the algorithm, the audience, or the platform. We rebuild the system from the ground up.",
        },
        {
          title: "No clear content strategy",
          description:
            "You post when inspiration strikes, with no pillar structure, no content calendar, no measurement framework. We install a 6-month content strategy: pillars, formats, cadence, and KPIs — tied to business outcomes.",
        },
        {
          title: "Inconsistent brand presence",
          description:
            "Your Instagram looks like one brand, your LinkedIn looks like another, your YouTube doesn't exist. We unify your visual identity, voice, and content strategy across every platform — so you look like a brand, not a collection of posts.",
        },
        {
          title: "Low-quality content that doesn't perform",
          description:
            "Stock photos, generic captions, no hook, no storytelling. We rebuild your content production pipeline: hooks, formats, production workflows, and quality standards that make every post worth stopping for.",
        },
        {
          title: "Community management overwhelm",
          description:
            "DMs pile up, comments go unanswered, complaints escalate. We install community management systems: response templates, escalation protocols, sentiment monitoring, and dedicated moderators who treat your audience like gold.",
        },
        {
          title: "No ROI from influencer marketing",
          description:
            "You paid ₹5L for a post, got 50K likes, and zero leads. We fix influencer marketing: creator selection, contract negotiation, content rights, performance tracking, and integration with your paid and organic strategy.",
        },
      ]}
      subservices={[
        {
          title: "Social Media Strategy",
          description:
            "A documented 6-month social strategy covering platform selection, audience personas, content pillars, posting cadence, and KPIs. The foundation that makes everything else work.",
          deliverables: [
            "Platform audit & selection",
            "Audience persona development",
            "Content pillar framework",
            "6-month editorial calendar",
            "KPI & measurement framework",
            "Competitive benchmarking",
          ],
        },
        {
          title: "Content Production",
          description:
            "Scroll-stopping creative at the volume social demands. We produce static posts, carousels, reels, stories, long-form video, podcasts — whatever your audience actually watches.",
          deliverables: [
            "Static post design",
            "Carousel & infographic creation",
            "Reels & short-form video",
            "Long-form YouTube content",
            "Podcast production",
            "Branded templates & toolkits",
          ],
        },
        {
          title: "Community Management",
          description:
            "Your audience deserves more than auto-replies. We handle DMs, comments, reviews, and community engagement with the care and speed that turns followers into customers.",
          deliverables: [
            "DM & comment management",
            "Response templates & tone guide",
            "Escalation protocols",
            "Sentiment monitoring",
            "Review response strategy",
            "Community growth tactics",
          ],
        },
        {
          title: "Influencer Marketing",
          description:
            "We find creators who actually move the needle — and we track performance end-to-end. No vanity collabs, no fake follower audits skipped.",
          deliverables: [
            "Creator identification & vetting",
            "Contract & rights negotiation",
            "Campaign briefs & creative direction",
            "Performance tracking & attribution",
            "UGC content licensing",
            "Long-term partnership management",
          ],
        },
        {
          title: "Social Listening & Analytics",
          description:
            "Know what your audience is saying — about you and your competitors. We set up social listening, sentiment analysis, and reporting dashboards that turn conversations into insights.",
          deliverables: [
            "Brand mention monitoring",
            "Competitor social tracking",
            "Sentiment analysis",
            "Trend & hashtag research",
            "Monthly performance reports",
            "Real-time crisis alerts",
          ],
        },
        {
          title: "Social Commerce",
          description:
            "Turn social engagement into revenue. Instagram Shopping, TikTok Shop, LinkedIn lead gen, and YouTube merch shelves — fully integrated with your e-commerce stack.",
          deliverables: [
            "Instagram & Facebook Shops",
            "TikTok Shop setup",
            "YouTube merch integration",
            "Live shopping events",
            "Social-to-checkout flows",
            "Conversion tracking & attribution",
          ],
        },
      ]}
      process={[
        {
          step: "01",
          title: "Audit & Strategy",
          description:
            "We audit your current social presence, content, audience, and competitors. Build the strategic foundation: positioning, pillars, voice, and a 6-month plan tied to business goals.",
        },
        {
          step: "02",
          title: "Content Engine Setup",
          description:
            "We build the production system: content pillars, templates, workflows, and quality standards. Hire or train creators, editors, and community managers if needed.",
        },
        {
          step: "03",
          title: "Launch & Iterate",
          description:
            "Publish consistently, test formats and hooks, double down on what works. Weekly creative reviews, monthly strategy reviews, quarterly deep-dives.",
        },
        {
          step: "04",
          title: "Scale & Measure",
          description:
            "Add paid amplification, influencer partnerships, and community programs. Track everything against revenue — likes are fine, but conversions pay the bills.",
        },
      ]}
      caseStudy={{
        client: "The Loom Co.",
        metric: "0 to 250K Followers in 14 Months",
        description:
          "The Loom Co. was a new D2C fashion brand with no social presence and a 90-day launch deadline. We built the strategy, produced 400+ pieces of content in the first quarter, ran 12 influencer campaigns, and built a community management system that turned comments into conversions. Result: 250K Instagram followers, 18% engagement rate, and ₹1.2Cr in first-year revenue attributed to social.",
      }}
      tools={[
        { name: "Meta Business Suite", category: "Publishing & Analytics" },
        { name: "Later / Buffer", category: "Scheduling" },
        { name: "Canva Pro", category: "Design Production" },
        { name: "CapCut / Premiere", category: "Video Editing" },
        { name: "Brandwatch", category: "Social Listening" },
        { name: "Linktree", category: "Bio & Commerce Links" },
        { name: "Shopify Collabs", category: "Influencer Commerce" },
        { name: "HypeAuditor", category: "Creator Vetting" },
      ]}
      faqs={[
        {
          q: "Which platforms should my business be on?",
          a: "Depends on your audience and goals. B2C / D2C: Instagram + Facebook are non-negotiable; TikTok and YouTube Shorts if your audience is 18–35. B2B: LinkedIn is the obvious priority; YouTube for long-form thought leadership. We help you pick platforms where your audience actually lives — not where you wish they lived.",
        },
        {
          q: "How often should I post?",
          a: "Quality beats quantity, every time. But the platforms reward consistency. We typically recommend 4–5 posts per week per platform for active brands, plus daily stories and 3–4 reels per week. The exact mix depends on your capacity and audience. We'd rather you post 3 great pieces a week than 14 mediocre ones.",
        },
        {
          q: "Should I use AI to generate content?",
          a: "Yes — but with humans in the loop. AI is incredible for ideation, research, and first drafts. But the voice, the storytelling, the cultural nuance — that has to come from humans who understand your brand and audience. We use AI to move faster, not to replace the thinking.",
        },
        {
          q: "How long until I see results?",
          a: "Organic social is a long game. You'll see engagement and follower growth within 30–60 days if the strategy is sound. Real business impact — leads, sales, brand recall — typically shows up at the 6–9 month mark. The brands that win are the ones that don't quit at month 3.",
        },
        {
          q: "Do you do paid social too?",
          a: "Yes — our SEM service covers paid social (Meta, LinkedIn, TikTok). Most clients run organic social with us and paid ads through our performance team, all under one strategy. We align organic and paid so they amplify each other instead of competing.",
        },
        {
          q: "What about influencer marketing?",
          a: "It's part of our service. We do creator identification, vetting, outreach, negotiation, campaign management, and performance tracking. We've managed ₹10Cr+ in influencer spend — and we know which creators drive actual results vs. just pretty pictures.",
        },
        {
          q: "Can you just create the content and let my team post it?",
          a: "Absolutely. We have clients who want full-service management and others who just want a content engine — strategy, creative, captions, assets — that their internal team publishes. Both models work; we flex to your team's capacity.",
        },
        {
          q: "How do you measure social media ROI?",
          a: "We tie social to revenue, not vanity metrics. Tracking includes: engagement rate, reach, follower growth, link clicks, lead generation, e-commerce conversions, and customer acquisition cost. We build attribution models so you know which posts, campaigns, and platforms actually drive business outcomes.",
        },
        {
          q: "Do I need to create content, or will you handle it all?",
          a: "We handle content creation end-to-end, including blog posts, social media, website copy, and ad creatives. We also collaborate with your team to ensure content reflects your brand voice and resonates with your audience.",
        },
        {
          q: "How quickly can my brand start seeing social media growth?",
          a: "Organic growth takes time, typically 2–3 months, while paid campaigns can deliver measurable results within weeks. We combine both approaches to ensure consistent audience growth and engagement.",
        },
      ]}
    />
  );
}
