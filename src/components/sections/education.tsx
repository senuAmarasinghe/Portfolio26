import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag-list";
import { education } from "@/data/education";

export function Education() {
  return (
    <Section
      id="education"
      index={4}
      label="Education"
      title={
        <>
          Always <em>learning</em>
        </>
      }
    >
      <ol className="divide-y divide-border border-y border-border">
        {education.map((item) => (
          <li key={item.qualification} className="grid gap-6 py-10 lg:grid-cols-12">
            <Eyebrow className="lg:col-span-3">{item.period}</Eyebrow>
            <div className="lg:col-span-5">
              <h3 className="text-2xl font-medium tracking-tight">{item.qualification}</h3>
              <p className="mt-1 text-muted">
                {item.institution}
                {item.location && ` · ${item.location}`}
              </p>
            </div>
            {item.highlights && <TagList items={item.highlights} className="lg:col-span-4" />}
          </li>
        ))}
      </ol>
    </Section>
  );
}
