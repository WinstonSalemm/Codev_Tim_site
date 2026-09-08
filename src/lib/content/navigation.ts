import type { ContentNavigationItem, SearchableMetadata } from "./types";
import { getSiteConfig } from "./config";

const NAVIGATION_ITEMS: ContentNavigationItem[] = [
  {
    id: "operationsCenter",
    href: "/",
    title: "Главная и цены",
    shortTitle: "Ops",
    category: "module",
  },
  {
    id: "productRegistry",
    href: "/projects",
    title: "Проекты",
    shortTitle: "Projects",
    category: "module",
  },
  {
    id: "engineerProfile",
    href: "/about",
    title: "Обо мне",
    shortTitle: "Profile",
    category: "module",
  },
  {
    id: "communicationModule",
    href: "/contact",
    title: "Контакты",
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
