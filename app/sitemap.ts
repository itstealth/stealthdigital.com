import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";
import { SERVICES } from "@/data/services";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://stealthdigital.in";
  const blogSlugs = await getAllSlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about-us`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/our-digital-agency`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact-us`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.7 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${base}/blog/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}