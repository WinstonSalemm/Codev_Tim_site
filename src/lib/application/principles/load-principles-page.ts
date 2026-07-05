import { getTranslations } from "next-intl/server";
import { getPrinciples } from "@/lib/content";
import { buildPrinciplesPage } from "@/lib/domain/principles";

export async function loadPrinciplesPage(locale: string) {
  const t = await getTranslations({
    locale,
    namespace: "engineeringProtocolsPage",
  });

  const protocols = getPrinciples().map((principle) => ({
    id: principle.id,
    number: principle.number,
    title: t(`protocols.${principle.id}.title`),
    summary: t(`protocols.${principle.id}.summary`),
    body: t(`protocols.${principle.id}.body`),
    example: t(`protocols.${principle.id}.example`),
  }));

  return buildPrinciplesPage(protocols);
}
