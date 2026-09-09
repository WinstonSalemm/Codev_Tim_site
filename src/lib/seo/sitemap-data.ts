import { routing } from "@/i18n/routing";
import { PORTFOLIO } from "@/lib/portfolio";
import { SERVICE_LANDING_SLUGS } from "@/lib/commerce/service-landings";
import { getSiteUrl } from "./site-url";
export type SitemapPageType =
  | "dashboard"
  | "registry"
  | "principles"
  | "writing"
  | "about"
  | "contact"
  | "service"
  | "project"
  | "article";
export type SitemapEntry = {
  pathSuffix: string;
  pageType: SitemapPageType;
  lastModified: Date;
};
// Actual content revision, not the date of each crawler request.
const CONTENT_UPDATED = new Date("2026-09-09T00:00:00+05:00");
export function getSitemapPriority(type: SitemapPageType) {
  return type === "dashboard" ? 1 : type === "registry" ? 0.9 : 0.7;
}
export function getSitemapChangeFrequency(
  type: SitemapPageType
): "weekly" | "monthly" | "yearly" {
  return type === "dashboard" ? "weekly" : "monthly";
}
export function getStaticModuleSitemapEntries(): SitemapEntry[] {
  return [
    { pathSuffix: "", pageType: "dashboard" },
    { pathSuffix: "/projects", pageType: "registry" },
    { pathSuffix: "/about", pageType: "about" },
    { pathSuffix: "/contact", pageType: "contact" },
  ].map((p) => ({
    ...p,
    pageType: p.pageType as SitemapPageType,
    lastModified: CONTENT_UPDATED,
  }));
}
export function getProjectSitemapEntries(): SitemapEntry[] {
  return PORTFOLIO.map((p) => ({
    pathSuffix: "/projects/" + p.slug,
    pageType: "project",
    lastModified: CONTENT_UPDATED,
  }));
}
export function getServiceSitemapEntries(): SitemapEntry[] {
  return SERVICE_LANDING_SLUGS.map((slug) => ({
    pathSuffix: `/services/${slug}`,
    pageType: "service",
    lastModified: CONTENT_UPDATED,
  }));
}
export function getArticleSitemapEntries(): SitemapEntry[] {
  return [];
}
export function getAllSitemapEntries() {
  return [
    ...getStaticModuleSitemapEntries(),
    ...getServiceSitemapEntries(),
    ...getProjectSitemapEntries(),
  ];
}
export function buildSitemapAlternateLanguages(
  pathSuffix: string
): Record<string, string> {
  return {
    ...Object.fromEntries(
      routing.locales.map((l) => [l, getSiteUrl() + "/" + l + pathSuffix])
    ),
    "x-default": getSiteUrl() + "/" + routing.defaultLocale + pathSuffix,
  };
}
export function getSitemapIndexLastModified() {
  return CONTENT_UPDATED;
}
