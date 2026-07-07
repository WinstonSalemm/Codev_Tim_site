import { setRequestLocale } from "next-intl/server";
import { ModuleHeader } from "@/components/ui/ModuleHeader";
import { DashboardSkeleton } from "@/components/modules/dashboard";
import { DashboardPageMotion } from "@/components/modules/dashboard/motion";
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
  const t = await getTranslations("modules");
  const jsonLd = buildDashboardJsonLd(locale);

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <div className="ds-dashboard-page">
        <DashboardPageMotion>
          <ModuleHeader
            label={t("operationsCenter.label")}
            name={t("operationsCenter.name")}
            description={t("operationsCenter.description")}
            variant="brand"
          />
          <DashboardSkeleton />
        </DashboardPageMotion>
      </div>
    </>
  );
}
