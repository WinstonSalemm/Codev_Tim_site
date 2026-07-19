import { DataRow } from "@/components/ui/DataRow";
import { ModuleHeader } from "@/components/ui/ModuleHeader";
import { Link } from "@/i18n/navigation";
import type { EngineerProfileVM } from "@/lib/application";

type EngineerProfilePageProps = {
  header: {
    label: string;
    name: string;
    description: string;
  };
  profile: EngineerProfileVM;
  translations: {
    sections: {
      identity: string;
      deploymentHistory: string;
      technologyStack: string;
      availability: string;
      engagements: string;
      interests: string;
    };
    fields: Record<string, string>;
    deployment: {
      period: string;
      role: string;
      context: string;
      focus: string;
    };
    stack: {
      layerCount: string;
      topTags: string;
    };
    engagements: {
      body: string;
      cta: string;
    };
  };
};

export function EngineerProfilePage({
  header,
  profile,
  translations,
}: EngineerProfilePageProps) {
  return (
    <div className="ds-profile-page">
      <ModuleHeader
        label={header.label}
        name={header.name}
        description={header.description}
      />

      <div className="ds-profile-body">
        <section
          className="ds-profile-section"
          aria-labelledby="profile-identity"
        >
          <h2 id="profile-identity" className="ds-profile-section-title">
            {translations.sections.identity}
          </h2>
          <dl className="ds-profile-data-grid">
            {profile.identity.map((row) => (
              <DataRow
                key={row.key}
                label={translations.fields[row.key] ?? row.key}
                value={row.value}
              />
            ))}
          </dl>
        </section>

        <section
          className="ds-profile-section"
          aria-labelledby="profile-deployment-history"
        >
          <h2
            id="profile-deployment-history"
            className="ds-profile-section-title"
          >
            {translations.sections.deploymentHistory}
          </h2>
          <div className="ds-profile-deployment-list">
            {profile.deploymentHistory.map((event) => (
              <article key={event.id} className="ds-profile-deployment-card">
                <dl className="ds-profile-data-grid">
                  <DataRow
                    label={translations.deployment.period}
                    value={event.period}
                  />
                  <DataRow
                    label={translations.deployment.role}
                    value={event.role}
                  />
                  <DataRow
                    label={translations.deployment.context}
                    value={event.context}
                  />
                  <DataRow
                    label={translations.deployment.focus}
                    value={event.focus}
                  />
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section
          id="stack"
          className="ds-profile-section"
          aria-labelledby="profile-technology-stack"
        >
          <h2
            id="profile-technology-stack"
            className="ds-profile-section-title"
          >
            {translations.sections.technologyStack}
          </h2>
          <dl className="ds-profile-data-grid">
            {profile.technologyStack.layers.map((layer) => (
              <DataRow
                key={layer.id}
                label={layer.label}
                value={translations.stack.layerCount.replace(
                  "{count}",
                  String(layer.count)
                )}
              />
            ))}
            <DataRow
              label={translations.stack.topTags}
              value={profile.technologyStack.topTags.join(" · ")}
            />
          </dl>
        </section>

        <section
          className="ds-profile-section"
          aria-labelledby="profile-availability"
        >
          <h2 id="profile-availability" className="ds-profile-section-title">
            {translations.sections.availability}
          </h2>
          <dl className="ds-profile-data-grid">
            {profile.availability.map((row) => (
              <DataRow
                key={row.key}
                label={translations.fields[row.key] ?? row.key}
                value={row.value}
              />
            ))}
          </dl>
        </section>

        <section
          className="ds-profile-section"
          aria-labelledby="profile-engagements"
        >
          <h2 id="profile-engagements" className="ds-profile-section-title">
            {translations.sections.engagements}
          </h2>
          <p className="ds-profile-engagements-body">
            {translations.engagements.body}
          </p>
          <Link
            href="/#engagements"
            className="ds-profile-engagements-cta"
            scroll
          >
            {translations.engagements.cta}
          </Link>
        </section>

        <section
          className="ds-profile-section"
          aria-labelledby="profile-interests"
        >
          <h2 id="profile-interests" className="ds-profile-section-title">
            {translations.sections.interests}
          </h2>
          <ul className="ds-profile-tag-list">
            {profile.interests.map((interest) => (
              <li key={interest} className="ds-profile-tag">
                {interest}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
