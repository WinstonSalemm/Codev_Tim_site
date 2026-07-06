import { buildProductRegistry } from "@/lib/domain/projects/registry";
import { buildRegistryGroupedView } from "@/lib/domain/projects/registry-sections";
import {
  applyRegistryQuery,
  hasActiveRegistryFilters,
  listRegistryDomains,
} from "@/lib/domain/projects/registry-query";
import {
  DEFAULT_REGISTRY_SORT,
  REGISTRY_SORT_PARAMS,
  REGISTRY_STATUS_PARAMS,
  type RegistryQueryState,
  type RegistrySortParam,
  type RegistryStatusParam,
} from "@/lib/domain/projects/query-types";

export type {
  RegistryGroupedVM,
  RegistryWorkClusterVM,
} from "@/lib/domain/projects/registry-sections";
export type {
  RegistryQueryState,
  RegistrySortParam,
  RegistryStatusParam,
} from "@/lib/domain/projects/registry-query";

export {
  DEFAULT_REGISTRY_SORT,
  REGISTRY_SORT_PARAMS,
  REGISTRY_STATUS_PARAMS,
  domainToFilterParam,
  hasActiveRegistryFilters,
} from "@/lib/domain/projects/registry-query";

function parseStatusParam(
  param: string | undefined
): RegistryStatusParam | undefined {
  if (!param || !(param in REGISTRY_STATUS_PARAMS)) {
    return undefined;
  }

  return param as RegistryStatusParam;
}

function parseSortParam(param: string | undefined): RegistrySortParam {
  if (!param || !(param in REGISTRY_SORT_PARAMS)) {
    return DEFAULT_REGISTRY_SORT;
  }

  return param as RegistrySortParam;
}

export function parseRegistryQuery(params: {
  status?: string;
  domain?: string;
  search?: string;
  sort?: string;
}): RegistryQueryState {
  return {
    status: parseStatusParam(params.status),
    domain: params.domain?.trim() || undefined,
    search: params.search?.trim() || undefined,
    sort: parseSortParam(params.sort),
  };
}

export function buildRegistrySearchParams(
  state: RegistryQueryState
): URLSearchParams {
  const params = new URLSearchParams();

  if (state.status) {
    params.set("status", state.status);
  }

  if (state.domain) {
    params.set("domain", state.domain);
  }

  if (state.search) {
    params.set("search", state.search);
  }

  if (state.sort && state.sort !== DEFAULT_REGISTRY_SORT) {
    params.set("sort", state.sort);
  }

  return params;
}

export function buildRegistryQueryString(state: RegistryQueryState): string {
  return buildRegistrySearchParams(state).toString();
}

export function loadFilteredProductRegistry(rawParams: {
  status?: string;
  domain?: string;
  search?: string;
  sort?: string;
}) {
  const registry = buildProductRegistry();
  const query = parseRegistryQuery(rawParams);

  return {
    metrics: registry.metrics,
    catalog: registry.products,
    products: applyRegistryQuery(registry.products, query),
    grouped: buildRegistryGroupedView(
      applyRegistryQuery(registry.products, query)
    ),
    useGroupedLayout: !hasActiveRegistryFilters(query),
    domains: listRegistryDomains(registry.products),
    query,
  };
}
