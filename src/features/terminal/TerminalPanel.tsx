"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useShellContext } from "@/context/shell";
import { getModuleByPathname } from "@/lib/shell/modules";
import type { SiteShellConfig } from "@/lib/shell";
import {
  executeTerminalCommand,
  getTerminalCompletion,
  getTerminalContext,
  getTerminalSuggestionText,
  parseTerminalCommand,
} from "@/lib/terminal";

const HISTORY_KEY = "codev-tim-terminal-history";
const HISTORY_LIMIT = 50;

type TerminalPanelProps = {
  config: SiteShellConfig;
};

type TerminalLine = {
  id: string;
  type: "system" | "input" | "output" | "error";
  text: string;
};

function readHistory(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = sessionStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeHistory(history: string[]) {
  try {
    sessionStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(history.slice(-HISTORY_LIMIT))
    );
  } catch {
    /* ignore storage errors */
  }
}

function getModuleLabel(pathname: string): string {
  const shellModule = getModuleByPathname(pathname);
  if (!shellModule) {
    return "Unknown";
  }

  const labels: Record<string, string> = {
    operationsCenter: "Operations Center",
    productRegistry: "Product Registry",
    engineeringProtocols: "Engineering Protocols",
    knowledgeBase: "Knowledge Base",
    engineerProfile: "Engineer Profile",
    communicationModule: "Communication Module",
  };

  return labels[shellModule.id] ?? shellModule.id;
}

export function TerminalPanel({ config }: TerminalPanelProps) {
  const t = useTranslations("terminal");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { closeTerminal } = useShellContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const terminalContext = useMemo(() => getTerminalContext(), []);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<TerminalLine[]>(() => [
    {
      id: "header",
      type: "system",
      text: t("shellHeader", { version: config.version }),
    },
    {
      id: "hint",
      type: "system",
      text: t("shellHint"),
    },
  ]);

  const suggestion = useMemo(
    () => getTerminalSuggestionText(input, terminalContext),
    [input, terminalContext]
  );

  const moduleLabel = useMemo(() => getModuleLabel(pathname), [pathname]);

  const buildDate = useMemo(
    () => new Intl.DateTimeFormat("en-CA").format(new Date()),
    []
  );

  useEffect(() => {
    setHistory(readHistory());
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    const mobileQuery = window.matchMedia("(width < 48rem)");
    if (!mobileQuery.matches) {
      return;
    }

    const getFocusables = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        )
      );

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }

      const focusables = getFocusables();
      if (focusables.length === 0) {
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener("keydown", handleKeyDown);
    return () => panel.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight });
  }, [lines]);

  const appendLines = useCallback((next: TerminalLine[]) => {
    setLines((current) => [...current, ...next]);
  }, []);

  const runCommand = useCallback(
    (raw: string) => {
      const parsed = parseTerminalCommand(raw);
      const id = crypto.randomUUID();

      appendLines([{ id, type: "input", text: `> ${raw.trim()}` }]);

      if (!parsed) {
        return;
      }

      const command = parsed.raw;
      const nextHistory = [
        ...history.filter((entry) => entry !== command),
        command,
      ];
      setHistory(nextHistory);
      writeHistory(nextHistory);
      setHistoryIndex(-1);

      const result = executeTerminalCommand(parsed, terminalContext, {
        locale,
        moduleLabel,
        buildDate,
      });

      if (result.kind === "clear") {
        setLines([]);
        appendLines([
          { id: `${id}-clear`, type: "output", text: result.lines[0] ?? "" },
        ]);
        return;
      }

      appendLines([
        {
          id: `${id}-result`,
          type: result.kind === "error" ? "error" : "output",
          text: result.lines.join("\n"),
        },
      ]);

      if (result.navigateTo) {
        router.push(result.navigateTo);
      }

      if (result.locale) {
        router.replace(pathname, { locale: result.locale });
      }
    },
    [
      appendLines,
      buildDate,
      history,
      locale,
      moduleLabel,
      pathname,
      router,
      terminalContext,
    ]
  );

  const handleSubmit = () => {
    runCommand(input);
    setInput("");
  };

  const applyCompletion = () => {
    const completion = getTerminalCompletion(input, terminalContext);
    if (!completion) {
      return false;
    }

    setInput(completion.value);
    return true;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeTerminal();
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      applyCompletion();
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) {
        return;
      }

      const nextIndex =
        historyIndex === -1
          ? history.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex] ?? "");
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (history.length === 0 || historyIndex === -1) {
        return;
      }

      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
        return;
      }

      setHistoryIndex(nextIndex);
      setInput(history[nextIndex] ?? "");
    }
  };

  return (
    <section
      ref={panelRef}
      className="ds-terminal-panel"
      role="region"
      aria-label={t("title")}
    >
      <div className="ds-terminal-header">
        <span className="ds-terminal-title">{t("title")}</span>
        <button
          type="button"
          className="ds-terminal-close"
          onClick={closeTerminal}
          aria-label={t("closeLabel")}
        >
          ×
        </button>
      </div>

      <div ref={outputRef} className="ds-terminal-output ds-scrollbar">
        {lines.map((line) => (
          <pre
            key={line.id}
            className={`ds-terminal-line ds-terminal-line--${line.type}`}
          >
            {line.text}
          </pre>
        ))}
      </div>

      <div className="ds-terminal-input-row">
        <span className="ds-terminal-prompt" aria-hidden="true">
          {"> "}
        </span>
        <div className="ds-terminal-input-wrap">
          <span className="ds-terminal-input-mirror" aria-hidden="true">
            {input}
            {suggestion ? (
              <span className="ds-terminal-input-suggestion">{suggestion}</span>
            ) : null}
          </span>
          <input
            ref={inputRef}
            type="text"
            className="ds-terminal-input"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setHistoryIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            aria-label={t("inputLabel")}
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </section>
  );
}
