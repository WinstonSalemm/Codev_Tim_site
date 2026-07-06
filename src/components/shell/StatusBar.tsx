"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useShellContext } from "@/context/shell";
import type { SiteShellConfig } from "@/lib/shell";
import { ShellInertRegion } from "./ShellInertRegion";
import { StatusBarPanel } from "./StatusBarPanel";
import { useStatusBarKeyboard } from "./useStatusBarKeyboard";

const STATUS_PANEL_ID = "status-panel";

type StatusBarProps = {
  config: SiteShellConfig;
};

export function StatusBar({ config }: StatusBarProps) {
  const t = useTranslations("shell");
  const barRef = useRef<HTMLElement>(null);
  const { isStatusPanelOpen, toggleStatusPanel, terminalStatus } =
    useShellContext();

  useStatusBarKeyboard(barRef);

  return (
    <ShellInertRegion className="ds-statusbar">
      <StatusBarPanel
        id={STATUS_PANEL_ID}
        isOpen={isStatusPanelOpen}
        config={config}
      />

      <footer
        ref={barRef}
        className="ds-statusbar-bar"
        role="contentinfo"
        aria-label={t("regions.statusBar")}
      >
        <div className="ds-statusbar-segments">
          <div
            className="ds-statusbar-segment"
            aria-label={t("status.operationalAria")}
          >
            <span
              className="ds-statusbar-dot ds-status-dot-operational"
              aria-hidden="true"
            />
            <span className="ds-statusbar-segment-value ds-statusbar-segment-value--primary">
              {t("status.operational")}
            </span>
          </div>

          <div className="ds-statusbar-segment ds-statusbar-segment--focus ds-statusbar-compact-hidden">
            <span className="ds-statusbar-segment-label">
              {t("status.focus")}
            </span>
            <span
              className="ds-statusbar-segment-value ds-statusbar-segment-value--focus"
              title={config.mission}
            >
              {config.mission}
            </span>
          </div>

          <div className="ds-statusbar-segment ds-statusbar-segment--availability ds-statusbar-compact-hidden">
            <span className="ds-statusbar-segment-label">
              {t("status.availability")}
            </span>
            <span className="ds-statusbar-segment-value">
              {config.availability.label}
            </span>
          </div>

          <div className="ds-statusbar-segment ds-statusbar-segment--terminal ds-statusbar-compact-hidden">
            <span className="ds-statusbar-segment-label">
              {t("status.terminal")}
            </span>
            <span
              className={`ds-statusbar-dot ds-statusbar-dot--terminal-${terminalStatus}`}
              aria-hidden="true"
            />
            <span className="ds-statusbar-segment-value">
              {t(`status.terminalState.${terminalStatus}`)}
            </span>
          </div>

          <div className="ds-statusbar-segment">
            <span className="ds-statusbar-segment-label ds-statusbar-compact-hidden">
              {t("status.timezone")}
            </span>
            <span className="ds-statusbar-segment-value">
              {config.author.timezone}
            </span>
          </div>

          <div className="ds-statusbar-segment">
            <span className="ds-statusbar-segment-label ds-statusbar-compact-hidden">
              {t("status.version")}
            </span>
            <span
              className="ds-statusbar-segment-value ds-statusbar-segment-value--accent"
              aria-label={t("status.versionAria", { version: config.version })}
            >
              v{config.version}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="ds-statusbar-toggle"
          aria-expanded={isStatusPanelOpen}
          aria-controls={STATUS_PANEL_ID}
          aria-label={
            isStatusPanelOpen
              ? t("status.collapsePanel")
              : t("status.expandPanel")
          }
          onClick={toggleStatusPanel}
        >
          <span className="ds-statusbar-toggle-label">
            {isStatusPanelOpen ? t("status.collapse") : t("status.expand")}
          </span>
          <span className="ds-statusbar-segment-value" aria-hidden="true">
            {isStatusPanelOpen ? "−" : "+"}
          </span>
        </button>
      </footer>
    </ShellInertRegion>
  );
}
