export const REGISTRY_ORIGIN_SESSION_KEY = "codev-tim-registry-origin";

const REGISTRY_PATH = "/projects";

export function isValidRegistryOrigin(pathWithQuery: string): boolean {
  const pathname = pathWithQuery.split("?")[0] ?? "";
  return pathname === REGISTRY_PATH;
}

export function saveRegistryOrigin(pathWithQuery: string): void {
  if (!isValidRegistryOrigin(pathWithQuery)) {
    return;
  }

  try {
    sessionStorage.setItem(REGISTRY_ORIGIN_SESSION_KEY, pathWithQuery);
  } catch {
    /* best-effort */
  }
}

export function readRegistryOrigin(): string {
  try {
    const stored = sessionStorage.getItem(REGISTRY_ORIGIN_SESSION_KEY);
    if (stored && isValidRegistryOrigin(stored)) {
      return stored;
    }
  } catch {
    /* best-effort */
  }

  return REGISTRY_PATH;
}
