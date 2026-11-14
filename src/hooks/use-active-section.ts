"use client";

import { type RefObject, useEffect, useState } from "react";

/**
 * Scroll-spy: returns the index of the section (by element id) currently crossing
 * the middle of the scroll area, or -1 when none is (e.g. the hero, or a band that
 * isn't in the navigation). Uses IntersectionObserver, so nothing runs on every
 * scroll event.
 *
 * @param ids      Section element ids, in page order.
 * @param rootRef  Scroll container. Omit to use the browser viewport.
 */
export function useActiveSection(ids: string[], rootRef?: RefObject<HTMLElement | null>): number {
  const [active, setActive] = useState(-1);
  const key = ids.join("|");

  useEffect(() => {
    const root = rootRef?.current ?? null;
    const scope: ParentNode = root ?? document;
    const sections = key
      .split("|")
      .map((id) => scope.querySelector<HTMLElement>(`#${CSS.escape(id)}`))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0 || typeof IntersectionObserver === "undefined") return;

    const crossing = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) crossing.add(entry.target);
          else crossing.delete(entry.target);
        }
        setActive(sections.findIndex((section) => crossing.has(section)));
      },
      // A thin band across the middle of the viewport: whichever section crosses it is active.
      { root, rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [key, rootRef]);

  return active;
}
