"use client";

import type { ReactNode } from "react";
import { OnboardingOverlay } from "./OnboardingOverlay";
import { useOnboarding } from "./OnboardingProvider";

type OnboardingGateProps = {
  children: ReactNode;
};

export function OnboardingGate({ children }: OnboardingGateProps) {
  const { isComplete, isReady } = useOnboarding();

  if (!isReady) {
    return <div className="onboarding-placeholder" aria-hidden="true" />;
  }

  if (!isComplete) {
    return <OnboardingOverlay />;
  }

  return children;
}
