import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <Container className="py-24">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Hi, I&apos;m {siteConfig.name}.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-foreground/70">{siteConfig.description}</p>
    </Container>
  );
}
