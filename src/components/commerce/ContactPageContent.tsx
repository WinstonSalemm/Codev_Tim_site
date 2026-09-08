"use client";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { COPY } from "@/lib/commerce/copy";
import { findOffer, type Locale } from "@/lib/commerce/catalog";
import { LeadForm } from "./LeadForm";
import { ContactChannels } from "./ContactChannels";
import { OfferPrice } from "./OfferPrice";
export function ContactPageContent({
  locale,
  initialOffer,
  at,
}: {
  locale: Locale;
  initialOffer: string;
  at: string;
}) {
  const [selected, setSelected] = useState(initialOffer);
  const t = COPY[locale];
  const offer = findOffer(selected);
  return (
    <div className="sales-page">
      <nav className="sales-jump">
        <Link href="/">{t.back} ←</Link>
        <Link href="/projects">{t.navProjects}</Link>
      </nav>
      <div className="sales-contact-page">
        <div>
          <p className="sales-eyebrow">{t.eyebrow}</p>
          <h1 className="sales-contact-title">{t.finalTitle}</h1>
          <p className="sales-section-lead">{t.finalLead}</p>
          {offer && (
            <div className="sales-offer">
              <h2>{offer.name[locale]}</h2>
              <p className="sales-offer-result">{offer.result[locale]}</p>
              <OfferPrice id={offer.id} locale={locale} at={at} />
              <ul className="sales-scope">
                {offer.scope[locale].map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p className="sales-small-note">
                {offer.kind === "pilot"
                  ? t.pilotNote
                  : offer.project
                    ? t.caseNote
                    : t.excludes}
              </p>
            </div>
          )}
          <ContactChannels locale={locale} />
        </div>
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
