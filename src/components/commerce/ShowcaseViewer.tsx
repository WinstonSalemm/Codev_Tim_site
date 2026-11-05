"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/lib/commerce/catalog";
import {
  SHOWCASES,
  SHOWCASE_COPY,
  showcaseSource,
  type ShowcaseSlug,
} from "@/lib/showcases";

export function ShowcaseViewer({
  slug,
  locale,
  standalone = false,
}: {
  slug: ShowcaseSlug;
  locale: Locale;
  standalone?: boolean;
}) {
  const t = SHOWCASE_COPY[locale];
  const project = SHOWCASES[slug];
  const [active, setActive] = useState(false);
  const [viewport, setViewport] = useState("desktop");
  const [revision, setRevision] = useState(0);
  const [status, setStatus] = useState("loading");
  const [fullscreenError, setFullscreenError] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  // Mount after hydration so even a cached document cannot load before the handler.
  useEffect(() => {
    if (standalone) setActive(true);
  }, [standalone]);
  useEffect(() => {
    if (!active || status !== "loading") return;
    const timeout = window.setTimeout(() => setStatus("error"), 20000);
    return () => window.clearTimeout(timeout);
  }, [active, revision, status]);
  return (
    <section className="showcase-viewer" aria-label={t.experience}>
      <div className="showcase-intro">
        <div>
          <p className="sales-eyebrow">03 / {t.experience}</p>
          <h2>{t.title}</h2>
        </div>
        <p>{t.description}</p>
      </div>
      <div className="showcase-toolbar">
        <div
          className="showcase-viewports"
          role="group"
          aria-label={t.experience}
        >
          {(["desktop", "tablet", "mobile"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              aria-pressed={viewport === mode}
              onClick={() => setViewport(mode)}
            >
              {t[mode]}
            </button>
          ))}
        </div>
        <div className="showcase-tools">
          <button
            type="button"
            onClick={() => {
              setStatus("loading");
              setActive(true);
              setRevision((v) => v + 1);
            }}
          >
            {t.refresh} ↻
          </button>
          <button
            type="button"
            onClick={async () => {
              try {
                setFullscreenError(false);
                await frameRef.current?.requestFullscreen();
              } catch {
                setFullscreenError(true);
              }
            }}
          >
            {t.fullscreen} ⛶
          </button>
        </div>
      </div>
      <div ref={frameRef} className="showcase-stage" data-viewport={viewport}>
        {active ? (
          <>
            <iframe
              key={revision}
              className="showcase-frame"
              title={`${project.title} — ${t.disclosure}`}
              src={showcaseSource(slug, locale)}
              sandbox={
                slug === "fire-safety-store"
                  ? "allow-scripts allow-same-origin allow-forms"
                  : "allow-scripts"
              }
              referrerPolicy="no-referrer"
              onLoad={() => setStatus("ready")}
              onError={() => setStatus("error")}
            />
            {status !== "ready" && (
              <p className="showcase-status" role="status">
                {status === "loading" ? t.loading : t.error}
              </p>
            )}
          </>
        ) : (
          <button
            className="showcase-launch"
            type="button"
            onClick={() => setActive(true)}
          >
            <span aria-hidden="true">↗</span>
            <strong>{project.title}</strong>
            <span>{t.start}</span>
          </button>
        )}
      </div>
      <div className="showcase-footer">
        <span>{project.kind === "catalog" ? t.disclosure : t.simulation}</span>
        <a
          className="work-open"
          href={showcaseSource(slug, locale)}
          target="_blank"
          rel="noreferrer"
        >
          {t.direct} ↗
        </a>
        <Link
          className="work-open"
          href={standalone ? `/projects/${slug}` : `/projects/${slug}/demo`}
        >
          {standalone ? t.back : t.demo} ↗
        </Link>
      </div>
      {fullscreenError && (
        <p role="status" className="sales-small-note">
          {t.fullscreenFallback}
        </p>
      )}
    </section>
  );
}
