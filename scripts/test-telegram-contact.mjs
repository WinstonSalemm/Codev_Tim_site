/**
 * Quick Telegram delivery smoke test.
 * Usage: TELEGRAM_BOT_TOKEN=... TELEGRAM_CONTACT_CHAT_ID=... node scripts/test-telegram-contact.mjs
 */

const token = process.env.TELEGRAM_BOT_TOKEN ?? process.env.TELEGRAM_BOT_TOKE;
const chatId = process.env.TELEGRAM_CONTACT_CHAT_ID;

if (!token || !chatId) {
  console.error(
    "Missing TELEGRAM_BOT_TOKEN (or TELEGRAM_BOT_TOKE) / TELEGRAM_CONTACT_CHAT_ID"
  );
  process.exit(1);
}

const response = await fetch(
  `https://api.telegram.org/bot${token}/sendMessage`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: "<b>Codev_Tim contact test</b>\n\nIf you see this, Telegram delivery works.",
      parse_mode: "HTML",
    }),
  }
);

const payload = await response.json();
console.log(JSON.stringify(payload, null, 2));

if (!payload.ok) {
  process.exit(1);
}
