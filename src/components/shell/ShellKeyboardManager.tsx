"use client";

import { useEffect } from "react";
import { useShellContext } from "@/context/shell";

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tag = target.tagName;

  return (
    target.isContentEditable ||
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT"
  );
}

export function ShellKeyboardManager() {
  const {
    closeMobileNav,
    closeStatusPanel,
    closeCommandPalette,
    closeTerminal,
    isCommandPaletteOpen,
    isTerminalOpen,
    isMobileNavOpen,
    isStatusPanelOpen,
    toggleCommandPalette,
    toggleTerminal,
  } = useShellContext();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) {
        return;
      }

      if (event.key === "Escape") {
        if (isCommandPaletteOpen) {
          event.preventDefault();
          closeCommandPalette();
          return;
        }

        if (isTerminalOpen) {
          event.preventDefault();
          closeTerminal();
          return;
        }

        if (isMobileNavOpen) {
          event.preventDefault();
          closeMobileNav();
          return;
        }

        if (isStatusPanelOpen) {
          event.preventDefault();
          closeStatusPanel();
        }

        return;
      }

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        toggleCommandPalette();
        return;
      }

      if (event.key === "`") {
        event.preventDefault();
        toggleTerminal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    closeCommandPalette,
    closeMobileNav,
    closeStatusPanel,
    closeTerminal,
    isCommandPaletteOpen,
    isMobileNavOpen,
    isStatusPanelOpen,
    isTerminalOpen,
    toggleCommandPalette,
    toggleTerminal,
  ]);

  return null;
}
