import { routing } from "@/i18n/routing";

export function getSiteUrl(): string {
  return (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

export function buildAlternateLanguages(
  pathSuffix: string
): Record<string, string> {
  const siteUrl = getSiteUrl();
  const normalizedSuffix = pathSuffix.startsWith("/")
    ? pathSuffix
    : `/${pathSuffix}`;
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[locale] = `${siteUrl}/${locale}${normalizedSuffix}`;
  }

  languages["x-default"] =
    `${siteUrl}/${routing.defaultLocale}${normalizedSuffix}`;

  return languages;
}

export function getDashboardCanonicalUrl(locale: string): string {
  return `${getSiteUrl()}/${locale}`;
}

export function getDashboardAlternateLanguages(): Record<string, string> {
  return buildAlternateLanguages("");
}

export function getProjectCanonicalUrl(locale: string, slug: string): string {
  return `${getSiteUrl()}/${locale}/projects/${slug}`;
}

export function getProjectAlternateLanguages(
  slug: string
): Record<string, string> {
  return buildAlternateLanguages(`/projects/${slug}`);
}

export function getRegistryCanonicalUrl(locale: string): string {
  return `${getSiteUrl()}/${locale}/projects`;
}

export function getRegistryAlternateLanguages(): Record<string, string> {
  return buildAlternateLanguages("/projects");
}

export function getAboutCanonicalUrl(locale: string): string {
  return `${getSiteUrl()}/${locale}/about`;
}

export function getAboutAlternateLanguages(): Record<string, string> {
  return buildAlternateLanguages("/about");
}

export function getPrinciplesCanonicalUrl(locale: string): string {
  return `${getSiteUrl()}/${locale}/principles`;
}

export function getPrinciplesAlternateLanguages(): Record<string, string> {
  return buildAlternateLanguages("/principles");
}

export function getWritingCanonicalUrl(locale: string): string {
  return `${getSiteUrl()}/${locale}/writing`;
}

export function getWritingAlternateLanguages(): Record<string, string> {
  return buildAlternateLanguages("/writing");
}

export function getArticleCanonicalUrl(locale: string, slug: string): string {
  return `${getSiteUrl()}/${locale}/writing/${slug}`;
}

export function getArticleAlternateLanguages(
  slug: string
): Record<string, string> {
  return buildAlternateLanguages(`/writing/${slug}`);
}

export function getContactCanonicalUrl(locale: string): string {
  return `${getSiteUrl()}/${locale}/contact`;
}

export function getContactAlternateLanguages(): Record<string, string> {
  return buildAlternateLanguages("/contact");
}

export function getPersonId(locale: string): string {
  return `${getAboutCanonicalUrl(locale)}#person`;
}

export function getWritingFeedUrl(locale: string): string {
  const siteUrl = getSiteUrl();

  if (locale === routing.defaultLocale) {
    return `${siteUrl}/feed.xml`;
  }

  return `${siteUrl}/${locale}/feed.xml`;
}
