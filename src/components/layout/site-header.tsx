import { InkDotNav } from "@/components/navigation/ink-dot-nav";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { PullCordToggle } from "@/components/theme/pull-cord-toggle";
import { Container } from "@/components/ui/container";
import { navItems } from "@/config/site";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/socials";

/**
 * Server Component shell; only the interactive parts (scroll-spy nav, theme cord,
 * mobile menu) are Client Components.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6 font-mono text-[0.7rem] tracking-[0.2em] uppercase">
        <InkDotNav items={navItems} className="hidden md:block" />
        {/* Phones: [Get in touch] ........ [cord] [Menu]
            Desktop: [nav] ........ [cord] [Get in touch] */}
        <a
          href={`mailto:${profile.email}`}
          className="transition-colors duration-300 hover:text-accent md:order-2"
        >
          Get in touch ↗
        </a>
        <PullCordToggle className="ml-auto md:order-1" />
        <MobileMenu
          items={navItems}
          email={profile.email}
          socials={socialLinks}
          className="md:hidden"
        />
      </Container>
    </header>
  );
}
