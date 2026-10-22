import type { Locale } from "./catalog";
import { defaultConfiguration } from "./configurator";

export function serviceConfiguration(
  preset: "landing" | "catalog",
  locale: Locale
) {
  const configuration = defaultConfiguration("website", locale);
  if (preset === "catalog") {
    configuration.pages = 5;
    configuration.website.catalog = true;
    configuration.website.analytics = true;
  }
  return configuration;
}
