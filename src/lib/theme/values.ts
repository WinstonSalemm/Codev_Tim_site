/**
 * Canonical color values — must stay in sync with src/styles/tokens.css
 * Used for metadata, a11y validation, and tooling (not for component styling).
 */
export const COLOR_VALUES = {
  bgBase: "#07090f",
  bgRecessed: "#0a0d14",
  bgSurface: "#0e1119",
  bgElevated: "#131720",
  bgOverlay: "#181d28",
  accent: "#f0b429",
  textPrimary: "#edeff2",
  textSecondary: "#8b919a",
  textTertiary: "#565c66",
  textDisabled: "#3a3f47",
  textInverse: "#07090f",
  textCode: "#c9d1d9",
  statusOperational: "#34d399",
  statusWarning: "#fbbf24",
  statusCritical: "#f87171",
  statusInfo: "#60a5fa",
  link: "#8b919a",
  linkHover: "#edeff2",
} as const;

export const A11Y_THRESHOLDS = {
  body: 4.5,
  large: 3,
} as const;

/** WCAG contrast pairs validated in scripts/validate-a11y-tokens.mjs */
export const A11Y_CONTRAST_PAIRS = [
  {
    name: "text-primary on bg-base",
    foreground: COLOR_VALUES.textPrimary,
    background: COLOR_VALUES.bgBase,
    threshold: A11Y_THRESHOLDS.body,
    severity: "error",
  },
  {
    name: "text-secondary on bg-base",
    foreground: COLOR_VALUES.textSecondary,
    background: COLOR_VALUES.bgBase,
    threshold: A11Y_THRESHOLDS.body,
    severity: "error",
  },
  {
    name: "text-secondary on bg-surface",
    foreground: COLOR_VALUES.textSecondary,
    background: COLOR_VALUES.bgSurface,
    threshold: A11Y_THRESHOLDS.body,
    severity: "error",
  },
  {
    name: "text-tertiary on bg-base (large text / placeholder)",
    foreground: COLOR_VALUES.textTertiary,
    background: COLOR_VALUES.bgBase,
    threshold: A11Y_THRESHOLDS.large,
    severity: "warn",
    usage: "Placeholders and muted data only — never body copy",
  },
  {
    name: "text-code on bg-recessed",
    foreground: COLOR_VALUES.textCode,
    background: COLOR_VALUES.bgRecessed,
    threshold: A11Y_THRESHOLDS.body,
    severity: "error",
  },
  {
    name: "text-inverse on accent (primary CTA)",
    foreground: COLOR_VALUES.textInverse,
    background: COLOR_VALUES.accent,
    threshold: A11Y_THRESHOLDS.body,
    severity: "error",
  },
  {
    name: "status-operational on bg-base",
    foreground: COLOR_VALUES.statusOperational,
    background: COLOR_VALUES.bgBase,
    threshold: A11Y_THRESHOLDS.large,
    severity: "error",
  },
  {
    name: "status-critical on bg-base",
    foreground: COLOR_VALUES.statusCritical,
    background: COLOR_VALUES.bgBase,
    threshold: A11Y_THRESHOLDS.large,
    severity: "error",
  },
  {
    name: "link on bg-base",
    foreground: COLOR_VALUES.link,
    background: COLOR_VALUES.bgBase,
    threshold: A11Y_THRESHOLDS.body,
    severity: "error",
  },
  {
    name: "link-hover on bg-base",
    foreground: COLOR_VALUES.linkHover,
    background: COLOR_VALUES.bgBase,
    threshold: A11Y_THRESHOLDS.body,
    severity: "error",
  },
] as const;

export const COLOR_VALUES_LIGHT = {
  bgBase: "#ffffff",
  bgRecessed: "#f7f7f8",
  bgSurface: "#f2f2f3",
  bgElevated: "#ececee",
  accent: "#3d7eeb",
  textPrimary: "#111318",
  textSecondary: "#5c6370",
  textTertiary: "#8b919a",
  textInverse: "#ffffff",
  textCode: "#24292f",
  link: "#5c6370",
  linkHover: "#111318",
} as const;

export const META_THEME = {
  themeColor: COLOR_VALUES.bgBase,
  themeColorLight: COLOR_VALUES_LIGHT.bgBase,
  colorScheme: "dark light" as const,
};
