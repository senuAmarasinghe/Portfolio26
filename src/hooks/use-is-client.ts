"use client";

import { useSyncExternalStore } from "react";

const subscribeNoop = () => () => {};

/** true in the browser, false during server rendering and hydration. */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}
