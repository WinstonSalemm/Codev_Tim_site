import type { RegistryCardVM } from "@/lib/domain/projects";
import {
  loadProductRegistry,
  loadProjectCard,
  resolveProjectSlug,
} from "../projects";

/** Registered products for terminal listing — single registry source. */
export function listRegisteredProducts(): RegistryCardVM[] {
  return loadProductRegistry().products;
}

/** Resolve slug aliases and load a registered product card. */
export function findRegisteredProduct(
  slug: string
): RegistryCardVM | undefined {
  return loadProjectCard(slug);
}

export function getRegisteredProductPath(slug: string): string | null {
  const product = findRegisteredProduct(slug);
  return product ? `/projects/${product.slug}` : null;
}

export { resolveProjectSlug as resolveRegisteredProductSlug };
