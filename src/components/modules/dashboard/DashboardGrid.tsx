import { getTranslations } from "next-intl/server";
import { loadDashboardCards, type DashboardCardTexts } from "@/lib/application";
import type { ActivityMessageTemplates } from "@/lib/application";
import { DashboardCardMotion } from "./motion";

export async function DashboardGrid() {
  const t = await getTranslations("dashboard");

  const texts: DashboardCardTexts = {
    productsPreview: t.raw("cardTexts.productsPreview") as string,
    noProducts: t("cardTexts.noProducts"),
    registered: t("cardTexts.registered"),
    production: t("cardTexts.production"),
    inDevelopment: t("cardTexts.inDevelopment"),
    latest: t("cardTexts.latest"),
    notesPreview: t.raw("cardTexts.notesPreview") as string,
    noPublishedNotes: t("cardTexts.noPublishedNotes"),
    published: t("cardTexts.published"),
    status: t("cardTexts.status"),
    registryEmpty: t("cardTexts.registryEmpty"),
    layersPreview: t.raw("cardTexts.layersPreview") as string,
    period: t("cardTexts.period"),
    organization: t("cardTexts.organization"),
    product: t("cardTexts.product"),
    blueprint: t("cardTexts.blueprint"),
    noActivity: t("cardTexts.noActivity"),
    protocolsPreview: t.raw("cardTexts.protocolsPreview") as string,
    module: t("cardTexts.module"),
    engineeringProtocols: t("cardTexts.engineeringProtocols"),
  };

  const activityTemplates: ActivityMessageTemplates = {
    module_accessed: t.raw("activityLog.actions.module_accessed") as string,
    session_started: t.raw("activityLog.actions.session_started") as string,
    session_restored: t.raw("activityLog.actions.session_restored") as string,
    system_event: t.raw("activityLog.actions.system_event") as string,
    query_executed: t.raw("activityLog.actions.query_executed") as string,
  };

  const cards = loadDashboardCards(texts, activityTemplates);
  const moduleLabel = t("cards.moduleLabel");

  return (
    <section className="ds-dashboard-grid" aria-label={t("regions.cards")}>
      {cards.map((card, index) => (
        <DashboardCardMotion
          key={card.id}
          card={card}
          moduleLabel={moduleLabel}
          title={t(card.titleKey)}
          staggerIndex={index}
        />
      ))}
    </section>
  );
}
