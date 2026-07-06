import {
  THEME_META_COLORS,
  THEME_STORAGE_KEY,
  type ThemeMode,
  type ThemePreference,
} from "./constants";

export function getSystemTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function resolveTheme(preference: ThemePreference): ThemeMode {
  if (preference === "dark" || preference === "light") {
    return preference;
  }

  return getSystemTheme();
}

export function applyTheme(theme: ThemeMode) {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  const meta = document.querySelector('meta[name="theme-color"]');

  if (meta) {
    meta.setAttribute("content", THEME_META_COLORS[theme]);
  }
}

export function readStoredPreference(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);

    if (stored === "light" || stored === "dark") {
      return stored;
    }

    return "system";
  } catch {
    return "system";
  }
}

export function persistThemePreference(preference: ThemePreference) {
  try {
    if (preference === "system") {
      localStorage.removeItem(THEME_STORAGE_KEY);
      return;
    }

    localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    /* ignore storage errors */
  }
}

/** @deprecated Use readStoredPreference + resolveTheme */
export function readStoredTheme(): ThemeMode {
  return resolveTheme(readStoredPreference());
}
