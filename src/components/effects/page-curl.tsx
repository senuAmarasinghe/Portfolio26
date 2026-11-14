"use client";

import { useRef } from "react";

import { useSmoothPointer } from "@/hooks/use-smooth-pointer";

interface PageCurlProps {
  /** Where "turning the page" goes, e.g. "#about". */
  href: string;
  label?: string;
}

/**
 * A small dog-eared corner at the bottom-right of a section, like a magazine page.
 * It peels up as the pointer approaches the corner and reveals a "turn page" hint.
 * Must be placed inside a `relative` <section>.
 */
export function PageCurl({ href, label = "Turn page" }: PageCurlProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useSmoothPointer(
    ref,
    ({ x, y, presence, rect }) => {
      const corner = ref.current;
      if (!corner) return;
      const distance = Math.hypot(rect.width - x, rect.height - y);
      const proximity = Math.max(0, 1 - distance / 280) * presence;
      corner.style.setProperty("--curl", `${18 + proximity * 70}px`);
      corner.style.setProperty("--curl-hint", String(Math.max(0, proximity * 2 - 1)));
    },
    { area: "section", ease: 0.12 },
  );

  return (
    <a
      ref={ref}
      href={href}
      aria-label={label}
      className="absolute right-0 bottom-0 z-20 block size-[var(--curl,18px)] drop-shadow-[-3px_-3px_4px_rgb(0_0_0/0.08)]"
      style={{
        // Bottom-right half: what's "under" the page. Top-left half: the folded-back flap.
        backgroundImage:
          "linear-gradient(315deg, color-mix(in oklch, var(--foreground) 9%, var(--background)) 50%, var(--surface) 50%)",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute right-full bottom-full mr-2 mb-2 font-mono text-[0.6rem] tracking-[0.2em] whitespace-nowrap text-muted uppercase opacity-[var(--curl-hint,0)]"
      >
        {label} ↓
      </span>
    </a>
  );
}
