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
    exampleLabel: string;
    intro: {
      heading: string;
      lead: string;
      body: string;
    };
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
        className="ds-principles-intro"
        aria-labelledby="principles-intro-heading"
      >
        <h2 id="principles-intro-heading" className="ds-principles-intro-title">
          {translations.intro.heading}
        </h2>
        <p className="ds-principles-intro-lead">{translations.intro.lead}</p>
        <p className="ds-principles-intro-body">{translations.intro.body}</p>
      </section>

      <section
        className="ds-principles-body"
        aria-label={translations.regionLabel}
      >
        <p className="ds-principles-summary">{translations.registeredCount}</p>

        <div className="ds-principles-grid">
          {page.protocols.map((protocol) => (
            <PrincipleCard
              key={protocol.id}
              number={protocol.number}
              title={protocol.title}
              summary={protocol.summary}
              body={protocol.body}
              example={protocol.example}
              protocolLabel={translations.protocolLabel}
              exampleLabel={translations.exampleLabel}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
