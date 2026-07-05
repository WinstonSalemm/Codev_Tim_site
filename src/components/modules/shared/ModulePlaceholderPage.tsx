import type { ModuleId } from "@/lib/shell";
import { ModuleHeader } from "@/components/ui/ModuleHeader";
import { ModulePageEnterMotion } from "@/components/modules/dashboard/motion";
import { getTranslations } from "next-intl/server";

type ModulePlaceholderPageProps = {
  moduleId: ModuleId;
};

export async function ModulePlaceholderPage({
  moduleId,
}: ModulePlaceholderPageProps) {
  const t = await getTranslations("modules");

  return (
    <ModulePageEnterMotion>
      <div className="ds-module-page">
        <ModuleHeader
          label={t(`${moduleId}.label`)}
          name={t(`${moduleId}.name`)}
          description={t(`${moduleId}.description`)}
        />
      </div>
    </ModulePageEnterMotion>
  );
}
