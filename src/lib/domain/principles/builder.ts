import { getPrinciples } from "@/lib/content";
import type { PrinciplesPageVM } from "./view-models";

export function buildPrinciplesPage(): PrinciplesPageVM {
  const protocols = getPrinciples().map((principle) => ({
    id: principle.id,
    number: principle.number,
    title: principle.title,
    description: principle.description,
  }));

  return {
    protocols,
    count: protocols.length,
  };
}
