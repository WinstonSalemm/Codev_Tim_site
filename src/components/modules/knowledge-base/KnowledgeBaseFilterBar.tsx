"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import {
  buildKnowledgeBaseQueryString,
  type KnowledgeBaseQueryState,
} from "@/lib/application";

type KnowledgeBaseFilteredEmptyStateProps = {
  labels: {
    message: string;
    clear: string;
  };
};

export function KnowledgeBaseFilteredEmptyState({
  labels,
}: KnowledgeBaseFilteredEmptyStateProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="ds-kb-empty" role="status">
      <p className="ds-kb-empty-message">{labels.message}</p>
      <button
        type="button"
        className="ds-kb-filter-clear"
        onClick={() => router.push(pathname, { scroll: false })}
      >
        {labels.clear}
      </button>
    </div>
  );
}

type KnowledgeBaseFilterBarProps = {
  query: KnowledgeBaseQueryState;
  filterOptions: {
    tags: string[];
    clusters: string[];
    categories: string[];
  };
  labels: {
    regionLabel: string;
    tag: string;
    cluster: string;
    category: string;
    allTags: string;
    allClusters: string;
    allCategories: string;
    clear: string;
  };
};

export function KnowledgeBaseFilterBar({
  query,
  filterOptions,
  labels,
}: KnowledgeBaseFilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const pushQuery = (next: KnowledgeBaseQueryState) => {
    const queryString = buildKnowledgeBaseQueryString(next);
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const updateQuery = (patch: Partial<KnowledgeBaseQueryState>) => {
    pushQuery({
      ...query,
      ...patch,
      page: 1,
    });
  };

  const hasFilters = Boolean(query.tag || query.cluster || query.category);

  return (
    <section className="ds-kb-filters" aria-label={labels.regionLabel}>
      <div className="ds-kb-filters-row">
        <label className="ds-kb-filter-field">
          <span className="ds-kb-filter-label">{labels.tag}</span>
          <select
            className="ds-kb-filter-select"
            value={query.tag ?? ""}
            onChange={(event) =>
              updateQuery({ tag: event.target.value || undefined })
            }
          >
            <option value="">{labels.allTags}</option>
            {filterOptions.tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>

        <label className="ds-kb-filter-field">
          <span className="ds-kb-filter-label">{labels.cluster}</span>
          <select
            className="ds-kb-filter-select"
            value={query.cluster ?? ""}
            onChange={(event) =>
              updateQuery({ cluster: event.target.value || undefined })
            }
          >
            <option value="">{labels.allClusters}</option>
            {filterOptions.clusters.map((cluster) => (
              <option key={cluster} value={cluster}>
                {cluster}
              </option>
            ))}
          </select>
        </label>

        <label className="ds-kb-filter-field">
          <span className="ds-kb-filter-label">{labels.category}</span>
          <select
            className="ds-kb-filter-select"
            value={query.category ?? ""}
            onChange={(event) =>
              updateQuery({
                category: (event.target.value ||
                  undefined) as KnowledgeBaseQueryState["category"],
              })
            }
          >
            <option value="">{labels.allCategories}</option>
            {filterOptions.categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        {hasFilters ? (
          <button
            type="button"
            className="ds-kb-filter-clear"
            onClick={() =>
              pushQuery({
                page: 1,
                tag: undefined,
                cluster: undefined,
                category: undefined,
              })
            }
          >
            {labels.clear}
          </button>
        ) : null}
      </div>
    </section>
  );
}
