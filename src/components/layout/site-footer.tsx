import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col justify-between gap-2 py-8 sm:flex-row">
        <Eyebrow>© {siteConfig.name}</Eyebrow>
        <Eyebrow>Designed & built with care</Eyebrow>
      </Container>
    </footer>
  );
}
