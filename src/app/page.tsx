import { About } from "@/components/sections/about";
import { Community } from "@/components/sections/community";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { WorkSection } from "@/components/sections/work-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Community />
      <WorkSection />
      <Education />
      <Contact />
    </>
  );
}
