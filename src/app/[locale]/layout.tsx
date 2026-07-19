import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { DeferredAnalytics } from "@/components/analytics";
import { AppShell } from "@/components/shell";
import { fontVariables } from "@/lib/fonts";
import { loadSiteConfiguration } from "@/lib/application";
import { THEME_META_COLORS, ThemeInit } from "@/features/theme";
import { routing } from "@/i18n/routing";
import "@/styles/globals.css";

export const viewport = {
  themeColor: THEME_META_COLORS.dark,
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Codev_Tim",
    template: "%s — Codev_Tim",
  },
  description:
    "Codev_Tim — engineering operating system of Timur, software engineer and ERP developer.",
  applicationName: "Codev_Tim",
  authors: [{ name: "Timur" }],
  creator: "Timur",
  publisher: "Codev_Tim",
  verification: {
    google: "googlec37d86a7c30de1a3",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const siteConfig = loadSiteConfiguration();

  return (
    <html
      lang={locale}
      data-theme="dark"
      data-theme-preference="system"
      suppressHydrationWarning
    >
      <head>
        <ThemeInit />
      </head>
      <body className={`${fontVariables} ds-layout-root antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <AppShell config={siteConfig}>{children}</AppShell>
          <DeferredAnalytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
