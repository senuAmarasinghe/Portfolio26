import { cacheLife } from "next/cache";

/** Magazine-style volume number: the year's last two digits in Colombo, e.g. 2026 → "26". */
export function formatVolume(date: Date): string {
  return new Intl.DateTimeFormat("en", { year: "2-digit", timeZone: "Asia/Colombo" }).format(date);
}

/**
 * Current volume, cached for a day. The page stays static, and Next.js regenerates
 * it in the background once the day is up, so the volume rolls over each new year
 * without a redeploy.
 */
export async function getVolume(): Promise<string> {
  "use cache";
  cacheLife("days");
  return formatVolume(new Date());
}
