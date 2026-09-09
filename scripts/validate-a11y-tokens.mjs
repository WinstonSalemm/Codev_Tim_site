/** Solid-color contrast checks against the current CSS. Run: npm run a11y:validate */
import { readFileSync } from "node:fs";
import postcss from "postcss";

const tokenPath = new URL("../src/styles/tokens.css", import.meta.url);
const tokenCss = postcss.parse(readFileSync(tokenPath, "utf8"));

function declarations(rule) {
  return Object.fromEntries(
    rule.nodes
      .filter((node) => node.type === "decl")
      .map((node) => [node.prop, node.value])
  );
}

function themeDeclarations(selectors) {
  const result = {};
  tokenCss.walkRules((rule) => {
    // Colors are defined in top-level theme blocks, not responsive overrides.
    if (rule.parent.type === "root" && selectors.includes(rule.selector))
      Object.assign(result, declarations(rule));
  });
  if (!Object.keys(result).length)
    throw new Error(`Missing theme block: ${selectors.join(" or ")}`);
  return result;
}

const dark = themeDeclarations([":root"]);
const themes = {
  dark,
  light: {
    ...dark,
    ...themeDeclarations(['[data-theme="light"]', 'html[data-theme="light"]']),
  },
};

function resolve(value, tokens, seen = new Set()) {
  const variable = value?.match(/^var\((--[\w-]+)\)$/);
  if (!variable) return value;
  const name = variable[1];
  if (seen.has(name)) throw new Error(`Circular token reference: ${name}`);
  seen.add(name);
  return resolve(tokens[name], tokens, seen);
}

function hexToRgb(value) {
  if (!/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(value ?? ""))
    throw new Error(`Expected an opaque hex color, received: ${value}`);
  const hex = value.slice(1);
  const normalized =
    hex.length === 3 ? [...hex].map((char) => char + char).join("") : hex;
  return [0, 2, 4].map((offset) =>
    Number.parseInt(normalized.slice(offset, offset + 2), 16)
  );
}

function luminance(color) {
  const [r, g, b] = hexToRgb(color).map((component) => {
    const value = component / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(foreground, background) {
  const first = luminance(foreground);
  const second = luminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

const surfaces = ["base", "recessed", "surface", "elevated", "overlay"];
const textTokens = [
  "text-primary",
  "text-secondary",
  "text-tertiary",
  "link",
  "link-hover",
  "error",
];
const pairs = surfaces.flatMap((surface) =>
  textTokens.map((text) => ({
    foreground: `--color-${text}`,
    background: `--color-bg-${surface}`,
  }))
);
pairs.push(
  { foreground: "--color-text-code", background: "--color-bg-recessed" },
  ...["accent", "accent-hover", "accent-active"].map((background) => ({
    foreground: "--color-text-inverse",
    background: `--color-${background}`,
  }))
);

// The live sales CTA has an explicit color; check it as well as the inverse token.
const salesCss = postcss.parse(
  readFileSync(new URL("../src/styles/sales.css", import.meta.url), "utf8")
);
let salesButton;
let salesButtonHover;
salesCss.walkRules((rule) => {
  if (rule.selector === ".sales-button") salesButton = declarations(rule);
  if (rule.selector === ".sales-button:hover")
    salesButtonHover = declarations(rule);
});
if (
  !salesButton?.color ||
  !salesButton.background ||
  !salesButtonHover?.background
)
  throw new Error("Missing sales CTA color/background declarations");

let errors = 0;
let checks = 0;

function check(name, foreground, background) {
  const ratio = contrastRatio(foreground, background);
  const pass = ratio >= 4.5;
  checks++;
  if (!pass) errors++;
  console.log(
    `[${pass ? "PASS" : "FAIL"}] ${name}: ${ratio.toFixed(2)}:1 (min 4.5:1) [${foreground} / ${background}]`
  );
}

console.log("Codev_Tim — current CSS token contrast (dark and light)\n");
for (const [theme, tokens] of Object.entries(themes)) {
  for (const pair of pairs) {
    check(
      `${theme}: ${pair.foreground} on ${pair.background}`,
      resolve(tokens[pair.foreground], tokens),
      resolve(tokens[pair.background], tokens)
    );
  }
  check(
    `${theme}: sales CTA`,
    resolve(salesButton.color, tokens),
    resolve(salesButton.background, tokens)
  );
  check(
    `${theme}: sales CTA hover`,
    resolve(salesButtonHover.color ?? salesButton.color, tokens),
    resolve(salesButtonHover.background, tokens)
  );
}

console.log(`\n${checks} color pairs checked; ${errors} failure(s).`);
console.log(
  "Scope: opaque CSS colors only, tested at the normal-text 4.5:1 threshold. Focus, motion, opacity, rendered CTA overrides and touch targets require separate UI checks."
);
if (errors) process.exitCode = 1;
