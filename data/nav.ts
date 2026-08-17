export interface NavItem {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const CORE_SERVICES: NavGroup = {
  label: "Services",
  items: [
    { label: "SEO", href: "/services/search-engine-optimization" },
    { label: "SEM / PPC", href: "/services/search-engine-marketing" },
    { label: "Social Media", href: "/services/social-media-marketing" },
    { label: "Web Design", href: "/services/website-design-development" },
  ],
};

export const BUSINESS_OBJECTIVES: NavGroup = {
  label: "Work With Us",
  items: [
    { label: "About Us", href: "/about-us" },
    { label: "Case Studies", href: "/#work" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact-us" },
  ],
};

export const MAIN_NAV: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about-us" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact-us" },
];