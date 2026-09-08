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
        <ContactChannels locale={locale} />
        <aside className="sales-lead-card" id="request">
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
