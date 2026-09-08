import { Link } from "@/i18n/navigation";
import { findOffer, lang } from "@/lib/commerce/catalog";
import { COPY } from "@/lib/commerce/copy";
import { OfferPrice } from "./OfferPrice";
export function ProjectOffer({
  slug,
  locale,
}: {
  slug: string;
  locale: string;
}) {
  const offer = findOffer(slug);
  if (!offer) return null;
  const language = lang(locale);
  const t = COPY[language];
  return (
    <section className="sales-product-intro" aria-label={offer.name[language]}>
      <p className="sales-eyebrow">
        {offer.kind === "pilot" ? t.pilot : t.case}
      </p>
      <div className="sales-product-intro-grid">
        <div>
          <h2>{offer.name[language]}</h2>
          <p>{offer.result[language]}</p>
          <ul className="sales-scope">
            {offer.scope[language].map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div>
          <OfferPrice
            id={offer.id}
            locale={language}
            at={new Date().toISOString()}
          />
          <p className="sales-timeline">
            {offer.days} {t.workingDays}
          </p>
          <Link className="sales-button" href={"/contact?offer=" + offer.id}>
            {t.order} ↗
          </Link>
        </div>
      </div>
      <p className="sales-small-note">
        {offer.kind === "pilot" ? t.pilotNote : t.caseNote} {t.excludes}
      </p>
    </section>
  );
}
