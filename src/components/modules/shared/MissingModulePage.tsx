import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
export async function MissingModulePage() {
  const locale = await getLocale();
  const title =
    locale === "ru"
      ? "Страница не найдена"
      : locale === "uz"
        ? "Sahifa topilmadi"
        : "Page not found";
  const body =
    locale === "ru"
      ? "Возможно, адрес изменился. Нужные разделы доступны в меню."
      : locale === "uz"
        ? "Manzil o‘zgargan bo‘lishi mumkin. Kerakli bo‘limlar menyuda mavjud."
        : "The address may have changed. You can find the main sections in the menu.";
  return (
    <div className="sales-page">
      <header className="studio-page-heading">
        <p className="sales-eyebrow">404</p>
        <h1>{title}</h1>
        <p>{body}</p>
      </header>
      <Link href="/" className="sales-button">
        {locale === "ru"
          ? "На главную"
          : locale === "uz"
            ? "Bosh sahifa"
            : "Go home"}
      </Link>
    </div>
  );
}
