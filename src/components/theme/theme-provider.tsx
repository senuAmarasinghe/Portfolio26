"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * Theme state for the whole site (next-themes). It writes data-theme on <html>
 * before the first paint, so a saved choice never flashes the wrong theme.
 * Light is the default; dark ("ink") is opt-in.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      themes={["light", "dark"]}
      defaultTheme="light"
      enableSystem={false}
      storageKey="portfolio26-theme"
      // Our own ink-spread transition animates the switch; stop every element
      // from also running its own colour transition at the same moment.
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
