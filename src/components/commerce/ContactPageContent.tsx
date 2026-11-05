"use client";
import { useState } from "react";
import { COPY } from "@/lib/commerce/copy";
import type { Locale } from "@/lib/commerce/catalog";
import { LeadForm } from "./LeadForm";
import { ContactChannels } from "./ContactChannels";
export function ContactPageContent({
  locale,
  initialOffer,
}: {
  locale: Locale;
  initialOffer: string;
  at: string;
}) {
  const [selected, setSelected] = useState(initialOffer);
  const t = COPY[locale];
  return (
    <div className="sales-page contact-page">
      <header className="studio-page-heading">
        <p className="sales-eyebrow">Codev_Tim / Tashkent</p>
        <h1>
          {locale === "ru"
            ? "На связи"
            : locale === "uz"
              ? "Bog‘lanamiz"
              : "Get in touch"}
        </h1>
        <p>{t.finalLead}</p>
      </header>
      <div className="sales-contact-page">
        <div className="contact-direct">
          <p className="sales-eyebrow">
            {locale === "ru"
              ? "01 / Напишите напрямую"
              : locale === "uz"
                ? "01 / Bevosita yozing"
                : "01 / Direct contact"}
          </p>
          <ContactChannels locale={locale} />
        </div>
        <aside className="sales-lead-card" id="request">
          <p className="sales-eyebrow">
            {locale === "ru"
              ? "02 / Расскажите о задаче"
              : locale === "uz"
                ? "02 / Vazifani aytib bering"
                : "02 / Tell me about the project"}
          </p>
          <LeadForm
            locale={locale}
            offerId={selected}
            onOfferChange={setSelected}
          />
        </aside>
      </div>
    </div>
  );
}
