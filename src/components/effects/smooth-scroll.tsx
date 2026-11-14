"use client";

import "lenis/dist/lenis.css";

import Lenis from "lenis";
import { useEffect } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { easeOutExpo, GLIDE_SECONDS } from "@/lib/motion";
import { setLenis } from "@/lib/smooth-scroll";

/**
 * Premium smooth scrolling for mouse-wheel users (Lenis). Deliberately light:
 * - only for precise pointers; touch and trackpad momentum stay native
 * - off entirely when the visitor prefers reduced motion
 * - native scrolling underneath, so sticky, scroll-spy and the scrollbar keep working
 * - in-page anchor links glide with the site's ease-out-expo curve
 * Renders nothing.
 */
export function SmoothScroll() {
  const finePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (!finePointer || reducedMotion) return;

    const lenis = new Lenis({
      autoRaf: true,
      // Slightly snappier than the 0.1 default: refined glide, no floaty drift.
      lerp: 0.12,
      // Same duration and curve as the nav ink dot, so they move as one.
      anchors: { offset: -80, duration: GLIDE_SECONDS, easing: easeOutExpo },
      stopInertiaOnNavigate: true,
    });
    setLenis(lenis);

    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, [finePointer, reducedMotion]);

  return null;
}
