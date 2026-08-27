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
    slug: "kevasiya-luxury-gifting",
    client: "Kevasiya Luxury Gifting",
    industry: "Luxury Gifting",
    title: "From Junk Leads to High-Value Luxury Gifting Clients",
    summary:
      "Kevasiya offers premium bulk gifts for weddings, baby showers, festivals, and corporate events — but was drowning in irrelevant, low-budget inquiries that didn't match its premium positioning. We launched a targeted Instagram DM campaign aimed at high-income audiences, using reel-based and UGC-style creatives to attract the right buyers.",
    image: "/images/kevasiya.jpg",
    metrics: [
      { label: "Inquiry Quality", value: "+50%" },
      { label: "High-Budget Leads", value: "Every 2–3" },
    ],
    services: ["Social Media", "Content", "UGC"],
  },
  {
    slug: "gla-university-admissions",
    client: "GLA University",
    industry: "Education",
    title: "Driving Admission Growth with Performance Marketing",
    summary:
      "GLA University wanted more qualified admission inquiries for its programs through digital channels. We ran a performance marketing strategy built on Google Search and Meta campaigns, with remarketing to re-engage interested students and website visitors. Continuous campaign and landing page optimization cut cost per lead by 20% while lifting lead quality.",
    image: "/images/GL-BAJAJ.jpg",
    metrics: [
      { label: "Cost per Lead", value: "-20%" },
      { label: "Lead Quality", value: "Improved" },
    ],
    services: ["PPC", "Performance", "Landing Pages"],
  },
  {
    slug: "bhanwar-rathore-design-seo",
    client: "Bhanwar Rathore Design Studio",
    industry: "Education",
    title: "Improving Organic Visibility for a Design Entrance Coaching Institute",
    summary:
      "Bhanwar Rathore Design Studio coaches students for design entrance exams — NID, NIFT, UCEED, NATA — and needed to rank for the queries students actually search. With competition for design-education keywords high, we built a targeted SEO strategy around keyword optimization and high-quality, intent-matched content. The site climbed Google rankings for several design keywords, with steady growth in organic traffic and student inquiries.",
    image: "/images/BRDS.webp",
    metrics: [
      { label: "Google Rankings", value: "Improved" },
      { label: "Organic Traffic", value: "Steady Growth" },
    ],
    services: ["SEO", "Content"],
  },
  {
    slug: "ims-ghaziabad-social",
    client: "IMS Ghaziabad",
    industry: "Education",
    title: "A Feed That Now Speaks for Every IMS Voice",
    summary:
      "IMS Ghaziabad, a leading PGDM institute in North India, had a social presence that lacked engagement and authentic student storytelling. We rebuilt the content strategy around student-first narratives, campus-life reels, and high-engagement formats — turning the page into a living community. Engagement climbed from 3.8% to 4.72%, with multiple reels crossing 103K+ views. We then strengthened LinkedIn with algorithm-aligned, thought-leadership content for students, alumni, and industry audiences.",
    image: "/images/imsss.jpg",
    metrics: [
      { label: "Engagement Rate", value: "3.8% → 4.72%" },
      { label: "Followers", value: "+25%" },
      { label: "Instagram Reach", value: "+45.4%" },
    ],
    services: ["Social Media", "Content", "LinkedIn"],
  },
];
