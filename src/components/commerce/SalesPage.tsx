"use client";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { COPY } from "@/lib/commerce/copy";
import {
  findOffer,
  PRIMARY_IDS,
  PROJECT_OFFERS,
  type Locale,
} from "@/lib/commerce/catalog";
import { quoteOffer } from "@/lib/commerce/pricing";
import config from "../../../content/site/config.json";
import { OfferPrice, usePricingTime } from "./OfferPrice";
import { OfferCard } from "./OfferCard";
import { LeadForm } from "./LeadForm";
import { ContactChannels } from "./ContactChannels";
import { Calculator } from "./Calculator";
export function SalesPage({ locale, at }: { locale: Locale; at: string }) {
  const t = COPY[locale];
  const [offerId, setOfferId] = useState("");
  const [extras, setExtras] = useState<string[]>([]);
  const now = usePricingTime(at);
  const active = PRIMARY_IDS.map((id) => ({
    id,
    ...quoteOffer(id, now),
  })).filter((q) => q.promotion);
  const choose = (id: string, additions: string[] = []) => {
    setOfferId(id);
    setExtras(additions);
    document.getElementById("request")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
    document
      .querySelector<HTMLInputElement>('#request input[name="name"]')
      ?.focus({ preventScroll: true });
  };
  return (
    <div className="sales-page">
      <nav className="sales-jump">
        <a href="#prices">{t.navPrices}</a>
        <a href="#calculator">{t.navCalculator}</a>
        <Link href="/projects">{t.navProjects}</Link>
        <a href="#request">{t.navContact}</a>
      </nav>
      <section className="sales-hero" aria-labelledby="sales-title">
        <div className="sales-hero-copy">
          <p className="sales-eyebrow">
            <span />
            {t.eyebrow}
          </p>
          <h1 id="sales-title">
            {t.headline}
            <br />
            <em>{t.accent}</em>
          </h1>
          <p className="sales-lead">{t.lead}</p>
          <div className="sales-entry-prices">
            {(
              [
                ["landing", t.site],
                ["bot", t.bot],
                ["system", t.crm],
              ] as const
            ).map(([id, label]) => (
              <a key={id} href={"#offer-" + id}>
                <span>{label}</span>
                <OfferPrice id={id} locale={locale} at={at} compact />
              </a>
            ))}
          </div>
          <div className="sales-actions">
            <a
              className="sales-button"
              href={config.contacts.telegram[0]!.href}
              target="_blank"
              rel="noreferrer"
            >
              {t.telegram} ↗
            </a>
            <a className="sales-button sales-button-secondary" href="#prices">
              {t.choose} ↓
            </a>
          </div>
          <p className="sales-note">{t.heroNote}</p>
          <div className="sales-hero-contacts">
            <a href={config.contacts.phones[0]!.href}>
              {config.contacts.phones[0]!.label}
            </a>
            <a href={"mailto:" + config.contacts.email}>Email ↗</a>
            <a href={config.social.instagram} target="_blank" rel="noreferrer">
              Instagram ↗
            </a>
          </div>
        </div>
        <aside className="sales-lead-card" id="request">
          <LeadForm locale={locale} offerId={offerId} extras={extras} />
        </aside>
      </section>
      <div className="sales-trust-strip">
        {t.trust.map((item, i) => (
          <div key={item}>
            <span>0{i + 1}</span>
            {item}
          </div>
        ))}
      </div>
      {active.length > 0 && (
        <section className="sales-promotion" aria-label={t.promoTitle}>
          <span className="sales-promotion-symbol">%</span>
          <div>
            <h2>{active[0]!.promotion!.title[locale]}</h2>
            <p>
              {active
                .map(
                  (q) => findOffer(q.id)!.name[locale] + " −" + q.percent + "%"
                )
                .join(" · ")}
            </p>
            <small>{t.promoNote}</small>
          </div>
          <a href="#prices">{t.choose} ↓</a>
        </section>
      )}
      <section
        className="sales-section"
        id="prices"
        aria-labelledby="prices-title"
      >
        <p className="sales-eyebrow">{t.pricesEyebrow}</p>
        <h2 id="prices-title">{t.pricesTitle}</h2>
        <p className="sales-section-lead">{t.pricesLead}</p>
        <div className="sales-offer-grid">
          {PRIMARY_IDS.map((id) => (
            <OfferCard
              key={id}
              offer={findOffer(id)!}
              locale={locale}
              at={at}
              onChoose={choose}
            />
          ))}
        </div>
        <p className="sales-terms">
          {t.terms}
          <br />
          {t.excludes}
        </p>
      </section>
      <Calculator locale={locale} at={at} onChoose={choose} />
      <section
        className="sales-section"
        id="projects"
        aria-labelledby="projects-title"
      >
        <div className="sales-section-heading">
          <div>
            <p className="sales-eyebrow">{t.projectsEyebrow}</p>
            <h2 id="projects-title">{t.projectsTitle}</h2>
          </div>
          <Link href="/projects" className="sales-detail-link">
            {t.allProjects} ↗
          </Link>
        </div>
        <p className="sales-section-lead">{t.projectsLead}</p>
        <div className="sales-project-grid">
          {PROJECT_OFFERS.filter((o) =>
            ["poj-pro-site", "codev-tim-travel", "codev-erp"].includes(o.id)
          ).map((o) => (
            <OfferCard
              key={o.id}
              offer={o}
              locale={locale}
              at={at}
              onChoose={choose}
            />
          ))}
        </div>
      </section>
      <section className="sales-section">
        <p className="sales-eyebrow">{t.processEyebrow}</p>
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
      <section className="sales-section">
        <h2>{t.supportTitle}</h2>
        <div className="sales-project-grid">
          {["brief", "support-basic", "support-extended"].map((id) => (
            <OfferCard
              key={id}
              offer={findOffer(id)!}
              locale={locale}
              at={at}
              onChoose={choose}
            />
          ))}
        </div>
        <p className="sales-terms">{t.supportNote}</p>
      </section>
      <section className="sales-section sales-faq">
        <h2>{t.faqTitle}</h2>
        {t.faq.map(([question, answer]) => (
          <details key={question}>
            <summary>
              {question}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>
      <section className="sales-final">
        <div>
          <h2>{t.finalTitle}</h2>
          <p>{t.finalLead}</p>
          <a className="sales-button" href="#request">
            {t.submit} ↗
          </a>
        </div>
        <ContactChannels locale={locale} />
      </section>
      <footer className="sales-footer">
        <span>{t.footer}</span>
        <span>RU · O‘Z · EN</span>
      </footer>
      <div className="sales-mobile-contact">
        <a
          href={config.contacts.telegram[0]!.href}
          target="_blank"
          rel="noreferrer"
        >
          Telegram ↗
        </a>
        <a href="#request">{t.submit} ↗</a>
      </div>
    </div>
  );
}
