import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { lang } from "@/lib/commerce/catalog";
import { SHOWCASES, SHOWCASE_COPY, isShowcaseSlug } from "@/lib/showcases";
import { ShowcaseViewer } from "@/components/commerce/ShowcaseViewer";
import { routing } from "@/i18n/routing";
import { getSiteUrl, buildAlternateLanguages } from "@/lib/seo/site-url";

type Props = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    Object.keys(SHOWCASES).map((slug) => ({ locale, slug }))
  );
}
export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  if (!isShowcaseSlug(slug)) return {};
  return {
    title: `${SHOWCASES[slug].title} · ${SHOWCASE_COPY[lang(locale)].demo}`,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `${getSiteUrl()}/${locale}/projects/${slug}/demo`,
      languages: buildAlternateLanguages(`/projects/${slug}/demo`),
    },
  };
}
export default async function DemoPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isShowcaseSlug(slug)) notFound();
  setRequestLocale(locale);
  const l = lang(locale);
  return (
    <div className="sales-page showcase-page">
      <Link className="portfolio-back" href={`/projects/${slug}`}>
        ← {SHOWCASE_COPY[l].back}
      </Link>
      <h1>{SHOWCASES[slug].title}</h1>
      <ShowcaseViewer slug={slug} locale={l} standalone />
    </div>
  );
}
