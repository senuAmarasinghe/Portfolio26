"use client";

import { type MouseEvent, type PointerEvent, useRef } from "react";

import { useThemeSwitch } from "@/hooks/use-theme-switch";
import { originFromEvent } from "@/lib/theme-transition";
import { cn } from "@/lib/utils";

/** How far (px) the cord stretches when pulled. */
const MAX_PULL = 36;

/**
 * Theme switch shaped like a lamp pull cord hanging from the top of the header.
 * Pull the bead down and let go (or just click / press Enter); the cord springs
 * back and the new theme spreads like ink from the bead.
 *
 * Visual state uses CSS `dark:` variants, so it is correct on the first paint;
 * `aria-pressed` is filled in once the browser knows the saved theme.
 */
export function PullCordToggle({ className }: { className?: string }) {
  const { isDark, toggle } = useThemeSwitch();
  const cordRef = useRef<HTMLSpanElement>(null);
  const beadRef = useRef<HTMLSpanElement>(null);
  const startY = useRef<number | null>(null);

  const setPull = (px: number) => cordRef.current?.style.setProperty("--pull", `${px}px`);

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    startY.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
    // Follow the finger/mouse 1:1 while pulling.
    cordRef.current?.style.setProperty("transition", "none");
  };

  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (startY.current === null) return;
    setPull(Math.max(0, Math.min(MAX_PULL, event.clientY - startY.current)));
  };

  const release = () => {
    startY.current = null;
    // Spring back with a little overshoot, like a real cord.
    cordRef.current?.style.removeProperty("transition");
    setPull(0);
  };

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    // Spread the ink from the bead (where the eye is), not the pointer's end point.
    const bead = beadRef.current?.getBoundingClientRect();
    toggle(
      bead && event.detail > 0
        ? { x: bead.left + bead.width / 2, y: bead.top + bead.height / 2 }
        : originFromEvent(event),
    );
  };

  return (
    <button
      type="button"
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={release}
      onPointerCancel={release}
      aria-pressed={isDark}
      aria-label="Dark theme"
      className={cn("group relative h-16 w-6 shrink-0 touch-none self-start", className)}
    >
      <span
        ref={cordRef}
        aria-hidden
        className="absolute top-0 left-1/2 flex -translate-x-1/2 flex-col items-center transition-[height] duration-700 ease-[cubic-bezier(0.34,1.8,0.64,1)]"
        style={{ height: "calc(2.5rem + var(--pull, 0px))" }}
      >
        <span className="w-px flex-1 bg-foreground/40" />
        <span
          ref={beadRef}
          className="size-2.5 rounded-full bg-accent ring-2 ring-background transition-transform duration-300 group-hover:scale-125 dark:bg-foreground"
        />

        {/* Hover hint: a cord isn't an obvious control, so say what it does. */}
        <span className="pointer-events-none absolute right-full bottom-0 mr-3 translate-y-1/4 font-mono text-[0.6rem] tracking-[0.2em] whitespace-nowrap text-muted uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="dark:hidden">Pull for night</span>
          <span className="hidden dark:inline">Pull for day</span>
        </span>
      </span>
    </button>
  );
}
