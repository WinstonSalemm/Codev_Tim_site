export interface Supplier {
  slug: string;
  name: string;
  href: string;
  logo: string;
}

export const suppliers: Supplier[] = [
  {
    slug: 'ogneborets',
    name: 'ООО "Огнеборец"',
    href: 'https://www.510777.xn--p1ai/ru',
    logo: '/fire-safety-store/brands/ogneborets.svg'
  },
  {
    slug: 'elis',
    name: 'ООО "ЭЛИС"',
    href: 'https://www.elistver.ru/',
    logo: '/fire-safety-store/brands/elis.png'
  },
  {
    slug: 'bereg',
    name: 'ООО "Т.Д. БЕРЕГ"',
    href: 'https://tdbereg.ru/',
    logo: '/fire-safety-store/brands/bereg.png'
  },
  {
    slug: 'tsifral',
    name: 'АО "Цифрал"',
    href: '#',
    logo: '/fire-safety-store/brands/cyfral.png'
  },
  {
    slug: 'metakom',
    name: 'ООО "Метаком"',
    href: 'https://metakom.ru/',
    logo: '/fire-safety-store/brands/metakom.png'
  },
  {
    slug: 'magistral',
    name: 'ООО "Магистраль"',
    href: 'https://magistral.uz/',
    logo: '/fire-safety-store/brands/magistral.png'
  }
];
