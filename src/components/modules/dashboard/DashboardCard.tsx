import { Link } from "@/i18n/navigation";
import type { DashboardCardVM } from "@/lib/application";
import { CardMetrics } from "./CardMetrics";
import { CardSignal } from "./CardSignal";

type DashboardCardProps = {
  card: DashboardCardVM;
  moduleLabel: string;
  title: string;
};

export function DashboardCard({
  card,
  moduleLabel,
  title,
}: DashboardCardProps) {
  return (
    <Link
      href={card.href}
      className="ds-dashboard-card"
      aria-label={`${title}: ${card.preview}`}
    >
      <CardSignal />
      <p className="ds-dashboard-card-module ds-text-label">{moduleLabel}</p>
      <h2 className="ds-dashboard-card-title">{title}</h2>
      <p className="ds-dashboard-card-preview">{card.preview}</p>
      <CardMetrics metrics={card.metrics} />
    </Link>
  );
}
