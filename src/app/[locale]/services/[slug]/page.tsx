import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { JsonLdScript } from "@/components/seo";
import { LeadForm } from "@/components/commerce/LeadForm";
import { OfferCard } from "@/components/commerce/OfferCard";
import { ContactChannels } from "@/components/commerce/ContactChannels";
import { COPY } from "@/lib/commerce/copy";
import { findOffer, lang, type Locale } from "@/lib/commerce/catalog";
import {
  getServiceLanding,
  SERVICE_LANDING_SLUGS,
} from "@/lib/commerce/service-landings";
import { buildOfferJsonLd } from "@/lib/seo/build-offer-json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildAlternateLanguages, getSiteUrl } from "@/lib/seo/site-url";
import { SERVICE_LANDINGS } from "@/lib/commerce/service-landings";
import { serviceConfiguration } from "@/lib/commerce/service-preset";
import { serviceQuestions } from "@/lib/commerce/service-questions";
import { estimateConfiguration } from "@/lib/commerce/configurator";
import { money, quoteOffer } from "@/lib/commerce/pricing";
import config from "../../../../../content/site/config.json";
import screenshots from "../../../../../content/commerce/project-screenshots.json";

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
  return buildPageMetadata({
    locale,
    title: `${page.seoTitle[language]} | Codev_Tim`,
    description: page.description[language],
    canonical,
    alternateLanguages: buildAlternateLanguages(`/services/${slug}`),
    ogImageAlt: `${page.seoTitle[language]} | Codev_Tim`,
  });
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
  const canonical = `${getSiteUrl()}/${locale}/services/${slug}`;
  const configuration = page.preset
    ? serviceConfiguration(page.preset, language)
    : undefined;
  const estimate = configuration
    ? estimateConfiguration(configuration, language, new Date(at))
    : undefined;
  const startingPrice =
    estimate?.total ??
    Math.min(
      ...offers.map((offer) => quoteOffer(offer.id, new Date(at)).price)
    );
  const proofImage = (
    screenshots as Record<
      string,
      Array<{
        src: string;
        width: number;
        height: number;
        alt: Record<Locale, string>;
      }>
    >
  )[page.proofHref.split("/").pop() ?? ""]?.[0];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: page.title[language],
    description: page.description[language],
    url: canonical,
    areaServed: { "@type": "Country", name: "Uzbekistan" },
    provider: {
      "@type": "Organization",
      "@id": `${getSiteUrl()}/#organization`,
      name: "Codev_Tim",
      url: getSiteUrl(),
    },
    offers: estimate
      ? [
          {
            "@type": "Offer",
            name: page.title[language],
            description: page.deliverables[language].join("; "),
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: estimate.total,
              priceCurrency: "UZS",
            },
            url: `${canonical}#service-estimate`,
          },
        ]
      : offers.map((offer) =>
          buildOfferJsonLd(offer, language, canonical, new Date(at))
        ),
  };

  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@graph": [
            schema,
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: t.navPrices,
                  item: `${getSiteUrl()}/${locale}`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: page.seoTitle[language],
                  item: canonical,
                },
              ],
            },
          ],
        }}
      />
      <div className="sales-page service-sales-page">
        <nav className="sales-jump">
          <Link href="/#solutions">{t.back} ←</Link>
          <Link href="/projects">{t.navProjects}</Link>
          <a href="#request">{t.navContact}</a>
        </nav>
        <header className="sales-catalog-head service-sales-hero">
          <p className="sales-eyebrow">
            CODEV_TIM ·{" "}
            {language === "ru"
              ? "ТАШКЕНТ"
              : language === "uz"
                ? "TOSHKENT"
                : "TASHKENT"}
          </p>
          <h1>{page.title[language]}</h1>
          <p>{page.lead[language]}</p>
          <p className="service-starting-price">
            {t.from} <strong>{money(startingPrice, language)}</strong> ·{" "}
            {language === "ru"
              ? "точная смета до начала работ"
              : language === "uz"
                ? "aniq smeta ish boshlanishidan oldin"
                : "scope and estimate agreed before work"}
          </p>
          <div className="sales-actions service-top-actions">
            <a className="sales-button" href="#request">
              {t.submit}
            </a>
            <a
              className="sales-button sales-button-secondary"
              href={config.contacts.telegram[0]!.href}
              target="_blank"
              rel="noreferrer"
            >
              {t.telegram}
            </a>
          </div>
          <p className="sales-small-note">
            {language === "ru"
              ? "Начнём с вашей задачи: готовое техническое задание не обязательно. Смету согласуем до разработки."
              : language === "uz"
                ? "Vazifangizdan boshlaymiz: tayyor texnik topshiriq shart emas. Smeta ishlab chiqishdan oldin kelishiladi."
                : "Start with your task; a finished specification is optional. We agree the estimate before development."}
          </p>
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
        {proofImage && (
          <Link className="service-proof-visual" href={page.proofHref}>
            <Image
              src={proofImage.src}
              width={proofImage.width}
              height={proofImage.height}
              alt={proofImage.alt[language]}
              sizes="(max-width: 800px) 100vw, 900px"
            />
            <span>{t.detail} →</span>
          </Link>
        )}
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
          {estimate && estimate.total !== null ? (
            <div className="service-estimate" id="service-estimate">
              <p>
                {t.from} <strong>{money(estimate.total, language)}</strong>
              </p>
              <ul>
                <li>
                  {offers[0]?.name[language]}:{" "}
                  {money(estimate.quote.price, language)}
                </li>
                {estimate.lines.map((line) => (
                  <li key={line.label}>
                    {line.label}: {money(line.amount, language)}
                  </li>
                ))}
              </ul>
              <p>
                {language === "ru"
                  ? "Один язык, подготовленные материалы. Ниже — точные границы состава; дополнительные задачи согласуем отдельно."
                  : language === "uz"
                    ? "Bitta til va tayyor materiallar. Tarkib chegaralari quyida, qo‘shimcha vazifalar alohida kelishiladi."
                    : "One language and prepared materials. Scope limits are listed below; additions are agreed separately."}
              </p>
              <a className="sales-button" href="#request">
                {t.submit}
              </a>
            </div>
          ) : (
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
          )}
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
        {page.boundaries && (
          <section className="sales-section service-sales-section">
            <h2>
              {language === "ru"
                ? "Что согласуем отдельно"
                : language === "uz"
                  ? "Alohida kelishiladigan ishlar"
                  : "Scope limits and separate costs"}
            </h2>
            <ul className="sales-scope service-sales-list">
              {page.boundaries[language].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}
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
        <section className="sales-section sales-faq">
          <h2>{t.faqTitle}</h2>
          {(
            page.questions?.[language] ??
            serviceQuestions(slug, language) ??
            t.faq
          ).map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </section>
        <section className="sales-section">
          <h2>
            {language === "ru"
              ? "Выберите подходящий формат"
              : language === "uz"
                ? "Mos formatni tanlang"
                : "Find the right format"}
          </h2>
          <div className="service-related">
            {Object.values(SERVICE_LANDINGS)
              .filter((item) => item.slug !== slug)
              .map((item) => (
                <Link
                  className="sales-detail-link"
                  key={item.slug}
                  href={`/services/${item.slug}`}
                >
                  {item.seoTitle[language]} →
                </Link>
              ))}
          </div>
        </section>
        <section className="sales-final" id="request">
          <div>
            <p className="sales-eyebrow">CONTACT / DIRECT</p>
            <h2>{t.finalTitle}</h2>
            <p>{t.finalLead}</p>
            <ContactChannels locale={language} compact />
          </div>
          <aside className="sales-lead-card">
            <LeadForm
              locale={language}
              configuration={configuration}
              offerId={configuration ? undefined : offers[0]?.id}
            />
          </aside>
        </section>
      </div>
      <div className="sales-mobile-contact">
        <a
          href={config.contacts.telegram[0]!.href}
          target="_blank"
          rel="noreferrer"
        >
          Telegram
        </a>
        <a href="#request">{t.navContact}</a>
      </div>
    </>
  );
}
