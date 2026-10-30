import type { Locale } from "@/lib/commerce/catalog";
import { EXPRESS_START_COPY } from "@/lib/commerce/express-start";

export function ExpressStartDetails({ locale }: { locale: Locale }) {
  const t = EXPRESS_START_COPY[locale];
  return (
    <div className="express-start-details">
      <details>
        <summary>{t.exclusionsTitle}</summary>
        <p>{t.materialsNote}</p>
        <p>{t.exclusions}</p>
      </details>
    </div>
  );
}
