"use client";

import { useEffect } from "react";

/** How long after the last scroll event the scrollbar fades back to graphite. */
export const SCROLL_INK_DELAY = 700;

/**
 * Marks <html data-scrolling> while the page is scrolling, so CSS can tint the
 * scrollbar crimson. Renders nothing. The listener is passive, so it never
 * delays scrolling.
 */
export function ScrollInk() {
  useEffect(() => {
    const root = document.documentElement;
    let timeout: number | undefined;

    const onScroll = () => {
      root.dataset.scrolling = "";
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => delete root.dataset.scrolling, SCROLL_INK_DELAY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timeout);
      delete root.dataset.scrolling;
    };
  }, []);

  return null;
}
