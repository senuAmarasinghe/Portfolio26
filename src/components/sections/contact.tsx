import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/socials";

export function Contact() {
  return (
    <Section
      id="contact"
      index={5}
      label="Contact"
      title={
        <>
          Let&apos;s build something <em>together</em>
        </>
      }
    >
      <div className="lg:ml-[25%]">
        <Eyebrow>Write to me</Eyebrow>
        <a
          href={`mailto:${profile.email}`}
          className="mt-4 inline-block font-serif text-[clamp(1.75rem,5vw,4.5rem)] leading-tight break-all text-accent italic transition-opacity duration-300 hover:opacity-70"
        >
          {profile.email}
        </a>

        <ul className="mt-16 flex flex-wrap gap-x-10 gap-y-4 font-mono text-[0.7rem] tracking-[0.2em] uppercase">
          {socialLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 transition-colors duration-300 hover:text-accent hover:underline"
              >
                {link.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
