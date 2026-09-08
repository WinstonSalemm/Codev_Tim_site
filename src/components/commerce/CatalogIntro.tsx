import { Link } from "@/i18n/navigation";
import { COPY } from "@/lib/commerce/copy";
import { PROJECT_OFFERS, lang } from "@/lib/commerce/catalog";
import { OfferCard } from "./OfferCard";
export function CatalogIntro({ locale }: { locale: string }) {
  const language = lang(locale);
  const t = COPY[language];
  const at = new Date().toISOString();
  return (
    <div className="sales-page sales-catalog">
      <nav className="sales-jump">
        <Link href="/">{t.back} ←</Link>
        <Link href="/contact">{t.navContact}</Link>
      </nav>
      <header className="sales-catalog-head">
        <p className="sales-eyebrow">{t.projectsEyebrow}</p>
        <h1>{t.catalogTitle}</h1>
        <p>{t.catalogLead}</p>
      </header>
      <div className="sales-project-grid">
        {PROJECT_OFFERS.map((o) => (
          <OfferCard key={o.id} offer={o} locale={language} at={at} />
        ))}
      </div>
      <p className="sales-terms">
        {t.terms}
        <br />
        {t.excludes}
      </p>
    </div>
  );
}
