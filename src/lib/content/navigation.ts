import type { ContentNavigationItem, SearchableMetadata } from "./types";
import { getSiteConfig } from "./config";

const NAVIGATION_ITEMS: ContentNavigationItem[] = [
  {
    id: "operationsCenter",
    href: "/",
    title: "Operations Center",
    shortTitle: "Ops",
    category: "module",
  },
  {
    id: "productRegistry",
    href: "/projects",
    title: "Product Registry",
    shortTitle: "Projects",
    category: "module",
  },
  {
    id: "engineeringProtocols",
    href: "/principles",
    title: "Engineering Protocols",
    shortTitle: "Protocols",
    category: "module",
  },
  {
    id: "knowledgeBase",
    href: "/writing",
    title: "Knowledge Base",
    shortTitle: "Notes",
    category: "module",
  },
  {
    id: "engineerProfile",
    href: "/about",
    title: "Engineer Profile",
    shortTitle: "Profile",
    category: "module",
  },
  {
    id: "communicationModule",
    href: "/contact",
    title: "Communication Module",
    shortTitle: "Contact",
    category: "module",
  },
];

export function getNavigation(): ContentNavigationItem[] {
  return NAVIGATION_ITEMS;
}

export function getNavigationItem(
  id: string
): ContentNavigationItem | undefined {
  return NAVIGATION_ITEMS.find((item) => item.id === id);
}

export function getNavigationSearchMetadata(): SearchableMetadata[] {
  const { defaultLocale } = getSiteConfig();

  return getNavigation().map((item) => ({
    id: `module:${item.id}`,
    title: item.title,
    slug: item.id,
    summary: item.shortTitle,
    tags: ["module", item.category],
    keywords: [item.title, item.shortTitle, item.id, item.href],
    category: "module",
    language: defaultLocale,
    href: item.href,
  }));
}
