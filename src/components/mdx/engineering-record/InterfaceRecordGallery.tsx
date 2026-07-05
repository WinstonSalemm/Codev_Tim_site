"use client";

import { useCallback, useState } from "react";
import { ScreenshotGalleryItem } from "./ScreenshotGalleryItem";
import { ScreenshotLightbox } from "./ScreenshotLightbox";
import type {
  InterfaceRecordGalleryProps,
  ScreenshotLightboxLabels,
} from "./types";

const DEFAULT_LABELS: ScreenshotLightboxLabels = {
  dialogLabel: "Interface Record",
  closeLabel: "Close",
  openLabel: "Open interface screenshot",
  previousLabel: "Previous",
  nextLabel: "Next",
};

export function InterfaceRecordGallery({
  items,
  ariaLabel = "Interface Record gallery",
  labels,
}: InterfaceRecordGalleryProps) {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || items.length === 0) {
        return current;
      }

      return (current - 1 + items.length) % items.length;
    });
  }, [items.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || items.length === 0) {
        return current;
      }

      return (current + 1) % items.length;
    });
  }, [items.length]);

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <section className="ds-mdx-interface-gallery" aria-label={ariaLabel}>
        {items.map((item, index) => (
          <ScreenshotGalleryItem
            key={`${item.src}-${index}`}
            item={item}
            openLabel={mergedLabels.openLabel}
            onOpen={() => setActiveIndex(index)}
          />
        ))}
      </section>

      {activeIndex !== null ? (
        <ScreenshotLightbox
          items={items}
          activeIndex={activeIndex}
          labels={mergedLabels}
          onClose={closeLightbox}
          onPrevious={showPrevious}
          onNext={showNext}
        />
      ) : null}
    </>
  );
}
