import { Work } from "@/components/sections/work";
import { getProjects } from "@/lib/github.server";

/** Async Server Component: loads hand-written + GitHub projects, then renders Work. */
export async function WorkSection() {
  return <Work projects={await getProjects()} />;
}
