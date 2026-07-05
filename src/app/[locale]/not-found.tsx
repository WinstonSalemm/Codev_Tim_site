import { getLocale } from "next-intl/server";
import { MissingModulePage } from "@/components/modules/shared/MissingModulePage";
import { createNotFoundMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const locale = await getLocale();
  return createNotFoundMetadata(locale);
}

export default function NotFound() {
  return <MissingModulePage />;
}
