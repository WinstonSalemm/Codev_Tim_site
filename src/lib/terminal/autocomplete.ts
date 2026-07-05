import { getActiveArgument } from "./parser";
import { LOCALE_CODES, TERMINAL_COMMAND_NAMES } from "./registry";
import type { TerminalCompletion, TerminalContext } from "./types";

function findMatches(candidates: string[], partial: string): string[] {
  const normalized = partial.toLowerCase();
  return candidates.filter((candidate) =>
    candidate.toLowerCase().startsWith(normalized)
  );
}

function buildCompletion(input: string, candidate: string): TerminalCompletion {
  const { partial, hasTrailingSpace } = getActiveArgument(input);
  const base = hasTrailingSpace
    ? input.trimEnd() + (input.endsWith(" ") ? "" : " ")
    : input.slice(0, input.length - partial.length);

  return {
    value: `${base}${candidate}`,
    suffix: candidate.slice(partial.length),
  };
}

export function getTerminalCompletion(
  input: string,
  context: TerminalContext
): TerminalCompletion | null {
  const trimmed = input.trimStart();
  if (!trimmed) {
    return null;
  }

  const { command, partial, hasTrailingSpace } = getActiveArgument(input);

  if (!trimmed.includes(" ")) {
    const matches = findMatches([...TERMINAL_COMMAND_NAMES], partial);
    if (matches.length !== 1) {
      return null;
    }

    const candidate = matches[0];
    if (!candidate || (candidate === partial && !hasTrailingSpace)) {
      return null;
    }

    return {
      value: candidate,
      suffix: candidate.slice(partial.length),
    };
  }

  if (command === "open") {
    const openTargets = [
      ...context.modules.map((module) => module.alias),
      ...context.products.map((product) => product.slug),
    ];
    const matches = findMatches(openTargets, partial);

    if (matches.length !== 1) {
      return null;
    }

    const match = matches[0];
    if (!match) {
      return null;
    }

    return buildCompletion(input, match);
  }

  if (command === "project") {
    const matches = findMatches(
      context.products.map((product) => product.slug),
      partial
    );

    if (matches.length !== 1) {
      return null;
    }

    const match = matches[0];
    if (!match) {
      return null;
    }

    return buildCompletion(input, match);
  }

  if (command === "lang") {
    const matches = findMatches([...LOCALE_CODES], partial);
    if (matches.length !== 1) {
      return null;
    }

    const match = matches[0];
    if (!match) {
      return null;
    }

    return buildCompletion(input, match);
  }

  return null;
}

export function getTerminalSuggestionText(
  input: string,
  context: TerminalContext
): string {
  const completion = getTerminalCompletion(input, context);
  return completion?.suffix ?? "";
}
