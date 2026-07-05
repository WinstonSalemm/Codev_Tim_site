"use client";

import { useLocale } from "next-intl";
import { useEffect, useRef, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { getModuleByPathname } from "@/lib/shell";
import { useShellContext } from "@/context/shell";
import { useBoot } from "./BootProvider";

type BootContentGateProps = {
  children: ReactNode;
};

export function BootContentGate({ children }: BootContentGateProps) {
  const tBoot = useTranslations("shell.boot");
  const tModules = useTranslations("modules");
  const tAnnouncer = useTranslations("shell.announcer");
  const pathname = usePathname();
  const locale = useLocale();
  const {
    phase,
    isBootComplete,
    isModuleLoading,
    beginModuleMount,
    completeModuleMount,
    beginLocaleSync,
    completeLocaleSync,
  } = useBoot();
  const { setNavigationAnnouncement } = useShellContext();
  const previousPath = useRef<string | null>(null);
  const previousLocale = useRef<string | null>(null);

  useEffect(() => {
    if (!isBootComplete) {
      return;
    }

    if (previousPath.current === null) {
      previousPath.current = pathname;
      previousLocale.current = locale;
      return;
    }

    if (
      previousLocale.current !== locale &&
      previousPath.current === pathname
    ) {
      previousLocale.current = locale;
      beginLocaleSync();
      setNavigationAnnouncement(tBoot("synchronizing"));
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          completeLocaleSync();
        });
      });
      return;
    }

    if (previousPath.current !== pathname) {
      previousPath.current = pathname;
      previousLocale.current = locale;
      beginModuleMount();

      const activeModule = getModuleByPathname(pathname);
      if (activeModule) {
        setNavigationAnnouncement(
          tAnnouncer("navigatedTo", {
            module: tModules(`${activeModule.id}.name`),
          })
        );
      }
    }
  }, [
    beginLocaleSync,
    beginModuleMount,
    completeLocaleSync,
    isBootComplete,
    locale,
    pathname,
    setNavigationAnnouncement,
    tAnnouncer,
    tBoot,
    tModules,
  ]);

  useEffect(() => {
    if (!isModuleLoading) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        completeModuleMount();
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [children, completeModuleMount, isModuleLoading, pathname]);

  return (
    <div
      className="ds-shell-content-inner"
      aria-busy={isModuleLoading || phase === "synchronizing"}
    >
      {children}
    </div>
  );
}
