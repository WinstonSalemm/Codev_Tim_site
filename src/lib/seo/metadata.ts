import type { Metadata } from "next";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_PATH,
  SITE_NAME,
} from "./constants";
import { getOpenGraphAlternateLocales, getOpenGraphLocale } from "./og-locale";

export type PageMetadataInput = {
  locale: string;
  title: string;
  description: string;
  canonical: string;
  alternateLanguages: Record<string, string>;
  ogImageAlt: string;
  ogImagePath?: string;
  ogType?: "website" | "article";
  robots?: Metadata["robots"];
  rssFeedUrl?: string;
};

export const INDEXABLE_ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
};

export const NOINDEX_ROBOTS: Metadata["robots"] = {
  index: false,
  follow: true,
};

export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const ogImagePath = input.ogImagePath ?? DEFAULT_OG_IMAGE_PATH;

  return {
    title: {
      absolute: input.title,
    },
    description: input.description,
    robots: input.robots ?? INDEXABLE_ROBOTS,
    alternates: {
      canonical: input.canonical,
      languages: input.alternateLanguages,
      ...(input.rssFeedUrl
        ? {
            types: {
              "application/rss+xml": input.rssFeedUrl,
            },
          }
        : {}),
    },
    openGraph: {
      type: input.ogType ?? "website",
      siteName: SITE_NAME,
      title: input.title,
      description: input.description,
      url: input.canonical,
      locale: getOpenGraphLocale(input.locale),
      alternateLocale: getOpenGraphAlternateLocales(input.locale),
      images: [
        {
          url: ogImagePath,
          width: DEFAULT_OG_IMAGE.width,
          height: DEFAULT_OG_IMAGE.height,
          alt: input.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [
        {
          url: ogImagePath,
          alt: input.ogImageAlt,
        },
      ],
    },
  };
}
