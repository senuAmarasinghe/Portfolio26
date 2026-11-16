"use client";

import { useSyncExternalStore } from "react";

import { THEME_STORAGE_KEY, type Theme, readTheme } from "@/lib/theme";

/**
 * The theme lives on <html data-theme>, so <html> is the "store":
 * - a MutationObserver reports any change to that attribute
 * - the `storage` event brings in changes made in other tabs
 */
function subscribe(onChange: () => void) {
  const root = document.documentElement;
  const observer = new MutationObserver(onChange);
  observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) return;
    const theme = event.newValue === "dark" ? "dark" : "light";
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  };
  window.addEventListener("storage", onStorage);

  return () => {
    observer.disconnect();
    window.removeEventListener("storage", onStorage);
  };
}

/** Current theme, or null during server rendering / hydration (it isn't known there). */
export function useTheme(): Theme | null {
  return useSyncExternalStore(subscribe, readTheme, () => null);
}
