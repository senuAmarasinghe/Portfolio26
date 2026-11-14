"use client";

import { type RefObject, useEffect, useEffectEvent } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";

export interface SmoothPointer {
  /** Eased pointer position relative to the area's top-left corner, in px. */
  x: number;
  y: number;
  /** Same position normalised to -1…1 around the area's centre. */
  nx: number;
  ny: number;
  /** 0 → 1 as the pointer enters the area, eased back to 0 when it leaves. */
  presence: number;
  /** The area's current bounding box (viewport coordinates). */
  rect: DOMRect;
}

interface Options {
  /** Which element listens for the pointer: the element itself or its closest <section>. */
  area?: "self" | "section";
  /** 0–1. Lower = smoother and slower to follow. */
  ease?: number;
}

/**
 * Calls `onFrame` with an eased pointer position while the pointer moves inside an area.
 * When the pointer leaves, values ease back to the centre and the loop stops once settled,
 * so nothing runs while the page is idle. Disabled on touch devices and for reduced motion.
 */
export function useSmoothPointer(
  elementRef: RefObject<HTMLElement | null>,
  onFrame: (pointer: SmoothPointer) => void,
  { area = "self", ease = 0.08 }: Options = {},
) {
  const finePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  // Always calls the latest onFrame without restarting the effect.
  const emitFrame = useEffectEvent(onFrame);

  useEffect(() => {
    const element = elementRef.current;
    const target = area === "section" ? (element?.closest("section") ?? element) : element;
    if (!target || !finePointer || reducedMotion) return;

    let rect = target.getBoundingClientRect();
    let targetX = rect.width / 2;
    let targetY = rect.height / 2;
    let targetPresence = 0;
    let x = targetX;
    let y = targetY;
    let presence = 0;
    let frame = 0;

    const tick = () => {
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      presence += (targetPresence - presence) * ease;
      rect = target.getBoundingClientRect();
      emitFrame({
        x,
        y,
        nx: (x / rect.width) * 2 - 1,
        ny: (y / rect.height) * 2 - 1,
        presence,
        rect,
      });

      const settled =
        Math.abs(targetX - x) < 0.1 &&
        Math.abs(targetY - y) < 0.1 &&
        Math.abs(targetPresence - presence) < 0.001;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const bounds = target.getBoundingClientRect();
      targetX = event.clientX - bounds.left;
      targetY = event.clientY - bounds.top;
      targetPresence = 1;
      wake();
    };

    const onLeave = () => {
      const bounds = target.getBoundingClientRect();
      targetX = bounds.width / 2;
      targetY = bounds.height / 2;
      targetPresence = 0;
      wake();
    };

    target.addEventListener("pointermove", onMove);
    target.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerleave", onLeave);
    };
  }, [elementRef, area, ease, finePointer, reducedMotion]);
}
