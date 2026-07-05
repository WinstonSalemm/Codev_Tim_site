import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ArticleNotePage } from "@/components/modules/knowledge-base";
import { JsonLdScript } from "@/components/seo";
import { loadArticleNote } from "@/lib/application/articles/load-article-note";
import { getArticle } from "@/lib/content";
import { buildArticleJsonLd, createArticleMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return {
      title: "Missing Module — Codev_Tim",
      robots: { index: false, follow: true },
    };
  }

  return createArticleMetadata(locale, article);
}

export default async function WritingDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = getArticle(slug);
  const note = loadArticleNote(slug, locale);

  if (!article || !note) {
    notFound();
  }

  const jsonLd = await buildArticleJsonLd(locale, article);

  const tModules = await getTranslations("modules");
  const tKnowledgeBase = await getTranslations("knowledgeBase");

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <ArticleNotePage
        header={{
          label: tModules("engineeringNote.label"),
          name: tModules("engineeringNote.name"),
          description: tModules("engineeringNote.description"),
        }}
        note={note}
        translations={{
          meta: {
            category: tKnowledgeBase("card.category"),
            cluster: tKnowledgeBase("card.cluster"),
            published: tKnowledgeBase("card.published"),
            modified: tKnowledgeBase("note.modified"),
            readingTime: tKnowledgeBase("card.readingTime"),
          },
          actions: {
            returnKnowledgeBase: tKnowledgeBase("note.returnKnowledgeBase"),
          },
        }}
      />
    </>
  );
}
