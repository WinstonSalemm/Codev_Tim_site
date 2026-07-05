import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { ContentViewportClient } from "./ContentViewportClient";

type ContentViewportProps = {
  children: ReactNode;
};

export async function ContentViewport({ children }: ContentViewportProps) {
  const t = await getTranslations("shell");

  return (
    <ContentViewportClient ariaLabel={t("contentViewport")}>
      {children}
    </ContentViewportClient>
  );
}
