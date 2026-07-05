"use client";

import { usePathname, useRouter } from "@/i18n/navigation";

type RegistryEmptyStateProps = {
  labels: {
    message: string;
    clear: string;
  };
};

export function RegistryEmptyState({ labels }: RegistryEmptyStateProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="ds-registry-empty" role="status">
      <p className="ds-registry-empty-message">{labels.message}</p>
      <button
        type="button"
        className="ds-registry-filter-clear"
        onClick={() => router.push(pathname, { scroll: false })}
      >
        {labels.clear}
      </button>
    </div>
  );
}
