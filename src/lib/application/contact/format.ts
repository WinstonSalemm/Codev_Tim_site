import { getSiteConfig } from "@/lib/content";
import type { ValidatedContactForm } from "@/lib/domain/contact";

const REPLY_VIA_LABELS: Record<ValidatedContactForm["replyVia"], string> = {
  email: "EMAIL CHANNEL",
  call: "VOICE CHANNEL",
  telegram: "TELEGRAM CHANNEL",
};

const LANGUAGE_LABELS: Record<
  ValidatedContactForm["preferredLanguage"],
  string
> = {
  en: "English",
  ru: "Russian",
  uz: "Uzbek",
};

const LOCALE_LABELS: Record<string, string> = {
  en: "EN",
  ru: "RU",
  uz: "UZ",
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function formatSubmittedAt(date = new Date()) {
  const formatted = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tashkent",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  return `${formatted} · UTC+5`;
}

function readSiteMeta() {
  const config = getSiteConfig();
  const siteUrl = process.env.SITE_URL?.replace(/\/$/, "");

  return {
    name: config.name,
    version: config.version,
    responseHours: config.availability.responseTimeHours,
    siteUrl,
  };
}

function formatEmailField(data: ValidatedContactForm, html: boolean) {
  if (!data.email) {
    return html ? "<code>—</code>" : "—";
  }

  if (html) {
    return `<a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>`;
  }

  return data.email;
}

function formatPhoneField(data: ValidatedContactForm, html: boolean) {
  if (html) {
    return `<a href="${phoneHref(data.phone)}">${escapeHtml(data.phone)}</a>`;
  }

  return data.phone;
}

function buildContactSections(data: ValidatedContactForm, html: boolean) {
  const meta = readSiteMeta();
  const localeTag = LOCALE_LABELS[data.locale] ?? data.locale.toUpperCase();
  const divider = "────────────────────────";

  const lines: string[] = [
    html
      ? `<b>${escapeHtml(meta.name)}</b> · <code>COMMUNICATION MODULE</code>`
      : `${meta.name} · COMMUNICATION MODULE`,
    divider,
    html ? "<b>STATUS</b>  ● INBOUND QUEUED" : "STATUS  ● INBOUND QUEUED",
    html
      ? "<b>EVENT</b>   Contact form transmission"
      : "EVENT   Contact form transmission",
    html
      ? `<b>SLA</b>     Response within ${meta.responseHours} hours`
      : `SLA     Response within ${meta.responseHours} hours`,
    "",
    html ? "<b>▸ IDENTITY</b>" : "▸ IDENTITY",
    html ? `<b>Name</b>   ${escapeHtml(data.name)}` : `Name   ${data.name}`,
    html
      ? `<b>Phone</b>  ${formatPhoneField(data, true)}`
      : `Phone  ${formatPhoneField(data, false)}`,
    html
      ? `<b>Email</b>  ${formatEmailField(data, true)}`
      : `Email  ${formatEmailField(data, false)}`,
    "",
    html ? "<b>▸ ROUTING</b>" : "▸ ROUTING",
    html
      ? `<b>Reply via</b>   ${REPLY_VIA_LABELS[data.replyVia]}`
      : `Reply via   ${REPLY_VIA_LABELS[data.replyVia]}`,
    html
      ? `<b>Language</b>    ${LANGUAGE_LABELS[data.preferredLanguage]}`
      : `Language    ${LANGUAGE_LABELS[data.preferredLanguage]}`,
    html ? `<b>Site locale</b> ${localeTag}` : `Site locale ${localeTag}`,
  ];

  if (data.message) {
    lines.push(
      "",
      html ? "<b>▸ PAYLOAD</b>" : "▸ PAYLOAD",
      html
        ? `<pre>${escapeHtml(data.message)}</pre>`
        : data.message
            .split("\n")
            .map((line) => `  ${line}`)
            .join("\n")
    );
  }

  lines.push(
    "",
    divider,
    html
      ? `<code>// module: communication · channel: inbound · v${escapeHtml(meta.version)}</code>`
      : `// module: communication · channel: inbound · v${meta.version}`
  );

  if (meta.siteUrl) {
    lines.push(
      html
        ? `<b>Source</b>  <a href="${escapeHtml(meta.siteUrl)}/contact">${escapeHtml(meta.siteUrl)}/contact</a>`
        : `Source  ${meta.siteUrl}/contact`
    );
  }

  lines.push(
    html ? `<i>${formatSubmittedAt()}</i>` : `Timestamp  ${formatSubmittedAt()}`
  );

  return lines.join("\n");
}

export function formatContactPlainText(data: ValidatedContactForm) {
  return buildContactSections(data, false);
}

export function formatContactHtml(data: ValidatedContactForm) {
  const body = buildContactSections(data, true).replaceAll("\n", "<br>");
  return `<div>${body}</div>`;
}

export function formatContactTelegramHtml(data: ValidatedContactForm) {
  return buildContactSections(data, true);
}
