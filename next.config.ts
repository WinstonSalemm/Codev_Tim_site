import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Canonical and language links must be present in the initial head for every crawler.
  htmlLimitedBots: /.*/,
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  outputFileTracingRoot: projectRoot,
  experimental: { cpus: 2 },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/fire-safety-store/:path*",
          destination: "http://127.0.0.1:3101/fire-safety-store/:path*",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [
      {
        source: "/showcases/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; form-action 'none'; base-uri 'none'; frame-ancestors 'self'",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/showcases/fire-safety-store/:locale(ru|uz|en)/index.html",
        destination: "/fire-safety-store?lang=:locale",
        permanent: true,
      },
      {
        source: "/showcases/fire-safety-store/:path*",
        destination: "/fire-safety-store",
        permanent: true,
      },
      // Historical URLs stay server-only; public registries use neutral canonical slugs.
      ...[
        ["poj-pro-site", "fire-safety-store"],
        ["poj-pro-platform", "business-operations"],
        ["poj-pro-api-contracts", "document-workflow"],
        ["poj-pro-telegram-bots", "staff-telegram-tools"],
      ].flatMap(([legacy, canonical]) => [
        {
          source: `/:locale(en|ru|uz)/projects/${legacy}`,
          destination: `/:locale/projects/${canonical}`,
          permanent: true,
        },
        {
          source: `/projects/${legacy}`,
          destination: `/ru/projects/${canonical}`,
          permanent: true,
        },
      ]),
      ...["/:locale(en|ru|uz)", ""].flatMap((prefix) => {
        const destination = prefix ? "/:locale" : "/ru";
        return [
          {
            source: prefix + "/services/website-development-tashkent",
            destination: destination + "/services/websites",
            permanent: true,
          },
          {
            source: prefix + "/services/corporate-website",
            destination: destination + "/services/websites#offer-corporate",
            permanent: true,
          },
          {
            source: prefix + "/services/business-automation",
            destination: destination + "/services/crm-automation",
            permanent: true,
          },
          {
            source: prefix + "/services",
            destination: destination + "#prices",
            permanent: true,
          },
          {
            source: prefix + "/principles",
            destination: destination + "/about#process",
            permanent: true,
          },
        ];
      }),
      {
        source: "/:locale(en|ru|uz)/projects/erp-platform",
        destination: "/:locale/projects/codev-erp",
        permanent: true,
      },
      {
        source: "/projects/erp-platform",
        destination: "/ru/projects/codev-erp",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
