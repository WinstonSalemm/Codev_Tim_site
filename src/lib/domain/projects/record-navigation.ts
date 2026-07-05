import {
  listProjectRegistry,
  resolveProjectRegistrySlug,
} from "@/lib/content/project-registry";
import { mapProjectContentToRegistryCard } from "./mappers";
import { sortRegistryProducts } from "./sorting";
import type {
  ProjectRecordNavLinkVM,
  ProjectRecordNavigationVM,
} from "./view-models";

export function resolveAdjacentProjectRecords(
  slug: string
): ProjectRecordNavigationVM {
  const resolved = resolveProjectRegistrySlug(slug);
  const products = sortRegistryProducts(
    listProjectRegistry().map(mapProjectContentToRegistryCard)
  );
  const index = products.findIndex((product) => product.slug === resolved);

  if (index === -1) {
    return {};
  }

  const previousProduct = index > 0 ? products[index - 1] : undefined;
  const nextProduct =
    index < products.length - 1 ? products[index + 1] : undefined;

  const toNavLink = (
    product: (typeof products)[number] | undefined
  ): ProjectRecordNavLinkVM | undefined => {
    if (!product) {
      return undefined;
    }

    return {
      slug: product.slug,
      title: product.title,
    };
  };

  return {
    previous: toNavLink(previousProduct),
    next: toNavLink(nextProduct),
  };
}
