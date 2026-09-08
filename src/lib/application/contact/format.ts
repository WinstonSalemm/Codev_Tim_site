import type { ValidatedContactForm } from "@/lib/domain/contact";
function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
function buildContactSections(data: ValidatedContactForm, html: boolean) {
  const clean = (value: string) => (html ? escapeHtml(value) : value);
  const label = (value: string) => (html ? "<b>" + value + "</b>" : value);
  const channels = { email: "Email", call: "Позвонить", telegram: "Telegram" };
  return [
    label("Новая заявка · Codev_Tim"),
    "",
    label("Имя:") + " " + clean(data.name),
    label("Телефон:") + " " + clean(data.phone),
    ...(data.email ? [label("Email:") + " " + clean(data.email)] : []),
    "Связаться: " + channels[data.replyVia],
    "Язык: " + data.preferredLanguage.toUpperCase(),
    "",
    ...(data.message ? [label("Задача и расчёт"), clean(data.message)] : []),
    "",
    new Intl.DateTimeFormat("ru-RU", {
      timeZone: "Asia/Tashkent",
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date()) + " (Ташкент)",
  ].join("\n");
}
export function formatContactPlainText(data: ValidatedContactForm) {
  return buildContactSections(data, false);
}
export function formatContactHtml(data: ValidatedContactForm) {
  return (
    "<div>" +
    buildContactSections(data, true).replaceAll("\n", "<br>") +
    "</div>"
  );
}
export function formatContactTelegramHtml(data: ValidatedContactForm) {
  return buildContactSections(data, true);
}
