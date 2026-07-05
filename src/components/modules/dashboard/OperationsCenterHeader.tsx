import { getTranslations } from "next-intl/server";
import { loadHeaderInformation } from "@/lib/application";
import { OperationsCenterHeaderItem } from "./OperationsCenterHeaderItem";

export async function OperationsCenterHeader() {
  const [t, data] = await Promise.all([
    getTranslations("dashboard.header"),
    Promise.resolve(loadHeaderInformation()),
  ]);

  const statusLabel = t(`statusValues.${data.status}`);

  return (
    <section className="ds-oc-header" aria-label={t("regionLabel")}>
      <dl className="ds-oc-header-grid">
        <OperationsCenterHeaderItem
          label={t("fields.systemStatus")}
          value={
            <span
              className="ds-oc-header-status-value"
              aria-label={t("statusAria")}
            >
              <span
                className="ds-oc-header-status-dot ds-status-dot-operational"
                aria-hidden="true"
              />
              <span aria-hidden="true">{statusLabel}</span>
            </span>
          }
          valueClassName="ds-oc-header-value ds-oc-header-value--status"
        />
        <OperationsCenterHeaderItem
          label={t("fields.currentMission")}
          value={data.mission}
        />
        <OperationsCenterHeaderItem
          label={t("fields.version")}
          value={
            <span aria-label={t("versionAria", { version: data.version })}>
              v{data.version}
            </span>
          }
          valueClassName="ds-oc-header-value ds-oc-header-value--accent"
        />
        <OperationsCenterHeaderItem
          label={t("fields.location")}
          value={data.location}
        />
        <OperationsCenterHeaderItem
          label={t("fields.timezone")}
          value={data.timezone}
        />
      </dl>
    </section>
  );
}
