import { ModuleHeader } from "@/components/ui/ModuleHeader";
import type {
  ProductMetricsVM,
  RegistryCardVM,
  RegistryGroupedVM,
  RegistryQueryState,
} from "@/lib/application";
import type { ProductCardLabels } from "./ProductCard";
import { ProjectList } from "./ProjectList";
import {
  RegistryGroupedList,
  type RegistryGroupedListLabels,
} from "./RegistryGroupedList";
import { RegistryBreadcrumb } from "./RegistryBreadcrumb";
import { RegistryEmptyState } from "./RegistryEmptyState";
import { RegistryFilterBar } from "./RegistryFilterBar";
import { RegistryFooter } from "./RegistryFooter";
import { RegistrySummary } from "./RegistrySummary";

type ProductRegistryPageProps = {
  header: {
    label: string;
    name: string;
    description: string;
  };
  breadcrumb: {
    ariaLabel: string;
    operationsCenter: string;
    productRegistry: string;
  };
  metrics: ProductMetricsVM;
  products: RegistryCardVM[];
  grouped: RegistryGroupedVM;
  useGroupedLayout: boolean;
  domains: string[];
  query: RegistryQueryState;
  translations: {
    summary: {
      regionLabel: string;
      registered: string;
      inDevelopment: string;
      production: string;
      experimental: string;
      archived: string;
    };
    filters: {
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
      sortOptions: Record<
        | "lifecycle"
        | "production"
        | "in-development"
        | "experimental"
        | "archived"
        | "title"
        | "order",
        string
      >;
    };
    list: {
      regionLabel: string;
      card: ProductCardLabels;
    };
    grouped: RegistryGroupedListLabels;
    empty: {
      message: string;
      clear: string;
    };
    footer: {
      source: string;
      recordCount: string;
      returnOps: string;
    };
    status: Record<string, string>;
  };
};

export function ProductRegistryPage({
  header,
  breadcrumb,
  metrics,
  products,
  grouped,
  useGroupedLayout,
  domains,
  query,
  translations,
}: ProductRegistryPageProps) {
  const isEmpty = products.length === 0;

  return (
    <div className="ds-registry-page">
      <RegistryBreadcrumb labels={breadcrumb} />

      <ModuleHeader
        label={header.label}
        name={header.name}
        description={header.description}
      />

      <div className="ds-registry-page-motion ds-registry-body">
        <RegistrySummary metrics={metrics} labels={translations.summary} />

        <RegistryFilterBar
          domains={domains}
          query={query}
          labels={translations.filters}
          statusLabels={translations.status}
        />

        {isEmpty ? (
          <RegistryEmptyState labels={translations.empty} />
        ) : useGroupedLayout ? (
          <RegistryGroupedList
            grouped={grouped}
            labels={translations.grouped}
            statusLabels={translations.status}
          />
        ) : (
          <ProjectList
            products={products}
            labels={translations.list}
            statusLabels={translations.status}
          />
        )}

        <RegistryFooter
          recordCountLabel={translations.footer.recordCount}
          labels={{
            source: translations.footer.source,
            returnOps: translations.footer.returnOps,
          }}
        />
      </div>
    </div>
  );
}
