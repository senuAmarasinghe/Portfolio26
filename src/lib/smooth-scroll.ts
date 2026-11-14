import type Lenis from "lenis";

/**
 * The page's single Lenis instance (or null when smooth scrolling is off:
 * touch devices, reduced motion, or before it starts). Lets other components
 * pause scrolling, e.g. while the mobile menu is open.
 */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis(): Lenis | null {
  return instance;
}

/** easeOutExpo — the same curve as the --ease-out-expo design token. */
export function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}
