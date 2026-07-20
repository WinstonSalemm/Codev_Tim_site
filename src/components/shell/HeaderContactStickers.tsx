"use client";

import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import type { SiteShellContactLinks } from "@/lib/shell";

type HeaderContactStickersProps = {
  contacts: SiteShellContactLinks;
};

type StickerId = "telegram" | "instagram" | "phone";

type StickerLink = {
  id: StickerId;
  href: string;
  external: boolean;
  labelKey: StickerId;
};

function TelegramGlyph() {
  return (
    <svg
      className="ds-header-sticker-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M21.8 4.3 3.9 11.2c-1.2.5-1.2 1.2-.2 1.5l4.6 1.4 1.8 5.4c.2.7.1 1 .9 1 .6 0 .8-.3 1.1-.6l2.5-2.4 5.2 3.8c1 .5 1.6.2 1.9-1l3.4-16c.3-1.3-.5-1.9-1.5-1.5Zm-3.3 3.4-9.8 8.9-.4 4.2-2-5.1 12.2-8Z"
      />
    </svg>
  );
}

function InstagramGlyph() {
  return (
    <svg
      className="ds-header-sticker-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm9.2 1.3a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 8.2A3.8 3.8 0 1 1 12 15.8 3.8 3.8 0 0 1 12 8.2Zm0 2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Z"
      />
    </svg>
  );
}

function PhoneGlyph() {
  return (
    <svg
      className="ds-header-sticker-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M8.2 3.4c.4-.4 1-.5 1.5-.3l2.2.9c.6.2 1 .8.9 1.4l-.4 2.4c-.1.5-.4.9-.9 1.1l-1.3.5c.8 1.6 2 2.9 3.6 3.7l.5-1.3c.2-.5.6-.8 1.1-.9l2.4-.4c.6-.1 1.2.3 1.4.9l.9 2.2c.2.5.1 1.1-.3 1.5l-1.3 1.3c-.4.4-1 .6-1.6.5-3.3-.5-6.3-2.3-8.5-4.5-2.2-2.2-4-5.2-4.5-8.5-.1-.6.1-1.2.5-1.6l1.3-1.3Z"
      />
    </svg>
  );
}

const GLYPHS = {
  telegram: TelegramGlyph,
  instagram: InstagramGlyph,
  phone: PhoneGlyph,
} as const;

export function HeaderContactStickers({
  contacts,
}: HeaderContactStickersProps) {
  const t = useTranslations("shell.header");

  const links: StickerLink[] = [];

  if (contacts.telegramHref) {
    links.push({
      id: "telegram",
      href: contacts.telegramHref,
      external: true,
      labelKey: "telegram",
    });
  }

  if (contacts.instagramHref) {
    links.push({
      id: "instagram",
      href: contacts.instagramHref,
      external: true,
      labelKey: "instagram",
    });
  }

  if (contacts.phoneHref) {
    links.push({
      id: "phone",
      href: contacts.phoneHref,
      external: false,
      labelKey: "phone",
    });
  }

  if (links.length === 0) {
    return null;
  }

  return (
    <nav className="ds-header-stickers" aria-label={t("contactsAria")}>
      <span className="ds-header-stickers-pin" aria-hidden="true" />
      <span className="ds-header-stickers-label ds-text-label">
        {t("contactsHint")}
      </span>
      <div className="ds-header-stickers-row">
        {links.map((link, index) => {
          const Glyph = GLYPHS[link.id];

          return (
            <a
              key={link.id}
              href={link.href}
              className={`ds-header-sticker ds-header-sticker--${link.id}`}
              style={{ "--ds-sticker-index": index } as CSSProperties}
              aria-label={t(link.labelKey)}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <span className="ds-header-sticker-nudge">
                <span className="ds-header-sticker-face">
                  <Glyph />
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
