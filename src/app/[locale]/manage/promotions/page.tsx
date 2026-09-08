import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { PromotionManager } from "@/components/commerce/PromotionManager";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Управление акциями · Codev_Tim",
  robots: { index: false, follow: false },
};
export default async function PromotionsPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  const raw = await readFile(
    path.join(process.cwd(), "content/commerce/promotions.json"),
    "utf8"
  );
  return (
    <PromotionManager
      initial={JSON.parse(raw)}
      revision={createHash("sha256").update(raw).digest("hex")}
    />
  );
}
