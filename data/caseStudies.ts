export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  title: string;
  summary: string;
  image: string;
  metrics: { label: string; value: string }[];
  services: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "gl-bajaj-seo",
    client: "GL Bajaj Institute",
    industry: "Education",
    title: "From page 5 to page 1 in 90 days",
    summary:
      "End-to-end SEO overhaul for one of Delhi NCR's leading institutes. We rebuilt the site architecture, launched 40+ optimized landing pages, and built authority through digital PR.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
    metrics: [
      { label: "Organic Traffic", value: "+412%" },
      { label: "Lead Form Submissions", value: "+187%" },
      { label: "Keywords on Page 1", value: "120+" },
    ],
    services: ["SEO", "Content", "Web Design"],
  },
  {
    slug: "indo-global-brand-launch",
    client: "Indo Global Group",
    industry: "Conglomerate",
    title: "Launching a multi-vertical digital presence",
    summary:
      "We designed and built the digital home for Indo Global's six verticals — from real estate to education. Unified brand system, six bespoke sites, and a paid acquisition engine.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    metrics: [
      { label: "Branded Search", value: "+260%" },
      { label: "Lead Volume", value: "+95%" },
      { label: "Cost per Lead", value: "-58%" },
    ],
    services: ["Web Design", "Branding", "PPC"],
  },
  {
    slug: "imm-delhi-social",
    client: "IMM Delhi",
    industry: "Education",
    title: "Social-first growth for a legacy institution",
    summary:
      "Transformed IMM Delhi's Instagram and LinkedIn from static posters to a content engine producing 60+ reels a month. Community management, influencer partnerships, and paid amplification.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80",
    metrics: [
      { label: "Followers", value: "+1,025%" },
      { label: "Engagement Rate", value: "8.4%" },
      { label: "Direct Inquiries", value: "+340%" },
    ],
    services: ["Social Media", "Content", "Influencer"],
  },
  {
    slug: "bloom-beverages",
    client: "Bloom Beverages",
    industry: "F&B / D2C",
    title: "D2C scale-up from ₹40L to ₹2.1Cr MRR",
    summary:
      "Full-funnel growth for a new-age beverage brand. Performance creative, lifecycle email, and a relentless focus on CAC:LTV. Built the entire backend analytics from scratch.",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
    metrics: [
      { label: "Blended ROAS", value: "5.8x" },
      { label: "MRR Growth", value: "+425%" },
      { label: "Repeat Purchase Rate", value: "+62%" },
    ],
    services: ["PPC", "Email", "Analytics"],
  },
];