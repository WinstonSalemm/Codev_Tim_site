"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ONBOARDING_STORAGE_KEY } from "./constants";

type OnboardingContextValue = {
  isComplete: boolean;
  isReady: boolean;
  completeOnboarding: () => void;
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }

  return context;
}

type OnboardingProviderProps = {
  children: React.ReactNode;
};

function readOnboardingComplete() {
  try {
    return localStorage.getItem(ONBOARDING_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function persistOnboardingComplete() {
  try {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, "1");
  } catch {
    /* ignore storage errors */
  }
}

export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsComplete(readOnboardingComplete());
    setIsReady(true);
  }, []);

  const completeOnboarding = useCallback(() => {
    persistOnboardingComplete();
    setIsComplete(true);
  }, []);

  const value = useMemo<OnboardingContextValue>(
    () => ({
      isComplete,
      isReady,
      completeOnboarding,
    }),
    [completeOnboarding, isComplete, isReady]
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}
