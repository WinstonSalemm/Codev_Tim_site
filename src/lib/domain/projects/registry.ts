import {
  getProjectRegistryEntry,
  listProjectRegistry,
  resolveProjectRegistrySlug,
} from "@/lib/content/project-registry";
import {
  mapProjectContentToDetail,
  mapProjectContentToRegistryCard,
} from "./mappers";
import { sortRegistryProducts } from "./sorting";
import type {
  ProductMetricsVM,
  ProductRegistryVM,
  ProjectDetailVM,
  RegistryCardVM,
} from "./view-models";

function listRegistryCards(): RegistryCardVM[] {
  return listProjectRegistry().map(mapProjectContentToRegistryCard);
}

function countByStatus(products: RegistryCardVM[], status: string): number {
  return products.filter((product) => product.status === status).length;
}

export function calculateProductMetrics(): ProductMetricsVM {
  const products = listRegistryCards();

  return {
    registered: products.length,
    production: countByStatus(products, "Production"),
    inDevelopment: countByStatus(products, "In Development"),
    experimental: countByStatus(products, "Experimental"),
    archived: countByStatus(products, "Archived"),
  };
}

export function resolveLatestProjectSlug(): string {
  const entries = listProjectRegistry();
  const featured = entries.find((entry) => entry.meta.featured);

  if (featured) {
    return featured.meta.slug;
  }

  const sorted = sortRegistryProducts(
    entries.map(mapProjectContentToRegistryCard)
  );
  return sorted[0]?.slug ?? entries[0]?.meta.slug ?? "";
}

export function buildProductRegistry(): ProductRegistryVM {
  const products = sortRegistryProducts(listRegistryCards());
  const metrics = calculateProductMetrics();

  return {
    latestSlug: resolveLatestProjectSlug(),
    products,
    metrics,
  };
}

export function selectFeaturedProducts(): RegistryCardVM[] {
  return sortRegistryProducts(
    listRegistryCards().filter((product) => product.featured)
  );
}

export function selectProductionProducts(): RegistryCardVM[] {
  return sortRegistryProducts(
    listRegistryCards().filter((product) => product.status === "Production")
  );
}

export function selectDevelopmentProducts(): RegistryCardVM[] {
  return sortRegistryProducts(
    listRegistryCards().filter((product) => product.status === "In Development")
  );
}

export function selectArchivedProducts(): RegistryCardVM[] {
  return sortRegistryProducts(
    listRegistryCards().filter((product) => product.status === "Archived")
  );
}

export function buildProjectViewModel(
  slug: string
): RegistryCardVM | undefined {
  const resolved = resolveProjectRegistrySlug(slug);
  const entry = getProjectRegistryEntry(resolved);
  return entry ? mapProjectContentToRegistryCard(entry) : undefined;
}

export function buildProjectDetailViewModel(
  slug: string
): ProjectDetailVM | undefined {
  const resolved = resolveProjectRegistrySlug(slug);
  const entry = getProjectRegistryEntry(resolved);
  return entry ? mapProjectContentToDetail(entry) : undefined;
}

export function resolveProjectSlug(slug: string): string {
  return resolveProjectRegistrySlug(slug);
}
