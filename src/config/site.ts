import { profile } from "@/data/profile";
import type { NavItem } from "@/types";

export const siteConfig = {
  name: profile.name,
  title: `${profile.name} - ${profile.role}`,
  description: profile.tagline,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_US",
  /** Public repos tagged with the `portfolio` topic appear in the Work section. */
  githubUsername: "senuAmarasinghe",
} as const;

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
