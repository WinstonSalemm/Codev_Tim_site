"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type HeaderClockProps = {
  timezone: string;
};

function formatClock(date: Date) {
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function formatDateTimeIso(date: Date) {
  return date.toISOString();
}

export function HeaderClock({ timezone }: HeaderClockProps) {
  const t = useTranslations("shell");
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const value = now ? formatClock(now) : "--:--:--";
  const dateTime = now ? formatDateTimeIso(now) : undefined;

  return (
    <div
      className="ds-header-clock"
      aria-label={t("header.clockAria", { timezone })}
    >
      <time className="ds-header-clock-value" dateTime={dateTime}>
        {value}
      </time>
      <span className="ds-header-clock-zone">{timezone}</span>
    </div>
  );
}
