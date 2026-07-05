import { routing } from "@/i18n/routing";
import { getArticles } from "@/lib/content";
import { getProjects } from "@/lib/content/projects";
import { getSiteUrl } from "./site-url";

export type SitemapPageType =
  | "dashboard"
  | "registry"
  | "principles"
  | "writing"
  | "about"
  | "contact"
  | "project"
  | "article";

export type SitemapEntry = {
  pathSuffix: string;
  pageType: SitemapPageType;
  lastModified: Date;
};

const STATIC_MODULE_SUFFIXES = [
  { pathSuffix: "", pageType: "dashboard" as const },
  { pathSuffix: "/projects", pageType: "registry" as const },
  { pathSuffix: "/principles", pageType: "principles" as const },
  { pathSuffix: "/writing", pageType: "writing" as const },
  { pathSuffix: "/about", pageType: "about" as const },
  { pathSuffix: "/contact", pageType: "contact" as const },
];

const SITEMAP_PRIORITY: Record<SitemapPageType, number> = {
  dashboard: 1,
  registry: 0.9,
  project: 0.8,
  about: 0.8,
  writing: 0.8,
  principles: 0.7,
  article: 0.7,
  contact: 0.6,
};

const SITEMAP_CHANGEFREQ: Record<
  SitemapPageType,
  "weekly" | "monthly" | "yearly"
> = {
  dashboard: "weekly",
  registry: "weekly",
  project: "monthly",
  about: "monthly",
  principles: "monthly",
  writing: "weekly",
  article: "monthly",
  contact: "yearly",
};

function buildLocalePath(locale: string, pathSuffix: string): string {
  return `${getSiteUrl()}/${locale}${pathSuffix}`;
}

export function getSitemapPriority(pageType: SitemapPageType): number {
  return SITEMAP_PRIORITY[pageType];
}

export function getSitemapChangeFrequency(
  pageType: SitemapPageType
): "weekly" | "monthly" | "yearly" {
  return SITEMAP_CHANGEFREQ[pageType];
}

export function getStaticModuleSitemapEntries(): SitemapEntry[] {
  const lastModified = new Date();

  return STATIC_MODULE_SUFFIXES.map((entry) => ({
    ...entry,
    lastModified,
  }));
}

export function getProjectSitemapEntries(): SitemapEntry[] {
  const lastModified = new Date();

  return getProjects().map((project) => ({
    pathSuffix: `/projects/${project.slug}`,
    pageType: "project" as const,
    lastModified,
  }));
}

export function getArticleSitemapEntries(): SitemapEntry[] {
  return getArticles().map((article) => ({
    pathSuffix: `/writing/${article.slug}`,
    pageType: "article" as const,
    lastModified: new Date(article.dateModified),
  }));
}

export function getAllSitemapEntries(): SitemapEntry[] {
  return [
    ...getStaticModuleSitemapEntries(),
    ...getProjectSitemapEntries(),
    ...getArticleSitemapEntries(),
  ];
}

export function buildSitemapAlternateLanguages(
  pathSuffix: string
): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[locale] = buildLocalePath(locale, pathSuffix);
  }

  languages["x-default"] = buildLocalePath(routing.defaultLocale, pathSuffix);

  return languages;
}

export function getSitemapIndexLastModified(): Date {
  const timestamps = getAllSitemapEntries().map((entry) => entry.lastModified);
  return new Date(Math.max(...timestamps.map((value) => value.getTime())));
}
