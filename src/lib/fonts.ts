import { Geist, Geist_Mono } from "next/font/google";

/**
 * Geist subsets — latin-ext covers Uzbek Latin (o', g').
 * Cyrillic covers Russian UI. docs/11_DESIGN_TOKENS.md §5.1
 *
 * next/font requires a literal subsets array at compile time.
 */
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
  preload: true,
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400"],
  display: "swap",
  preload: true,
});

export const fontVariables = `${geistSans.variable} ${geistMono.variable}`;
