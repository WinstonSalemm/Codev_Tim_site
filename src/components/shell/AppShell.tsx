import type { ReactNode } from "react";
import { ShellProvider } from "@/context/shell";
import { OnboardingProvider, OnboardingShellGate } from "@/features/onboarding";
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
          <OnboardingShellGate config={config}>{children}</OnboardingShellGate>
        </OnboardingProvider>
      </ShellProvider>
    </div>
  );
}
