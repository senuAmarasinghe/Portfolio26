/**
 * Shared motion tokens, so things that move together feel like one motion.
 * Keep in sync with --ease-out-expo in globals.css.
 */

/** easeOutExpo: fast start, long soft settle. */
export function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/** The same curve as a CSS timing function. */
export const EASE_OUT_EXPO_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";

/** The "glide": anchor-link scrolling sets this pace; the nav ink dot matches it. */
export const GLIDE_SECONDS = 1.2;
export const GLIDE_MS = GLIDE_SECONDS * 1000;
