"use client";

import Image from "next/image";
import type { ScreenshotItem } from "./types";

type ScreenshotGalleryItemProps = {
  item: ScreenshotItem;
  openLabel: string;
  onOpen: () => void;
};

export function ScreenshotGalleryItem({
  item,
  openLabel,
  onOpen,
}: ScreenshotGalleryItemProps) {
  const width = item.width ?? 1280;
  const height = item.height ?? 720;
  const isSvg = item.src.toLowerCase().endsWith(".svg");

  return (
    <figure className="ds-mdx-screenshot">
      <div className="ds-mdx-screenshot-chrome">
        <div className="ds-mdx-screenshot-toolbar" aria-hidden="true">
          <span className="ds-mdx-screenshot-dot" />
          <span className="ds-mdx-screenshot-dot" />
          <span className="ds-mdx-screenshot-dot" />
        </div>
        <div className="ds-mdx-screenshot-viewport">
          <button
            type="button"
            className="ds-mdx-screenshot-trigger"
            aria-label={openLabel}
            onClick={onOpen}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={width}
              height={height}
              className="ds-mdx-screenshot-image"
              sizes="(max-width: 720px) 100vw, (max-width: 1024px) 50vw, 360px"
              unoptimized={isSvg}
            />
          </button>
        </div>
      </div>
      {item.caption ? (
        <figcaption className="ds-mdx-screenshot-caption">
          {item.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
