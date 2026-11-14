import Image from "next/image";

import collage from "@/assets/images/community-collage.webp";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Full-bleed interlude between sections: the community collage as a faint,
 * grayscale backdrop that fades into the page, with a short statement on top.
 */
export function Community() {
  return (
    <section
      aria-labelledby="community-title"
      className="group relative isolate flex min-h-[75svh] items-center overflow-hidden"
    >
      {/* Decorative backdrop: the text carries the meaning, so alt is empty. */}
      <Image
        src={collage}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        className="-z-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] object-cover opacity-[0.16] grayscale transition-opacity duration-1000 ease-out-expo group-hover:opacity-25"
      />

      <Container className="py-24 text-center">
        <Eyebrow>
          <span className="text-accent">Interlude</span> — Beyond code
        </Eyebrow>
        <h2
          id="community-title"
          className="mx-auto mt-6 max-w-5xl font-display text-headline font-semibold uppercase font-stretch-expanded"
        >
          Community, <em className="font-serif font-normal text-accent normal-case">people</em>{" "}
          &amp; growth
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted">
          The best things I&apos;ve learned came from people. Through community work, events and
          industry visits, I&apos;ve grown from contributor to organizer, and I enjoy helping others
          grow too.
        </p>
      </Container>
    </section>
  );
}
