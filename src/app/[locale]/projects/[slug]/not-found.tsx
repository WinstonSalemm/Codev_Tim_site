import { getTranslations } from "next-intl/server";
import { ProjectNotFound } from "@/components/modules/engineering-record";
import { createNotFoundMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return createNotFoundMetadata(locale);
}

export default async function ProjectSlugNotFound() {
  const t = await getTranslations("engineeringRecord.notFound");

  return (
    <ProjectNotFound
      labels={{
        message: t("message"),
        returnRegistry: t("returnRegistry"),
      }}
    />
  );
}
