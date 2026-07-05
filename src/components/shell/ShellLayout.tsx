import type { ReactNode } from "react";
import { BootShellFrame } from "@/features/boot";
import { AppHeader } from "./AppHeader";
import { ContentViewport } from "./ContentViewport";
import { MobileNav } from "./MobileNav";
import { ShellOverlays } from "./ShellOverlays";
import { Sidebar } from "./Sidebar";
import { StatusBar } from "./StatusBar";
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
      <MobileNav />
      <StatusBar config={config} />
      <ShellOverlays config={config} />
    </BootShellFrame>
  );
}
