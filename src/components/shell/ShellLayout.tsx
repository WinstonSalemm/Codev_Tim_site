import type { ReactNode } from "react";
import { BootShellFrame } from "@/features/boot";
import { AppHeader } from "./AppHeader";
import { ContentViewport } from "./ContentViewport";
import { ShellOverlays } from "./ShellOverlays";
import { Sidebar } from "./Sidebar";
import type { SiteShellConfig } from "@/lib/shell";

type ShellLayoutProps = {
  children: ReactNode;
  config: SiteShellConfig;
};

export function ShellLayout({ children, config }: ShellLayoutProps) {
  return (
    <BootShellFrame>
      <AppHeader config={config} />
      <Sidebar />
      <ContentViewport>{children}</ContentViewport>
      <ShellOverlays config={config} />
    </BootShellFrame>
  );
}
