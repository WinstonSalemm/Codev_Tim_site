import { createCachedLoader } from "./internal/cache";
import { loadTechnologyStack } from "./internal/sources";
import type {
  SearchableMetadata,
  TechnologyLayer,
  TechnologyStack,
} from "./types";
import { getSiteConfig } from "./config";

const getCachedTechnologyStack = createCachedLoader(loadTechnologyStack);

export function getTechnologyStack(): TechnologyStack {
  return getCachedTechnologyStack();
}

export function getTechnologies(): TechnologyLayer[] {
  return getTechnologyStack().layers;
}

export function getTechnologyTags(): string[] {
  return getTechnologyStack().topTags;
}

export function getTechnologySearchMetadata(): SearchableMetadata[] {
  const stack = getTechnologyStack();
  const { defaultLocale } = getSiteConfig();

  return stack.layers.map((layer) => ({
    id: `technology:${layer.id}`,
    title: layer.label,
    slug: layer.id,
    summary: `${layer.count} technologies`,
    tags: stack.topTags,
    keywords: [layer.label, layer.id, ...stack.topTags],
    category: "technology",
    language: defaultLocale,
    href: "/about#stack",
  }));
}
