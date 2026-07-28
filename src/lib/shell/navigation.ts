import { MODULE_DEFINITIONS } from "./modules";

export type ShellNavItem = {
  id: string;
  href: string;
  labelKey: string;
  shortKey: string;
};

export const SHELL_NAV_ITEMS: ShellNavItem[] = [
  ...MODULE_DEFINITIONS.map((module) => ({
    id: module.id,
    href: module.href,
    labelKey: module.navLabelKey,
    shortKey: module.navShortKey,
  })),
  {
    id: "servicePages",
    href: "/services/website-development-tashkent",
    labelKey: "nav.servicePages",
    shortKey: "nav.servicePagesShort",
  },
];

export type SiteShellContactLinks = {
  telegramHref: string | null;
  phoneHref: string | null;
  instagramHref: string | null;
};

export type SiteShellConfig = {
  name: string;
  version: string;
  status: "operational";
  mission: string;
  author: {
    timezone: string;
  };
  availability: {
    label: string;
  };
  contacts: SiteShellContactLinks;
};

export function isNavItemActive(pathname: string, href: string) {
  const normalizedPathname = pathname.replace(/\/$/, "") || "/";
  const normalizedHref = href.replace(/\/$/, "") || "/";

  if (normalizedHref === "/") {
    return normalizedPathname === "/";
  }

  if (normalizedHref.startsWith("/services/")) {
    return normalizedPathname.startsWith("/services/");
  }

  return (
    normalizedPathname === normalizedHref ||
    normalizedPathname.startsWith(`${normalizedHref}/`)
  );
}
