"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  applyTheme,
  getSystemTheme,
  persistThemePreference,
  readStoredPreference,
  resolveTheme,
} from "./apply-theme";
import type { ThemeMode, ThemePreference } from "./constants";

type ThemeContextValue = {
  theme: ThemeMode;
  preference: ThemePreference;
  setTheme: (theme: ThemeMode) => void;
  resetToSystem: () => void;
  toggleTheme: () => void;
  isReady: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}

type ThemeProviderProps = {
  children: React.ReactNode;
};

function syncPreferenceAttribute(preference: ThemePreference) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.dataset.themePreference = preference;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [theme, setThemeState] = useState<ThemeMode>("dark");
  const [isReady, setIsReady] = useState(false);

  const applyResolved = useCallback(
    (nextPreference: ThemePreference, resolved?: ThemeMode) => {
      const nextTheme = resolved ?? resolveTheme(nextPreference);
      applyTheme(nextTheme);
      syncPreferenceAttribute(nextPreference);
      setPreference(nextPreference);
      setThemeState(nextTheme);
      return nextTheme;
    },
    []
  );

  useEffect(() => {
    const stored = readStoredPreference();
    applyResolved(stored);
    setIsReady(true);
  }, [applyResolved]);

  useEffect(() => {
    if (preference !== "system") {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: light)");

    const handleChange = () => {
      applyResolved("system", getSystemTheme());
    };

    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, [applyResolved, preference]);

  const setTheme = useCallback(
    (next: ThemeMode) => {
      persistThemePreference(next);
      applyResolved(next, next);
    },
    [applyResolved]
  );

  const resetToSystem = useCallback(() => {
    persistThemePreference("system");
    applyResolved("system");
  }, [applyResolved]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      preference,
      setTheme,
      resetToSystem,
      toggleTheme,
      isReady,
    }),
    [isReady, preference, resetToSystem, setTheme, theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
