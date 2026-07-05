"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/components/modules/dashboard/motion/useReducedMotion";
import type { ScreenshotItem, ScreenshotLightboxLabels } from "./types";
import { useFocusTrap } from "./useFocusTrap";

type ScreenshotLightboxProps = {
  items: ScreenshotItem[];
  activeIndex: number;
  labels: ScreenshotLightboxLabels;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function ScreenshotLightbox({
  items,
  activeIndex,
  labels,
  onClose,
  onPrevious,
  onNext,
}: ScreenshotLightboxProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useFocusTrap(true);
  const item = items[activeIndex];

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key === "ArrowLeft" && items.length > 1) {
        event.preventDefault();
        onPrevious();
        return;
      }

      if (event.key === "ArrowRight" && items.length > 1) {
        event.preventDefault();
        onNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose, items.length, onNext, onPrevious]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!item) {
    return null;
  }

  const width = item.width ?? 1280;
  const height = item.height ?? 720;
  const hasMultiple = items.length > 1;
  const isSvg = item.src.toLowerCase().endsWith(".svg");
  const titleId = "ds-mdx-lightbox-title";
  const captionId = item.caption ? "ds-mdx-lightbox-caption" : undefined;

  return (
    <div
      className={`ds-mdx-lightbox-backdrop${reducedMotion ? "ds-mdx-lightbox-backdrop--reduced-motion" : ""}`}
      onClick={handleClose}
    >
      <div
        ref={containerRef}
        className="ds-mdx-lightbox"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={captionId}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="ds-mdx-lightbox-header">
          <p id={titleId} className="ds-mdx-lightbox-title">
            {labels.dialogLabel}
          </p>
          <button
            type="button"
            className="ds-mdx-lightbox-close"
            onClick={handleClose}
            aria-label={labels.closeLabel}
          >
            {labels.closeLabel}
          </button>
        </header>

        <figure className="ds-mdx-lightbox-figure">
          <div className="ds-mdx-lightbox-viewport">
            <Image
              src={item.src}
              alt={item.alt}
              width={width}
              height={height}
              className="ds-mdx-lightbox-image"
              sizes="100vw"
              priority
              unoptimized={isSvg}
            />
          </div>
          {item.caption ? (
            <figcaption id={captionId} className="ds-mdx-lightbox-caption">
              {item.caption}
            </figcaption>
          ) : null}
        </figure>

        {hasMultiple ? (
          <footer className="ds-mdx-lightbox-footer">
            <button
              type="button"
              className="ds-mdx-lightbox-nav"
              onClick={onPrevious}
              aria-label={labels.previousLabel}
            >
              {labels.previousLabel}
            </button>
            <span className="ds-mdx-lightbox-counter" aria-live="polite">
              {activeIndex + 1} / {items.length}
            </span>
            <button
              type="button"
              className="ds-mdx-lightbox-nav"
              onClick={onNext}
              aria-label={labels.nextLabel}
            >
              {labels.nextLabel}
            </button>
          </footer>
        ) : null}
      </div>
    </div>
  );
}
