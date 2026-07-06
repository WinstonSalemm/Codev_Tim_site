"use client";

import { LanguagePicker } from "@/features/onboarding";

export function SidebarLanguageSwitch() {
  return (
    <div className="ds-sidebar-language">
      <LanguagePicker variant="compact" />
    </div>
  );
}
