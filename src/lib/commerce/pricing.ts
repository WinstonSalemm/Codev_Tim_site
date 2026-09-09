import promotions from "../../../content/commerce/promotions.json";
import { BASE_PRICES, ADDONS, type OfferId, type Localized } from "./catalog";
export type Promotion = {
  id: string;
  enabled: boolean;
  title: Localized;
  offerIds: OfferId[];
  percent: number;
  startsAt: string;
  endsAt: string;
};
export type Quote = {
  base: number;
  price: number;
  saving: number;
  percent: number;
  promotion: Promotion | null;
};
export function promotionErrors(value: unknown): string[] {
  if (!Array.isArray(value) || value.length > 50)
    return ["Ожидается список, максимум 50 акций."];
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const [i, raw] of value.entries()) {
    const p = raw as Promotion;
    const label = `Акция ${i + 1}`;
    if (!p || typeof p !== "object") {
      errors.push(label + ": неверный формат.");
      continue;
    }
    if (
      typeof p.id !== "string" ||
      !/^[a-z0-9-]{1,60}$/.test(p.id) ||
      ids.has(p.id)
    )
      errors.push(label + ": уникальный ID из латинских букв, цифр и дефиса.");
    ids.add(p.id);
    if (typeof p.enabled !== "boolean") errors.push(label + ": нужен enabled.");
    if (!Number.isInteger(p.percent) || p.percent < 1 || p.percent > 70)
      errors.push(label + ": скидка от 1 до 70%.");
    if (
      !p.title ||
      !["ru", "uz", "en"].every(
        (k) =>
          typeof p.title[k as keyof Localized] === "string" &&
          p.title[k as keyof Localized].trim().length > 0 &&
          p.title[k as keyof Localized].length <= 100
      )
    )
      errors.push(label + ": заполните название на RU, UZ и EN.");
    if (
      !Array.isArray(p.offerIds) ||
      !p.offerIds.length ||
      p.offerIds.some(
        (id) => !Object.hasOwn(BASE_PRICES, id) || BASE_PRICES[id] === 0
      )
    )
      errors.push(label + ": выберите существующие платные пакеты.");
    const validTime = (s: unknown) =>
      typeof s === "string" &&
      /T.*(Z|[+-]\d{2}:\d{2})$/.test(s) &&
      Number.isFinite(Date.parse(s));
    if (
      !validTime(p.startsAt) ||
      !validTime(p.endsAt) ||
      Date.parse(p.startsAt) >= Date.parse(p.endsAt)
    )
      errors.push(
        label + ": конец должен быть позже начала, часовой пояс обязателен."
      );
  }
  return errors;
}
export function quoteOffer(
  id: OfferId,
  now = new Date(),
  rules: unknown = promotions
): Quote {
  const base = BASE_PRICES[id];
  const valid =
    promotionErrors(rules).length === 0 ? (rules as Promotion[]) : [];
  const promotion =
    valid
      .filter(
        (p) =>
          p.enabled &&
          p.offerIds.includes(id) &&
          Date.parse(p.startsAt) <= now.getTime() &&
          now.getTime() < Date.parse(p.endsAt)
      )
      .sort((a, b) => b.percent - a.percent || a.id.localeCompare(b.id))[0] ??
    null;
  const percent = promotion?.percent ?? 0;
  const price = Math.round((base * (100 - percent)) / 100);
  return { base, price, saving: base - price, percent, promotion };
}
export function calculateEstimate(
  id: OfferId,
  selected: string[],
  now = new Date()
) {
  const quote = quoteOffer(id, now);
  const addons = ADDONS.filter(
    (a) => selected.includes(a.id) && a.allowed.includes(id)
  );
  return {
    ...quote,
    addons,
    total: quote.price + addons.reduce((sum, a) => sum + a.price, 0),
    extraDays: addons.reduce((sum, a) => sum + a.days, 0),
  };
}
export function money(value: number, locale = "ru") {
  // UZS prices use integer sums. Avoid differences between Node and browser ICU.
  return (
    Math.round(value)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") +
    (locale === "en" ? " UZS" : locale === "uz" ? " so‘m" : " сум")
  );
}
export function formatPromotionEnd(iso: string) {
  const date = new Date(Date.parse(iso) + 5 * 60 * 60 * 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(date.getUTCDate())}.${pad(date.getUTCMonth() + 1)}.${date.getUTCFullYear()} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`;
}
export function formatPromotionDeadline(iso: string, locale: string) {
  // The end is exclusive. Use the last active millisecond in Tashkent (UTC+5).
  // Explicit month names keep SSR and browsers with different ICU data identical.
  const lastActiveMoment = new Date(Date.parse(iso) - 1 + 5 * 60 * 60 * 1000);
  if (!Number.isFinite(lastActiveMoment.getTime()))
    throw new RangeError("Invalid time value");
  const day = lastActiveMoment.getUTCDate();
  const month = lastActiveMoment.getUTCMonth();
  if (locale === "uz") {
    const months = [
      "yanvar",
      "fevral",
      "mart",
      "aprel",
      "may",
      "iyun",
      "iyul",
      "avgust",
      "sentabr",
      "oktabr",
      "noyabr",
      "dekabr",
    ];
    return `${day}-${months[month]}`;
  }
  if (locale === "en") {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${months[month]} ${day}`;
  }
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  return `${day} ${months[month]}`;
}
export const DEFAULT_PROMOTIONS = promotions as Promotion[];
