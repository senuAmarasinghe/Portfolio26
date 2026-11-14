import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/** Small pill for technologies and keywords. */
export function Tag({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border border-border px-3 py-1 font-mono text-[0.7rem] text-muted",
        className,
      )}
      {...props}
    />
  );
}
