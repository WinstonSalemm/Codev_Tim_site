import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getSiteConfig } from "@/lib/content";

export async function QuickActions() {
  const t = await getTranslations("dashboard.quickActions");
  const config = getSiteConfig();
  const telegram = config.contacts.telegram[0];

  return (
    <section className="ds-dashboard-quick-actions" aria-label={t("region")}>
      <div className="ds-quick-actions-inner">
        <header className="ds-quick-actions-header">
          <span className="ds-text-label">{t("label")}</span>
          <h2 className="ds-quick-actions-title">{t("title")}</h2>
          <p className="ds-quick-actions-description">{t("description")}</p>
        </header>

        <div className="ds-quick-actions-list">
          {telegram ? (
            <a
              href={telegram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ds-quick-action ds-quick-action--primary"
            >
              <span className="ds-quick-action-label">{t("telegram")}</span>
              <span className="ds-quick-action-value">{telegram.label}</span>
            </a>
          ) : null}

          <Link href="/contact" className="ds-quick-action">
            <span className="ds-quick-action-label">{t("contact")}</span>
            <span className="ds-quick-action-value">{t("contactValue")}</span>
          </Link>

          <Link href="/projects" className="ds-quick-action">
            <span className="ds-quick-action-label">{t("projects")}</span>
            <span className="ds-quick-action-value">{t("projectsValue")}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
