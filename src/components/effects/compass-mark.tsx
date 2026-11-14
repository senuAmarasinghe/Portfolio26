"use client";

import { useRef } from "react";

import { useSmoothPointer } from "@/hooks/use-smooth-pointer";
import { cn } from "@/lib/utils";

/**
 * A small crimson compass whose needle turns to "watch" the pointer anywhere in the
 * surrounding section, and points back down (towards the content) when it leaves.
 */
export function CompassMark({ className }: { className?: string }) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const needleRef = useRef<HTMLSpanElement>(null);

  useSmoothPointer(
    rootRef,
    ({ x, y, presence, rect }) => {
      const root = rootRef.current;
      const needle = needleRef.current;
      if (!root || !needle) return;

      const box = root.getBoundingClientRect();
      const dx = rect.left + x - (box.left + box.width / 2);
      const dy = rect.top + y - (box.top + box.height / 2);
      // 0deg = pointing down. Blend from "down" to "towards the pointer" by presence.
      const toward = (Math.atan2(dy, dx) * 180) / Math.PI - 90;
      needle.style.transform = `rotate(${toward * presence}deg)`;
    },
    { area: "section", ease: 0.12 },
  );

  return (
    <span
      ref={rootRef}
      aria-hidden
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-accent/40 text-accent",
        className,
      )}
    >
      <span ref={needleRef} className="inline-block text-sm leading-none">
        ↓
      </span>
    </span>
  );
}
