import './globals.css';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { I18nProvider } from '@/i18n/I18nProvider';
import { NonceProvider } from '@/context/NonceContext';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TopBar from '@/components/TopBar/TopBar';
import LanguageTransitionOverlay from '@/components/LanguageTransitionOverlay';
import CartAddToast from '@/components/Cart/CartAddToast';
import ScrollToTop from '@/components/ScrollToTop';
import { getLocale } from '@/lib/api';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.codev-tim.uz/fire-safety-store'),
  title: { default: 'FireSafe — пожарная безопасность', template: '%s | FireSafe' },
  description: 'Каталог пожарного оборудования FireSafe. Демонстрационный магазин.',
  robots: { index: false, follow: false },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
    <body className="min-h-screen flex flex-col">
      <NonceProvider><I18nProvider initialLocale={locale}><CartProvider>
        <Suspense><TopBar /><Header /></Suspense>
        <LanguageTransitionOverlay />
        <main id="main-content" className="flex-grow" style={{ paddingTop: 'calc(var(--topbar-height, 36px) + 58px + var(--langbar-height, 46px))' }}>{children}</main>
        <Footer /><CartAddToast /><ScrollToTop />
      </CartProvider></I18nProvider></NonceProvider>
    </body>
  </html>;
}
