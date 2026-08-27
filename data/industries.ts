export interface IndustryCoreService {
  title: string;
  description: string;
}

export interface IndustryStep {
  title: string;
  description: string;
}

export interface IndustryReason {
  title: string;
  description: string;
}

export interface IndustryCard {
  title: string;
  description: string;
}

export interface Industry {
  slug: string;
  name: string;
  headline: string;
  subheading: string;
  introTitle: string;
  introParagraphs: string[];
  coreServices: IndustryCoreService[];
  howWeWork: IndustryStep[];
  whyChooseUs: IndustryReason[];
  serviceCards: IndustryCard[];
  ctaTitle: string;
  ctaDescription: string;
}

const HOW_WE_WORK_DEFAULT: IndustryStep[] = [
  {
    title: "Analyze & Strategize",
    description:
      "We start by understanding your brand, audience, and market trends to identify growth opportunities and design a clear roadmap.",
  },
  {
    title: "Create & Execute",
    description:
      "Next, we develop tailored campaigns, content, and digital strategies that attract, engage, and convert high-intent audiences.",
  },
  {
    title: "Optimize & Scale",
    description:
      "Finally, we track performance, refine campaigns, and scale strategies to maximize leads, sales, and brand authority over time.",
  },
];

export const INDUSTRIES: Industry[] = [
  {
    slug: "real-estate",
    name: "Real Estate",
    headline: "Stealth Digital Empowers Real Estate Brands to Lead the Market",
    subheading:
      "Attract the right buyers, earn trust, and grow your real estate business with impact.",
    introTitle: "Transform Your Real Estate Business with Digital Expertise",
    introParagraphs: [
      "In today's competitive real estate market, visibility and trust are everything. Buyers research online, compare properties, and choose brands they feel confident in. Stealth Digital helps real estate businesses build authority, connect with high-intent buyers, and turn interest into sales.",
      "Through data-driven campaigns, engaging content, and optimized digital strategies, we ensure your properties get noticed by the right audience. Our approach not only generates more inquiries and deals but also strengthens your brand's credibility in the market, positioning you as a trusted leader in real estate.",
    ],
    coreServices: [
      {
        title: "Lead-Generating Campaigns",
        description:
          "We design campaigns that attract serious buyers through social media, paid ads, and local search marketing. The goal is simple: get your listings in front of the right audience and convert them into leads.",
      },
      {
        title: "Visual & Storytelling Excellence",
        description:
          "Real estate is about trust and storytelling. We create stunning visuals, property videos, and compelling copy that showcase your listings and brand personality. Every piece of content is crafted to engage buyers and leave a lasting impression.",
      },
      {
        title: "High-Performing Digital Presence",
        description:
          "Your website is the heart of your digital brand. We optimize your site for search engines, usability, and lead capture, making it easy for potential buyers to find, explore, and engage with your properties online.",
      },
      {
        title: "Maximized Sales & Growth",
        description:
          "From nurturing leads to managing inquiries, we implement strategies that turn interest into action. By continuously analyzing results, we refine campaigns to maximize ROI and scale your business sustainably.",
      },
    ],
    howWeWork: HOW_WE_WORK_DEFAULT,
    whyChooseUs: [
      {
        title: "Proven Real Estate Expertise",
        description:
          "Years of experience helping real estate brands grow their online presence, generate high-quality leads, and close more deals.",
      },
      {
        title: "Data-Driven Results",
        description:
          "Every strategy is backed by analytics and insights to ensure measurable growth.",
      },
      {
        title: "Creative & Memorable Campaigns",
        description:
          "From striking visuals to persuasive copy, we craft content that captures attention and builds trust.",
      },
      {
        title: "Buyer-Centric Approach",
        description:
          "We focus on connecting you with serious buyers, nurturing trust, and converting interest into loyal clients.",
      },
      {
        title: "End-to-End Digital Solutions",
        description:
          "From marketing campaigns to website optimization and lead conversion, we handle it all so you can focus on your properties.",
      },
    ],
    serviceCards: [
      {
        title: "Lead-Generating Campaigns",
        description:
          "Attract serious buyers through targeted social media, paid ads, and local search marketing.",
      },
      {
        title: "Visual & Storytelling Excellence",
        description:
          "Showcase your properties with stunning visuals, videos, and copy that engage buyers.",
      },
      {
        title: "High-Performing Digital Presence",
        description:
          "Optimize your website for search engines, usability, and lead capture to maximize engagement.",
      },
      {
        title: "Maximized Sales & Growth",
        description:
          "Nurture leads, manage inquiries, and refine campaigns to boost conversions and ROI.",
      },
    ],
    ctaTitle: "Let's Elevate Your Real Estate Brand",
    ctaDescription:
      "Partner with Stealth Digital to connect with serious buyers, strengthen your brand, and grow your real estate business successfully.",
  },
  {
    slug: "technology",
    name: "Technology",
    headline: "Stealth Digital Empowers Technology Brands to Innovate, Scale & Lead",
    subheading:
      "Reach the right users and grow your technology business with data-driven digital strategies.",
    introTitle: "Transform Your Technology Brand with Digital Expertise",
    introParagraphs: [
      "The technology industry moves fast. New solutions launch every day, competition is intense, and capturing attention requires more than just a great product. Today's users research extensively before choosing a platform, service, or software solution. Your brand must clearly communicate innovation, credibility, and value to stand out.",
      "Stealth Digital helps technology companies build authority, reach the right audience, and turn interest into meaningful adoption. Through strategic campaigns, compelling content, and optimized digital platforms, we ensure your products and solutions are presented in a way that inspires trust and drives engagement.",
      "Whether you're a startup introducing a new product or an established tech company scaling globally, our digital strategies help you increase visibility, generate qualified leads, and accelerate growth in competitive markets.",
    ],
    coreServices: [
      {
        title: "Performance-Driven Digital Campaigns",
        description:
          "We design targeted marketing campaigns that connect your technology brand with high-intent users and decision-makers. Through social media advertising, search campaigns, and data-driven targeting, we ensure your product reaches the right audience at the right time. Our focus is not just visibility but driving meaningful engagement and lead generation.",
      },
      {
        title: "Technology Brand Storytelling",
        description:
          "Complex technology needs clear communication. We transform technical ideas into engaging narratives that highlight your innovation and value. From product videos and explainer content to website copy and visual branding, we craft stories that make your technology accessible, memorable, and compelling.",
      },
      {
        title: "High-Performance Websites & Platforms",
        description:
          "Your website is often the first interaction users have with your brand. We optimize websites and digital platforms to ensure they are fast, intuitive, and conversion-focused. By improving usability, design, and search engine visibility, we help users quickly understand your product and take action.",
      },
      {
        title: "Growth & User Acquisition Strategies",
        description:
          "Building awareness is only the first step. We implement strategies designed to convert visitors into active users or clients. Through continuous testing, performance tracking, and campaign optimization, we help technology brands scale their growth efficiently while maximizing return on investment.",
      },
    ],
    howWeWork: [
      {
        title: "Analyze & Strategize",
        description:
          "We start by understanding your product, audience, and competitive landscape. This allows us to identify growth opportunities and build a digital strategy aligned with your business objectives.",
      },
      {
        title: "Create & Execute",
        description:
          "Our team develops targeted campaigns, engaging content, and optimized digital experiences designed to attract and convert your ideal audience.",
      },
      {
        title: "Optimize & Scale",
        description:
          "Using performance data and analytics, we continuously refine strategies to improve results, increase engagement, and accelerate growth over time.",
      },
    ],
    whyChooseUs: [
      {
        title: "Technology Industry Understanding",
        description:
          "We understand the unique challenges of marketing innovative products and communicating complex solutions effectively.",
      },
      {
        title: "Data-Driven Strategies",
        description:
          "Every campaign is guided by insights and analytics to ensure measurable performance and sustainable growth.",
      },
      {
        title: "Creative Communication",
        description:
          "We translate technical innovation into clear, engaging messaging that resonates with users and decision-makers.",
      },
      {
        title: "User-Focused Approach",
        description:
          "Our strategies prioritize user experience, ensuring your brand connects with the right audience and builds lasting relationships.",
      },
      {
        title: "End-to-End Digital Support",
        description:
          "From brand positioning and marketing campaigns to website optimization and conversion strategies, we provide complete digital support for your growth.",
      },
    ],
    serviceCards: [
      {
        title: "Performance Marketing",
        description:
          "Targeted digital campaigns designed to attract high-intent users and generate qualified leads.",
      },
      {
        title: "Tech Brand Storytelling",
        description:
          "Content and visuals that communicate your product's innovation and value clearly.",
      },
      {
        title: "Optimized Digital Platforms",
        description: "Websites and platforms designed for speed, usability, and conversion.",
      },
      {
        title: "User Acquisition & Growth",
        description:
          "Data-driven strategies that turn visitors into loyal users and long-term customers.",
      },
    ],
    ctaTitle: "Let's Accelerate Your Technology Brand",
    ctaDescription:
      "Partner with Stealth Digital to strengthen your brand presence, connect with the right users, and scale your technology business with confidence.",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    headline: "Stealth Digital Helps Healthcare Brands Build Trust & Grow with Confidence",
    subheading:
      "Connect with the right patients, strengthen credibility, and grow your healthcare services through strategic digital solutions.",
    introTitle: "Transform Your Healthcare Brand with Digital Expertise",
    introParagraphs: [
      "The healthcare industry is built on trust, credibility, and clear communication. Today, patients rely heavily on online research before choosing doctors, clinics, hospitals, or healthcare providers. They compare services, read reviews, and look for brands that feel reliable, transparent, and professional.",
      "Stealth Digital helps healthcare organizations build a strong digital presence that inspires confidence and attracts the right patients. Through carefully designed marketing strategies, informative content, and optimized digital platforms, we ensure your services reach people who truly need them.",
      "Our approach focuses on patient education, brand credibility, and meaningful engagement, helping healthcare providers increase appointments, improve visibility, and establish themselves as trusted leaders in their field.",
      "Whether you're a clinic, hospital, medical practice, healthcare startup, or wellness brand, our digital strategies help you connect with patients, communicate expertise, and grow sustainably.",
    ],
    coreServices: [
      {
        title: "Patient-Focused Digital Campaigns",
        description:
          "We create targeted marketing campaigns designed to connect healthcare providers with patients actively searching for medical services. Through search marketing, social media campaigns, and local targeting strategies, we help your services appear when people need them the most. Our campaigns focus on building trust and encouraging patients to take the next step, whether that's booking an appointment, requesting a consultation, or learning more about your services.",
      },
      {
        title: "Healthcare Content & Brand Communication",
        description:
          "Healthcare communication requires clarity, empathy, and credibility. We develop informative, trustworthy, and engaging content that explains your services and educates your audience. From website copy and educational articles to visual storytelling and brand messaging, our content helps patients understand your expertise and feel confident choosing your services.",
      },
      {
        title: "Optimized Healthcare Websites",
        description:
          "Your website is often the first place patients interact with your brand. We ensure your digital platforms are professional, easy to navigate, and optimized for search engines so patients can quickly find the information they need. Our goal is to create digital experiences that build trust instantly, communicate expertise clearly, and make it easy for patients to take action.",
      },
      {
        title: "Patient Engagement & Growth Strategies",
        description:
          "Attracting patients is just the beginning. We help healthcare providers build long-term relationships with their audience through ongoing engagement strategies, performance tracking, and optimization. By analyzing user behavior and campaign results, we continuously improve your digital strategies to increase appointments, patient retention, and long-term growth.",
      },
    ],
    howWeWork: [
      {
        title: "Analyze & Strategize",
        description:
          "We begin by understanding your services, patient demographics, and competitive landscape. This allows us to develop a strategy tailored to your healthcare practice and growth goals.",
      },
      {
        title: "Create & Execute",
        description:
          "Our team develops targeted campaigns, educational content, and optimized digital platforms designed to inform, engage, and convert potential patients.",
      },
      {
        title: "Optimize & Scale",
        description:
          "Through continuous monitoring and analytics, we refine strategies to increase visibility, improve engagement, and drive consistent patient growth.",
      },
    ],
    whyChooseUs: [
      {
        title: "Healthcare Industry Understanding",
        description:
          "We understand the importance of trust, credibility, and ethical communication when promoting healthcare services.",
      },
      {
        title: "Data-Driven Marketing",
        description:
          "Every campaign is guided by analytics and insights to ensure measurable improvements in visibility and patient engagement.",
      },
      {
        title: "Clear & Compassionate Communication",
        description:
          "We create messaging that communicates expertise while remaining approachable and informative for patients.",
      },
      {
        title: "Patient-Centered Strategies",
        description:
          "Our marketing strategies focus on helping patients find the care they need while strengthening your brand reputation.",
      },
      {
        title: "End-to-End Digital Support",
        description:
          "From branding and content creation to marketing campaigns and website optimization, we support every stage of your digital growth.",
      },
    ],
    serviceCards: [
      {
        title: "Patient Acquisition Campaigns",
        description:
          "Targeted digital campaigns that help healthcare providers reach patients actively searching for services.",
      },
      {
        title: "Healthcare Content & Education",
        description:
          "Informative and trustworthy content that communicates expertise and builds credibility.",
      },
      {
        title: "Optimized Healthcare Websites",
        description:
          "Professional websites designed to build trust and make it easy for patients to take action.",
      },
      {
        title: "Patient Engagement & Retention",
        description:
          "Strategies focused on building long-term relationships with patients and encouraging repeat visits.",
      },
    ],
    ctaTitle: "Let's Strengthen Your Healthcare Brand",
    ctaDescription:
      "Partner with Stealth Digital to build credibility, connect with patients, and grow your healthcare services with confidence.",
  },
  {
    slug: "b2b",
    name: "B2B",
    headline: "Stealth Digital Helps B2B Brands Build Authority & Win High-Value Clients",
    subheading:
      "Reach decision-makers, generate qualified leads, and accelerate business growth with strategic digital marketing.",
    introTitle: "Transform Your B2B Business with Digital Expertise",
    introParagraphs: [
      "B2B markets are competitive and complex. Businesses no longer rely solely on traditional networking or referrals — decision-makers now conduct extensive online research before choosing partners, vendors, or service providers. They evaluate brands based on credibility, expertise, and the value they communicate.",
      "Stealth Digital helps B2B companies strengthen their digital presence, attract the right prospects, and convert interest into long-term business relationships. Through targeted marketing campaigns, strategic content, and optimized digital platforms, we ensure your brand reaches key decision-makers and industry leaders.",
      "Our approach focuses on building authority, generating qualified leads, and nurturing prospects through the entire decision-making process. Whether you're a consulting firm, SaaS company, service provider, or enterprise brand, we help you position your business as a trusted partner in your industry.",
    ],
    coreServices: [
      {
        title: "Lead Generation Campaigns",
        description:
          "We design targeted marketing campaigns that connect your business with decision-makers actively searching for solutions. Through search marketing, professional social media campaigns, and strategic advertising, we help your brand reach the right companies at the right time. Our campaigns focus on generating qualified leads, ensuring your sales team engages with prospects that are genuinely interested in your services.",
      },
      {
        title: "Authority-Driven Content & Brand Positioning",
        description:
          "B2B buyers look for expertise and credibility before making decisions. We create insightful content, industry messaging, and professional brand narratives that position your business as a knowledgeable and reliable partner. From thought leadership content to brand storytelling and website messaging, we ensure your communication reflects expertise and builds confidence among potential clients.",
      },
      {
        title: "Optimized Websites for Lead Conversion",
        description:
          "Your website plays a critical role in converting visitors into leads. We optimize your digital platforms to ensure they are professional, user-friendly, and designed to capture inquiries effectively. Through improved structure, clear messaging, and SEO optimization, we create websites that build trust instantly and encourage prospects to take action.",
      },
      {
        title: "Growth & Client Acquisition Strategies",
        description:
          "Beyond generating traffic, we focus on turning interest into real business opportunities. Through data analysis, campaign optimization, and strategic targeting, we continuously refine your marketing approach to increase conversions and drive sustainable growth.",
      },
    ],
    howWeWork: [
      {
        title: "Analyze & Strategize",
        description:
          "We begin by studying your industry, competitors, and target audience to identify opportunities that can strengthen your market position.",
      },
      {
        title: "Create & Execute",
        description:
          "Our team develops targeted campaigns, authority-driven content, and optimized digital experiences that engage decision-makers and generate leads.",
      },
      {
        title: "Optimize & Scale",
        description:
          "Using analytics and performance data, we continuously refine strategies to improve lead quality, increase conversions, and support long-term growth.",
      },
    ],
    whyChooseUs: [
      {
        title: "B2B Marketing Expertise",
        description:
          "We understand the complexities of B2B sales cycles and craft strategies designed to engage professional audiences.",
      },
      {
        title: "Data-Driven Campaigns",
        description:
          "Our decisions are guided by performance insights, ensuring measurable results and optimized growth.",
      },
      {
        title: "Authority-Focused Branding",
        description:
          "We help position your company as a credible and trusted leader within your industry.",
      },
      {
        title: "Lead-Focused Strategies",
        description:
          "Our marketing approach prioritizes generating high-quality leads that convert into long-term clients.",
      },
      {
        title: "End-to-End Digital Support",
        description:
          "From brand positioning and marketing campaigns to website optimization and lead generation, we manage every aspect of your digital growth.",
      },
    ],
    serviceCards: [
      {
        title: "Targeted Lead Generation",
        description:
          "Campaigns designed to reach decision-makers and generate qualified business leads.",
      },
      {
        title: "Authority-Building Content",
        description:
          "Professional messaging and content that positions your brand as an industry expert.",
      },
      {
        title: "Conversion-Focused Websites",
        description:
          "Optimized digital platforms designed to turn visitors into valuable business inquiries.",
      },
      {
        title: "Strategic Business Growth",
        description: "Data-driven marketing strategies that support long-term B2B growth.",
      },
    ],
    ctaTitle: "Let's Strengthen Your B2B Growth",
    ctaDescription:
      "Partner with Stealth Digital to reach decision-makers, generate qualified leads, and grow your business with confidence.",
  },
  {
    slug: "hospitality",
    name: "Hotels & Restaurants",
    headline: "Stealth Digital Helps Hospitality Brands Attract Guests & Stay Fully Booked",
    subheading:
      "Build a memorable brand presence, reach the right audience, and turn online discovery into reservations and loyal customers.",
    introTitle: "Elevate Your Hospitality Brand with Digital Excellence",
    introParagraphs: [
      "In the hospitality industry, first impressions often happen online. Guests explore restaurants, hotels, and dining experiences through search engines, social media, and online reviews before making a decision. A strong digital presence can be the difference between an empty table and a fully booked weekend.",
      "Stealth Digital helps hospitality businesses create compelling digital experiences that attract guests and drive consistent reservations. Through strategic marketing campaigns, engaging content, and optimized digital platforms, we ensure your brand stands out in a competitive market.",
      "Our approach combines creative storytelling with performance-driven marketing, allowing hotels and restaurants to showcase their atmosphere, cuisine, and unique guest experience while reaching audiences actively looking for their next dining or travel destination.",
      "Whether you're a luxury hotel, boutique property, fine-dining restaurant, café, or hospitality group, we help you increase visibility, build a loyal customer base, and grow your brand sustainably.",
    ],
    coreServices: [
      {
        title: "Local & Social Media Marketing",
        description:
          "We design targeted campaigns that help hospitality brands reach local diners, travelers, and experience seekers. Through social media promotions, local search optimization, and digital advertising, we ensure your venue appears where guests are searching and planning their next outing. Our goal is simple: increase visibility, drive reservations, and keep your tables and rooms filled.",
      },
      {
        title: "Visual Storytelling & Brand Experience",
        description:
          "Hospitality is highly visual. Guests want to see the ambiance, the food, and the overall experience before visiting. We create high-quality visual content, promotional videos, and compelling brand storytelling that highlight what makes your venue special. This helps your brand create an emotional connection with potential guests before they even walk through the door.",
      },
      {
        title: "Optimized Websites & Online Presence",
        description:
          "Your website should make it effortless for guests to explore your offerings and book instantly. We design and optimize websites that are visually engaging, easy to navigate, and built to convert visitors into reservations. From mobile optimization to SEO improvements, we ensure your brand is easy to discover and effortless to engage with online.",
      },
      {
        title: "Guest Engagement & Loyalty Growth",
        description:
          "Attracting new guests is important, but building loyalty creates long-term success. We develop strategies that help hospitality brands stay connected with their audience, encouraging repeat visits and positive word-of-mouth. By analyzing campaign performance and customer behavior, we continuously refine strategies to increase engagement, reservations, and long-term growth.",
      },
    ],
    howWeWork: [
      {
        title: "Analyze & Strategize",
        description:
          "We begin by understanding your brand identity, target audience, and local market competition. This helps us design a digital strategy that highlights your unique strengths.",
      },
      {
        title: "Create & Execute",
        description:
          "Our team develops creative campaigns, engaging content, and optimized digital platforms that attract guests and inspire them to visit.",
      },
      {
        title: "Optimize & Scale",
        description:
          "Using performance insights and analytics, we refine strategies to increase visibility, boost reservations, and grow your brand consistently.",
      },
    ],
    whyChooseUs: [
      {
        title: "Hospitality Industry Insight",
        description:
          "We understand what motivates guests to choose a hotel or restaurant and craft strategies that highlight your unique experience.",
      },
      {
        title: "Creative Brand Storytelling",
        description:
          "Our content captures the atmosphere, flavor, and personality of your brand, making it memorable and appealing.",
      },
      {
        title: "Data-Driven Marketing",
        description:
          "Every campaign is guided by analytics to ensure measurable results and consistent improvement.",
      },
      {
        title: "Guest-Centered Strategies",
        description:
          "We focus on attracting the right audience and turning first-time visitors into loyal customers.",
      },
      {
        title: "Complete Digital Support",
        description:
          "From marketing campaigns and visual content to website optimization and customer engagement, we support every stage of your digital growth.",
      },
    ],
    serviceCards: [
      {
        title: "Local & Social Marketing",
        description:
          "Targeted campaigns that help your venue reach diners and travelers actively searching for experiences.",
      },
      {
        title: "Visual Brand Storytelling",
        description:
          "Engaging photos, videos, and content that showcase your atmosphere and culinary experience.",
      },
      {
        title: "Optimized Booking Websites",
        description: "Websites designed to attract visitors and convert them into reservations.",
      },
      {
        title: "Guest Engagement Strategies",
        description: "Marketing approaches that encourage repeat visits and build customer loyalty.",
      },
    ],
    ctaTitle: "Let's Grow Your Hospitality Brand",
    ctaDescription:
      "Partner with Stealth Digital to attract more guests, increase reservations, and create memorable digital experiences that keep customers coming back.",
  },
  {
    slug: "education",
    name: "Education",
    headline: "Stealth Digital Helps Education Brands Inspire, Engage & Grow",
    subheading:
      "Reach the right students, build credibility, and increase enrollments through powerful digital strategies.",
    introTitle: "Empowering Education Brands with Digital Growth",
    introParagraphs: [
      "The education industry is evolving rapidly. Students and parents today rely heavily on online research, reviews, and digital experiences before choosing an institution, training program, or online course. Educational brands must communicate credibility, value, and opportunity to stand out in a competitive environment.",
      "Stealth Digital helps educational institutions and learning platforms build strong digital visibility, attract the right students, and convert interest into enrollments. Through strategic marketing campaigns, compelling content, and optimized digital platforms, we ensure your programs reach audiences who are actively looking to learn and grow.",
      "Our approach focuses on clear communication, strong brand positioning, and performance-driven marketing, enabling schools, universities, coaching centers, and online education platforms to expand their reach and strengthen their reputation.",
      "Whether you're a school, university, ed-tech company, coaching institute, or online learning platform, we help you connect with students, build trust, and grow sustainably in the digital era.",
    ],
    coreServices: [
      {
        title: "Student Acquisition Campaigns",
        description:
          "We create targeted marketing campaigns designed to connect educational institutions with students actively searching for courses and learning opportunities. Through search marketing, social media campaigns, and digital advertising, we ensure your programs reach the right audience. Our focus is on generating qualified inquiries and increasing enrollments by reaching students at the right stage of their decision-making journey.",
      },
      {
        title: "Education-Focused Content & Brand Communication",
        description:
          "Students and parents want clear information before making decisions. We create engaging, informative, and trustworthy content that explains your programs, highlights your strengths, and communicates your educational value. From website copy to promotional content and visual storytelling, we help position your institution as a credible and inspiring place to learn.",
      },
      {
        title: "Optimized Websites for Enrollments",
        description:
          "Your website plays a critical role in guiding prospective students toward enrollment. We design and optimize digital platforms to ensure they are easy to navigate, informative, and optimized for search engines. Our goal is to create websites that answer questions clearly, build confidence, and encourage students to take the next step.",
      },
      {
        title: "Enrollment Growth & Engagement Strategies",
        description:
          "Beyond attracting inquiries, we help institutions develop strategies that nurture interest and guide students toward enrollment. By analyzing campaign performance and audience behavior, we continuously refine strategies to increase applications and long-term engagement.",
      },
    ],
    howWeWork: [
      {
        title: "Analyze & Strategize",
        description:
          "We begin by understanding your programs, target students, and competitive landscape to develop a digital strategy that supports your growth goals.",
      },
      {
        title: "Create & Execute",
        description:
          "Our team develops targeted campaigns, engaging content, and optimized digital experiences designed to attract and convert prospective students.",
      },
      {
        title: "Optimize & Scale",
        description:
          "Using analytics and performance insights, we refine strategies to increase inquiries, improve conversion rates, and grow enrollments consistently.",
      },
    ],
    whyChooseUs: [
      {
        title: "Education Industry Understanding",
        description:
          "We understand how students research institutions and create strategies that help your brand stand out.",
      },
      {
        title: "Data-Driven Marketing",
        description: "Every campaign is guided by insights and performance analytics to maximize results.",
      },
      {
        title: "Clear & Engaging Communication",
        description:
          "We create messaging that communicates your programs clearly while inspiring prospective students.",
      },
      {
        title: "Student-Centered Strategies",
        description: "Our approach focuses on attracting students who are genuinely interested in your programs.",
      },
      {
        title: "Complete Digital Growth Support",
        description:
          "From branding and marketing campaigns to website optimization and student acquisition strategies, we provide comprehensive support.",
      },
    ],
    serviceCards: [
      {
        title: "Student Acquisition Campaigns",
        description: "Digital campaigns designed to reach students actively searching for courses and programs.",
      },
      {
        title: "Education Brand Storytelling",
        description: "Content that highlights your institution's strengths and builds credibility.",
      },
      {
        title: "Enrollment-Focused Websites",
        description: "Websites designed to guide visitors toward inquiries and applications.",
      },
      {
        title: "Growth & Engagement Strategies",
        description: "Data-driven strategies that increase inquiries and support long-term student engagement.",
      },
    ],
    ctaTitle: "Let's Grow Your Education Brand",
    ctaDescription:
      "Partner with Stealth Digital to attract the right students, strengthen your reputation, and grow your educational programs with confidence.",
  },
  {
    slug: "e-commerce",
    name: "E-commerce",
    headline: "Stealth Digital Helps E-commerce Brands Turn Traffic into Revenue",
    subheading:
      "Attract the right shoppers, optimize conversions, and scale your online store with performance-driven digital strategies.",
    introTitle: "Accelerate Your E-commerce Growth with Digital Expertise",
    introParagraphs: [
      "The e-commerce landscape is more competitive than ever. Thousands of brands compete for attention, and today's shoppers explore multiple options before making a purchase. Success in this environment requires more than just having a store — it requires visibility, trust, and a seamless buying experience.",
      "Stealth Digital helps e-commerce businesses build strong digital visibility, attract high-intent shoppers, and convert visits into revenue. Through strategic marketing campaigns, optimized digital experiences, and data-driven growth strategies, we help brands stand out and scale sustainably.",
      "Our approach focuses on driving qualified traffic, improving user experience, and maximizing conversions, ensuring every visitor has the potential to become a customer.",
      "Whether you're a growing online brand, a D2C startup, or an established e-commerce store, we help you increase sales, strengthen brand loyalty, and unlock new growth opportunities.",
    ],
    coreServices: [
      {
        title: "Performance Marketing for E-commerce",
        description:
          "We design data-driven campaigns that bring high-intent shoppers directly to your store. Through paid search, social media advertising, and targeted campaigns, we ensure your products reach the right audience at the right moment. Our goal is simple: drive profitable traffic that converts into sales.",
      },
      {
        title: "Product Storytelling & Brand Experience",
        description:
          "In e-commerce, presentation influences purchase decisions. We help brands showcase products through compelling visuals, engaging descriptions, and strategic brand storytelling. This ensures your products not only get attention but also create confidence and desire among shoppers.",
      },
      {
        title: "Conversion-Optimized Storefronts",
        description:
          "A smooth and intuitive online shopping experience is critical for conversions. We optimize e-commerce websites to ensure they are fast, easy to navigate, and designed to encourage purchases. From product pages to checkout flow, every element is refined to reduce friction and improve sales performance.",
      },
      {
        title: "Customer Growth & Retention Strategies",
        description:
          "Building a successful e-commerce brand requires more than one-time sales. We help brands create strategies that increase repeat purchases and build long-term customer loyalty. Through performance tracking, audience insights, and campaign optimization, we ensure your store continues to grow sustainably over time.",
      },
    ],
    howWeWork: [
      {
        title: "Analyze & Strategize",
        description:
          "We study your products, target customers, and competitive landscape to identify growth opportunities and build a clear strategy.",
      },
      {
        title: "Create & Execute",
        description:
          "Our team launches targeted campaigns, optimized storefront experiences, and engaging brand content designed to attract and convert shoppers.",
      },
      {
        title: "Optimize & Scale",
        description:
          "Using real performance data, we continuously refine strategies to increase conversions, improve ROI, and scale your store efficiently.",
      },
    ],
    whyChooseUs: [
      {
        title: "E-commerce Growth Expertise",
        description: "We understand the dynamics of online retail and build strategies focused on revenue and scalability.",
      },
      {
        title: "Performance-Focused Marketing",
        description:
          "Every campaign is designed with measurable outcomes in mind, ensuring your marketing investment drives real results.",
      },
      {
        title: "Customer-Centered Experiences",
        description: "We optimize every digital touchpoint to create smooth and engaging shopping journeys.",
      },
      {
        title: "Creative Product Communication",
        description:
          "Our content and visual storytelling highlight your products in ways that capture attention and build trust.",
      },
      {
        title: "End-to-End Digital Support",
        description:
          "From marketing campaigns and brand storytelling to website optimization and conversion strategies, we support your entire growth journey.",
      },
    ],
    serviceCards: [
      {
        title: "Performance Marketing",
        description: "Targeted advertising campaigns that drive high-intent shoppers to your store.",
      },
      {
        title: "Product Storytelling",
        description: "Visual and written content that makes your products engaging and desirable.",
      },
      {
        title: "Conversion Optimization",
        description: "Store improvements that make shopping easier and increase purchase rates.",
      },
      {
        title: "Customer Growth Strategies",
        description: "Data-driven strategies designed to increase repeat purchases and long-term loyalty.",
      },
    ],
    ctaTitle: "Let's Scale Your E-commerce Brand",
    ctaDescription:
      "Partner with Stealth Digital to attract the right customers, increase conversions, and grow your online store with confidence.",
  },
];

export function getIndustryBySlug(slug: string) {
  return INDUSTRIES.find((i) => i.slug === slug);
}
