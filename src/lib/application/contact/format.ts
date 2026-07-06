import type { ValidatedContactForm } from "@/lib/domain/contact";

const REPLY_VIA_LABELS: Record<ValidatedContactForm["replyVia"], string> = {
  email: "Email",
  call: "Phone call",
  telegram: "Telegram",
};

const LANGUAGE_LABELS: Record<
  ValidatedContactForm["preferredLanguage"],
  string
> = {
  en: "English",
  ru: "Russian",
  uz: "Uzbek",
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function formatContactPlainText(data: ValidatedContactForm) {
  const lines = [
    "New contact form submission",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email ?? "—"}`,
    `Reply via: ${REPLY_VIA_LABELS[data.replyVia]}`,
    `Preferred language: ${LANGUAGE_LABELS[data.preferredLanguage]}`,
    `Site locale: ${data.locale}`,
  ];

  if (data.message) {
    lines.push("", "Message:", data.message);
  }

  lines.push("", `Submitted at: ${new Date().toISOString()}`);

  return lines.join("\n");
}

export function formatContactHtml(data: ValidatedContactForm) {
  const messageBlock = data.message
    ? `<p><strong>Message</strong><br>${escapeHtml(data.message).replaceAll("\n", "<br>")}</p>`
    : "";

  return `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email ?? "—")}</p>
    <p><strong>Reply via:</strong> ${REPLY_VIA_LABELS[data.replyVia]}</p>
    <p><strong>Preferred language:</strong> ${LANGUAGE_LABELS[data.preferredLanguage]}</p>
    <p><strong>Site locale:</strong> ${escapeHtml(data.locale)}</p>
    ${messageBlock}
    <p><strong>Submitted at:</strong> ${new Date().toISOString()}</p>
  `.trim();
}

export function formatContactTelegramHtml(data: ValidatedContactForm) {
  const messageBlock = data.message
    ? `\n\n<b>Message</b>\n${escapeHtml(data.message)}`
    : "";

  return [
    "<b>Contact form submission</b>",
    "",
    `<b>Name:</b> ${escapeHtml(data.name)}`,
    `<b>Phone:</b> ${escapeHtml(data.phone)}`,
    `<b>Email:</b> ${escapeHtml(data.email ?? "—")}`,
    `<b>Reply via:</b> ${REPLY_VIA_LABELS[data.replyVia]}`,
    `<b>Language:</b> ${LANGUAGE_LABELS[data.preferredLanguage]}`,
    `<b>Site locale:</b> ${escapeHtml(data.locale)}`,
    messageBlock,
    "",
    `<i>${new Date().toISOString()}</i>`,
  ].join("\n");
}
