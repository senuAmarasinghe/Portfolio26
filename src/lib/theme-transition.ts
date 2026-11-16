import { EASE_OUT_EXPO_CSS } from "@/lib/motion";

export interface Point {
  x: number;
  y: number;
}

/** How long the ink takes to spread across the page. */
export const INK_SPREAD_MS = 900;

/**
 * Runs `apply` (which changes the theme) inside a View Transition, revealing the
 * new theme as a circle of "ink" spreading from `origin` until it covers the screen.
 * Falls back to an instant switch where View Transitions aren't supported or the
 * visitor prefers reduced motion.
 */
export function withInkSpread(apply: () => void, origin?: Point) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (typeof document.startViewTransition !== "function" || reducedMotion) {
    apply();
    return;
  }

  const { x, y } = origin ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  // Radius from the origin to the farthest corner, so the circle covers everything.
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  const transition = document.startViewTransition(apply);
  transition.ready
    .then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: INK_SPREAD_MS,
          easing: EASE_OUT_EXPO_CSS,
          pseudoElement: "::view-transition-new(root)",
        },
      );
    })
    .catch(() => {});
}

/** Where a click happened, or the element's centre for keyboard activation. */
export function originFromEvent(event: {
  clientX: number;
  clientY: number;
  detail: number;
  currentTarget: Element;
}): Point {
  if (event.detail > 0) return { x: event.clientX, y: event.clientY };
  const box = event.currentTarget.getBoundingClientRect();
  return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
}
