"use client";

import { useTranslations } from "next-intl";

type StatusBarPanelProps = {
  id: string;
  isOpen: boolean;
};

export function StatusBarPanel({ id, isOpen }: StatusBarPanelProps) {
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
        <p>{t("status.panelPlaceholder")}</p>
      </div>
    </section>
  );
}
