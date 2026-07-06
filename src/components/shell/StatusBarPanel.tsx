"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { SiteShellConfig } from "@/lib/shell";

type StatusBarPanelProps = {
  id: string;
  isOpen: boolean;
  config: SiteShellConfig;
};

export function StatusBarPanel({ id, isOpen, config }: StatusBarPanelProps) {
  const t = useTranslations("shell");

  return (
    <section
      id={id}
      className="ds-statusbar-panel"
      role="region"
      aria-label={t("status.panelAria")}
      hidden={!isOpen}
      aria-hidden={!isOpen}
    >
      <div className="ds-statusbar-panel-inner">
        <span className="ds-text-label">{t("status.panelLabel")}</span>
        <dl className="ds-statusbar-panel-grid">
          <div className="ds-statusbar-panel-row">
            <dt className="ds-statusbar-panel-label">{t("status.focus")}</dt>
            <dd className="ds-statusbar-panel-value">{config.mission}</dd>
          </div>
          <div className="ds-statusbar-panel-row">
            <dt className="ds-statusbar-panel-label">
              {t("status.availability")}
            </dt>
            <dd className="ds-statusbar-panel-value">
              {config.availability.label}
            </dd>
          </div>
          <div className="ds-statusbar-panel-row">
            <dt className="ds-statusbar-panel-label">{t("status.timezone")}</dt>
            <dd className="ds-statusbar-panel-value">
              {config.author.timezone}
            </dd>
          </div>
          <div className="ds-statusbar-panel-row">
            <dt className="ds-statusbar-panel-label">
              {t("status.panelContact")}
            </dt>
            <dd className="ds-statusbar-panel-value">
              <Link href="/contact" className="ds-statusbar-panel-link">
                {t("status.panelContactAction")}
              </Link>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
