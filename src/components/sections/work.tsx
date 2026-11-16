import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag-list";
import type { Project } from "@/types";

const linkClass =
  "underline-offset-4 transition-colors duration-300 hover:text-accent hover:underline";

/** Presentational: renders projects in the order given (see getProjects for ordering). */
export function Work({ projects }: { projects: Project[] }) {
  return (
    <Section
      id="work"
      index={3}
      label="Work"
      title={
        <>
          Selected <em>work</em>
        </>
      }
    >
      <ol className="divide-y divide-border border-y border-border">
        {projects.map((project, i) => (
          <li
            key={project.slug}
            className="grid gap-6 py-10 transition-colors duration-500 ease-out-expo hover:bg-surface lg:grid-cols-12 lg:px-6"
          >
            <p
              aria-hidden
              className="font-display text-4xl font-semibold text-accent font-stretch-expanded lg:col-span-1"
            >
              {String(i + 1).padStart(2, "0")}
            </p>
            <div className="lg:col-span-5">
              <h3 className="font-display text-3xl font-semibold tracking-tight uppercase font-stretch-expanded">
                {project.title}
              </h3>
              <p className="mt-2 font-serif text-xl text-muted italic">{project.category}</p>
            </div>
            <div className="space-y-5 lg:col-span-6">
              <div className="flex flex-wrap gap-x-6 gap-y-1">
                <Eyebrow>{project.period}</Eyebrow>
                <Eyebrow className="text-accent">{project.status}</Eyebrow>
              </div>
              <p className="leading-relaxed">{project.summary}</p>
              <TagList items={project.stack} />
              {(project.links.repo || project.links.live) && (
                <div className="flex gap-6 font-mono text-[0.7rem] tracking-[0.2em] uppercase">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className={linkClass}
                    >
                      Live site ↗
                    </a>
                  )}
                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noreferrer"
                      className={linkClass}
                    >
                      Code ↗
                    </a>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
