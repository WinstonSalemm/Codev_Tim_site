import type { SiteShellConfig } from "@/lib/shell";
import { createCachedLoader } from "./internal/cache";
import { loadEngineerIdentity, loadSiteConfig } from "./internal/sources";
import type { EngineerIdentity, SiteConfig } from "./types";

const getCachedSiteConfig = createCachedLoader(loadSiteConfig);
const getCachedEngineerIdentity = createCachedLoader(loadEngineerIdentity);

export function getSiteConfig(): SiteConfig {
  return getCachedSiteConfig();
}

export function getEngineerIdentity(): EngineerIdentity {
  return getCachedEngineerIdentity();
}

/** Shell-facing projection — keeps AppShell decoupled from full site config. */
export function getSiteShellConfig(): SiteShellConfig {
  const config = getSiteConfig();

  return {
    name: config.name,
    version: config.version,
    status: config.status,
    mission: config.mission,
    author: {
      timezone: config.author.timezone,
    },
    availability: {
      label: config.availability.label,
    },
    contacts: {
      telegramHref: config.contacts.telegram[0]?.href ?? null,
      phoneHref: config.contacts.phones[0]?.href ?? null,
      instagramHref: config.social.instagram?.trim() || null,
    },
  };
}

export function getSiteSearchMetadata() {
  const config = getSiteConfig();

  return [
    {
      id: "site:config",
      title: config.name,
      slug: "site",
      summary: config.mission,
      tags: ["site", "operations"],
      keywords: [config.name, config.mission, config.author.name],
      category: "site" as const,
      language: config.defaultLocale,
      href: `/${config.defaultLocale}`,
    },
  ];
}
