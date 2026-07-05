"use client";

import { useTranslations } from "next-intl";
import { useShellContext } from "@/context/shell";

export function SidebarTerminalToggle() {
  const t = useTranslations("shell.sidebar");
  const { isTerminalOpen, toggleTerminal } = useShellContext();

  return (
    <button
      type="button"
      className="ds-sidebar-terminal-toggle"
      aria-pressed={isTerminalOpen}
      aria-label={t("terminalToggle")}
      onClick={toggleTerminal}
    >
      <span className="ds-text-label">{t("terminalToggle")}</span>
    </button>
  );
}
