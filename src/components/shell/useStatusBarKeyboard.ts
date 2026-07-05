"use client";

import { useEffect, type RefObject } from "react";
import { useShellContext } from "@/context/shell";

export function useStatusBarKeyboard(barRef: RefObject<HTMLElement | null>) {
  const { isStatusPanelOpen, closeStatusPanel, toggleStatusPanel } =
    useShellContext();

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isInsideBar = target ? bar.contains(target) : false;

      if (event.key === "Escape" && isStatusPanelOpen) {
        event.preventDefault();
        closeStatusPanel();
        return;
      }

      if (!isInsideBar) {
        return;
      }

      if (
        target?.classList.contains("ds-statusbar-toggle") &&
        (event.key === "Enter" || event.key === " ")
      ) {
        event.preventDefault();
        toggleStatusPanel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [barRef, closeStatusPanel, isStatusPanelOpen, toggleStatusPanel]);
}
