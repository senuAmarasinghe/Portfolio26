import Link from "next/link";

import { Container } from "@/components/ui/container";
import { navItems, siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="border-b border-foreground/10">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          {siteConfig.name}
        </Link>
        <nav aria-label="Main">
          <ul className="flex gap-6 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-foreground/70">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
