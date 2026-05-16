import { MetadataRoute } from "next";
import { ARTICLES } from "@/content/articles";

const BASE = "https://windykatorstop.pl";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/generator-pism`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/skrypt-rozmowy`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/epu`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/wiedza`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/ekspertyza`, lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${BASE}/dla-prawnikow`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/praca`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/prywatnosc`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const articlePages: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${BASE}/wiedza/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly" as const,
    priority: a.urgent ? 0.85 : 0.7,
  }));

  return [...staticPages, ...articlePages];
}
