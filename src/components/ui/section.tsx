import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

interface SectionProps {
  /** Anchor id used by the navigation, e.g. "about". */
  id: string;
  /** Position in the page, shown as "(01)". */
  index: number;
  /** Small label next to the index. */
  label: string;
  /** Heading. Wrap a word in <em> to render it as the serif-italic accent. */
  title: ReactNode;
  children: ReactNode;
}

/** Standard page section: numbered label + large heading on a 12-column grid. */
export function Section({ id, index, label, title, children }: SectionProps) {
  const headingId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={headingId}>
      <Container className="border-t border-border py-24 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-12">
          <Eyebrow className="lg:col-span-3 lg:pt-4">
            <span className="text-accent">({String(index).padStart(2, "0")})</span> {label}
          </Eyebrow>
          <h2
            id={headingId}
            className="font-display text-headline font-semibold uppercase font-stretch-expanded lg:col-span-9 [&_em]:font-serif [&_em]:font-normal [&_em]:text-accent [&_em]:normal-case [&_em]:font-stretch-normal"
          >
            {title}
          </h2>
        </div>
        <div className="mt-16 lg:mt-24">{children}</div>
      </Container>
    </section>
  );
}
