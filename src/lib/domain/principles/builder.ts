import type { LocalizedProtocolInput, PrinciplesPageVM } from "./view-models";

export function buildPrinciplesPage(
  protocols: LocalizedProtocolInput[]
): PrinciplesPageVM {
  return {
    protocols,
    count: protocols.length,
  };
}
