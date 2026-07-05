/** Terminal module open aliases — domain-owned routing vocabulary. */
export const MODULE_OPEN_ALIASES: Record<string, string> = {
  dashboard: "/",
  ops: "/",
  operations: "/",
  "operations-center": "/",
  projects: "/projects",
  registry: "/projects",
  principles: "/principles",
  protocols: "/principles",
  writing: "/writing",
  notes: "/writing",
  knowledge: "/writing",
  about: "/about",
  profile: "/about",
  contact: "/contact",
  communication: "/contact",
};

export const MODULE_LABELS: Record<string, string> = {
  "/": "Operations Center",
  "/projects": "Product Registry",
  "/principles": "Engineering Protocols",
  "/writing": "Knowledge Base",
  "/about": "Engineer Profile",
  "/contact": "Communication Module",
};

export const LOCALE_CODES = ["en", "ru", "uz"] as const;
