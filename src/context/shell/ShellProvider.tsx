"use client";

import type { ReactNode } from "react";
import { ShellContext, useShellState } from "./ShellContext";

type ShellProviderProps = {
  children: ReactNode;
};

export function ShellProvider({ children }: ShellProviderProps) {
  const value = useShellState();

  return (
    <ShellContext.Provider value={value}>{children}</ShellContext.Provider>
  );
}
