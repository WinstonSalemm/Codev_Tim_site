import { ModuleHeader } from "@/components/ui/ModuleHeader";
import type { PrinciplesPageVM } from "@/lib/application";
import { PrincipleCard } from "./PrincipleCard";

type PrinciplesPageProps = {
  header: {
    label: string;
    name: string;
    description: string;
  };
  page: PrinciplesPageVM;
  translations: {
    regionLabel: string;
    protocolLabel: string;
    registeredCount: string;
  };
};

export function PrinciplesPage({
  header,
  page,
  translations,
}: PrinciplesPageProps) {
  return (
    <div className="ds-principles-page">
      <ModuleHeader
        label={header.label}
        name={header.name}
        description={header.description}
      />

      <section
        className="ds-principles-body"
        aria-label={translations.regionLabel}
      >
        <p className="ds-principles-summary">
          {translations.registeredCount.replace("{count}", String(page.count))}
        </p>

        <div className="ds-principles-grid">
          {page.protocols.map((protocol) => (
            <PrincipleCard
              key={protocol.id}
              number={protocol.number}
              title={protocol.title}
              description={protocol.description}
              protocolLabel={translations.protocolLabel}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
