import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { EngineerProfilePage } from "@/components/modules/engineer-profile";
import { JsonLdScript } from "@/components/seo";
import { loadEngineerProfile } from "@/lib/application";
import { buildAboutJsonLd, createAboutMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return createAboutMetadata(locale);
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tModules, tProfile, profile] = await Promise.all([
    getTranslations("modules"),
    getTranslations("engineerProfile"),
    Promise.resolve(loadEngineerProfile()),
  ]);

  const jsonLd = buildAboutJsonLd(locale);

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <EngineerProfilePage
        header={{
          label: tModules("engineerProfile.label"),
          name: tModules("engineerProfile.name"),
          description: tModules("engineerProfile.description"),
        }}
        profile={profile}
        translations={{
          sections: {
            identity: tProfile("sections.identity"),
            deploymentHistory: tProfile("sections.deploymentHistory"),
            technologyStack: tProfile("sections.technologyStack"),
            availability: tProfile("sections.availability"),
            interests: tProfile("sections.interests"),
          },
          fields: {
            displayName: tProfile("fields.displayName"),
            fullName: tProfile("fields.fullName"),
            brand: tProfile("fields.brand"),
            location: tProfile("fields.location"),
            timezone: tProfile("fields.timezone"),
            focus: tProfile("fields.focus"),
            roles: tProfile("fields.roles"),
            primaryLanguage: tProfile("fields.primaryLanguage"),
            additionalLanguages: tProfile("fields.additionalLanguages"),
            status: tProfile("fields.status"),
            label: tProfile("fields.availabilityLabel"),
            responseTime: tProfile("fields.responseTime"),
          },
          deployment: {
            period: tProfile("deployment.period"),
            role: tProfile("deployment.role"),
            context: tProfile("deployment.context"),
            focus: tProfile("deployment.focus"),
          },
          stack: {
            layerCount: tProfile("stack.layerCount"),
            topTags: tProfile("stack.topTags"),
          },
        }}
      />
    </>
  );
}
