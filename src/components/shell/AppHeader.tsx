import type { SiteShellConfig } from "@/lib/shell";
import { HeaderBreadcrumb } from "./HeaderBreadcrumb";
import { HeaderClock } from "./HeaderClock";
import { HeaderCommandTrigger } from "./HeaderCommandTrigger";
import { HeaderMobileMenu } from "./HeaderMobileMenu";
import { HeaderStatusIndicator } from "./HeaderStatusIndicator";
import { HeaderSystemLabel } from "./HeaderSystemLabel";
import { HeaderVersionBadge } from "./HeaderVersionBadge";
import { HeaderWordmark } from "./HeaderWordmark";
import { ShellInertRegion } from "./ShellInertRegion";

type AppHeaderProps = {
  config: SiteShellConfig;
};

export function AppHeader({ config }: AppHeaderProps) {
  return (
    <ShellInertRegion className="ds-shell-header" role="banner">
      <div className="ds-header-inner">
        <div className="ds-header-start">
          <HeaderMobileMenu />
          <HeaderSystemLabel />
          <HeaderWordmark name={config.name} />
          <HeaderVersionBadge version={config.version} />
        </div>

        <div className="ds-header-center">
          <HeaderBreadcrumb />
        </div>

        <div className="ds-header-end">
          <HeaderClock timezone={config.author.timezone} />
          <HeaderStatusIndicator />
          <HeaderCommandTrigger />
        </div>
      </div>
    </ShellInertRegion>
  );
}
