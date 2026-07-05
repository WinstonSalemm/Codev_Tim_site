import type { TerminalCommandName } from "./types";
import { LOCALE_CODES, MODULE_OPEN_ALIASES } from "@/lib/application";

export type TerminalCommandDefinition = {
  name: TerminalCommandName;
  description: string;
  usage?: string;
};

export const TERMINAL_COMMANDS: TerminalCommandDefinition[] = [
  { name: "help", description: "List available commands" },
  { name: "projects", description: "List registered products" },
  {
    name: "project",
    description: "Display product record",
    usage: "project [slug]",
  },
  { name: "registry", description: "Navigate to Product Registry" },
  {
    name: "open",
    description: "Navigate to module or product",
    usage: "open [module|slug]",
  },
  { name: "about", description: "Engineer profile summary" },
  { name: "stack", description: "Technology stack" },
  { name: "contact", description: "Communication endpoints" },
  { name: "status", description: "System status" },
  { name: "mission", description: "Current mission" },
  { name: "version", description: "System version" },
  { name: "whoami", description: "Operator context" },
  {
    name: "search",
    description: "Search modules and records",
    usage: "search [query]",
  },
  { name: "clear", description: "Clear console output" },
  {
    name: "lang",
    description: "Set language (en, ru, uz)",
    usage: "lang [en|ru|uz]",
  },
];

export const TERMINAL_COMMAND_NAMES = TERMINAL_COMMANDS.map(
  (command) => command.name
);

export { LOCALE_CODES, MODULE_OPEN_ALIASES };
