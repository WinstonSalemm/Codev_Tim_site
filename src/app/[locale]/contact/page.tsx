import { setRequestLocale } from "next-intl/server";
import { ContactPageContent } from "@/components/commerce/ContactPageContent";
import { findOffer, lang, resolvePublicOfferId } from "@/lib/commerce/catalog";
import { resolveEngagementId } from "@/lib/domain/contact";
import { JsonLdScript } from "@/components/seo";
import { buildContactJsonLd, createContactMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    engagement?: string | string[];
    offer?: string | string[];
  }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return createContactMetadata(locale);
}

export default async function ContactPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const jsonLd = await buildContactJsonLd(locale);
  const engagement = Array.isArray(query.engagement)
    ? query.engagement[0]
    : query.engagement;
  const offer = Array.isArray(query.offer) ? query.offer[0] : query.offer;
  const selected = findOffer(
    resolvePublicOfferId(offer ?? resolveEngagementId(engagement))
  );

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <ContactPageContent
        locale={lang(locale)}
        initialOffer={selected?.id ?? ""}
        at={new Date().toISOString()}
      />
    </>
  );
}
