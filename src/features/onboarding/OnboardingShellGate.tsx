"use client";

import type { ReactNode } from "react";
import { BootOverlay, BootProvider } from "@/features/boot";
import { IdleScreensaver } from "@/features/background";
import { SkipLink } from "@/components/ui/SkipLink";
import type { SiteShellConfig } from "@/lib/shell";
import { ShellAnnouncer } from "@/components/shell/ShellAnnouncer";
import { ShellKeyboardManager } from "@/components/shell/ShellKeyboardManager";
import { ShellLayout } from "@/components/shell/ShellLayout";
import { OnboardingOverlay } from "./OnboardingOverlay";
import { useOnboarding } from "./OnboardingProvider";

type OnboardingShellGateProps = {
  children: ReactNode;
  config: SiteShellConfig;
};

export function OnboardingShellGate({
  children,
  config,
}: OnboardingShellGateProps) {
  const { isComplete, isReady } = useOnboarding();

  if (!isReady) {
    return <div className="onboarding-placeholder" aria-hidden="true" />;
  }

  if (!isComplete) {
    return <OnboardingOverlay />;
  }

  return (
    <BootProvider>
      <SkipLink />
      <ShellAnnouncer />
      <ShellKeyboardManager />
      <BootOverlay />
      <IdleScreensaver />
      <ShellLayout config={config}>{children}</ShellLayout>
    </BootProvider>
  );
}
