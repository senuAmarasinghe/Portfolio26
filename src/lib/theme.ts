export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "portfolio26-theme";
export const DEFAULT_THEME: Theme = "light";

/**
 * Runs in <head> before the first paint (see layout.tsx): applies the saved theme
 * so a returning "dark" visitor never sees a flash of the light theme.
 * Kept as a plain string: it runs before React or any bundle has loaded.
 */
export const themeInitScript = `(function () {
  var root = document.documentElement;
  var theme = "${DEFAULT_THEME}";
  try {
    var saved = localStorage.getItem("${THEME_STORAGE_KEY}");
    if (saved === "light" || saved === "dark") theme = saved;
  } catch (e) {}
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
})();`;

/** Applies a theme to <html> and remembers it. */
export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage blocked (private mode etc.): the theme still applies for this visit.
  }
}

/** Reads the theme currently applied to <html>. */
export function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}
