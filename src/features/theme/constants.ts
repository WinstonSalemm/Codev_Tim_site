export const THEME_STORAGE_KEY = "codev-tim-theme";

export const THEMES = ["dark", "light"] as const;

export type ThemeMode = (typeof THEMES)[number];

export const THEME_PREFERENCES = ["system", "dark", "light"] as const;

export type ThemePreference = (typeof THEME_PREFERENCES)[number];

export const THEME_META_COLORS: Record<ThemeMode, string> = {
  dark: "#000000",
  light: "#f7f8fa",
};
