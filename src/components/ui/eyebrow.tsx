import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/** Small uppercase mono label — the "kicker" text used in magazine layouts. */
export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn("font-mono text-[0.7rem] tracking-[0.2em] text-muted uppercase", className)}
      {...props}
    />
  );
}
