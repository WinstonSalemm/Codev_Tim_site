import { getTranslations } from "next-intl/server";
import { loadDashboardCards } from "@/lib/application";
import { DashboardCardMotion } from "./motion";

export async function DashboardGrid() {
  const [t, cards] = await Promise.all([
    getTranslations("dashboard"),
    Promise.resolve(loadDashboardCards()),
  ]);

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
