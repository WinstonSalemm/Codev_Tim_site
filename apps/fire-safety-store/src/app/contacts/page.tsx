import ContactsClient from "./ContactsClient";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { buildPageMetadata, langFromCookieHeader } from "@/lib/metadata";
import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { SITE_URL } from "@/lib/site";
import { AdsConversionOnMount } from "@/components/analytics/AdsConversionOnMount";

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const cookie = h.get("cookie");
  const lang = langFromCookieHeader(cookie);
  return buildPageMetadata({
    titleKey: "contacts.seo.title",
    descriptionKey: "contacts.seo.description",
    path: "/contacts",
    lang,
    keywords: ['контакты', 'связаться', 'адрес', 'телефон', 'FireSafe', 'Демоград'],
  });
}

export default function ContactsPage() {
  return (
    <>
      {/* JSON-LD: Breadcrumbs */}
      <BreadcrumbJsonLd items={[
        { name: 'FireSafe', url: '/' },
        { name: 'Контакты', url: '/contacts' },
      ]} />

      {/* JSON-LD: LocalBusiness */}
      <LocalBusinessJsonLd
        name="FireSafe"
        url={SITE_URL + '/contacts'}
        telephone="+000 42 731 58 26"
        image={[`${SITE_URL}/OtherPics/logo.svg`]}
        priceRange="₮₮"
        address={{
          streetAddress: "ул. Примерная, 47",
          addressLocality: "Демоград",
          addressRegion: "Demo City",
          postalCode: "100000",
          addressCountry: "UZ",
        }}
        openingHours={["Mo-Fr 09:00-18:00", "Sa 10:00-16:00"]}
        sameAs={[
          "/fire-safety-store/contacts",
          "/fire-safety-store/contacts",
          "/fire-safety-store/contacts",
        ]}
      />

      <ContactsClient />

      {/* Google Ads: Конверсия "Контакт" (загрузка страницы контактов) */}
      <AdsConversionOnMount type="contact" />
    </>
  );
}
