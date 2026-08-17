export interface SubService {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
  subServices: SubService[];
}

export const SERVICES: Service[] = [
  {
    slug: "search-engine-optimization",
    title: "Search Engine Optimization",
    shortTitle: "SEO",
    tagline: "Rank higher. Get found. Grow organic.",
    description:
      "We turn your website into a magnet for qualified, intent-driven traffic. From technical SEO audits to content clusters and authority-building backlinks, we engineer search visibility that compounds month after month.",
    features: [
      "Technical SEO audits & fixes",
      "Keyword research & content strategy",
      "On-page optimization",
      "Authority backlink building",
      "Local SEO for Delhi NCR",
      "Monthly performance reporting",
    ],
    image:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1600&q=80",
    subServices: [
      {
        title: "E-commerce SEO",
        description:
          "E-commerce success requires more than ranking on Google Search. We optimize product pages, category pages, and technical SEO to improve visibility and drive more sales.",
      },
      {
        title: "Generative Search Optimization",
        description:
          "Your brand needs visibility beyond traditional search. We optimize content for AI platforms like Perplexity AI and Google AI Overviews so your website appears in AI-powered answers.",
      },
      {
        title: "Answer Engine Optimization",
        description:
          "We optimize your content to appear in AI answers, voice search, and featured snippets so your brand becomes the trusted source for quick information.",
      },
      {
        title: "Online Reputation Management (ORM)",
        description:
          "We protect and improve your brand's online image by managing reviews, addressing negative content, and promoting positive search results.",
      },
      {
        title: "Local SEO",
        description:
          "We optimize your local listings, reviews, and business signals to improve map visibility and drive more local traffic and calls.",
      },
    ],
  },
  {
    slug: "search-engine-marketing",
    title: "Performance Marketing",
    shortTitle: "Performance",
    tagline: "Bid smart. Convert faster. Pay only for results.",
    description:
      "Performance-led paid campaigns on Google Ads, Meta, LinkedIn, TikTok, and beyond. We obsess over ROAS — every rupee is tracked, tested, and tuned for maximum return on your marketing spend.",
    features: [
      "Google Ads (Search, Display, Shopping)",
      "Meta Ads (Facebook + Instagram)",
      "LinkedIn Ads for B2B",
      "Conversion tracking & attribution",
      "Landing page CRO",
      "Bid & budget optimization",
    ],
    image:
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=1600&q=80",
    subServices: [
      {
        title: "Google Ads",
        description:
          "We create and manage targeted search, display, and shopping campaigns to reach high-intent users, drive qualified traffic, and increase conversions while maximizing return on ad spend.",
      },
      {
        title: "Meta Ads",
        description:
          "Our team runs strategic Facebook and Instagram campaigns using advanced audience targeting and creative ad formats to boost engagement, website traffic, and sales.",
      },
      {
        title: "LinkedIn Ads",
        description:
          "We design LinkedIn campaigns that help businesses reach professionals and decision-makers, generating high-quality B2B leads and strengthening brand presence.",
      },
      {
        title: "TikTok Ads",
        description:
          "We create engaging short-form video ads that capture attention, increase brand awareness, and help businesses connect with TikTok's active audience.",
      },
      {
        title: "Microsoft Advertising (Bing Ads)",
        description:
          "Our experts manage campaigns across the Microsoft network to capture additional search traffic and deliver cost-effective results.",
      },
      {
        title: "Snapchat Ads",
        description:
          "We develop creative Snapchat campaigns that help brands reach younger audiences and drive engagement, traffic, and brand awareness.",
      },
    ],
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Optimization",
    shortTitle: "Social Media",
    tagline: "Build a brand people actually want to follow.",
    description:
      "Grow your brand's influence and engagement across social platforms with creative, data-driven strategies. We combine organic growth, paid campaigns, and short-form video content to build communities, enhance visibility, and drive conversions.",
    features: [
      "Instagram, Facebook, LinkedIn, X, YouTube",
      "Content strategy & calendars",
      "Reels and short-form video",
      "Community management",
      "Influencer collaborations",
      "Social listening & analytics",
    ],
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1600&q=80",
    subServices: [
      {
        title: "Organic Social Growth",
        description:
          "We help brands grow their social presence naturally by creating engaging content, improving profile optimization, and building an active community that drives consistent reach and engagement.",
      },
      {
        title: "Social Brand Building",
        description:
          "Our strategies focus on strengthening your brand identity across social platforms through consistent messaging, creative storytelling, and meaningful audience connections.",
      },
      {
        title: "Personal Branding",
        description:
          "We help founders and professionals build a strong personal brand by creating authentic content that showcases expertise, builds credibility, and grows a loyal audience.",
      },
      {
        title: "Content Creation",
        description:
          "Our team develops high-quality social media content including posts, reels, graphics, and captions designed to capture attention and increase engagement.",
      },
    ],
  },
  {
    slug: "website-design-development",
    title: "Web Development",
    shortTitle: "Web Dev",
    tagline: "Websites that look as good as they perform.",
    description:
      "We design and build blazing-fast, conversion-optimized websites and web apps. From custom Next.js platforms to headless Shopify stores — pixel-perfect design, rock-solid engineering, and SEO baked in from day one.",
    features: [
      "UX/UI design",
      "Next.js, React, WordPress, Shopify",
      "Headless CMS integrations",
      "Performance & Core Web Vitals",
      "E-commerce & D2C builds",
      "Ongoing maintenance & support",
    ],
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1600&q=80",
    subServices: [
      {
        title: "Custom Website Development",
        description:
          "We build fully customized websites designed around your business goals, ensuring a modern design, smooth user experience, and strong performance across all devices.",
      },
      {
        title: "WordPress Development",
        description:
          "Our team develops flexible and scalable websites using WordPress, allowing businesses to easily manage content, pages, and updates without technical complexity.",
      },
      {
        title: "CMS Development",
        description:
          "We create websites with powerful content management systems that allow businesses to update content, publish pages, and manage their website efficiently.",
      },
      {
        title: "Website Maintenance Services",
        description:
          "We provide ongoing website maintenance including updates, security checks, and performance monitoring to keep your website running smoothly and securely.",
      },
    ],
  },
  {
    slug: "video-production",
    title: "Video Production",
    shortTitle: "Video",
    tagline: "Captivating video content that tells your brand story.",
    description:
      "From short-form social videos to corporate presentations, we create high-quality, professional videos that capture attention, communicate your brand story, and inspire action. Every frame serves a purpose and drives results.",
    features: [
      "Corporate & brand videos",
      "Social media short-form content",
      "Explainer & product videos",
      "Animation & motion graphics",
      "Event & testimonial videos",
      "Editing & post-production",
    ],
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1d07b534a4?auto=format&fit=crop&w=1600&q=80",
    subServices: [
      {
        title: "Corporate & Brand Videos",
        description:
          "Polished videos that communicate your brand's values, mission, and vision — perfect for presentations, websites, and campaigns.",
      },
      {
        title: "Social Media Videos",
        description:
          "Engaging short-form content for Instagram Reels, TikTok, LinkedIn, and YouTube Shorts that resonates with your audience and drives engagement.",
      },
      {
        title: "Explainer & Product Videos",
        description:
          "Videos that simplify complex products or services, helping potential customers understand your offering quickly and clearly.",
      },
      {
        title: "Animation & Motion Graphics",
        description:
          "Custom animations and motion graphics that make your message more dynamic, visually appealing, and memorable.",
      },
      {
        title: "Event & Testimonial Videos",
        description:
          "Captured events, customer stories, and testimonials that enhance credibility, social proof, and connection with your audience.",
      },
      {
        title: "Editing & Post-Production",
        description:
          "Color grading, sound design, and visual effects — all the polish that turns raw footage into a professional final cut.",
      },
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortTitle: "UI/UX",
    tagline: "Design that works as good as it looks.",
    description:
      "We design user experiences that are intuitive, beautiful, and conversion-focused. From responsive websites to landing pages and brand visuals, every design decision is backed by research and built to perform.",
    features: [
      "Responsive web design",
      "UX research & design",
      "Landing page design",
      "Graphic design & brand assets",
      "Video production",
      "Design systems & style guides",
    ],
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b8?auto=format&fit=crop&w=1600&q=80",
    subServices: [
      {
        title: "Responsive Web Design",
        description:
          "We design responsive websites that adapt seamlessly to all screen sizes, ensuring a smooth and consistent experience across desktops, tablets, and mobile devices.",
      },
      {
        title: "UX Design",
        description:
          "Our UX design process focuses on creating intuitive user journeys, improving usability, and ensuring visitors can easily navigate your website and complete desired actions.",
      },
      {
        title: "Landing Page Design",
        description:
          "We design high-converting landing pages tailored for marketing campaigns, focusing on clear messaging, strong visuals, and user-focused layouts that drive leads and conversions.",
      },
      {
        title: "Graphic Design",
        description:
          "Our creative team develops impactful visual designs including brand graphics, marketing materials, and digital assets that strengthen your brand identity.",
      },
      {
        title: "Video Production",
        description:
          "We create engaging video content that helps brands communicate their message effectively, boost engagement, and capture audience attention across digital platforms.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
