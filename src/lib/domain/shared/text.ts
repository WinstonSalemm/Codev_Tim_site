import { PREVIEW_MAX_LENGTH } from "./constants";

export function truncatePreview(value: string): string {
  if (value.length <= PREVIEW_MAX_LENGTH) {
    return value;
  }

  return `${value.slice(0, PREVIEW_MAX_LENGTH - 1)}…`;
}
