import { setRequestLocale } from "next-intl/server";
import { CommunicationModulePage } from "@/components/modules/communication";
import { JsonLdScript } from "@/components/seo";
import { buildContactJsonLd, createContactMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ engagement?: string | string[] }>;
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

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <CommunicationModulePage engagement={engagement} />
    </>
  );
}
