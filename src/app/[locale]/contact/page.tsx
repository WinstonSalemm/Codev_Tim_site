import { setRequestLocale } from "next-intl/server";
import { ModulePlaceholderPage } from "@/components/modules/shared/ModulePlaceholderPage";
import { JsonLdScript } from "@/components/seo";
import { buildContactJsonLd, createContactMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return createContactMetadata(locale);
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const jsonLd = await buildContactJsonLd(locale);

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <ModulePlaceholderPage moduleId="communicationModule" />
    </>
  );
}
