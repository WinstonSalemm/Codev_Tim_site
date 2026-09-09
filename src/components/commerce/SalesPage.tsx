"use client";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { COPY } from "@/lib/commerce/copy";
import { findOffer, PRIMARY_IDS, type Locale } from "@/lib/commerce/catalog";
import {
  defaultConfiguration,
  type ProjectKind,
} from "@/lib/commerce/configurator";
import config from "../../../content/site/config.json";
import { OfferPrice } from "./OfferPrice";
import { OfferCard } from "./OfferCard";
import { LeadForm } from "./LeadForm";
import { Calculator } from "./Calculator";
export function SalesPage({ locale, at }: { locale: Locale; at: string }) {
  const t = COPY[locale];
  const invitation = {
    ru: {
      title: "Сколько будет стоить ваш проект?",
      note: "Выберите задачу и нужные функции",
      action: "Открыть калькулятор",
    },
    uz: {
      title: "Loyihangiz qancha turadi?",
      note: "Vazifa va kerakli funksiyalarni tanlang",
      action: "Kalkulyatorni ochish",
    },
    en: {
      title: "What will your project cost?",
      note: "Choose your project and the features you need",
      action: "Open calculator",
    },
  }[locale];
  const openCalculator = () => {
    document.getElementById("calculator")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
    document.getElementById("calculator-title")?.focus({ preventScroll: true });
  };
  const [configuration, setConfiguration] = useState(() =>
    defaultConfiguration("website", locale)
  );
  const [calculatorLocked, setCalculatorLocked] = useState(false);
  const choose = (id: string) => {
    if (calculatorLocked) return;
    const kind: ProjectKind =
      id === "bot"
        ? "bot"
        : id === "system"
          ? "crm"
          : id === "assistant-agent"
            ? "ai"
            : id.startsWith("support")
              ? "support"
              : id === "brief"
                ? "audit"
                : "website";
    const next = defaultConfiguration(kind, locale);
    if (id === "corporate") next.pages = 5;
    if (id === "support-extended") next.supportPlan = "extended";
    setConfiguration(next);
    openCalculator();
  };
  return (
    <div className="sales-page">
      <nav
        className="sales-jump"
        aria-label={
          locale === "ru"
            ? "На этой странице"
            : locale === "uz"
              ? "Shu sahifada"
              : "On this page"
        }
      >
        <a className="sales-jump-calculator" href="#calculator">
          {invitation.action}
        </a>
        <a href="#prices">{t.navPrices}</a>
        <a href="#request">{t.navContact}</a>
      </nav>
      <section className="sales-hero" aria-labelledby="sales-title">
        <div className="sales-hero-copy">
          <p className="sales-eyebrow">{t.eyebrow}</p>
          <h1 id="sales-title">
            {t.headline}
            <br />
            <em>{t.accent}</em>
          </h1>
          <p className="sales-lead">{t.lead}</p>
          <a
            className="calculator-invitation"
            href="#calculator"
            onClick={(event) => {
              event.preventDefault();
              openCalculator();
            }}
          >
            <svg
              className="calculator-invitation-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect x="4" y="2" width="16" height="20" rx="3" />
              <path d="M8 6h8M8 11h1m6 0h1m-8 4h1m6 0h1m-8 4h1m6 0h1" />
            </svg>
            <span className="calculator-invitation-copy">
              <strong>{invitation.title}</strong>
              <span>{invitation.note}</span>
              <b>
                {invitation.action} <span aria-hidden="true">↓</span>
              </b>
            </span>
          </a>
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
          <p className="sales-note">{t.heroNote}</p>
          <Link className="sales-hero-projects" href="/projects">
            {t.navProjects} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <aside className="sales-lead-card" id="request">
          <LeadForm locale={locale} />
        </aside>
      </section>
      <Calculator
        locale={locale}
        at={at}
        configuration={configuration}
        onChange={setConfiguration}
        onLockChange={setCalculatorLocked}
      />
      <section
        className="sales-section"
        id="prices"
        aria-labelledby="prices-title"
      >
        <div className="sales-section-heading">
          <h2 id="prices-title">
            {locale === "ru"
              ? "Что можно заказать"
              : locale === "uz"
                ? "Nima buyurtma qilish mumkin"
                : "What I build"}
          </h2>
          <span className="sales-small-note">
            {locale === "ru"
              ? "Цены в сумах"
              : locale === "uz"
                ? "Narxlar so‘mda"
                : "Prices in UZS"}
          </span>
        </div>
        <div className="sales-offer-grid">
          {[...PRIMARY_IDS, "assistant-agent"].map((id) => (
            <OfferCard
              key={id}
              offer={findOffer(id)!}
              locale={locale}
              at={at}
              onChoose={choose}
              disabled={calculatorLocked}
            />
          ))}
        </div>
        <p className="sales-terms">
          {t.terms} {t.excludes}
        </p>
        <details className="sales-support-disclosure">
          <summary>
            {locale === "ru"
              ? "Аудит и поддержка после запуска"
              : locale === "uz"
                ? "Audit va ishga tushgandan keyin yordam"
                : "Audits and ongoing support"}
            <span aria-hidden="true">+</span>
          </summary>
          <div className="sales-project-grid">
            {["brief", "support-basic", "support-extended"].map((id) => (
              <OfferCard
                key={id}
                offer={findOffer(id)!}
                locale={locale}
                at={at}
                onChoose={choose}
                disabled={calculatorLocked}
              />
            ))}
          </div>
          <p className="sales-terms">{t.supportNote}</p>
        </details>
      </section>
      <section className="sales-section sales-faq">
        <h2>{t.faqTitle}</h2>
        {t.faq
          .filter((_, i) => [0, 2, 4].includes(i))
          .map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
      </section>
      <footer className="sales-footer">
        <span>{t.footer}</span>
        <Link href="/contact">{t.contactTitle}</Link>
      </footer>
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
    </div>
  );
}
