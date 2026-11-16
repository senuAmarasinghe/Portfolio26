"use client";

import { useTheme } from "@/hooks/use-theme";
import { applyTheme, readTheme } from "@/lib/theme";
import { type Point, withInkSpread } from "@/lib/theme-transition";

/**
 * Theme toggle logic: flips light/dark inside the ink-spread transition.
 * `isDark` is undefined until the browser knows the saved theme (avoids a
 * hydration mismatch); visuals should use CSS `dark:` variants instead.
 */
export function useThemeSwitch() {
  const theme = useTheme();

  const toggle = (origin?: Point) => {
    const next = readTheme() === "dark" ? "light" : "dark";
    // Applied synchronously inside the transition, so the new snapshot shows the new theme.
    withInkSpread(() => applyTheme(next), origin);
  };

  return { isDark: theme === null ? undefined : theme === "dark", toggle };
}
