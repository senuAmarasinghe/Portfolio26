import type { Project } from "@/types";

/**
 * Pure helpers for turning GitHub repositories into portfolio projects.
 * No network access here, so everything is easy to unit-test; fetching lives
 * in github.server.ts.
 */

/** The fields we use from GitHub's "list repositories for a user" API. */
export interface GitHubRepo {
  name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  topics?: string[];
  language: string | null;
  fork: boolean;
  archived: boolean;
  private: boolean;
  created_at: string;
  pushed_at: string;
}

/** Add this topic to a repo to show it on the portfolio. */
export const PORTFOLIO_TOPIC = "portfolio";
/** Add this one as well to show it among the featured projects at the top. */
export const FEATURED_TOPIC = "portfolio-featured";

const CONTROL_TOPICS = new Set([PORTFOLIO_TOPIC, FEATURED_TOPIC]);

/** Nicer labels for common topics; anything else is title-cased. */
const TOPIC_LABELS: Record<string, string> = {
  nextjs: "Next.js",
  react: "React",
  reactjs: "React",
  "react-native": "React Native",
  typescript: "TypeScript",
  javascript: "JavaScript",
  tailwindcss: "Tailwind CSS",
  nodejs: "Node.js",
  expressjs: "Express",
  express: "Express",
  mongodb: "MongoDB",
  mysql: "MySQL",
  postgresql: "PostgreSQL",
  firebase: "Firebase",
  "spring-boot": "Spring Boot",
  springboot: "Spring Boot",
  java: "Java",
  kotlin: "Kotlin",
  android: "Android",
  expo: "Expo",
  jwt: "JWT",
  azure: "Azure",
  figma: "Figma",
  html: "HTML",
  css: "CSS",
  php: "PHP",
  mern: "MERN",
  "rest-api": "REST API",
  graphql: "GraphQL",
  vercel: "Vercel",
};

/** "smart-clinic_app" → "Smart Clinic App". Existing capitals are kept. */
export function humanizeRepoName(name: string): string {
  return name
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** "nextjs" → "Next.js", "machine-learning" → "Machine Learning". */
export function formatTopic(topic: string): string {
  return TOPIC_LABELS[topic] ?? humanizeRepoName(topic);
}

/** "2025" for one year, "2024 — 2025" for a range (UTC years of creation and last push). */
export function formatPeriod(createdAt: string, pushedAt: string): string {
  const start = new Date(createdAt).getUTCFullYear();
  const end = new Date(pushedAt).getUTCFullYear();
  return start === end ? String(start) : `${start} — ${end}`;
}

/** GitHub's "Website" field may be empty or missing a protocol. */
export function normalizeHomepage(homepage: string | null): string | undefined {
  const value = homepage?.trim();
  if (!value) return undefined;
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

/** Public, non-fork repos tagged `portfolio`, most recently updated first. */
export function selectPortfolioRepos(repos: GitHubRepo[]): GitHubRepo[] {
  return repos
    .filter((repo) => !repo.fork && !repo.private && repo.topics?.includes(PORTFOLIO_TOPIC))
    .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at));
}

export function repoToProject(repo: GitHubRepo): Project {
  const topics = repo.topics ?? [];
  const live = normalizeHomepage(repo.homepage);

  return {
    slug: `github-${repo.name.toLowerCase()}`,
    title: humanizeRepoName(repo.name),
    category: repo.language ? `${repo.language} project` : "Open-source project",
    period: formatPeriod(repo.created_at, repo.pushed_at),
    status: repo.archived ? "Completed" : live ? "Live" : "Open source",
    summary: repo.description?.trim() || "Source code and details on GitHub.",
    stack: topics.filter((topic) => !CONTROL_TOPICS.has(topic)).map(formatTopic),
    links: { repo: repo.html_url, live },
    featured: topics.includes(FEATURED_TOPIC),
  };
}

const normalizeUrl = (url: string) => url.trim().replace(/\/+$/, "").toLowerCase();

/**
 * Hand-written projects plus GitHub ones. A hand-written project whose `links.repo`
 * points at the same repository wins (it usually has richer copy). Featured
 * projects come first; otherwise curated order, then GitHub by last update.
 */
export function mergeProjects(curated: Project[], fromGitHub: Project[]): Project[] {
  const curatedRepos = new Set(
    curated.flatMap((project) => (project.links.repo ? [normalizeUrl(project.links.repo)] : [])),
  );
  const extra = fromGitHub.filter(
    (project) => !project.links.repo || !curatedRepos.has(normalizeUrl(project.links.repo)),
  );

  // Array.prototype.sort is stable, so the original order holds within each group.
  return [...curated, ...extra].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
}
