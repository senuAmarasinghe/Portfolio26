"use client";

import { useTheme } from "next-themes";

import { useIsClient } from "@/hooks/use-is-client";
import { type Point, withInkSpread } from "@/lib/theme-transition";

/**
 * Shared logic for every theme toggle design.
 * `isDark` is undefined until the browser knows the saved theme (avoids a
 * hydration mismatch); visuals should use CSS `dark:` variants instead.
 */
export function useThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const isClient = useIsClient();

  const toggle = (origin?: Point) => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    withInkSpread(() => {
      // Apply to the DOM synchronously so the View Transition captures the new
      // theme; next-themes then saves the choice.
      root.dataset.theme = next;
      root.style.colorScheme = next;
      setTheme(next);
    }, origin);
  };

  return { isDark: isClient ? resolvedTheme === "dark" : undefined, toggle };
}
