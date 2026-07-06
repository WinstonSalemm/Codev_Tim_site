import { getTranslations } from "next-intl/server";
import { ModuleHeader } from "@/components/ui/ModuleHeader";
import { ModulePageEnterMotion } from "@/components/modules/dashboard/motion";
import { getSiteConfig } from "@/lib/content";

export async function CommunicationModulePage() {
  const [tModules, t] = await Promise.all([
    getTranslations("modules"),
    getTranslations("contact"),
  ]);
  const config = getSiteConfig();
  const { contacts, availability, author } = config;

  return (
    <ModulePageEnterMotion>
      <div className="ds-module-page">
        <ModuleHeader
          label={tModules("communicationModule.label")}
          name={tModules("communicationModule.name")}
          description={tModules("communicationModule.description")}
        />

        <div className="ds-contact-body">
          {/* Pitch */}
          <section className="ds-contact-pitch" aria-label={t("pitch.heading")}>
            <h2 className="ds-contact-pitch-heading">{t("pitch.heading")}</h2>
            <p className="ds-contact-pitch-body">{t("pitch.body")}</p>
            <p className="ds-contact-pitch-note">{t("pitch.note")}</p>
          </section>

          {/* Channels */}
          <section
            className="ds-contact-section"
            aria-labelledby="contact-channels"
          >
            <h2 id="contact-channels" className="ds-contact-section-title">
              {t("channels.heading")}
            </h2>

            <ul className="ds-contact-channel-list">
              <li className="ds-contact-channel ds-contact-channel--primary">
                <span className="ds-contact-channel-label ds-text-label">
                  {t("channels.telegram")}
                </span>
                <span className="ds-contact-channel-hint">
                  {t("channels.telegramHint")}
                </span>
                <div className="ds-contact-channel-values">
                  {contacts.telegram.map((channel) => (
                    <a
                      key={channel.href}
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ds-contact-channel-link"
                    >
                      {channel.label}
                    </a>
                  ))}
                </div>
              </li>

              <li className="ds-contact-channel">
                <span className="ds-contact-channel-label ds-text-label">
                  {t("channels.phone")}
                </span>
                <span className="ds-contact-channel-hint">
                  {t("channels.phoneHint")}
                </span>
                <div className="ds-contact-channel-values">
                  {contacts.phones.map((channel) => (
                    <a
                      key={channel.href}
                      href={channel.href}
                      className="ds-contact-channel-link"
                    >
                      {channel.label}
                    </a>
                  ))}
                </div>
              </li>

              <li className="ds-contact-channel">
                <span className="ds-contact-channel-label ds-text-label">
                  {t("channels.email")}
                </span>
                <span className="ds-contact-channel-hint">
                  {t("channels.emailHint")}
                </span>
                <div className="ds-contact-channel-values">
                  <a
                    href={`mailto:${contacts.email}`}
                    className="ds-contact-channel-link"
                  >
                    {contacts.email}
                  </a>
                </div>
              </li>

              <li className="ds-contact-channel">
                <span className="ds-contact-channel-label ds-text-label">
                  {t("channels.github")}
                </span>
                <span className="ds-contact-channel-hint">
                  {t("channels.githubHint")}
                </span>
                <div className="ds-contact-channel-values">
                  <a
                    href={contacts.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ds-contact-channel-link"
                  >
                    {contacts.github.replace("https://", "")}
                  </a>
                </div>
              </li>
            </ul>
          </section>

          {/* Availability */}
          <section
            className="ds-contact-section"
            aria-labelledby="contact-availability"
          >
            <h2 id="contact-availability" className="ds-contact-section-title">
              {t("availability.heading")}
            </h2>
            <dl className="ds-contact-availability-grid">
              <div className="ds-contact-availability-row">
                <dt className="ds-contact-availability-label ds-text-label">
                  {t("availability.status")}
                </dt>
                <dd className="ds-contact-availability-value ds-contact-availability-value--open">
                  <span
                    className="ds-statusbar-dot ds-status-dot-operational"
                    aria-hidden="true"
                  />
                  {t("availability.statusValue")}
                </dd>
              </div>
              <div className="ds-contact-availability-row">
                <dt className="ds-contact-availability-label ds-text-label">
                  {t("availability.responseTime")}
                </dt>
                <dd className="ds-contact-availability-value">
                  {t("availability.responseTimeValue", {
                    hours: availability.responseTimeHours,
                  })}
                </dd>
              </div>
              <div className="ds-contact-availability-row">
                <dt className="ds-contact-availability-label ds-text-label">
                  {t("availability.location")}
                </dt>
                <dd className="ds-contact-availability-value">
                  {author.location} · {author.timezone}
                </dd>
              </div>
              <div className="ds-contact-availability-row">
                <dt className="ds-contact-availability-label ds-text-label">
                  {t("availability.languages")}
                </dt>
                <dd className="ds-contact-availability-value">
                  {t("availability.languagesValue")}
                </dd>
              </div>
            </dl>
          </section>

          {/* What to send */}
          <section
            className="ds-contact-section"
            aria-labelledby="contact-brief"
          >
            <h2 id="contact-brief" className="ds-contact-section-title">
              {t("brief.heading")}
            </h2>
            <p className="ds-contact-brief-intro">{t("brief.intro")}</p>
            <ol className="ds-contact-brief-list">
              <li className="ds-contact-brief-item">{t("brief.item1")}</li>
              <li className="ds-contact-brief-item">{t("brief.item2")}</li>
              <li className="ds-contact-brief-item">{t("brief.item3")}</li>
            </ol>
            <p className="ds-contact-brief-outro">{t("brief.outro")}</p>
          </section>
        </div>
      </div>
    </ModulePageEnterMotion>
  );
}
