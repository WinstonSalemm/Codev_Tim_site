import type {
  ParsedTerminalCommand,
  TerminalCommandResult,
  TerminalContext,
  TerminalRuntime,
} from "./types";
import type { RegistryCardVM } from "@/lib/application";
import {
  findRegisteredProduct,
  getRegisteredProductPath,
  listRegisteredProducts,
} from "@/lib/application";
import {
  LOCALE_CODES,
  MODULE_OPEN_ALIASES,
  TERMINAL_COMMANDS,
} from "./registry";

function padField(value: string, width: number): string {
  return value.length >= width ? value : value.padEnd(width);
}

function formatProductLine(product: RegistryCardVM): string {
  return `  ${padField(product.title, 22)} ${padField(product.status, 18)} ${product.subtitle}`;
}

function resolveOpenTarget(target: string): string | null {
  const normalized = target.toLowerCase();

  if (MODULE_OPEN_ALIASES[normalized]) {
    return MODULE_OPEN_ALIASES[normalized];
  }

  return getRegisteredProductPath(normalized);
}

function executeHelp(): TerminalCommandResult {
  const lines = [
    "Available commands:",
    "",
    ...TERMINAL_COMMANDS.map((command) => {
      const usage = command.usage ?? command.name;
      return `  ${padField(usage, 22)} ${command.description}`;
    }),
  ];

  return { lines, kind: "output" };
}

function executeProjects(): TerminalCommandResult {
  const products = listRegisteredProducts();

  if (products.length === 0) {
    return {
      lines: ["Product registry contains no entries."],
      kind: "output",
    };
  }

  const lines = [
    "Registered products:",
    "",
    ...products.map(formatProductLine),
    "",
    `${products.length} products registered. Type 'open projects' or 'registry' to navigate.`,
  ];

  return { lines, kind: "output" };
}

function executeProject(args: string[]): TerminalCommandResult {
  const slugInput = args.join(" ").trim();

  if (!slugInput) {
    return {
      lines: ["Usage: project [slug]", "Example: project codev-erp"],
      kind: "error",
    };
  }

  const product = findRegisteredProduct(slugInput);

  if (!product) {
    return {
      lines: [
        `Product not found: ${slugInput}`,
        "Type 'projects' to list registered products.",
      ],
      kind: "error",
    };
  }

  return {
    lines: [
      "Product record:",
      "",
      `  ${padField("Title", 18)} ${product.title}`,
      `  ${padField("Status", 18)} ${product.status}`,
      `  ${padField("Slug", 18)} ${product.slug}`,
      `  ${padField("Domain", 18)} ${product.domain}`,
      `  ${padField("Stack", 18)} ${product.stack.join(" · ")}`,
      `  ${padField("Summary", 18)} ${product.summary}`,
      "",
      `Type 'open ${product.slug}' to navigate.`,
    ],
    kind: "output",
  };
}

function executeRegistry(): TerminalCommandResult {
  return {
    lines: ["Navigating to Product Registry."],
    kind: "output",
    navigateTo: "/projects",
  };
}

function executeAbout(context: TerminalContext): TerminalCommandResult {
  return {
    lines: [
      `Identity          ${context.roles.join(" · ")}`,
      `Location          ${context.location}`,
      `Timezone          ${context.timezone}`,
      `Focus             ${context.focus}`,
      `Deployment History ${context.timelineSummary}`,
      `Availability      ${context.availability}`,
    ],
    kind: "output",
  };
}

function executeStack(context: TerminalContext): TerminalCommandResult {
  const lines = [
    "Technology stack:",
    "",
    ...context.stackLayers.map(
      (layer) => `  ${padField(layer.label, 18)} ${layer.count} technologies`
    ),
    "",
    "Primary stack:",
    `  ${context.topTags.join(" · ")}`,
  ];

  return { lines, kind: "output" };
}

function executeContact(context: TerminalContext): TerminalCommandResult {
  return {
    lines: [`Email:  ${context.email}`, `GitHub: ${context.github}`],
    kind: "output",
  };
}

function executeStatus(context: TerminalContext): TerminalCommandResult {
  return {
    lines: [
      `System Status:     ${context.statusLabel}`,
      `Current Mission:   ${context.mission}`,
      `Version:           v${context.version}`,
      `Location:          ${context.location}`,
      `Timezone:          ${context.timezone}`,
      `Availability:      ${context.availability}`,
    ],
    kind: "output",
  };
}

function executeMission(context: TerminalContext): TerminalCommandResult {
  return {
    lines: [`Current Mission:   ${context.mission}`],
    kind: "output",
  };
}

function executeVersion(
  context: TerminalContext,
  runtime: TerminalRuntime
): TerminalCommandResult {
  return {
    lines: [`Codev_Tim v${context.version}`, `Build: ${runtime.buildDate}`],
    kind: "output",
  };
}

function executeWhoami(
  context: TerminalContext,
  runtime: TerminalRuntime
): TerminalCommandResult {
  return {
    lines: [
      "Operator context:",
      "  Session active",
      `  Language: ${runtime.locale}`,
      `  Module: ${runtime.moduleLabel}`,
      "",
      "You are viewing Codev_Tim — engineering operating system.",
    ],
    kind: "output",
  };
}

function executeOpen(args: string[]): TerminalCommandResult {
  if (args.length === 0) {
    return {
      lines: [
        "Usage: open [module|slug]",
        "Example: open projects",
        "Example: open codev-erp",
      ],
      kind: "error",
    };
  }

  const target = args.join(" ");
  const href = resolveOpenTarget(target);

  if (!href) {
    return {
      lines: [
        `Target not found: ${target}`,
        "Type 'help' for available commands.",
      ],
      kind: "error",
    };
  }

  return {
    lines: [`Navigating to ${target}.`],
    kind: "output",
    navigateTo: href,
  };
}

function executeSearch(
  args: string[],
  context: TerminalContext
): TerminalCommandResult {
  const query = args.join(" ").trim().toLowerCase();

  if (!query) {
    return {
      lines: ["Usage: search [query]"],
      kind: "error",
    };
  }

  const moduleMatches = context.modules.filter(
    (module) =>
      module.alias.includes(query) || module.label.toLowerCase().includes(query)
  );

  const productMatches = listRegisteredProducts().filter(
    (product) =>
      product.title.toLowerCase().includes(query) ||
      product.slug.toLowerCase().includes(query)
  );

  const noteMatches = context.noteTitles.filter((title) =>
    title.toLowerCase().includes(query)
  );

  if (
    moduleMatches.length === 0 &&
    productMatches.length === 0 &&
    noteMatches.length === 0
  ) {
    return {
      lines: ["No matching modules or records."],
      kind: "output",
    };
  }

  const lines: string[] = [];

  if (moduleMatches.length > 0) {
    lines.push("Modules:");
    lines.push(
      ...moduleMatches.map(
        (module) => `  ${padField(module.label, 22)} ${module.href}`
      )
    );
    lines.push("");
  }

  if (productMatches.length > 0) {
    lines.push("Products:");
    lines.push(
      ...productMatches.map(
        (product) => `  ${padField(product.title, 22)} ${product.slug}`
      )
    );
    lines.push("");
  }

  if (noteMatches.length > 0) {
    lines.push("Engineering Notes:");
    lines.push(...noteMatches.map((title) => `  ${title}`));
  }

  return { lines, kind: "output" };
}

function executeLang(args: string[]): TerminalCommandResult {
  const code = args[0]?.toLowerCase();

  if (!code) {
    return {
      lines: ["Usage: lang [en|ru|uz]"],
      kind: "error",
    };
  }

  if (!LOCALE_CODES.includes(code as (typeof LOCALE_CODES)[number])) {
    return {
      lines: [`Language not supported: ${code}`, "Supported: en, ru, uz"],
      kind: "error",
    };
  }

  return {
    lines: [`Language set to ${code}.`],
    kind: "output",
    locale: code as "en" | "ru" | "uz",
  };
}

export function executeTerminalCommand(
  parsed: ParsedTerminalCommand,
  context: TerminalContext,
  runtime: TerminalRuntime
): TerminalCommandResult {
  switch (parsed.name) {
    case "help":
      return executeHelp();
    case "projects":
      return executeProjects();
    case "project":
      return executeProject(parsed.args);
    case "registry":
      return executeRegistry();
    case "about":
      return executeAbout(context);
    case "stack":
      return executeStack(context);
    case "contact":
      return executeContact(context);
    case "status":
      return executeStatus(context);
    case "mission":
      return executeMission(context);
    case "version":
      return executeVersion(context, runtime);
    case "whoami":
      return executeWhoami(context, runtime);
    case "open":
      return executeOpen(parsed.args);
    case "search":
      return executeSearch(parsed.args, context);
    case "clear":
      return { lines: ["Console cleared."], kind: "clear" };
    case "lang":
      return executeLang(parsed.args);
    default:
      return {
        lines: [
          `Command not found: ${parsed.name}`,
          "Type 'help' for available commands.",
        ],
        kind: "error",
      };
  }
}
