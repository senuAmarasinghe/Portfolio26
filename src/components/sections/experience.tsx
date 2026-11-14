import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag-list";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <Section
      id="experience"
      index={2}
      label="Experience"
      title={
        <>
          Where I&apos;ve <em>worked</em>
        </>
      }
    >
      <ol className="divide-y divide-border border-y border-border">
        {experience.map((job) => (
          <li key={`${job.company}-${job.role}`} className="grid gap-6 py-10 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <Eyebrow>{job.period}</Eyebrow>
              <Eyebrow className="mt-2 text-accent">{job.employmentType}</Eyebrow>
            </div>
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-medium tracking-tight">{job.role}</h3>
              <p className="mt-1 text-muted">
                {job.company}
                {job.location && ` · ${job.location}`}
              </p>
            </div>
            <div className="space-y-6 lg:col-span-5">
              <ul className="space-y-2 leading-relaxed">
                {job.achievements.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="text-accent">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <TagList items={job.stack} />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
