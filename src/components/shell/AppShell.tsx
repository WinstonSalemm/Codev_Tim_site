import type { ReactNode } from "react";
import { ShellProvider } from "@/context/shell";
import { SkipLink } from "@/components/ui/SkipLink";
import { BootOverlay, BootProvider } from "@/features/boot";
import { IdleScreensaver } from "@/features/background";
import { OnboardingGate, OnboardingProvider } from "@/features/onboarding";
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
        <OnboardingProvider>
          <OnboardingGate>
            <BootProvider>
              <SkipLink />
              <ShellAnnouncer />
              <ShellKeyboardManager />
              <BootOverlay />
              <IdleScreensaver />
              <ShellLayout config={config}>{children}</ShellLayout>
            </BootProvider>
          </OnboardingGate>
        </OnboardingProvider>
      </ShellProvider>
    </div>
  );
}
