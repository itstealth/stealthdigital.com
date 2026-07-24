export interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  decimals?: number;
}

export const STATS: Stat[] = [
  { value: 505, suffix: "%", label: "Average ROAS For Our Clients" },
  { value: 17, suffix: "k+", label: "Conversions Driven Across Campaigns" },
  { value: 120, suffix: "%", label: "Organic Traffic Boost In 6 Months" },
  { value: 730, suffix: "%", label: "Lead Generation Growth" },
  { value: 110, suffix: "%", label: "Increase In Conversion Rate" },
  { value: 65, suffix: "%", label: "Reduction In Cost Per Lead" },
  { value: 1600, suffix: "%", label: "Brand Reach Expansion" },
  { value: 860, suffix: "%", label: "Engagement Rate Lift" },
  { value: 68.43, suffix: "%", label: "Bounce Rate Reduction", decimals: 2 },
  { value: 41.61, suffix: "%", label: "Faster Page Load Time", decimals: 2 },
];

export interface AgencyStat {
  value: string;
  label: string;
}

export const AGENCY_STATS: AgencyStat[] = [
  { value: "10+", label: "Years of Experience" },
  { value: "500+", label: "Projects Delivered" },
  { value: "200+", label: "Happy Clients" },
  { value: "₹50Cr+", label: "Revenue Generated For Clients" },
];