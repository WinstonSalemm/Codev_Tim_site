export const THEME_STORAGE_KEY = "codev-tim-theme";

export const THEMES = ["dark", "light"] as const;

export type ThemeMode = (typeof THEMES)[number];

export const THEME_META_COLORS: Record<ThemeMode, string> = {
  dark: "#000000",
  light: "#ffffff",
};
