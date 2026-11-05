"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/lib/commerce/catalog";
import { COPY } from "@/lib/commerce/copy";
import { EXPRESS_START_COPY } from "@/lib/commerce/express-start";
import screenshots from "../../../content/commerce/project-screenshots.json";
import { OfferPrice } from "./OfferPrice";

const COPY_HERO = {
  ru: {
    label: "Независимая разработка · Ташкент",
    first: "Сайты. Боты.",
    second: "Бизнес-",
    third: "системы.",
    lead: "Проектирую и разрабатываю сайты, Telegram-ботов и CRM. От первого экрана до процессов, на которых держится ваш бизнес.",
    action: "Обсудить проект",
    work: "Смотреть проекты",
    preview: "В работе / реальные интерфейсы",
    case: "Открыть кейс",
    calculator: "Рассчитать проект",
    personal: "Тимур Искандаров · дизайн и разработка",
    categories: ["Сайт и каталог", "Продажи и финансы", "Работа с клиентами"],
  },
  uz: {
    label: "Mustaqil dasturchi · Toshkent",
    first: "Saytlar. Botlar.",
    second: "Biznes",
    third: "tizimlari.",
    lead: "Saytlar, Telegram-botlar va CRM yarataman. Birinchi ekrandan biznesingizning kundalik jarayonlarigacha.",
    action: "Loyihani muhokama qilish",
    work: "Loyihalarni ko‘rish",
    preview: "Amalda / haqiqiy interfeyslar",
    case: "Keysni ochish",
    calculator: "Loyihani hisoblash",
    personal: "Timur Iskandarov · dizayn va dasturlash",
    categories: [
      "Sayt va katalog",
      "Savdo va moliya",
      "Mijozlar bilan ishlash",
    ],
  },
  en: {
    label: "Independent developer · Tashkent",
    first: "Websites. Bots.",
    second: "Business",
    third: "systems.",
    lead: "I design and build websites, Telegram bots and CRM software. From the first screen to the processes your business runs on.",
    action: "Discuss a project",
    work: "Explore the work",
    preview: "In use / real interfaces",
    case: "Open case study",
    calculator: "Estimate your project",
    personal: "Timur Iskandarov · design and development",
    categories: [
      "Website and catalogue",
      "Sales and finance",
      "Customer operations",
    ],
  },
};

const PROJECTS = [
  {
    slug: "poj-pro-site",
    name: "Poj Pro",
    image: screenshots["poj-pro-site"][0]!,
  },
  {
    slug: "codev-erp",
    name: "Financial ERP",
    image: screenshots["codev-erp"][0]!,
  },
  {
    slug: "call-tracker",
    name: "Call Tracker",
    image: screenshots["call-tracker"][0]!,
  },
];

export function StudioHero({
  locale,
  at,
  onCalculator,
  onExpress,
  disabled,
}: {
  locale: Locale;
  at: string;
  onCalculator: () => void;
  onExpress: () => void;
  disabled: boolean;
}) {
  const [selected, setSelected] = useState(0);
  const t = COPY_HERO[locale];
  const copy = COPY[locale];
  const project = PROJECTS[selected]!;

  return (
    <>
      <section className="creative-hero" aria-labelledby="sales-title">
        <div className="creative-hero-heading">
          <p className="sales-eyebrow">
            <span className="studio-square" aria-hidden="true" />
            {t.label}
          </p>
          <h1 id="sales-title">
            <span>{t.first}</span>
            <span>{t.second}</span>
            <em>{t.third}</em>
          </h1>
          <p className="creative-hero-lead">{t.lead}</p>
          <div className="creative-hero-actions">
            <a className="sales-button" href="#request">
              {t.action}
              <span aria-hidden="true">↗</span>
            </a>
            <a className="creative-text-link" href="#proof">
              {t.work}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className="studio-project-instrument">
          <div className="studio-instrument-label">
            <span>{t.preview}</span>
            <span aria-hidden="true">[ 0{selected + 1} / 03 ]</span>
          </div>
          <Link
            className="studio-preview"
            href={"/projects/" + project.slug}
            aria-label={`${t.case} · ${project.name}`}
          >
            <span className="studio-preview-word" aria-hidden="true">
              {selected === 0 ? "WEB" : selected === 1 ? "ERP" : "CRM"}
            </span>
            <div className="studio-preview-screen" key={project.slug}>
              <div className="studio-preview-bar" aria-hidden="true">
                <span>Codev_Tim / {project.name}</span>
                <span>↗</span>
              </div>
              <Image
                src={project.image.src}
                alt={project.image.alt[locale]}
                width={project.image.width}
                height={project.image.height}
                sizes="(max-width: 767px) 90vw, (max-width: 1100px) 47vw, 640px"
                priority={selected === 0}
              />
            </div>
            <span className="studio-preview-open">
              {t.case}
              <span aria-hidden="true">↗</span>
            </span>
          </Link>
          <div className="studio-preview-caption" aria-live="polite">
            <strong>{project.name}</strong>
            <span>{t.categories[selected]}</span>
          </div>
          <div
            className="studio-project-picker"
            role="group"
            aria-label={t.preview}
          >
            {PROJECTS.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
              >
                <span aria-hidden="true">0{index + 1}</span>
                {item.name}
              </button>
            ))}
          </div>
          <p className="studio-personal">{t.personal}</p>
        </div>
      </section>
      <div className="studio-project-entry">
        <button
          type="button"
          className="studio-estimate-link"
          onClick={onCalculator}
        >
          <span>{t.calculator}</span>
          <span aria-hidden="true">↘</span>
        </button>
        <div className="sales-entry-prices">
          {(
            [
              ["landing", copy.site],
              ["bot", copy.bot],
              ["system", copy.crm],
            ] as const
          ).map(([id, label]) => (
            <a key={id} href={"#offer-" + id}>
              <span>{label}</span>
              <OfferPrice id={id} locale={locale} at={at} compact />
            </a>
          ))}
        </div>
      </div>
      <div className="studio-express-strip">
        <span className="sales-eyebrow">Express Start</span>
        <button
          type="button"
          className="sales-express-link"
          onClick={onExpress}
          disabled={disabled}
        >
          {EXPRESS_START_COPY[locale].heroLink}
        </button>
      </div>
    </>
  );
}
