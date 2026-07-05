import type { ReactNode } from "react";
import { ShellProvider } from "@/context/shell";
import { SkipLink } from "@/components/ui/SkipLink";
import { BootOverlay, BootProvider } from "@/features/boot";
import { ShellAnnouncer } from "./ShellAnnouncer";
import { ShellKeyboardManager } from "./ShellKeyboardManager";
import { ShellLayout } from "./ShellLayout";
import { ShellBackdrop } from "./ShellBackdrop";
import type { SiteShellConfig } from "@/lib/shell";

type AppShellProps = {
  children: ReactNode;
  config: SiteShellConfig;
};

export function AppShell({ children, config }: AppShellProps) {
  return (
    <div className="ds-app-root">
      <ShellBackdrop />
      <ShellProvider>
        <BootProvider>
          <SkipLink />
          <ShellAnnouncer />
          <ShellKeyboardManager />
          <BootOverlay />
          <ShellLayout config={config}>{children}</ShellLayout>
        </BootProvider>
      </ShellProvider>
    </div>
  );
}
