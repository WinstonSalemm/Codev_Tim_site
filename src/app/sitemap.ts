import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import {
  buildSitemapAlternateLanguages,
  getAllSitemapEntries,
  getSitemapChangeFrequency,
  getSitemapPriority,
} from "@/lib/seo/sitemap-data";
import { getSiteUrl } from "@/lib/seo/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = getAllSitemapEntries();
  const urls: MetadataRoute.Sitemap = [];

  for (const entry of entries) {
    for (const locale of routing.locales) {
      urls.push({
        url: `${getSiteUrl()}/${locale}${entry.pathSuffix}`,
        lastModified: entry.lastModified,
        changeFrequency: getSitemapChangeFrequency(entry.pageType),
        priority: getSitemapPriority(entry.pageType),
        alternates: {
          languages: buildSitemapAlternateLanguages(entry.pathSuffix),
        },
      });
    }
  }

  return urls;
}
