import { setRequestLocale } from "next-intl/server";
import { ModuleHeader } from "@/components/ui/ModuleHeader";
import { DashboardSkeleton } from "@/components/modules/dashboard";
import { DashboardPageMotion } from "@/components/modules/dashboard/motion";
import { ServicesHeroCtas } from "@/components/modules/services";
import { JsonLdScript } from "@/components/seo";
import { createDashboardMetadata, buildDashboardJsonLd } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return createDashboardMetadata(locale);
}

export default async function LocaleIndexPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [tServices, jsonLd] = await Promise.all([
    getTranslations("services"),
    buildDashboardJsonLd(locale),
  ]);

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <div className="ds-dashboard-page">
        <DashboardPageMotion>
          <ModuleHeader
            label={tServices("hero.eyebrow")}
            name={tServices("hero.title")}
            description={tServices("hero.description")}
            className="ds-module-header--services"
          />
          <ServicesHeroCtas />
          <DashboardSkeleton />
        </DashboardPageMotion>
      </div>
    </>
  );
}
