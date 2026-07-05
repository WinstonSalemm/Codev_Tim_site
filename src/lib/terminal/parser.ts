import type { ParsedTerminalCommand } from "./types";

export function tokenizeTerminalInput(input: string): string[] {
  return input.trim().split(/\s+/).filter(Boolean);
}

export function parseTerminalCommand(
  input: string
): ParsedTerminalCommand | null {
  const raw = input.trim();
  if (!raw) {
    return null;
  }

  const tokens = tokenizeTerminalInput(raw);
  const name = tokens[0];

  if (!name) {
    return null;
  }

  return {
    raw,
    name: name.toLowerCase(),
    args: tokens.slice(1),
  };
}

export function getFirstToken(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    return "";
  }

  return trimmed.split(/\s+/)[0]?.toLowerCase() ?? "";
}

export function getActiveArgument(input: string): {
  command: string;
  partial: string;
  hasTrailingSpace: boolean;
} {
  const trimmed = input.trimStart();
  const hasTrailingSpace = input.endsWith(" ");
  const tokens = trimmed.split(/\s+/).filter(Boolean);
  const command = tokens[0]?.toLowerCase() ?? "";

  if (tokens.length <= 1 && !hasTrailingSpace) {
    return { command, partial: command, hasTrailingSpace: false };
  }

  if (hasTrailingSpace) {
    return { command, partial: "", hasTrailingSpace: true };
  }

  return {
    command,
    partial: tokens[tokens.length - 1] ?? "",
    hasTrailingSpace: false,
  };
}
