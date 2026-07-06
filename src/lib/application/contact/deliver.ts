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

async function sendViaTelegram(data: ValidatedContactForm) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CONTACT_CHAT_ID;

  if (!token || !chatId) {
    return false;
  }

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatContactTelegramHtml(data),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    }
  );

  if (!response.ok) {
    throw new ContactDeliveryFailedError("Telegram delivery failed");
  }

  return true;
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

  throw new ContactDeliveryNotConfiguredError();
}
