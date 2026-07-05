"use server";

import { getTranslations } from "next-intl/server";
import type { ContentLocale } from "@/lib/content/types";
import type { PaletteSearchResultVM } from "@/lib/domain/search";
import { executePaletteSearch } from "./palette-search";

const MODULE_NAV_KEYS = new Set([
  "operationsCenter",
  "productRegistry",
  "engineeringProtocols",
  "knowledgeBase",
  "engineerProfile",
  "communicationModule",
]);

export async function searchCommandPalette(
  query: string,
  locale: string
): Promise<PaletteSearchResultVM[]> {
  const results = executePaletteSearch(query, {
    locale: locale as ContentLocale,
  });

  if (results.every((result) => result.group !== "module")) {
    return results;
  }

  const t = await getTranslations({ locale, namespace: "shell.nav" });

  return results.map((result) => {
    if (result.group !== "module") {
      return result;
    }

    const moduleId = result.id.replace("module:", "");
    if (!MODULE_NAV_KEYS.has(moduleId)) {
      return result;
    }

    return {
      ...result,
      title: t(moduleId),
    };
  });
}
