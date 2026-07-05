import type { ReactNode } from "react";

export type CalloutVariant = "info" | "warning" | "success" | "neutral";

export type CalloutProps = {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
};

export type TradeoffTableRow = {
  decision: string;
  alternative: string;
  rationale: string;
  outcome: string;
};

export type TradeoffTableProps = {
  rows: TradeoffTableRow[];
};

export type CodeBlockProps = {
  code: string;
  language?: string;
  title?: string;
};

export type ScreenshotItem = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

export type ScreenshotLightboxLabels = {
  dialogLabel: string;
  closeLabel: string;
  openLabel: string;
  previousLabel: string;
  nextLabel: string;
};

export type ScreenshotFrameProps = ScreenshotItem & {
  labels?: Partial<ScreenshotLightboxLabels>;
};

export type InterfaceRecordGalleryProps = {
  items: ScreenshotItem[];
  ariaLabel?: string;
  labels?: Partial<ScreenshotLightboxLabels>;
};

export type ArchitectureDiagramProps = {
  layers: string[];
  technologies?: Record<string, string>;
  descriptions?: Record<string, string>;
  ariaLabel?: string;
};
