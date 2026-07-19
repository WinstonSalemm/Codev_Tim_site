import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { KnowledgeBasePage } from "@/components/modules/knowledge-base";
import { JsonLdScript } from "@/components/seo";
import { isKnowledgeBaseEmpty, loadKnowledgeBasePage } from "@/lib/application";
import { buildWritingJsonLd, createWritingMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    tag?: string;
    cluster?: string;
    category?: string;
    page?: string;
    q?: string;
  }>;
};

export async function generateMetadata({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const { q } = await searchParams;
  return createWritingMetadata(locale, { noindex: Boolean(q?.trim()) });
}

export default async function WritingPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const rawSearchParams = await searchParams;
  setRequestLocale(locale);

  const { page, query } = loadKnowledgeBasePage(rawSearchParams);
  const jsonLd = await buildWritingJsonLd(locale);

  const [tModules, tKnowledgeBase] = await Promise.all([
    getTranslations("modules"),
    getTranslations("knowledgeBase"),
  ]);

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <KnowledgeBasePage
        header={{
          label: tModules("knowledgeBase.label"),
          name: tModules("knowledgeBase.name"),
          description: tModules("knowledgeBase.description"),
        }}
        data={page}
        query={query}
        isRegistryEmpty={isKnowledgeBaseEmpty()}
        translations={{
          summary: {
            registered: tKnowledgeBase.raw("summary.registered") as string,
          },
          filters: {
            regionLabel: tKnowledgeBase("filters.regionLabel"),
            tag: tKnowledgeBase("filters.tag"),
            cluster: tKnowledgeBase("filters.cluster"),
            category: tKnowledgeBase("filters.category"),
            allTags: tKnowledgeBase("filters.allTags"),
            allClusters: tKnowledgeBase("filters.allClusters"),
            allCategories: tKnowledgeBase("filters.allCategories"),
            clear: tKnowledgeBase("filters.clear"),
          },
          list: {
            regionLabel: tKnowledgeBase("list.regionLabel"),
            card: {
              category: tKnowledgeBase("card.category"),
              cluster: tKnowledgeBase("card.cluster"),
              published: tKnowledgeBase("card.published"),
              readingTime: tKnowledgeBase("card.readingTime"),
              readingTimeValue: tKnowledgeBase.raw(
                "card.readingTimeValue"
              ) as string,
              openNote: tKnowledgeBase("card.openNote"),
            },
          },
          empty: {
            registry: tKnowledgeBase("empty.registry"),
            filtered: tKnowledgeBase("empty.filtered"),
            clear: tKnowledgeBase("empty.clear"),
          },
          pagination: {
            regionLabel: tKnowledgeBase("pagination.regionLabel"),
            previous: tKnowledgeBase("pagination.previous"),
            next: tKnowledgeBase("pagination.next"),
            page: tKnowledgeBase.raw("pagination.page") as string,
          },
        }}
      />
    </>
  );
}
