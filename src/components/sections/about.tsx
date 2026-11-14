import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag-list";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";

export function About() {
  return (
    <Section
      id="about"
      index={1}
      label="About"
      title={
        <>
          Engineer with an <em>eye</em> for detail
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-12">
        {/* Lead paragraph with a magazine drop cap */}
        <div className="space-y-6 text-lg leading-relaxed lg:col-span-6 lg:col-start-4">
          {profile.about.map((paragraph, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "text-xl first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:font-serif first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-accent"
                  : "text-muted"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>

        <aside className="space-y-10 lg:col-span-3">
          <div>
            <Eyebrow>Currently learning</Eyebrow>
            <TagList items={profile.currentlyLearning} className="mt-4" />
          </div>
          <div>
            <Eyebrow>Languages</Eyebrow>
            <p className="mt-3">{profile.languages.join(" · ")}</p>
          </div>
        </aside>
      </div>

      {/* Skills */}
      <dl className="mt-24 divide-y divide-border border-y border-border">
        {skillGroups.map((group) => (
          <div key={group.title} className="grid gap-4 py-6 lg:grid-cols-12">
            <dt className="lg:col-span-3">
              <Eyebrow>{group.title}</Eyebrow>
            </dt>
            <dd className="lg:col-span-9">
              <TagList items={group.skills} />
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
