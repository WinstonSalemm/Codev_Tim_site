import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  outputFileTracingRoot: projectRoot,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      ...["/:locale(en|ru|uz)", ""].flatMap((prefix) => {
        const destination = prefix ? "/:locale" : "/ru";
        return [
          {
            source: prefix + "/services/website-development-tashkent",
            destination: destination + "#offer-landing",
            permanent: true,
          },
          {
            source: prefix + "/services/corporate-website",
            destination: destination + "#offer-corporate",
            permanent: true,
          },
          {
            source: prefix + "/services/business-automation",
            destination: destination + "#offer-system",
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
