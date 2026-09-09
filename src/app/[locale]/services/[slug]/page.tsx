import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { JsonLdScript } from "@/components/seo";
import { LeadForm } from "@/components/commerce/LeadForm";
import { OfferCard } from "@/components/commerce/OfferCard";
import { ContactChannels } from "@/components/commerce/ContactChannels";
import { COPY } from "@/lib/commerce/copy";
import { findOffer, lang } from "@/lib/commerce/catalog";
import {
  getServiceLanding,
  SERVICE_LANDING_SLUGS,
} from "@/lib/commerce/service-landings";
import { quoteOffer } from "@/lib/commerce/pricing";
import { buildAlternateLanguages, getSiteUrl } from "@/lib/seo/site-url";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return SERVICE_LANDING_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getServiceLanding(slug);
  if (!page) return {};
  const language = lang(locale);
  const canonical = `${getSiteUrl()}/${locale}/services/${slug}`;
  return {
    title: { absolute: `${page.title[language]} - Codev_Tim` },
    description: page.description[language],
    alternates: {
      canonical,
      languages: buildAlternateLanguages(`/services/${slug}`),
    },
    openGraph: {
      type: "website",
      title: page.title[language],
      description: page.description[language],
      url: canonical,
      siteName: "Codev_Tim",
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const page = getServiceLanding(slug);
  if (!page) notFound();
  const language = lang(locale);
  const t = COPY[language];
  const at = new Date().toISOString();
  const offers = page.offerIds.map(findOffer).filter((offer) => !!offer);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title[language],
    description: page.description[language],
    areaServed: "Uzbekistan",
    provider: { "@type": "Organization", name: "Codev_Tim" },
    offers: offers.map((offer) => ({
      "@type": "Offer",
      name: offer.name[language],
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: quoteOffer(offer.id, new Date(at)).price,
        priceCurrency: "UZS",
      },
    })),
  };

  return (
    <>
      <JsonLdScript data={schema} />
      <div className="sales-page service-sales-page">
        <nav className="sales-jump">
          <Link href="/#solutions">{t.back} ←</Link>
          <Link href="/projects">{t.navProjects}</Link>
          <a href="#request">{t.navContact}</a>
        </nav>
        <header className="sales-catalog-head service-sales-hero">
          <p className="sales-eyebrow">CODEV_TIM / {slug.toUpperCase()}</p>
          <h1>{page.title[language]}</h1>
          <p>{page.lead[language]}</p>
        </header>
        <section className="sales-section service-sales-section">
          <h2>{page.audienceTitle[language]}</h2>
          <ul className="sales-scope service-sales-list">
            {page.audience[language].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="service-sales-proof">
          <div>
            <p className="sales-eyebrow">PROOF / PRODUCTION</p>
            <h2>{page.proofTitle[language]}</h2>
            <p>{page.proof[language]}</p>
          </div>
          <Link
            className="sales-button sales-button-secondary"
            href={page.proofHref}
          >
            {t.detail} →
          </Link>
        </section>
        <section
          className="sales-section"
          aria-labelledby="service-price-title"
        >
          <div className="sales-section-heading">
            <h2 id="service-price-title">{t.pricesTitle}</h2>
            <span className="sales-small-note">
              {language === "ru"
                ? "Цены в сумах"
                : language === "uz"
                  ? "Narxlar so‘mda"
                  : "Prices in UZS"}
            </span>
          </div>
          <div className="sales-project-grid service-sales-offers">
            {offers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                locale={language}
                at={at}
              />
            ))}
          </div>
          <p className="sales-terms">
            {t.terms} {t.excludes}
          </p>
        </section>
        <section className="sales-section service-sales-section">
          <h2>{page.deliverablesTitle[language]}</h2>
          <ul className="sales-scope service-sales-list">
            {page.deliverables[language].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="sales-section">
          <h2>{t.processTitle}</h2>
          <ol className="sales-process">
            {t.steps.map(([title, body], index) => (
              <li key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="sales-final" id="request">
          <div>
            <p className="sales-eyebrow">CONTACT / DIRECT</p>
            <h2>{t.finalTitle}</h2>
            <p>{t.finalLead}</p>
            <ContactChannels locale={language} compact />
          </div>
          <aside className="sales-lead-card">
            <LeadForm locale={language} offerId={offers[0]?.id} />
          </aside>
        </section>
      </div>
    </>
  );
}
