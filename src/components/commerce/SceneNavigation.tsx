"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/commerce/catalog";

const IDS = ["identity", "solutions", "proof", "engineering", "request"];
const COPY = {
  ru: {
    label: "Разделы главной страницы",
    items: ["Студия", "Задачи", "Проекты", "Инженерия", "Контакт"],
  },
  uz: {
    label: "Bosh sahifa bo‘limlari",
    items: ["Studiya", "Vazifalar", "Loyihalar", "Muhandislik", "Aloqa"],
  },
  en: {
    label: "Homepage sections",
    items: ["Studio", "Capabilities", "Work", "Engineering", "Contact"],
  },
};
export function SceneNavigation({ locale }: { locale: Locale }) {
  const [active, setActive] = useState("identity");
  const ref = useRef<HTMLElement>(null);
  const t = COPY[locale];
  useEffect(() => {
    const root = ref.current?.closest(".ds-shell-content-main") ?? null;
    let observer: IntersectionObserver;
    const observe = () => {
      observer?.disconnect();
      const height = root?.clientHeight ?? window.innerHeight;
      observer = new IntersectionObserver(
        (entries) => {
          const current = entries.find((entry) => entry.isIntersecting);
          if (current) setActive(current.target.id);
        },
        {
          root,
          rootMargin: `-64px 0px -${Math.max(0, height - 160)}px 0px`,
          threshold: 0,
        }
      );
      IDS.forEach((id) => {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
      });
    };
    observe();
    window.addEventListener("resize", observe, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", observe);
    };
  }, []);
  return (
    <nav className="scene-navigation" ref={ref} aria-label={t.label}>
      {IDS.map((id, index) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={active === id ? "location" : undefined}
        >
          <span aria-hidden="true">0{index + 1}</span>
          {t.items[index]}
        </a>
      ))}
    </nav>
  );
}
