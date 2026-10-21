import type { MetadataRoute } from "next";
import { services } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

const pages = [
  { path: "/", priority: 1 },
  { path: "/services", priority: 0.9 },
  ...services.map((s) => ({ path: `/services/${s.slug}`, priority: 0.8 })),
  { path: "/quote", priority: 0.8 },
  { path: "/locations", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
  { path: "/about", priority: 0.6 },
  { path: "/resources", priority: 0.6 },
  { path: "/insights", priority: 0.5 },
  { path: "/careers", priority: 0.5 },
  { path: "/client-portal", priority: 0.3 },
  { path: "/partners", priority: 0.3 },
  { path: "/privacy", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority }) => ({ url: `${siteUrl}${path}`, priority }));
}
