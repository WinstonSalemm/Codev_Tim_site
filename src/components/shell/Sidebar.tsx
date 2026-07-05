"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useShellContext } from "@/context/shell";
import { SidebarLanguageSwitch } from "./SidebarLanguageSwitch";
import { SidebarNav } from "./SidebarNav";
import { SidebarTerminalToggle } from "./SidebarTerminalToggle";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function Sidebar() {
  const t = useTranslations("shell");
  const asideRef = useRef<HTMLElement>(null);
  const { isMobileNavOpen, closeMobileNav } = useShellContext();

  useEffect(() => {
    if (!isMobileNavOpen || !asideRef.current) {
      return;
    }

    const firstLink = asideRef.current.querySelector<HTMLElement>(FOCUSABLE);
    firstLink?.focus();
  }, [isMobileNavOpen]);

  useEffect(() => {
    if (!isMobileNavOpen || !asideRef.current) {
      return;
    }

    const aside = asideRef.current;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileNav();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusables = Array.from(
        aside.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((node) => !node.hasAttribute("disabled"));

      if (focusables.length === 0) {
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last?.focus();
        return;
      }

      if (!event.shiftKey && active === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeMobileNav, isMobileNavOpen]);

  return (
    <>
      <div
        className={`ds-shell-backdrop ${isMobileNavOpen ? "ds-shell-backdrop--visible" : ""}`}
        aria-hidden="true"
        onClick={closeMobileNav}
      />

      <aside
        ref={asideRef}
        id="module-navigation"
        className={`ds-shell-sidebar ${isMobileNavOpen ? "ds-shell-sidebar--open" : ""}`}
        aria-label={t("moduleNavigation")}
      >
        <div className="ds-sidebar-inner">
          <div className="ds-sidebar-header">
            <span className="ds-text-label">{t("moduleNavigation")}</span>
          </div>

          <SidebarNav />

          <div className="ds-sidebar-footer">
            <SidebarTerminalToggle />
            <SidebarLanguageSwitch />
          </div>
        </div>
      </aside>
    </>
  );
}
