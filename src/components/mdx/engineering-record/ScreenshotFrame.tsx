"use client";

import { useCallback, useState } from "react";
import { ScreenshotGalleryItem } from "./ScreenshotGalleryItem";
import { ScreenshotLightbox } from "./ScreenshotLightbox";
import type { ScreenshotFrameProps, ScreenshotLightboxLabels } from "./types";

const DEFAULT_LABELS: ScreenshotLightboxLabels = {
  dialogLabel: "Interface Record",
  closeLabel: "Close",
  openLabel: "Open interface screenshot",
  previousLabel: "Previous",
  nextLabel: "Next",
};

export function ScreenshotFrame({
  src,
  alt,
  caption,
  width,
  height,
  labels,
}: ScreenshotFrameProps) {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const [isOpen, setIsOpen] = useState(false);
  const item = { src, alt, caption, width, height };

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <ScreenshotGalleryItem
        item={item}
        openLabel={mergedLabels.openLabel}
        onOpen={() => setIsOpen(true)}
      />

      {isOpen ? (
        <ScreenshotLightbox
          items={[item]}
          activeIndex={0}
          labels={mergedLabels}
          onClose={closeLightbox}
          onPrevious={closeLightbox}
          onNext={closeLightbox}
        />
      ) : null}
    </>
  );
}
