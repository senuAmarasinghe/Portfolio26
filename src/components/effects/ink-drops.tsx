"use client";

import { useEffect, useRef } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";

/** Elements that count as "clickable" for the ink drop. */
const INTERACTIVE = "a[href], button, [role='button'], summary, label[for]";

/**
 * Clicking a link or button anywhere on the page leaves a small crimson ink drop
 * that ripples out and fades. Drops are plain DOM nodes animated with the Web
 * Animations API and removed when done, so React state is never touched.
 * Render once, e.g. in the root layout.
 */
export function InkDrops() {
  const layerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || reducedMotion) return;

    const onClick = (event: MouseEvent) => {
      // Only real pointer clicks on interactive elements (keyboard "clicks" have no position).
      if (event.detail === 0) return;
      if (!(event.target instanceof Element) || !event.target.closest(INTERACTIVE)) return;

      const drop = document.createElement("span");
      // Progressive enhancement: skip silently where the Web Animations API is missing.
      if (typeof drop.animate !== "function") return;
      drop.className = "pointer-events-none absolute size-3 rounded-full bg-accent";
      drop.style.left = `${event.clientX}px`;
      drop.style.top = `${event.clientY}px`;
      layer.append(drop);

      drop
        .animate(
          [
            { transform: "translate(-50%, -50%) scale(0)", opacity: 0.9 },
            { transform: "translate(-50%, -50%) scale(1)", opacity: 0.9, offset: 0.2 },
            { transform: "translate(-50%, -50%) scale(2.2)", opacity: 0 },
          ],
          { duration: 1000, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
        )
        .finished.catch(() => {})
        .finally(() => drop.remove());
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [reducedMotion]);

  // Fixed to the viewport, so drop coordinates are simply the click's clientX/Y.
  return (
    <div
      ref={layerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
    />
  );
}
