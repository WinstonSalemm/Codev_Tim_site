import { buildTerminalContext } from "@/lib/domain/terminal";

export function loadTerminalContext() {
  return buildTerminalContext();
}

export {
  findRegisteredProduct,
  getRegisteredProductPath,
  listRegisteredProducts,
  resolveRegisteredProductSlug,
} from "./products";

export {
  LOCALE_CODES,
  MODULE_OPEN_ALIASES,
  MODULE_LABELS,
} from "@/lib/domain/terminal";
