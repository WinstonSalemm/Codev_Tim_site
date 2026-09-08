import type { SiteShellConfig } from "@/lib/shell";
import { Link } from "@/i18n/navigation";
import { HeaderMobileMenu } from "./HeaderMobileMenu";
import { HeaderWordmark } from "./HeaderWordmark";
import { HeaderPreferences } from "./HeaderPreferences";
import { ShellInertRegion } from "./ShellInertRegion";
export function AppHeader({ config }: { config: SiteShellConfig }) {
  return (
    <ShellInertRegion className="ds-shell-header" role="banner">
      <div className="studio-header">
        <div className="studio-header-brand">
          <HeaderMobileMenu />
          <Link href="/">
            <HeaderWordmark name={config.name} />
          </Link>
          <span className="studio-header-location">Tashkent, UZ</span>
        </div>
        <div className="studio-header-actions">
          {config.contacts.phoneHref && (
            <a className="studio-header-phone" href={config.contacts.phoneHref}>
              {config.contacts.phoneHref
                .replace("tel:", "")
                .replace(
                  /^(\+998)(\d{2})(\d{3})(\d{2})(\d{2})$/,
                  "$1 $2 $3 $4 $5"
                )}
            </a>
          )}
          {config.contacts.telegramHref && (
            <a
              className="studio-header-contact"
              aria-label="Telegram"
              href={config.contacts.telegramHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m21 3-7 18-4-7-7-4 18-7Z M10 14l5-5" />
              </svg>
              <span>Telegram</span>
            </a>
          )}
          <HeaderPreferences />
        </div>
      </div>
    </ShellInertRegion>
  );
}
