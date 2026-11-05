"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/lib/commerce/catalog";
import { COPY } from "@/lib/commerce/copy";
import { EXPRESS_START_COPY } from "@/lib/commerce/express-start";
import { OfferPrice } from "./OfferPrice";

const HERO = {
  ru: {
    label: "Тимур Искандаров · независимая разработка",
    first: "Цифровая",
    second: "форма",
    third: "бизнеса.",
    lead: "Сайты, Telegram-боты и бизнес-системы. Проектирую интерфейс, связываю процессы и довожу продукт до запуска.",
    action: "Обсудить проект",
    work: "Исследовать проекты",
    demo: "Открыть демоверсию",
    detail: "О проекте",
    models: "Интерактивные модели · данные вымышлены",
    select: "Выберите систему",
    calculator: "Рассчитать проект",
    titles: ["Каталог пожарной безопасности", "Financial ERP", "Call Tracker"],
    notes: [
      "От поиска товара до запроса комплектации.",
      "От сделки до договора и движения денег.",
      "От первого звонка до следующего действия.",
    ],
    kinds: ["Сайт и каталог", "Продажи и финансы", "Работа с клиентами"],
    search: "Поиск по каталогу",
    products: ["Огнетушители", "Извещатели", "Защита"],
    pipeline: ["Запрос", "Договор", "Оплата"],
    financial: "План проекта",
    contact: "Следующий контакт",
    today: "Сегодня",
    done: "Результат сохранён",
    next: "Назначить встречу",
    bottom: "01 / Идея приобретает форму",
    scroll: "Дальше — работа в деталях",
  },
  uz: {
    label: "Timur Iskandarov · mustaqil dasturchi",
    first: "Biznesning",
    second: "raqamli",
    third: "shakli.",
    lead: "Saytlar, Telegram-botlar va biznes tizimlari. Interfeysni loyihalayman, jarayonlarni bog‘layman va mahsulotni ishga tushiraman.",
    action: "Loyihani muhokama qilish",
    work: "Loyihalarni ko‘rish",
    demo: "Demoversiyani ochish",
    detail: "Loyiha haqida",
    models: "Interaktiv modellar · sun’iy ma’lumotlar",
    select: "Tizimni tanlang",
    calculator: "Loyihani hisoblash",
    titles: ["Yong‘in xavfsizligi katalogi", "Financial ERP", "Call Tracker"],
    notes: [
      "Mahsulot qidiruvidan buyurtma so‘rovigacha.",
      "Bitimdan shartnoma va to‘lovgacha.",
      "Birinchi qo‘ng‘iroqdan keyingi harakatgacha.",
    ],
    kinds: ["Sayt va katalog", "Savdo va moliya", "Mijozlar bilan ishlash"],
    search: "Katalogdan qidirish",
    products: ["O‘t o‘chirgichlar", "Datchiklar", "Himoya"],
    pipeline: ["So‘rov", "Shartnoma", "To‘lov"],
    financial: "Loyiha rejasi",
    contact: "Keyingi aloqa",
    today: "Bugun",
    done: "Natija saqlandi",
    next: "Uchrashuv belgilash",
    bottom: "01 / G‘oya shaklga kiradi",
    scroll: "Keyin — loyihalar tafsilotlari",
  },
  en: {
    label: "Timur Iskandarov · independent developer",
    first: "Business,",
    second: "in digital",
    third: "form.",
    lead: "Websites, Telegram bots and business software. I design the interface, connect the workflow and take the product through launch.",
    action: "Discuss a project",
    work: "Explore the work",
    demo: "Open interactive demo",
    detail: "View case study",
    models: "Interactive models · fictional data",
    select: "Select a system",
    calculator: "Estimate your project",
    titles: ["Fire Safety Catalog", "Financial ERP", "Call Tracker"],
    notes: [
      "From finding a product to requesting a quote.",
      "From a deal to a contract and payment.",
      "From the first call to the next action.",
    ],
    kinds: [
      "Website and catalogue",
      "Sales and finance",
      "Customer operations",
    ],
    search: "Search the catalogue",
    products: ["Extinguishers", "Detectors", "Protection"],
    pipeline: ["Enquiry", "Contract", "Payment"],
    financial: "Project plan",
    contact: "Next contact",
    today: "Today",
    done: "Result saved",
    next: "Schedule a meeting",
    bottom: "01 / An idea takes shape",
    scroll: "Next — the work in detail",
  },
};
const SLUGS = ["fire-safety-store", "codev-erp", "call-tracker"];

/** One frame per input event, with no perpetual render loop. */
function useCanvasMotion() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const scrollRoot = element.closest<HTMLElement>(".ds-shell-content-main");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    let visible = true;
    let frame = 0;
    let x = 0;
    let y = 0;
    let rect = element.getBoundingClientRect();
    const update = () => {
      frame = 0;
      if (reduced.matches || !visible || document.hidden) return;
      const bounds = element.getBoundingClientRect();
      rect = bounds;
      const rootTop = scrollRoot?.getBoundingClientRect().top ?? 0;
      const progress = Math.min(
        1,
        Math.max(0, (rootTop - bounds.top) / bounds.height)
      );
      element.style.setProperty("--canvas-x", `${x}deg`);
      element.style.setProperty("--canvas-y", `${y}deg`);
      element.style.setProperty("--canvas-travel", `${progress * 30}px`);
      element.style.setProperty("--canvas-scale", String(1 - progress * 0.045));
    };
    const schedule = () => {
      if (!frame && visible && !reduced.matches && !document.hidden)
        frame = requestAnimationFrame(update);
    };
    const enter = () => {
      rect = element.getBoundingClientRect();
    };
    const move = (event: PointerEvent) => {
      if (!fine.matches) return;
      x = ((event.clientY - rect.top) / rect.height - 0.5) * -5;
      y = ((event.clientX - rect.left) / rect.width - 0.5) * 7;
      schedule();
    };
    const reset = () => {
      x = 0;
      y = 0;
      cancelAnimationFrame(frame);
      frame = 0;
      element.style.setProperty("--canvas-x", "0deg");
      element.style.setProperty("--canvas-y", "0deg");
      element.style.setProperty("--canvas-travel", "0px");
      element.style.setProperty("--canvas-scale", "1");
    };
    const leave = () => {
      x = 0;
      y = 0;
      schedule();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (!visible) reset();
        else schedule();
      },
      { root: scrollRoot, threshold: 0 }
    );
    observer.observe(element);
    const scrolling = scrollRoot ?? window;
    scrolling.addEventListener("scroll", schedule, { passive: true });
    element.addEventListener("pointerenter", enter);
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerleave", leave);
    reduced.addEventListener("change", reset);
    document.addEventListener("visibilitychange", reset);
    window.addEventListener("resize", enter, { passive: true });
    return () => {
      reset();
      observer.disconnect();
      scrolling.removeEventListener("scroll", schedule);
      element.removeEventListener("pointerenter", enter);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
      reduced.removeEventListener("change", reset);
      document.removeEventListener("visibilitychange", reset);
      window.removeEventListener("resize", enter);
    };
  }, []);
  return ref;
}

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
  const motionRef = useCanvasMotion();
  const t = HERO[locale];
  const copy = COPY[locale];
  return (
    <>
      <section
        className="living-hero"
        id="identity"
        aria-labelledby="sales-title"
        ref={motionRef}
      >
        <div className="living-identity">
          <p className="sales-eyebrow">
            <span className="studio-square" aria-hidden="true" />
            {t.label}
          </p>
          <span aria-hidden="true">CODEV_TIM / 2.0</span>
        </div>
        <div className="living-title">
          <h1 id="sales-title">
            <span>{t.first}</span>
            <span>{t.second}</span>
            <em>{t.third}</em>
          </h1>
          <p>{t.lead}</p>
          <div className="living-actions">
            <a className="sales-button" href="#request">
              {t.action}
              <span aria-hidden="true">↗</span>
            </a>
            <a className="living-work-link" href="#proof">
              {t.work}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className="living-showcase">
          <div className="living-canvas" data-selected={selected}>
            <span className="canvas-axis canvas-axis-x" aria-hidden="true" />
            <span className="canvas-axis canvas-axis-y" aria-hidden="true" />
            <span className="canvas-coordinate" aria-hidden="true">
              INTERFACE / PROCESS / SYSTEM
            </span>
            {SLUGS.map((slug, index) => (
              <button
                key={slug}
                type="button"
                className={`canvas-fragment canvas-fragment-${index}`}
                aria-label={`${t.select} · ${t.titles[index]}`}
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
              >
                <div className="fragment-header">
                  <span aria-hidden="true">0{index + 1}</span>
                  <span>{index === 0 ? "FireSafe Demo" : t.titles[index]}</span>
                  <span aria-hidden="true">↗</span>
                </div>
                <div className="fragment-content" aria-hidden="true">
                  {index === 0 ? (
                    <>
                      <div className="fragment-search">
                        ⌕ <span>{t.search}</span>
                      </div>
                      <div className="fragment-products">
                        {t.products.map((name, product) => (
                          <div key={name}>
                            <svg viewBox="0 0 64 76" fill="none">
                              <g stroke="currentColor" strokeWidth="2">
                                {product === 0 ? (
                                  <>
                                    <rect
                                      x="22"
                                      y="24"
                                      width="23"
                                      height="43"
                                      rx="8"
                                    />
                                    <path d="M28 24V13h13M32 13V7h17M41 13c12 1 12 18 12 22" />
                                    <path d="M23 39h21v16H23" />
                                  </>
                                ) : product === 1 ? (
                                  <>
                                    <ellipse cx="32" cy="40" rx="24" ry="13" />
                                    <path d="M8 40v8c0 17 48 17 48 0v-8M17 45v10m8-8v11m8-10v11m8-11v10m8-13v10" />
                                    <circle cx="32" cy="37" r="3" />
                                  </>
                                ) : (
                                  <>
                                    <path d="M14 13h36v51H14zM20 13V7h24v6M22 26h20M22 34h20M22 42h20M22 50h12" />
                                    <path d="m18 69 28-58" />
                                  </>
                                )}
                              </g>
                            </svg>
                            <span>{name}</span>
                            <i />
                          </div>
                        ))}
                      </div>
                      <div className="fragment-foot">
                        <span>FireSafe Demo</span>
                        <span>RU / UZ / EN</span>
                      </div>
                    </>
                  ) : index === 1 ? (
                    <>
                      <div className="fragment-metric">
                        <span>{t.financial}</span>
                        <strong>
                          24 000 000 <small>UZS</small>
                        </strong>
                      </div>
                      <div className="fragment-pipeline">
                        {t.pipeline.map((name, stage) => (
                          <div key={name}>
                            <span>{name}</span>
                            <i />
                            <i style={{ width: `${78 - stage * 15}%` }} />
                            <b>0{stage + 1}</b>
                          </div>
                        ))}
                      </div>
                      <div className="fragment-chart">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="fragment-contact">
                        <span>{t.contact}</span>
                        <strong>Demo Client 03</strong>
                        <span>{t.today} · 14:30</span>
                      </div>
                      <div className="fragment-timeline">
                        <span>✓</span>
                        <div>
                          <strong>{t.done}</strong>
                          <p>{t.next}</p>
                        </div>
                      </div>
                      <div className="fragment-time">
                        09:00 <i /> 14:30 <i /> 18:00
                      </div>
                    </>
                  )}
                </div>
              </button>
            ))}
            <span className="canvas-cross" aria-hidden="true">
              +
            </span>
          </div>
          <p className="living-disclosure">{t.models}</p>
          <div
            className="living-project-controls"
            role="group"
            aria-label={t.select}
          >
            {SLUGS.map((slug, index) => (
              <button
                type="button"
                key={slug}
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
              >
                <span>0{index + 1}</span>
                {t.kinds[index]}
              </button>
            ))}
          </div>
          <div className="living-project-info" aria-live="polite">
            <h2>{t.titles[selected]}</h2>
            <p>{t.notes[selected]}</p>
          </div>
          <div className="living-project-links">
            <Link href={`/projects/${SLUGS[selected]}/demo`}>
              {t.demo}
              <span aria-hidden="true">↗</span>
            </Link>
            <Link href={`/projects/${SLUGS[selected]}`}>{t.detail}</Link>
          </div>
        </div>
        <div className="living-scene-footer">
          <span>{t.bottom}</span>
          <a href="#proof">
            {t.scroll}
            <span aria-hidden="true">↓</span>
          </a>
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
            <a key={id} href={`#offer-${id}`}>
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
