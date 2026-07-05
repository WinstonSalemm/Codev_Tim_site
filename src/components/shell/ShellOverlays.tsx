"use client";

import dynamic from "next/dynamic";
import { useShellContext } from "@/context/shell";
import type { SiteShellConfig } from "@/lib/shell";

const CommandPalette = dynamic(
  () =>
    import("@/features/palette/CommandPalette").then(
      (module) => module.CommandPalette
    ),
  { ssr: false }
);

const TerminalPanel = dynamic(
  () =>
    import("@/features/terminal/TerminalPanel").then(
      (module) => module.TerminalPanel
    ),
  { ssr: false }
);

type ShellOverlaysProps = {
  config: SiteShellConfig;
};

export function ShellOverlays({ config }: ShellOverlaysProps) {
  const { isCommandPaletteOpen, isTerminalOpen } = useShellContext();

  return (
    <>
      {isCommandPaletteOpen ? <CommandPalette /> : null}
      {isTerminalOpen ? <TerminalPanel config={config} /> : null}
    </>
  );
}
