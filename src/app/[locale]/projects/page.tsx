import { setRequestLocale } from "next-intl/server";
import { Portfolio } from "@/components/commerce/Portfolio";
import { JsonLdScript } from "@/components/seo";
import { lang } from "@/lib/commerce/catalog";
import { PORTFOLIO, PORTFOLIO_COPY } from "@/lib/portfolio";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getSiteUrl, buildAlternateLanguages } from "@/lib/seo/site-url";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = PORTFOLIO_COPY[lang(locale)];
  return buildPageMetadata({
    locale,
    title: t.title + " | Codev_Tim",
    description: t.lead,
    canonical: getSiteUrl() + "/" + locale + "/projects",
    alternateLanguages: buildAlternateLanguages("/projects"),
    ogImageAlt: t.title + " | Codev_Tim",
  });
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = lang(locale);
  const url = getSiteUrl() + "/" + locale + "/projects";
  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": url,
          name: PORTFOLIO_COPY[l].title,
          url,
          inLanguage: l,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: PORTFOLIO.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.name,
              url: url + "/" + p.slug,
            })),
          },
        }}
      />
      <Portfolio locale={l} />
    </>
  );
}
