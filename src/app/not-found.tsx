import { NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import { MissingModulePage } from "@/components/modules/shared/MissingModulePage";
import { DeferredAnalytics } from "@/components/analytics";
import { AppShell } from "@/components/shell";
import { fontVariables } from "@/lib/fonts";
import { loadSiteConfiguration } from "@/lib/application";
import { NOINDEX_ROBOTS } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Missing Module — Codev_Tim",
  description: "Requested module does not exist.",
  robots: NOINDEX_ROBOTS,
};

export default async function GlobalNotFound() {
  const locale = routing.defaultLocale;
  const messages = (await import(`../../messages/${locale}.json`)).default;
  const siteConfig = loadSiteConfiguration();

  return (
    <html lang={locale} className="dark">
      <body className={`${fontVariables} ds-layout-root antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppShell config={siteConfig}>
            <MissingModulePage />
          </AppShell>
          <DeferredAnalytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
