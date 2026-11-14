"use client";

import { useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Colombo",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

// The browser clock is an "external store": subscribe = tick every second.
function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 1000);
  return () => window.clearInterval(id);
}
const getSnapshot = () => formatter.format(Date.now());
// No time on the server: avoids a hydration mismatch and a stale prerendered time.
const getServerSnapshot = () => null;

/** Current time in Colombo with a blinking colon, e.g. "09:41" (optionally with a prefix). */
export function LiveClock({ prefix, className }: { prefix?: string; className?: string }) {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [hours, minutes] = (time ?? "--:--").split(":");

  return (
    <span
      className={cn("tabular-nums", className)}
      aria-label={`Local time in Colombo: ${time ?? "loading"}`}
    >
      {prefix && `${prefix} `}
      {hours}
      <span aria-hidden className="motion-safe:animate-blink">
        :
      </span>
      {minutes}
    </span>
  );
}
