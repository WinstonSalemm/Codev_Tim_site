import type { ValidatedContactForm } from "@/lib/domain/contact";
import {
  formatContactHtml,
  formatContactPlainText,
  formatContactTelegramHtml,
} from "./format";

export class ContactDeliveryNotConfiguredError extends Error {
  constructor() {
    super("Contact delivery is not configured");
    this.name = "ContactDeliveryNotConfiguredError";
  }
}

export class ContactDeliveryFailedError extends Error {
  constructor(message = "Contact delivery failed") {
    super(message);
    this.name = "ContactDeliveryFailedError";
  }
}

type TelegramApiResponse = {
  ok: boolean;
  description?: string;
};

function readTelegramConfig() {
  const token = process.env.TELEGRAM_BOT_TOKEN ?? process.env.TELEGRAM_BOT_TOKE;
  const chatId = process.env.TELEGRAM_CONTACT_CHAT_ID;

  return { token, chatId };
}

async function postTelegramMessage(
  token: string,
  chatId: string,
  text: string,
  parseMode?: "HTML"
) {
  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: parseMode,
        disable_web_page_preview: true,
      }),
    }
  );

  const payload = (await response.json()) as TelegramApiResponse;

  if (!response.ok || !payload.ok) {
    console.error(
      "[contact] Telegram API error:",
      payload.description ?? response.statusText
    );
    throw new ContactDeliveryFailedError(
      payload.description ?? "Telegram delivery failed"
    );
  }

  return true;
}

async function sendViaTelegram(data: ValidatedContactForm) {
  const { token, chatId } = readTelegramConfig();

  if (!token || !chatId) {
    return false;
  }

  const htmlText = formatContactTelegramHtml(data);

  try {
    await postTelegramMessage(token, chatId, htmlText, "HTML");
    return true;
  } catch (error) {
    if (
      error instanceof ContactDeliveryFailedError &&
      error.message.toLowerCase().includes("parse")
    ) {
      await postTelegramMessage(token, chatId, formatContactPlainText(data));
      return true;
    }

    throw error;
  }
}

async function sendViaResend(data: ValidatedContactForm) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? "Codev_Tim <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    return false;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: `Contact: ${data.name}`,
      text: formatContactPlainText(data),
      html: formatContactHtml(data),
      reply_to: data.email ?? undefined,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("[contact] Resend API error:", body);
    throw new ContactDeliveryFailedError("Resend delivery failed");
  }

  return true;
}

export async function deliverContactSubmission(data: ValidatedContactForm) {
  const sentTelegram = await sendViaTelegram(data);

  if (sentTelegram) {
    return;
  }

  const sentResend = await sendViaResend(data);

  if (sentResend) {
    return;
  }

  console.error(
    "[contact] No delivery channel configured. Set TELEGRAM_BOT_TOKEN + TELEGRAM_CONTACT_CHAT_ID or RESEND_API_KEY + CONTACT_TO_EMAIL."
  );
  throw new ContactDeliveryNotConfiguredError();
}
