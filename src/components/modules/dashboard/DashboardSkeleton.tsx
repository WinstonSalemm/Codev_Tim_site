import { OperationsCenterHeader } from "./OperationsCenterHeader";
import { DashboardGrid } from "./DashboardGrid";
import { ActivityLog } from "./activity-log";
import { QuickActions } from "./QuickActions";

export async function DashboardSkeleton() {
  return (
    <div className="ds-dashboard">
      <OperationsCenterHeader />
      <DashboardGrid />

      <div className="ds-dashboard-secondary">
        <ActivityLog />
        <QuickActions />
      </div>
    </div>
  );
}
