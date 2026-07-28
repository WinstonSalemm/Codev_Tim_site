import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { JsonLdScript } from "@/components/seo";
import { ModuleHeader } from "@/components/ui/ModuleHeader";
import {
  getServicePage,
  getServicePageSlugs,
} from "@/lib/content/service-pages";
import { buildAlternateLanguages, getSiteUrl } from "@/lib/seo/site-url";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return ["en", "ru", "uz"].flatMap((locale) =>
    getServicePageSlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getServicePage(slug, locale);
  if (!page) return {};

  const canonical = `${getSiteUrl()}/${locale}/services/${slug}`;
  return {
    title: { absolute: page.title },
    description: page.description,
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: buildAlternateLanguages(`/services/${slug}`),
    },
    openGraph: {
      type: "website",
      title: page.title,
      description: page.description,
      url: canonical,
      siteName: "Codev_Tim",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

export default async function ServiceLandingPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const page = getServicePage(slug, locale);
  if (!page) notFound();
  setRequestLocale(locale);

  const canonical = `${getSiteUrl()}/${locale}/services/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Codev_Tim",
            item: `${getSiteUrl()}/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.title,
            item: canonical,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: page.title,
        description: page.description,
        url: canonical,
        areaServed: { "@type": "City", name: "Tashkent" },
        provider: {
          "@type": "Organization",
          name: "Codev_Tim",
          url: getSiteUrl(),
        },
        serviceType: page.title,
      },
    ],
  };

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <main className="ds-service-landing">
        <ModuleHeader
          label={page.label}
          name={page.title}
          description={page.intro}
          className="ds-module-header--services"
        />
        <div className="ds-service-landing-actions">
          <Link href={page.ctaHref} className="ds-services-cta">
            {page.cta}
          </Link>
          <Link href="/" className="ds-services-cta ds-services-cta--secondary">
            {locale === "ru"
              ? "Все услуги и цены"
              : locale === "uz"
                ? "Barcha xizmatlar"
                : "All services and pricing"}
          </Link>
        </div>
        <section
          className="ds-services ds-service-landing-panel"
          aria-labelledby="service-audience-heading"
        >
          <section className="ds-services-block">
            <div className="ds-services-block-head">
              <h2
                id="service-audience-heading"
                className="ds-services-block-title"
              >
                {page.audienceTitle}
              </h2>
            </div>
            <ul className="ds-services-trust-grid">
              {page.audience.map((item) => (
                <li key={item} className="ds-services-trust-item">
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section
            className="ds-services-block"
            aria-labelledby="service-deliverables-heading"
          >
            <div className="ds-services-block-head">
              <h2
                id="service-deliverables-heading"
                className="ds-services-block-title"
              >
                {page.deliverablesTitle}
              </h2>
            </div>
            <ul className="ds-service-deliverables">
              {page.deliverables.map((item, index) => (
                <li key={item}>
                  <span className="ds-services-process-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <section
            className="ds-services-block"
            aria-labelledby="service-process-heading"
          >
            <h2
              id="service-process-heading"
              className="ds-services-block-title"
            >
              {page.processTitle}
            </h2>
            <ol className="ds-services-process">
              {page.process.map((step, index) => (
                <li key={step.title} className="ds-services-process-step">
                  <span className="ds-services-process-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="ds-services-process-name">{step.title}</h3>
                    <p className="ds-services-process-body">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
          <section
            className="ds-service-proof"
            aria-labelledby="service-proof-heading"
          >
            <h2 id="service-proof-heading" className="ds-services-block-title">
              {page.proofTitle}
            </h2>
            <p>{page.proof}</p>
          </section>
          <section
            className="ds-services-block"
            aria-labelledby="service-related-heading"
          >
            <h2
              id="service-related-heading"
              className="ds-services-block-title"
            >
              {page.relatedTitle}
            </h2>
            <div className="ds-service-related">
              {page.related.map((related) => (
                <Link key={related.href} href={related.href}>
                  {related.title} →
                </Link>
              ))}
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
