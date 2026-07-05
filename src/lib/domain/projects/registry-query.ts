import type { RegistryCardVM } from "./view-models";
import {
  DEFAULT_REGISTRY_SORT,
  REGISTRY_STATUS_PARAMS,
  type RegistryQueryState,
  type RegistrySortParam,
  type RegistryStatusParam,
} from "./query-types";
import { compareRegistryProductsByStatus } from "./sorting";

export {
  DEFAULT_REGISTRY_SORT,
  REGISTRY_SORT_PARAMS,
  REGISTRY_STATUS_PARAMS,
  type RegistryQueryState,
  type RegistrySortParam,
  type RegistryStatusParam,
} from "./query-types";

export function domainToFilterParam(domain: string): string {
  return domain.trim().toLowerCase().replace(/\s+/g, "-");
}

export function statusToFilterParam(
  status: string
): RegistryStatusParam | undefined {
  const entry = Object.entries(REGISTRY_STATUS_PARAMS).find(
    ([, label]) => label === status
  );
  return entry ? (entry[0] as RegistryStatusParam) : undefined;
}

export function resolveStatusFilter(
  param: RegistryStatusParam | undefined
): string | undefined {
  if (!param) {
    return undefined;
  }

  return REGISTRY_STATUS_PARAMS[param];
}

function sortWithStatusFirst(
  products: RegistryCardVM[],
  statusLabel: string
): RegistryCardVM[] {
  return [...products].sort((left, right) => {
    const leftMatch = left.status === statusLabel ? 0 : 1;
    const rightMatch = right.status === statusLabel ? 0 : 1;

    if (leftMatch !== rightMatch) {
      return leftMatch - rightMatch;
    }

    return compareRegistryProductsByStatus(left, right);
  });
}

export function sortRegistryProductsByQuery(
  products: RegistryCardVM[],
  sort: RegistrySortParam = DEFAULT_REGISTRY_SORT
): RegistryCardVM[] {
  switch (sort) {
    case "title":
      return [...products].sort((left, right) =>
        left.title.localeCompare(right.title)
      );
    case "order":
      return [...products].sort((left, right) => left.order - right.order);
    case "production":
      return sortWithStatusFirst(products, "Production");
    case "in-development":
      return sortWithStatusFirst(products, "In Development");
    case "experimental":
      return sortWithStatusFirst(products, "Experimental");
    case "archived":
      return sortWithStatusFirst(products, "Archived");
    case "lifecycle":
    default:
      return [...products].sort(compareRegistryProductsByStatus);
  }
}

function matchesDomainFilter(
  product: RegistryCardVM,
  domainParam: string
): boolean {
  const normalized = domainParam.toLowerCase();
  const domainSlug = domainToFilterParam(product.domain);

  if (domainSlug === normalized || domainSlug.includes(normalized)) {
    return true;
  }

  if (product.slug.includes(normalized)) {
    return true;
  }

  if (product.cluster?.toLowerCase().includes(normalized)) {
    return true;
  }

  return product.tags.some((tag) => tag.toLowerCase().includes(normalized));
}

function matchesSearchFilter(product: RegistryCardVM, query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return true;
  }

  const haystack = [
    product.title,
    product.slug,
    product.subtitle,
    product.domain,
    product.summary,
    product.status,
    product.cluster ?? "",
    ...product.stack,
    ...product.tags,
    product.blueprintPreview,
  ]
    .join(" ")
    .toLowerCase();

  return normalized
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => haystack.includes(token));
}

export function filterRegistryProducts(
  products: RegistryCardVM[],
  status?: string,
  domainParam?: string,
  search?: string
): RegistryCardVM[] {
  return products.filter((product) => {
    if (status && product.status !== status) {
      return false;
    }

    if (domainParam && !matchesDomainFilter(product, domainParam)) {
      return false;
    }

    if (search && !matchesSearchFilter(product, search)) {
      return false;
    }

    return true;
  });
}

export function applyRegistryQuery(
  products: RegistryCardVM[],
  query: RegistryQueryState
): RegistryCardVM[] {
  const statusFilter = resolveStatusFilter(query.status);

  const filtered = filterRegistryProducts(
    products,
    statusFilter,
    query.domain,
    query.search
  );

  return sortRegistryProductsByQuery(filtered, query.sort);
}

export function listRegistryDomains(products: RegistryCardVM[]): string[] {
  return [...new Set(products.map((product) => product.domain))].sort();
}

export function hasActiveRegistryFilters(query: RegistryQueryState): boolean {
  return Boolean(
    query.status ||
    query.domain ||
    query.search ||
    (query.sort && query.sort !== DEFAULT_REGISTRY_SORT)
  );
}
