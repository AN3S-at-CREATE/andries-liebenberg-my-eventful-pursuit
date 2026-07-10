// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.

import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://an3s.info";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

// Company detail pages (mirror slugs in src/data/companies.ts)
const companySlugs = [
  "360-vision-events-group",
  "360-vision-events-cleaning",
  "strydom-projects",
  "maono-moja-events",
  "k-and-d-resources",
  "adventure-freaksa",
  "odm-studio",
  "bobby-verd",
  "rubies-and-pearls",
  "prisma-entertainment",
];

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/expertise", changefreq: "monthly", priority: "0.8" },
  { path: "/expertise/events-management", changefreq: "monthly", priority: "0.6" },
  { path: "/expertise/marketing", changefreq: "monthly", priority: "0.6" },
  { path: "/expertise/sales", changefreq: "monthly", priority: "0.6" },
  { path: "/expertise/development", changefreq: "monthly", priority: "0.6" },
  { path: "/expertise/business-growth", changefreq: "monthly", priority: "0.6" },
  { path: "/expertise/mentorship", changefreq: "monthly", priority: "0.6" },
  { path: "/ai", changefreq: "monthly", priority: "0.8" },
  { path: "/ai/eventpulse", changefreq: "monthly", priority: "0.6" },
  { path: "/ai/lynkie-sky", changefreq: "monthly", priority: "0.6" },
  { path: "/ai/neurologix", changefreq: "monthly", priority: "0.6" },
  { path: "/ai/custom-models", changefreq: "monthly", priority: "0.6" },
  { path: "/showcase", changefreq: "monthly", priority: "0.7" },
  { path: "/downloads", changefreq: "monthly", priority: "0.5" },
  { path: "/companies", changefreq: "weekly", priority: "0.8" },
  ...companySlugs.map((slug) => ({
    path: `/companies/${slug}`,
    changefreq: "monthly" as const,
    priority: "0.6",
  })),
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
  { path: "/cookie-policy", changefreq: "yearly", priority: "0.3" },
];

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
