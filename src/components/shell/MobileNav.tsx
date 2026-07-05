"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { SHELL_NAV_ITEMS, isNavItemActive } from "@/lib/shell";
import { ShellInertRegion } from "./ShellInertRegion";

export function MobileNav() {
  const t = useTranslations("shell");
  const pathname = usePathname();

  return (
    <ShellInertRegion className="ds-shell-mobile-nav">
      <nav aria-label={t("moduleNavigation")}>
        <div className="ds-shell-mobile-nav-inner">
          {SHELL_NAV_ITEMS.map((item) => {
            const active = isNavItemActive(pathname, item.href);

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`ds-shell-mobile-nav-item ${active ? "ds-shell-mobile-nav-item--active" : ""}`}
                aria-current={active ? "page" : undefined}
                aria-label={t(item.labelKey)}
              >
                {t(item.shortKey)}
              </Link>
            );
          })}
        </div>
      </nav>
    </ShellInertRegion>
  );
}
