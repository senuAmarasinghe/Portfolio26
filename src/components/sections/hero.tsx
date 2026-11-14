import Image from "next/image";

import portrait from "@/assets/images/senuthi-portrait.webp";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { profile } from "@/data/profile";

export function Hero() {
  const [firstName, ...rest] = profile.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section aria-labelledby="hero-title" className="flex min-h-[calc(100svh-4rem)] flex-col">
      <Container className="flex flex-1 flex-col gap-10 pt-6 lg:pt-10">
        {/* Masthead meta row */}
        <div className="grid grid-cols-2 gap-4 border-y border-border py-3 md:grid-cols-4">
          <Eyebrow>Portfolio — Vol. 26</Eyebrow>
          <Eyebrow className="text-right md:text-left">{profile.location}</Eyebrow>
          <Eyebrow className="hidden md:block">{profile.role}</Eyebrow>
          <Eyebrow className="hidden text-right md:block">Scroll ↓</Eyebrow>
        </div>

        {/* Cover: name + cut-out portrait sitting on the baseline rule */}
        <div className="grid flex-1 items-end gap-8 lg:grid-cols-12">
          <h1 id="hero-title" className="relative z-10 self-center lg:col-span-8">
            <span className="block font-display text-display font-semibold uppercase font-stretch-expanded">
              {firstName}
            </span>
            <span className="block font-serif text-display text-accent italic sm:pl-[8vw]">
              {lastName}
            </span>
          </h1>

          <div className="relative mx-auto w-full max-w-sm lg:col-span-4 lg:-ml-[15%] lg:max-w-none">
            <Image
              src={portrait}
              alt={`Portrait of ${profile.name}`}
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 34vw, (min-width: 640px) 24rem, 90vw"
              className="h-auto w-full"
            />
          </div>
        </div>

        <div className="-mt-10 grid gap-8 border-t border-border py-8 md:grid-cols-12">
          <p className="max-w-md text-lg leading-relaxed text-muted md:col-span-6">
            {profile.tagline}
          </p>
          <dl className="flex gap-12 md:col-span-4 md:col-start-9 md:justify-end">
            {profile.stats.map((stat) => (
              // flex-col-reverse: label reads first for screen readers, shows below visually.
              <div key={stat.label} className="flex flex-col-reverse">
                <dt>
                  <Eyebrow className="mt-2">{stat.label}</Eyebrow>
                </dt>
                <dd className="font-display text-4xl font-medium font-stretch-expanded">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
