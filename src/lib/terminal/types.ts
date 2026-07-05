export type TerminalCommandName =
  | "help"
  | "projects"
  | "project"
  | "registry"
  | "about"
  | "stack"
  | "contact"
  | "status"
  | "mission"
  | "version"
  | "whoami"
  | "open"
  | "search"
  | "clear"
  | "lang";

export type ParsedTerminalCommand = {
  raw: string;
  name: TerminalCommandName | string;
  args: string[];
};

export type {
  TerminalContextVM as TerminalContext,
  TerminalModuleTargetVM as TerminalModuleTarget,
  TerminalProductVM as TerminalProduct,
  TerminalStackLayerVM as TerminalStackLayer,
} from "@/lib/application";

export type TerminalRuntime = {
  locale: string;
  moduleLabel: string;
  buildDate: string;
};

export type TerminalCommandResult = {
  lines: string[];
  kind: "output" | "error" | "clear";
  navigateTo?: string;
  locale?: "en" | "ru" | "uz";
};

export type TerminalCompletion = {
  value: string;
  suffix: string;
};
