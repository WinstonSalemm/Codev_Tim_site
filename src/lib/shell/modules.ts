export type ModuleId =
  | "operationsCenter"
  | "productRegistry"
  | "engineeringProtocols"
  | "knowledgeBase"
  | "engineerProfile"
  | "communicationModule"
  | "missingModule";

export type ModuleRoute =
  "/" | "/projects" | "/principles" | "/writing" | "/about" | "/contact";

export type ModuleDefinition = {
  id: ModuleId;
  href: ModuleRoute;
  navLabelKey: string;
  navShortKey: string;
  metadataKey: ModuleId;
};

/** Fixed module order — docs/10_IMPLEMENTATION_PLAN.md §1.6 */
export const MODULE_DEFINITIONS: ModuleDefinition[] = [
  {
    id: "operationsCenter",
    href: "/",
    navLabelKey: "nav.operationsCenter",
    navShortKey: "nav.operationsCenterShort",
    metadataKey: "operationsCenter",
  },
  {
    id: "productRegistry",
    href: "/projects",
    navLabelKey: "nav.productRegistry",
    navShortKey: "nav.productRegistryShort",
    metadataKey: "productRegistry",
  },
  {
    id: "engineeringProtocols",
    href: "/principles",
    navLabelKey: "nav.engineeringProtocols",
    navShortKey: "nav.engineeringProtocolsShort",
    metadataKey: "engineeringProtocols",
  },
  {
    id: "knowledgeBase",
    href: "/writing",
    navLabelKey: "nav.knowledgeBase",
    navShortKey: "nav.knowledgeBaseShort",
    metadataKey: "knowledgeBase",
  },
  {
    id: "engineerProfile",
    href: "/about",
    navLabelKey: "nav.engineerProfile",
    navShortKey: "nav.engineerProfileShort",
    metadataKey: "engineerProfile",
  },
  {
    id: "communicationModule",
    href: "/contact",
    navLabelKey: "nav.communicationModule",
    navShortKey: "nav.communicationModuleShort",
    metadataKey: "communicationModule",
  },
];

export function getModuleByHref(href: string) {
  const normalized = href.replace(/\/$/, "") || "/";
  return MODULE_DEFINITIONS.find((module) => module.href === normalized);
}

export function getModuleByPathname(pathname: string) {
  const normalized = pathname.replace(/\/$/, "") || "/";
  return MODULE_DEFINITIONS.find((module) => {
    if (module.href === "/") {
      return normalized === "/";
    }

    return (
      normalized === module.href || normalized.startsWith(`${module.href}/`)
    );
  });
}

export function isModuleRouteActive(pathname: string, href: ModuleRoute) {
  const normalized = pathname.replace(/\/$/, "") || "/";

  if (href === "/") {
    return normalized === "/";
  }

  return normalized === href || normalized.startsWith(`${href}/`);
}
