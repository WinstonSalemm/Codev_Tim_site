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
  return (
    <div
      className={
        compact ? "sales-channels sales-channels-compact" : "sales-channels"
      }
    >
      <p>{compact ? t.direct : t.contactTitle}</p>
      <div className="sales-channel-links">
        {contacts.telegram.map((c) => (
          <a key={c.href} href={c.href} target="_blank" rel="noreferrer">
            Telegram {c.label} ↗
          </a>
        ))}
        {contacts.phones.map((c) => (
          <a key={c.href} href={c.href}>
            {c.label}
          </a>
        ))}
        <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
        <a href={social.instagram} target="_blank" rel="noreferrer">
          Instagram ↗
        </a>
        {!compact && (
          <a href={contacts.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        )}
      </div>
    </div>
  );
}
