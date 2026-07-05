import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: projectRoot,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/:locale(en|ru|uz)/projects/erp-platform",
        destination: "/:locale/projects/codev-erp",
        permanent: true,
      },
      {
        source: "/projects/erp-platform",
        destination: "/en/projects/codev-erp",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
