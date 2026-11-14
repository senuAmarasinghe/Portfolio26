import Link from "next/link";

import { Container } from "@/components/ui/container";
import { navItems } from "@/config/site";
import { profile } from "@/data/profile";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between font-mono text-[0.7rem] tracking-[0.2em] uppercase">
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex gap-8">
            {navItems.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted transition-colors duration-300 hover:text-foreground"
                >
                  <span className="text-accent">{String(i + 1).padStart(2, "0")}</span> {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={`mailto:${profile.email}`}
          className="ml-auto transition-colors duration-300 hover:text-accent"
        >
          Get in touch ↗
        </a>
      </Container>
    </header>
  );
}
