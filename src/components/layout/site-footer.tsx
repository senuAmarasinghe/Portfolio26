import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground/10">
      <Container className="py-8 text-sm text-foreground/60">© {siteConfig.name}</Container>
    </footer>
  );
}
