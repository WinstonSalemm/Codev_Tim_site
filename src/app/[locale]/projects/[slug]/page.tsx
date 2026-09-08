import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PortfolioDetail } from "@/components/commerce/Portfolio";
import { JsonLdScript } from "@/components/seo";
import { lang } from "@/lib/commerce/catalog";
import { PORTFOLIO, findPortfolioProject } from "@/lib/portfolio";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getSiteUrl, buildAlternateLanguages } from "@/lib/seo/site-url";
import { resolveProjectOgImagePath } from "@/lib/seo/resolve-project-og-image";
type Props = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PORTFOLIO.map((p) => ({ locale, slug: p.slug }))
  );
}
export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const p = findPortfolioProject(slug);
  if (!p) return {};
  return buildPageMetadata({
    locale,
    title: p.name + " | Codev_Tim",
    description: p.description[lang(locale)],
    canonical: getSiteUrl() + "/" + locale + "/projects/" + slug,
    alternateLanguages: buildAlternateLanguages("/projects/" + slug),
    ogImageAlt: p.name,
    ogImagePath: resolveProjectOgImagePath(slug),
  });
}
export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const p = findPortfolioProject(slug);
  if (!p) notFound();
  const l = lang(locale);
  const url = getSiteUrl() + "/" + locale + "/projects/" + slug;
  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "@id": url + "#project",
          name: p.name,
          description: p.description[l],
          url,
          inLanguage: l,
          creator: { "@id": getSiteUrl() + "/#person" },
          ...(p.repository && !p.client ? { sameAs: p.repository } : {}),
        }}
      />
      <PortfolioDetail project={p} locale={l} />
    </>
  );
}
