"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  buildRegistryQueryString,
  DEFAULT_REGISTRY_SORT,
  domainToFilterParam,
  REGISTRY_SORT_PARAMS,
  REGISTRY_STATUS_PARAMS,
  type RegistryQueryState,
  type RegistrySortParam,
  type RegistryStatusParam,
} from "@/lib/application";

const SEARCH_DEBOUNCE_MS = 300;

type RegistryFilterBarProps = {
  domains: string[];
  query: RegistryQueryState;
  labels: {
    regionLabel: string;
    status: string;
    domain: string;
    search: string;
    searchPlaceholder: string;
    sort: string;
    allStatuses: string;
    allDomains: string;
    allSorts: string;
    clear: string;
    sortOptions: Record<RegistrySortParam, string>;
  };
  statusLabels: Record<string, string>;
};

export function RegistryFilterBar({
  domains,
  query,
  labels,
  statusLabels,
}: RegistryFilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(query.search ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queryRef = useRef(query);

  queryRef.current = query;

  useEffect(() => {
    setSearchValue(query.search ?? "");
  }, [query.search]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const pushQuery = useCallback(
    (next: RegistryQueryState) => {
      const queryString = buildRegistryQueryString(next);
      startTransition(() => {
        router.push(queryString ? `${pathname}?${queryString}` : pathname, {
          scroll: false,
        });
      });
    },
    [pathname, router]
  );

  const updateQuery = useCallback(
    (patch: Partial<RegistryQueryState>) => {
      pushQuery({ ...queryRef.current, ...patch });
    },
    [pushQuery]
  );

  const handleStatusChange = (value: string) => {
    updateQuery({
      status: value ? (value as RegistryStatusParam) : undefined,
    });
  };

  const handleDomainChange = (value: string) => {
    updateQuery({ domain: value || undefined });
  };

  const handleSortChange = (value: string) => {
    const sort = (value || DEFAULT_REGISTRY_SORT) as RegistrySortParam;
    updateQuery({
      sort: sort === DEFAULT_REGISTRY_SORT ? DEFAULT_REGISTRY_SORT : sort,
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      updateQuery({ search: value.trim() || undefined });
    }, SEARCH_DEBOUNCE_MS);
  };

  const handleClear = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    setSearchValue("");
    pushQuery({});
  };

  const hasFilters = Boolean(
    query.status ||
    query.domain ||
    query.search ||
    (query.sort && query.sort !== DEFAULT_REGISTRY_SORT)
  );

  return (
    <section
      className={`ds-registry-filters${isPending ? "ds-registry-filters--pending" : ""}`}
      aria-label={labels.regionLabel}
    >
      <div className="ds-registry-filters-row">
        <label className="ds-registry-filter">
          <span className="ds-registry-filter-label">{labels.status}</span>
          <select
            className="ds-registry-filter-select"
            value={query.status ?? ""}
            onChange={(event) => handleStatusChange(event.target.value)}
            aria-label={labels.status}
          >
            <option value="">{labels.allStatuses}</option>
            {Object.entries(REGISTRY_STATUS_PARAMS).map(([param, status]) => (
              <option key={param} value={param}>
                {statusLabels[status] ?? status}
              </option>
            ))}
          </select>
        </label>

        <label className="ds-registry-filter">
          <span className="ds-registry-filter-label">{labels.domain}</span>
          <select
            className="ds-registry-filter-select"
            value={query.domain ?? ""}
            onChange={(event) => handleDomainChange(event.target.value)}
            aria-label={labels.domain}
          >
            <option value="">{labels.allDomains}</option>
            {domains.map((domain) => (
              <option key={domain} value={domainToFilterParam(domain)}>
                {domain}
              </option>
            ))}
          </select>
        </label>

        <label className="ds-registry-filter">
          <span className="ds-registry-filter-label">{labels.sort}</span>
          <select
            className="ds-registry-filter-select"
            value={query.sort ?? DEFAULT_REGISTRY_SORT}
            onChange={(event) => handleSortChange(event.target.value)}
            aria-label={labels.sort}
          >
            {Object.entries(REGISTRY_SORT_PARAMS).map(([param]) => (
              <option key={param} value={param}>
                {labels.sortOptions[param as RegistrySortParam]}
              </option>
            ))}
          </select>
        </label>

        {hasFilters ? (
          <button
            type="button"
            className="ds-registry-filter-clear"
            onClick={handleClear}
          >
            {labels.clear}
          </button>
        ) : null}
      </div>

      <label className="ds-registry-filter ds-registry-filter--search">
        <span className="ds-registry-filter-label">{labels.search}</span>
        <input
          type="search"
          className="ds-registry-filter-input"
          value={searchValue}
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder={labels.searchPlaceholder}
          aria-label={labels.search}
          enterKeyHint="search"
          autoComplete="off"
        />
      </label>
    </section>
  );
}
