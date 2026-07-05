"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type TerminalStatus = "closed" | "open";

export type ShellContextValue = {
  isMobileNavOpen: boolean;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  toggleMobileNav: () => void;
  isStatusPanelOpen: boolean;
  openStatusPanel: () => void;
  closeStatusPanel: () => void;
  toggleStatusPanel: () => void;
  terminalStatus: TerminalStatus;
  isTerminalOpen: boolean;
  openTerminal: () => void;
  closeTerminal: () => void;
  toggleTerminal: () => void;
  isCommandPaletteOpen: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  toggleCommandPalette: () => void;
  navigationAnnouncement: string;
  setNavigationAnnouncement: (message: string) => void;
};

export const ShellContext = createContext<ShellContextValue | null>(null);

export function useShellContext() {
  const context = useContext(ShellContext);

  if (!context) {
    throw new Error("useShellContext must be used within ShellProvider");
  }

  return context;
}

export function useShellState(): ShellContextValue {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isStatusPanelOpen, setIsStatusPanelOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [navigationAnnouncement, setNavigationAnnouncement] = useState("");

  const openMobileNav = useCallback(() => {
    setIsMobileNavOpen(true);
  }, []);

  const closeMobileNav = useCallback(() => {
    setIsMobileNavOpen(false);
  }, []);

  const toggleMobileNav = useCallback(() => {
    setIsMobileNavOpen((current) => !current);
  }, []);

  const openStatusPanel = useCallback(() => {
    setIsStatusPanelOpen(true);
  }, []);

  const closeStatusPanel = useCallback(() => {
    setIsStatusPanelOpen(false);
  }, []);

  const toggleStatusPanel = useCallback(() => {
    setIsStatusPanelOpen((current) => !current);
  }, []);

  const openTerminal = useCallback(() => {
    setIsTerminalOpen(true);
  }, []);

  const closeTerminal = useCallback(() => {
    setIsTerminalOpen(false);
  }, []);

  const toggleTerminal = useCallback(() => {
    setIsTerminalOpen((current) => !current);
  }, []);

  const openCommandPalette = useCallback(() => {
    setIsCommandPaletteOpen(true);
  }, []);

  const closeCommandPalette = useCallback(() => {
    setIsCommandPaletteOpen(false);
  }, []);

  const toggleCommandPalette = useCallback(() => {
    setIsCommandPaletteOpen((current) => !current);
  }, []);

  const terminalStatus: TerminalStatus = isTerminalOpen ? "open" : "closed";

  return useMemo(
    () => ({
      isMobileNavOpen,
      openMobileNav,
      closeMobileNav,
      toggleMobileNav,
      isStatusPanelOpen,
      openStatusPanel,
      closeStatusPanel,
      toggleStatusPanel,
      terminalStatus,
      isTerminalOpen,
      openTerminal,
      closeTerminal,
      toggleTerminal,
      isCommandPaletteOpen,
      openCommandPalette,
      closeCommandPalette,
      toggleCommandPalette,
      navigationAnnouncement,
      setNavigationAnnouncement,
    }),
    [
      closeCommandPalette,
      closeMobileNav,
      closeStatusPanel,
      closeTerminal,
      isCommandPaletteOpen,
      isMobileNavOpen,
      isStatusPanelOpen,
      isTerminalOpen,
      navigationAnnouncement,
      openCommandPalette,
      openMobileNav,
      openStatusPanel,
      openTerminal,
      terminalStatus,
      toggleCommandPalette,
      toggleMobileNav,
      toggleStatusPanel,
      toggleTerminal,
    ]
  );
}
