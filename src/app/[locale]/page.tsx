import { setRequestLocale } from "next-intl/server";
import { SalesPage } from "@/components/commerce/SalesPage";
import { lang } from "@/lib/commerce/catalog";
import { JsonLdScript } from "@/components/seo";
import { createDashboardMetadata, buildDashboardJsonLd } from "@/lib/seo";
export const dynamic = "force-dynamic";
type PageProps = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: PageProps) {
  return createDashboardMetadata((await params).locale);
}
export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <JsonLdScript data={await buildDashboardJsonLd(locale)} />
      <SalesPage locale={lang(locale)} at={new Date().toISOString()} />
    </>
  );
}
