/** Terminal module open aliases - domain-owned routing vocabulary. */
export const MODULE_OPEN_ALIASES: Record<string, string> = {
  dashboard: "/",
  ops: "/",
  operations: "/",
  "operations-center": "/",
  projects: "/projects",
  registry: "/projects",
  about: "/about",
  profile: "/about",
  contact: "/contact",
  communication: "/contact",
};

export const MODULE_LABELS: Record<string, string> = {
  "/": "Operations Center",
  "/projects": "Product Registry",
  "/about": "Engineer Profile",
  "/contact": "Communication Module",
};

export const LOCALE_CODES = ["en", "ru", "uz"] as const;
