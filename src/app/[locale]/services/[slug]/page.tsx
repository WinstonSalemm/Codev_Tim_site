import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { JsonLdScript } from "@/components/seo";
import { getServicePage } from "@/lib/content/service-pages";
import { buildAlternateLanguages, getSiteUrl } from "@/lib/seo/site-url";
import { findOffer, lang } from "@/lib/commerce/catalog";
import { quoteOffer } from "@/lib/commerce/pricing";
import { COPY } from "@/lib/commerce/copy";
import { OfferCard } from "@/components/commerce/OfferCard";
import { LeadForm } from "@/components/commerce/LeadForm";
import { ContactChannels } from "@/components/commerce/ContactChannels";
export const dynamic = "force-dynamic";
type PageProps = { params: Promise<{ locale: string; slug: string }> };
const serviceOffers: Record<string, string[]> = {
  "website-development-tashkent": ["landing", "corporate", "poj-pro-site"],
  "corporate-website": ["corporate", "poj-pro-site", "codev-tim"],
  "business-automation": ["brief", "system", "codev-erp"],
};
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getServicePage(slug, locale);
  if (!page) return {};
  const canonical = getSiteUrl() + "/" + locale + "/services/" + slug;
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: {
      canonical,
      languages: buildAlternateLanguages("/services/" + slug),
    },
    openGraph: {
      type: "website",
      title: page.title,
      description: page.description,
      url: canonical,
      siteName: "Codev_Tim",
    },
  };
}
export default async function ServicePage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const page = getServicePage(slug, locale);
  if (!page) notFound();
  const language = lang(locale);
  const t = COPY[language];
  const at = new Date().toISOString();
  const offers = (serviceOffers[slug] ?? []).map(findOffer).filter((o) => !!o);
  const title =
    slug === "business-automation"
      ? locale === "ru"
        ? "CRM и автоматизация под ваш процесс."
        : locale === "uz"
          ? "Jarayoningiz uchun CRM va avtomatlashtirish."
          : "CRM and automation for your workflow."
      : slug === "corporate-website"
        ? locale === "ru"
          ? "Сайт компании с услугами и кейсами."
          : locale === "uz"
            ? "Xizmatlar va ishlar bilan kompaniya sayti."
            : "A business website for your services and work."
        : locale === "ru"
          ? "Сайт, с которого удобно заказать."
          : locale === "uz"
            ? "Buyurtma berish qulay bo‘lgan sayt."
            : "A website that makes it easy to enquire.";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description: page.description,
    areaServed: "Uzbekistan",
    offers: offers.map((o) => ({
      "@type": "Offer",
      name: o.name[language],
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: quoteOffer(o.id, new Date(at)).price,
        priceCurrency: "UZS",
      },
      url: getSiteUrl() + "/" + locale + "/contact?offer=" + o.id,
    })),
  };
  return (
    <>
      <JsonLdScript data={schema} />
      <div className="sales-page">
        <nav className="sales-jump">
          <Link href="/#prices">{t.back} ←</Link>
          <Link href="/projects">{t.navProjects}</Link>
          <a href="#request">{t.navContact}</a>
        </nav>
        <header className="sales-catalog-head">
          <p className="sales-eyebrow">{page.label}</p>
          <h1>{title}</h1>
          <p>{page.description}</p>
        </header>
        <div className="sales-project-grid">
          {offers.map((o) => (
            <OfferCard key={o.id} offer={o} locale={language} at={at} />
          ))}
        </div>
        <p className="sales-terms">
          {t.terms}
          <br />
          {t.excludes}
        </p>
        <section className="sales-section">
          <h2>{page.audienceTitle}</h2>
          <ul className="sales-scope">
            {page.audience.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>
        <section className="sales-section">
          <h2>{t.processTitle}</h2>
          <ol className="sales-process">
            {t.steps.map(([title, body], i) => (
              <li key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="sales-contact-page sales-section">
          <div>
            <h2>{t.finalTitle}</h2>
            <p className="sales-section-lead">{t.finalLead}</p>
            <ContactChannels locale={language} />
          </div>
          <aside className="sales-lead-card" id="request">
            <LeadForm locale={language} offerId={offers[0]?.id} />
          </aside>
        </section>
      </div>
    </>
  );
}
