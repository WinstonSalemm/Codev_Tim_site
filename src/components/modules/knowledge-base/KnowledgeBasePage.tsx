import { ModuleHeader } from "@/components/ui/ModuleHeader";
import type {
  KnowledgeBasePageVM,
  KnowledgeBaseQueryState,
} from "@/lib/application";
import { ArticleCard } from "./ArticleCard";
import { KnowledgeBaseEmptyState } from "./KnowledgeBaseEmptyState";
import {
  KnowledgeBaseFilterBar,
  KnowledgeBaseFilteredEmptyState,
} from "./KnowledgeBaseFilterBar";
import { KnowledgeBasePagination } from "./KnowledgeBasePagination";

type KnowledgeBasePageProps = {
  header: {
    label: string;
    name: string;
    description: string;
  };
  data: KnowledgeBasePageVM;
  query: KnowledgeBaseQueryState;
  isRegistryEmpty: boolean;
  translations: {
    summary: {
      registered: string;
    };
    filters: {
      regionLabel: string;
      tag: string;
      cluster: string;
      category: string;
      allTags: string;
      allClusters: string;
      allCategories: string;
      clear: string;
    };
    list: {
      regionLabel: string;
      card: {
        category: string;
        cluster: string;
        published: string;
        readingTime: string;
        readingTimeValue: string;
        openNote: string;
      };
    };
    empty: {
      registry: string;
      filtered: string;
      clear: string;
    };
    pagination: {
      regionLabel: string;
      previous: string;
      next: string;
      page: string;
    };
  };
};

export function KnowledgeBasePage({
  header,
  data,
  query,
  isRegistryEmpty,
  translations,
}: KnowledgeBasePageProps) {
  const hasActiveFilters = Boolean(
    query.tag || query.cluster || query.category
  );
  const showRegistryEmpty = isRegistryEmpty;
  const showFilteredEmpty =
    !isRegistryEmpty && hasActiveFilters && data.notes.length === 0;

  return (
    <div className="ds-kb-page">
      <ModuleHeader
        label={header.label}
        name={header.name}
        description={header.description}
      />

      <div className="ds-kb-body">
        <p className="ds-kb-summary">
          {translations.summary.registered.replace(
            "{count}",
            String(data.total)
          )}
        </p>

        {!showRegistryEmpty ? (
          <KnowledgeBaseFilterBar
            query={query}
            filterOptions={data.filterOptions}
            labels={translations.filters}
          />
        ) : null}

        {showRegistryEmpty ? (
          <KnowledgeBaseEmptyState message={translations.empty.registry} />
        ) : showFilteredEmpty ? (
          <KnowledgeBaseFilteredEmptyState
            labels={{
              message: translations.empty.filtered,
              clear: translations.empty.clear,
            }}
          />
        ) : (
          <>
            <section
              className="ds-kb-list"
              aria-label={translations.list.regionLabel}
            >
              {data.notes.map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  labels={translations.list.card}
                />
              ))}
            </section>

            <KnowledgeBasePagination
              page={data.page}
              totalPages={data.totalPages}
              query={query}
              labels={translations.pagination}
            />
          </>
        )}
      </div>
    </div>
  );
}
