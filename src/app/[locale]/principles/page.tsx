import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { PrinciplesPage } from "@/components/modules/engineering-protocols";
import { JsonLdScript } from "@/components/seo";
import { loadPrinciplesPage } from "@/lib/application";
import { buildPrinciplesJsonLd, createPrinciplesMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return createPrinciplesMetadata(locale);
}

export default async function PrinciplesPageRoute({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tModules, tPrinciples, page, jsonLd] = await Promise.all([
    getTranslations("modules"),
    getTranslations("engineeringProtocolsPage"),
    loadPrinciplesPage(locale),
    buildPrinciplesJsonLd(locale),
  ]);

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <PrinciplesPage
        header={{
          label: tModules("engineeringProtocols.label"),
          name: tModules("engineeringProtocols.name"),
          description: tModules("engineeringProtocols.description"),
        }}
        page={page}
        translations={{
          regionLabel: tPrinciples("regionLabel"),
          protocolLabel: tPrinciples("protocolLabel"),
          registeredCount: tPrinciples("registeredCount", {
            count: page.count,
          }),
          exampleLabel: tPrinciples("exampleLabel"),
          intro: {
            heading: tPrinciples("intro.heading"),
            lead: tPrinciples("intro.lead"),
            body: tPrinciples("intro.body"),
          },
        }}
      />
    </>
  );
}
