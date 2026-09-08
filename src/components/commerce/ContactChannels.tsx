import config from "../../../content/site/config.json";
import { COPY } from "@/lib/commerce/copy";
import type { Locale } from "@/lib/commerce/catalog";
export function ContactChannels({
  locale,
  compact = false,
}: {
  locale: Locale;
  compact?: boolean;
}) {
  const t = COPY[locale];
  const { contacts, social } = config;
  const groups = [
    {
      title: "Telegram",
      mark: "↗",
      links: contacts.telegram.map((c) => ({ ...c, external: true })),
    },
    {
      title:
        locale === "ru" ? "Телефон" : locale === "uz" ? "Telefon" : "Phone",
      mark: "↗",
      links: contacts.phones.map((c) => ({ ...c, external: false })),
    },
    {
      title: "Email",
      mark: "@",
      links: [
        {
          label: contacts.email,
          href: "mailto:" + contacts.email,
          external: false,
        },
      ],
    },
    {
      title: "Instagram",
      mark: "↗",
      links: [{ label: "@codev_tim", href: social.instagram, external: true }],
    },
    ...(!compact
      ? [
          {
            title: "GitHub",
            mark: "↗",
            links: [
              { label: "WinstonSalemm", href: contacts.github, external: true },
            ],
          },
        ]
      : []),
  ];
  return (
    <section className="contact-channels" aria-label={t.contactTitle}>
      <div className="contact-channel-grid">
        {groups.map((group) => (
          <div className="contact-channel-card" key={group.title}>
            <div className="contact-channel-heading">
              <h2>{group.title}</h2>
              <span aria-hidden="true">{group.mark}</span>
            </div>
            {group.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
