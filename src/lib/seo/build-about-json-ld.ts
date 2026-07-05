import type { AboutJsonLdGraph } from "./schema";
import { SITE_JSON_LD_DESCRIPTION } from "./constants";
import {
  getAboutCanonicalUrl,
  getDashboardCanonicalUrl,
  getPersonId,
} from "./site-url";

export function buildAboutJsonLd(locale: string): AboutJsonLdGraph {
  const canonical = getAboutCanonicalUrl(locale);
  const personId = getPersonId(locale);
  const breadcrumbId = `${canonical}#breadcrumb`;
  const profilePageId = `${canonical}#profilepage`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Operations Center",
            item: getDashboardCanonicalUrl(locale),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Engineer Profile",
            item: canonical,
          },
        ],
      },
      {
        "@type": "ProfilePage",
        "@id": profilePageId,
        name: "Engineer Profile",
        description: SITE_JSON_LD_DESCRIPTION,
        url: canonical,
        inLanguage: locale,
        breadcrumb: { "@id": breadcrumbId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: "Timur",
        alternateName: "Iskandarov Timur Baxodirovich",
        url: canonical,
        email: "timaiskandarov5@gmail.com",
        jobTitle: [
          "Software Engineer",
          "System Architect",
          "ERP Developer",
          "Product Builder",
        ],
        knowsAbout: [
          "ERP Systems",
          "Business Automation",
          "System Architecture",
          "ASP.NET Core",
          "React",
          "PostgreSQL",
          "Docker",
          "Artificial Intelligence",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Tashkent",
          addressCountry: "UZ",
        },
        sameAs: ["https://github.com/WinstonSalemm"],
        worksFor: {
          "@type": "Organization",
          name: "OOO Poj Pro",
          url: "https://www.poj-pro.uz",
        },
      },
    ],
  };
}
