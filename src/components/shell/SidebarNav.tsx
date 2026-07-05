"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useShellContext } from "@/context/shell";
import { Link, usePathname } from "@/i18n/navigation";
import { SHELL_NAV_ITEMS, isNavItemActive } from "@/lib/shell";
import { useSidebarKeyboardNav } from "./useSidebarKeyboardNav";

export function SidebarNav() {
  const t = useTranslations("shell");
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const { closeMobileNav } = useShellContext();

  useSidebarKeyboardNav(navRef);

  return (
    <nav
      ref={navRef}
      className="ds-sidebar-nav ds-scrollbar"
      aria-label={t("moduleNavigation")}
    >
      <ul className="ds-sidebar-nav-list" role="list">
        {SHELL_NAV_ITEMS.map((item) => {
          const active = isNavItemActive(pathname, item.href);

          return (
            <li key={item.id} className="ds-sidebar-nav-item-wrap">
              <Link
                href={item.href}
                className={`ds-sidebar-nav-item ${active ? "ds-sidebar-nav-item--active" : ""}`}
                aria-current={active ? "page" : undefined}
                onClick={closeMobileNav}
              >
                <span className="ds-sidebar-nav-short">{t(item.shortKey)}</span>
                <span className="ds-sidebar-nav-label">{t(item.labelKey)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
