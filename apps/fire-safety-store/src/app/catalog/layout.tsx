import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { buildPageMetadata, langFromCookieHeader } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const cookie = h.get('cookie');
  const lang = langFromCookieHeader(cookie);
  return buildPageMetadata({
    titleKey: 'header.catalog',
    defaultDescription: 'Каталог оборудования для пожарной безопасности в Демограде.',
    path: '/catalog',
    lang,
    keywords: ['каталог', 'пожарное оборудование', 'огнетушители', 'FireSafe', 'Демоград'],
  });
}

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
