"use client";
import { useState } from "react";
import { OFFERS } from "@/lib/commerce/catalog";
import {
  promotionErrors,
  quoteOffer,
  money,
  type Promotion,
} from "@/lib/commerce/pricing";
export function PromotionManager({
  initial,
  revision,
}: {
  initial: Promotion[];
  revision: string;
}) {
  const [rules, setRules] = useState(initial);
  const [version, setVersion] = useState(revision);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [dirty, setDirty] = useState(false);
  const change = (index: number, patch: Partial<Promotion>) => {
    setRules((prev) =>
      prev.map((p, i) => (i === index ? { ...p, ...patch } : p))
    );
    setDirty(true);
    setStatus("");
  };
  const errors = promotionErrors(rules);
  async function save() {
    if (errors.length) return;
    setBusy(true);
    setStatus("");
    try {
      const response = await fetch("/api/local/promotions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promotions: rules, revision: version }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Не удалось сохранить");
      setVersion(result.revision);
      setDirty(false);
      setStatus(
        "Сохранено в проекте. Локальная витрина обновлена. Чтобы акция появилась на основном сайте, опубликуйте изменения проекта."
      );
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "Ошибка сохранения");
    } finally {
      setBusy(false);
    }
  }
  function add() {
    setRules((prev) => [
      ...prev,
      {
        id: "promo-" + Date.now(),
        enabled: false,
        title: { ru: "Новая акция", uz: "Yangi aksiya", en: "New promotion" },
        offerIds: ["landing"],
        percent: 10,
        startsAt: new Date().toISOString(),
        endsAt: new Date(Date.now() + 7 * 86400000).toISOString(),
      },
    ]);
    setDirty(true);
  }
  const localDate = (s: string) =>
    Number.isFinite(Date.parse(s))
      ? new Date(Date.parse(s) + 5 * 3600000).toISOString().slice(0, 16)
      : "";
  return (
    <div className="sales-page sales-admin">
      <header className="sales-catalog-head">
        <p className="sales-eyebrow">CODEV_TIM / УПРАВЛЕНИЕ АКЦИЯМИ</p>
        <h1>Акции под вашим контролем.</h1>
        <p>
          Выберите пакеты, процент и период по времени Ташкента. Конец периода
          не включается. Сохраняется файл проекта - посетители основного сайта
          увидят изменения после публикации.
        </p>
      </header>
      <fieldset className="sales-admin-fields" disabled={busy}>
        <div className="sales-admin-toolbar">
          <button className="sales-button" onClick={add} type="button">
            + Добавить акцию
          </button>
          <button
            className="sales-button sales-button-secondary"
            onClick={save}
            type="button"
            disabled={busy || !!errors.length || !dirty}
          >
            {busy ? "Сохраняем…" : "Сохранить изменения"}
          </button>
          <a
            href="/ru"
            className="sales-detail-link"
            target="_blank"
            rel="noreferrer"
          >
            Открыть витрину ↗
          </a>
        </div>
        <p className="sales-small-note">
          При пересечении акций применяется наибольшая скидка. Скидка только на
          базовую цену; дополнения и расходы сервисов без скидки. Исходные цены
          - content/commerce/prices.json.
        </p>
        <div role="status" className="sales-admin-status">
          {dirty ? "Есть несохранённые изменения. " : ""}
          {status}
        </div>
        {!!errors.length && (
          <div role="alert" className="sales-form-error">
            {errors.map((e) => (
              <p key={e}>{e}</p>
            ))}
          </div>
        )}
        {rules.map((p, i) => (
          <section key={p.id} className="sales-admin-rule">
            <div className="sales-admin-rule-head">
              <h2>{p.title.ru}</h2>
              <label>
                <input
                  type="checkbox"
                  checked={p.enabled}
                  onChange={(e) => change(i, { enabled: e.target.checked })}
                />{" "}
                Акция включена
              </label>
              <button
                type="button"
                className="sales-text-button"
                onClick={() => {
                  setRules((prev) => prev.filter((_, j) => i !== j));
                  setDirty(true);
                }}
              >
                Удалить
              </button>
            </div>
            <div className="sales-admin-grid">
              {(["ru", "uz", "en"] as const).map((locale) => (
                <label key={locale}>
                  Название {locale.toUpperCase()}
                  <input
                    value={p.title[locale]}
                    maxLength={100}
                    onChange={(e) =>
                      change(i, {
                        title: { ...p.title, [locale]: e.target.value },
                      })
                    }
                  />
                </label>
              ))}
              <label>
                Скидка, %
                <input
                  type="number"
                  min={1}
                  max={70}
                  step={1}
                  value={p.percent}
                  onChange={(e) =>
                    change(i, { percent: Number(e.target.value) })
                  }
                />
              </label>
              <label>
                Начало · Ташкент
                <input
                  type="datetime-local"
                  value={localDate(p.startsAt)}
                  onChange={(e) =>
                    change(i, {
                      startsAt: e.target.value
                        ? e.target.value + ":00+05:00"
                        : "",
                    })
                  }
                />
              </label>
              <label>
                Конец · Ташкент
                <input
                  type="datetime-local"
                  value={localDate(p.endsAt)}
                  onChange={(e) =>
                    change(i, {
                      endsAt: e.target.value
                        ? e.target.value + ":00+05:00"
                        : "",
                    })
                  }
                />
              </label>
            </div>
            <fieldset className="sales-admin-offers">
              <legend>На какие пакеты действует</legend>
              {OFFERS.map((o) => (
                <label key={o.id}>
                  <input
                    type="checkbox"
                    checked={p.offerIds.includes(o.id)}
                    onChange={(e) =>
                      change(i, {
                        offerIds: e.target.checked
                          ? [...p.offerIds, o.id]
                          : p.offerIds.filter((id) => id !== o.id),
                      })
                    }
                  />
                  <span>
                    {o.name.ru}
                    <small>
                      {money(quoteOffer(o.id, new Date(p.startsAt), [p]).base)}{" "}
                      →{" "}
                      {money(
                        Math.round(
                          (quoteOffer(o.id).base * (100 - p.percent)) / 100
                        )
                      )}
                    </small>
                  </span>
                </label>
              ))}
            </fieldset>
            <p className="sales-small-note">
              ID: {p.id} · Предпросмотр цены после скидки (при включённой акции
              в указанный период).
            </p>
          </section>
        ))}
        {!rules.length && (
          <p>
            Акций пока нет. Добавьте первую - текущие цены останутся без скидок.
          </p>
        )}
        <button
          className="sales-button"
          onClick={save}
          type="button"
          disabled={busy || !!errors.length || !dirty}
        >
          Сохранить изменения
        </button>
      </fieldset>
    </div>
  );
}
