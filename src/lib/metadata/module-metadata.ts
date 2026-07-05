import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { ModuleId } from "@/lib/shell";

export async function createModuleMetadata(
  locale: string,
  moduleId: ModuleId
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t(`${moduleId}.title`),
    description: t(`${moduleId}.description`),
  };
}
