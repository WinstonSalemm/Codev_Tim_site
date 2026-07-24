"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { OnboardingOverlay } from "./OnboardingOverlay";
import { useOnboarding } from "./OnboardingProvider";

type OnboardingGateProps = {
  children: ReactNode;
};

function OnboardingPlaceholder() {
  return <div className="onboarding-placeholder" aria-hidden="true" />;
}

const FOCUSABLE_SELECTOR = [
  "button:not([disabled])",
  "[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function OnboardingGate({ children }: OnboardingGateProps) {
  const { isComplete, isReady } = useOnboarding();
  const blockApp = !isComplete;
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Scroll lock while first-run UI covers the app
  useEffect(() => {
    if (!blockApp) {
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [blockApp]);

  // Initial focus + minimal tab trap inside the dialog (sibling of inert content)
  useEffect(() => {
    if (!isReady || isComplete) {
      return;
    }

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const dialog = document.querySelector<HTMLElement>(".onboarding-overlay");
    if (!dialog) {
      return;
    }

    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    ).filter((element) => !element.hasAttribute("disabled"));

    focusable[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Tab" || focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [isComplete, isReady]);

  return (
    <>
      <div
        className="onboarding-app-content"
        inert={blockApp ? true : undefined}
        aria-hidden={blockApp ? true : undefined}
      >
        {children}
      </div>

      {!isReady ? <OnboardingPlaceholder /> : null}

      {isReady && !isComplete ? <OnboardingOverlay /> : null}
    </>
  );
}
