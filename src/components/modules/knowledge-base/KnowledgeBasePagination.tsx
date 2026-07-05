"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import {
  buildKnowledgeBaseQueryString,
  type KnowledgeBaseQueryState,
} from "@/lib/application";

type KnowledgeBasePaginationProps = {
  page: number;
  totalPages: number;
  query: KnowledgeBaseQueryState;
  labels: {
    regionLabel: string;
    previous: string;
    next: string;
    page: string;
  };
};

export function KnowledgeBasePagination({
  page,
  totalPages,
  query,
  labels,
}: KnowledgeBasePaginationProps) {
  const router = useRouter();
  const pathname = usePathname();

  if (totalPages <= 1) {
    return null;
  }

  const goToPage = (nextPage: number) => {
    const queryString = buildKnowledgeBaseQueryString({
      ...query,
      page: nextPage,
    });
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  return (
    <nav className="ds-kb-pagination" aria-label={labels.regionLabel}>
      <button
        type="button"
        className="ds-kb-pagination-action"
        disabled={page <= 1}
        onClick={() => goToPage(page - 1)}
      >
        {labels.previous}
      </button>
      <p className="ds-kb-pagination-status">
        {labels.page
          .replace("{current}", String(page))
          .replace("{total}", String(totalPages))}
      </p>
      <button
        type="button"
        className="ds-kb-pagination-action"
        disabled={page >= totalPages}
        onClick={() => goToPage(page + 1)}
      >
        {labels.next}
      </button>
    </nav>
  );
}
