import { createCachedLoader } from "./internal/cache";
import { listProjectRegistryMeta } from "./project-registry";
import type { Product, ProductsRegistry, SearchableMetadata } from "./types";
import { getSiteConfig } from "./config";

function formatBlueprintPreview(architecture: string[]): string {
  return architecture.join(" → ");
}

function resolveLatestSlug(
  metas: ReturnType<typeof listProjectRegistryMeta>
): string {
  const featured = metas.find((meta) => meta.featured);
  if (featured) {
    return featured.slug;
  }

  const sorted = [...metas].sort((left, right) => left.order - right.order);
  return sorted[0]?.slug ?? "";
}

function buildProductsRegistry(): ProductsRegistry {
  const metas = listProjectRegistryMeta();

  return {
    latestSlug: resolveLatestSlug(metas),
    products: metas.map((meta) => ({
      slug: meta.slug,
      title: meta.title,
      subtitle: meta.subtitle,
      status: meta.status,
      cluster: meta.tags[0] ?? null,
      blueprintPreview: formatBlueprintPreview(meta.architecture),
    })),
  };
}

const getCachedProductsRegistry = createCachedLoader(buildProductsRegistry);

export function getProductsRegistry(): ProductsRegistry {
  return getCachedProductsRegistry();
}

export function getProjects(): Product[] {
  return getProductsRegistry().products;
}

export function getProject(slug: string): Product | undefined {
  return getProjects().find((product) => product.slug === slug);
}

export function getFeaturedProject(): Product | undefined {
  const registry = getProductsRegistry();
  return getProject(registry.latestSlug) ?? getProjects()[0];
}

export function getLatestProjectSlug(): string {
  return getProductsRegistry().latestSlug;
}

export function getProjectSearchMetadata(): SearchableMetadata[] {
  const { defaultLocale } = getSiteConfig();

  return listProjectRegistryMeta().map((meta) => ({
    id: `project:${meta.slug}`,
    title: meta.title,
    slug: meta.slug,
    summary: meta.summary,
    tags: [meta.status, ...meta.tags].filter(Boolean),
    keywords: [
      meta.title,
      meta.slug,
      meta.subtitle,
      meta.domain,
      meta.summary,
      meta.status,
      ...meta.stack,
      ...meta.tags,
    ].filter(Boolean),
    category: "project",
    language: defaultLocale,
    href: `/projects/${meta.slug}`,
  }));
}
