import {
  MODULE_DEFINITIONS,
  isModuleRouteActive,
  type ModuleRoute,
} from "./modules";

export type ShellNavItem = {
  id: string;
  href: ModuleRoute;
  labelKey: string;
  shortKey: string;
};

export const SHELL_NAV_ITEMS: ShellNavItem[] = MODULE_DEFINITIONS.map(
  (module) => ({
    id: module.id,
    href: module.href,
    labelKey: module.navLabelKey,
    shortKey: module.navShortKey,
  })
);

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

export function isNavItemActive(pathname: string, href: ModuleRoute) {
  return isModuleRouteActive(pathname, href);
}
