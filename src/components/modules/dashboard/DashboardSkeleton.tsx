import { getTranslations } from "next-intl/server";
import { OperationsCenterHeader } from "./OperationsCenterHeader";
import { DashboardGrid } from "./DashboardGrid";
import { ActivityLog } from "./activity-log";

export async function DashboardSkeleton() {
  const t = await getTranslations("dashboard.regions");

  return (
    <div className="ds-dashboard">
      <OperationsCenterHeader />
      <DashboardGrid />

      <div className="ds-dashboard-secondary">
        <ActivityLog />
        <section
          className="ds-dashboard-quick-actions"
          aria-label={t("quickActions")}
        />
      </div>

      <section className="ds-dashboard-terminal" aria-label={t("terminal")} />
    </div>
  );
}
