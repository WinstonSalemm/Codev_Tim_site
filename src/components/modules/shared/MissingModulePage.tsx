import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ModuleHeader } from "@/components/ui/ModuleHeader";

export async function MissingModulePage() {
  const headersList = await headers();
  const requestedPath = headersList.get("x-pathname") ?? "";
  const tModules = await getTranslations("modules");
  const tErrors = await getTranslations("errors.missingModule");
  const tTerminal = await getTranslations("terminal");

  return (
    <div className="ds-module-page">
      <ModuleHeader
        label={tModules("missingModule.label")}
        name={tModules("missingModule.name")}
        description={tModules("missingModule.description")}
      />
      <div className="ds-missing-module">
        <p className="ds-missing-module-code">
          {tErrors("codeLabel")}: {tErrors("code")}
        </p>
        <p className="ds-missing-module-message">{tErrors("message")}</p>
        {requestedPath ? (
          <p className="ds-missing-module-detail">
            {tErrors("detail", { path: requestedPath })}
          </p>
        ) : null}
        <Link href="/" className="ds-missing-module-action">
          {tErrors("returnAction")}
        </Link>
        <p className="ds-missing-module-hint">{tTerminal("shellHint")}</p>
      </div>
    </div>
  );
}
