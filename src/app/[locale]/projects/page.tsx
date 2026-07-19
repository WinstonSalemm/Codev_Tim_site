import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ModulePageEnterMotion } from "@/components/modules/dashboard/motion";
import { ProductRegistryPage } from "@/components/modules/product-registry";
import { JsonLdScript } from "@/components/seo";
import { loadFilteredProductRegistry } from "@/lib/application";
import { buildRegistryJsonLd, createRegistryMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    status?: string;
    domain?: string;
    search?: string;
    sort?: string;
  }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return createRegistryMetadata(locale);
}

export default async function ProjectsPage({
  params,
  searchParams,
}: PageProps) {
  const { locale } = await params;
  const rawSearchParams = await searchParams;
  setRequestLocale(locale);

  const registry = loadFilteredProductRegistry(rawSearchParams);
  const jsonLd = await buildRegistryJsonLd(locale, registry.catalog);

  const [t, tModules] = await Promise.all([
    getTranslations("productRegistry"),
    getTranslations("modules"),
  ]);

  const statusLabels = {
    "In Development": t("status.inDevelopment"),
    Production: t("status.production"),
    Experimental: t("status.experimental"),
    Archived: t("status.archived"),
  };

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <ModulePageEnterMotion>
        <ProductRegistryPage
          header={{
            label: tModules("productRegistry.label"),
            name: tModules("productRegistry.name"),
            description: tModules("productRegistry.description"),
          }}
          breadcrumb={{
            ariaLabel: t("breadcrumb.ariaLabel"),
            operationsCenter: t("breadcrumb.operationsCenter"),
            productRegistry: t("breadcrumb.productRegistry"),
          }}
          metrics={registry.metrics}
          products={registry.products}
          grouped={registry.grouped}
          useGroupedLayout={registry.useGroupedLayout}
          domains={registry.domains}
          query={registry.query}
          translations={{
            summary: {
              regionLabel: t("summary.regionLabel"),
              registered: t("summary.registered"),
              inDevelopment: t("summary.inDevelopment"),
              production: t("summary.production"),
              experimental: t("summary.experimental"),
              archived: t("summary.archived"),
            },
            filters: {
              regionLabel: t("filters.regionLabel"),
              status: t("filters.status"),
              domain: t("filters.domain"),
              search: t("filters.search"),
              searchPlaceholder: t("filters.searchPlaceholder"),
              sort: t("filters.sort"),
              allStatuses: t("filters.allStatuses"),
              allDomains: t("filters.allDomains"),
              allSorts: t("filters.allSorts"),
              clear: t("filters.clear"),
              sortOptions: {
                lifecycle: t("filters.sortLifecycle"),
                production: t("filters.sortProduction"),
                "in-development": t("filters.sortInDevelopment"),
                experimental: t("filters.sortExperimental"),
                archived: t("filters.sortArchived"),
                title: t("filters.sortTitle"),
                order: t("filters.sortOrder"),
              },
            },
            list: {
              regionLabel: t("list.regionLabel"),
              card: {
                stack: t("card.stack"),
                architecture: t("card.architecture"),
                lifecycle: t("card.lifecycle"),
                version: t("card.version"),
                since: t("card.since"),
                domain: t("card.domain"),
                openProject: t("card.openProject"),
                metrics: t("card.metrics"),
              },
            },
            grouped: {
              ownProducts: t("sections.ownProducts"),
              ownProductsHint: t("sections.ownProductsHint"),
              works: t("sections.works"),
              worksHint: t("sections.worksHint"),
              otherProjects: t("sections.otherProjects"),
              cluster: {
                expand: t("cluster.expand"),
                collapse: t("cluster.collapse"),
                openSite: t("cluster.openSite"),
              },
              card: {
                stack: t("card.stack"),
                architecture: t("card.architecture"),
                lifecycle: t("card.lifecycle"),
                version: t("card.version"),
                since: t("card.since"),
                domain: t("card.domain"),
                openProject: t("card.openProject"),
                metrics: t("card.metrics"),
              },
            },
            empty: {
              message: t("empty.message"),
              clear: t("empty.clear"),
            },
            footer: {
              source: t("footer.source"),
              recordCount: t("footer.recordCount", {
                count: registry.metrics.registered,
              }),
              returnOps: t("footer.returnOps"),
            },
            status: statusLabels,
          }}
        />
      </ModulePageEnterMotion>
    </>
  );
}
