"use client";

import { useTranslations } from "next-intl";
import { useShellContext } from "@/context/shell";

function isMacPlatform() {
  if (typeof navigator === "undefined") {
    return false;
  }

  return /Mac|iPhone|iPad|iPod/.test(navigator.platform);
}

export function HeaderCommandTrigger() {
  const t = useTranslations("shell");
  const { openCommandPalette } = useShellContext();
  const shortcut = isMacPlatform()
    ? t("header.commandShortcutMac")
    : t("header.commandShortcutWin");

  return (
    <button
      type="button"
      className="ds-header-command"
      aria-label={t("header.commandPalette")}
      aria-keyshortcuts="Control+K Meta+K"
      aria-haspopup="dialog"
      onClick={openCommandPalette}
    >
      <span className="ds-header-command-label">{t("header.command")}</span>
      <kbd className="ds-header-kbd">{shortcut}</kbd>
    </button>
  );
}
