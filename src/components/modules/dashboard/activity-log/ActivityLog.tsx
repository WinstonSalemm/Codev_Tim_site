import { getTranslations } from "next-intl/server";
import { loadStaticActivityRecords } from "@/lib/application";
import { ActivityFeed } from "./ActivityFeed";

export async function ActivityLog() {
  const [t, staticEntries] = await Promise.all([
    getTranslations("dashboard.activityLog"),
    Promise.resolve(loadStaticActivityRecords()),
  ]);

  return (
    <section
      id="activity-log"
      className="ds-activity-log"
      aria-label={t("regionLabel")}
    >
      <header className="ds-activity-log-header">
        <p className="ds-activity-log-label ds-text-label">{t("label")}</p>
        <h2 className="ds-activity-log-title">{t("title")}</h2>
      </header>
      <ActivityFeed staticEntries={staticEntries} />
    </section>
  );
}
