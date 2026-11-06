import type { NavItem, SocialLink } from "@/types";

export const siteConfig = {
  name: "Senuthi Amarasinghe",
  title: "Senuthi Amarasinghe | Portfolio",
  description: "Personal portfolio of Senuthi Amarasinghe — projects, experience and contact.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_US",
} as const;

export const navItems: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

export const socialLinks: SocialLink[] = [
  // { label: "GitHub", href: "https://github.com/<username>" },
  // { label: "LinkedIn", href: "https://www.linkedin.com/in/<username>" },
];
