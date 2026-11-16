export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  email?: string;
  /** One-line intro shown in the hero. */
  tagline: string;
  /** Longer About text — one string per paragraph. */
  about: string[];
  currentlyLearning: string[];
  languages: string[];
  stats: { label: string; value: string }[];
}

export interface Education {
  institution: string;
  qualification: string;
  location?: string;
  /** Free-form period, e.g. "2023 — Present". */
  period: string;
  highlights?: string[];
}

export interface Experience {
  company: string;
  role: string;
  employmentType: "Internship" | "Full-time" | "Part-time" | "Freelance" | "Contract" | "Volunteer";
  period: string;
  location?: string;
  summary: string;
  achievements: string[];
  stack: string[];
}

export type ProjectStatus =
  "Live" | "Production" | "Completed" | "In progress" | "Academic" | "Open source";

export interface Project {
  slug: string;
  title: string;
  category: string;
  period: string;
  status: ProjectStatus;
  summary: string;
  stack: string[];
  links: { repo?: string; live?: string };
  featured?: boolean;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}
