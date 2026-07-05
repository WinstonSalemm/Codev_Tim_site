import type { ProductStatus } from "@/lib/content/types";
import type { RegistryCardVM } from "./view-models";

/** Canonical registry sort: In Development → Production → Experimental → Archived */
export const REGISTRY_STATUS_PRIORITY: Record<ProductStatus, number> = {
  "In Development": 0,
  Production: 1,
  Experimental: 2,
  Archived: 3,
};

function getStatusPriority(status: string): number {
  if (status in REGISTRY_STATUS_PRIORITY) {
    return REGISTRY_STATUS_PRIORITY[status as ProductStatus];
  }

  return Number.MAX_SAFE_INTEGER;
}

export function compareRegistryProductsByStatus(
  left: RegistryCardVM,
  right: RegistryCardVM
): number {
  const byStatus =
    getStatusPriority(left.status) - getStatusPriority(right.status);
  if (byStatus !== 0) {
    return byStatus;
  }

  return left.order - right.order;
}

export function sortRegistryProducts(
  products: RegistryCardVM[]
): RegistryCardVM[] {
  return [...products].sort(compareRegistryProductsByStatus);
}
