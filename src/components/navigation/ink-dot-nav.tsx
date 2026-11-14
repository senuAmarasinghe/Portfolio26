"use client";

import { useLayoutEffect, useRef } from "react";

import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

/**
 * Main navigation with scroll-spy: a crimson ink dot glides to the right of the
 * link for the section currently in view, and hides when no nav section is in view.
 */
export function InkDotNav({ items, className }: { items: NavItem[]; className?: string }) {
  const active = useActiveSection(items.map((item) => item.href.replace("#", "")));
  const listRef = useRef<HTMLUListElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const placedRef = useRef(false);

  // Position the dot by writing styles directly: no extra React renders while moving.
  useLayoutEffect(() => {
    const list = listRef.current;
    const dot = dotRef.current;
    if (!list || !dot) return;

    const update = () => {
      const item = list.children[active] as HTMLElement | undefined;
      dot.style.opacity = item ? "1" : "0";
      // Both axes here: Tailwind's translate-* utilities share this same CSS property.
      if (item) dot.style.translate = `${item.offsetLeft + item.offsetWidth + 8}px -50%`;
    };

    if (!placedRef.current && active >= 0) {
      // First appearance: place it without sliding in from the left edge.
      dot.style.transitionProperty = "opacity";
      update();
      void dot.offsetWidth; // flush styles so later changes animate
      dot.style.transitionProperty = "";
      placedRef.current = true;
    } else {
      update();
    }

    const resize = new ResizeObserver(update);
    resize.observe(list);
    return () => resize.disconnect();
  }, [active]);

  return (
    <nav aria-label="Main" className={cn("relative", className)}>
      <ul ref={listRef} className="flex gap-8">
        {items.map((item, i) => (
          <li key={item.href}>
            <a
              href={item.href}
              aria-current={i === active ? "location" : undefined}
              className={cn(
                "text-muted transition-colors duration-300 hover:text-foreground",
                i === active && "text-foreground",
              )}
            >
              <span className="text-accent">{String(i + 1).padStart(2, "0")}</span> {item.label}
            </a>
          </li>
        ))}
      </ul>
      <span
        ref={dotRef}
        aria-hidden
        className="absolute top-1/2 left-0 size-1.5 rounded-full bg-accent opacity-0 transition-[translate,opacity] duration-700 ease-out-expo"
      />
    </nav>
  );
}
