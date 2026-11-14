import { getVolume } from "@/lib/volume";

/** Async Server Component: renders the current volume number, e.g. "26". */
export async function Volume() {
  return <>{await getVolume()}</>;
}
