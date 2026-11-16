import type { Project } from "@/types";

import {
  formatPeriod,
  formatTopic,
  type GitHubRepo,
  humanizeRepoName,
  mergeProjects,
  normalizeHomepage,
  repoToProject,
  selectPortfolioRepos,
} from "./github";

function repo(overrides: Partial<GitHubRepo> = {}): GitHubRepo {
  return {
    name: "smart-clinic",
    html_url: "https://github.com/senuAmarasinghe/smart-clinic",
    description: "Book appointments and follow the queue live.",
    homepage: null,
    topics: ["portfolio", "react", "nodejs"],
    language: "TypeScript",
    fork: false,
    archived: false,
    private: false,
    created_at: "2025-08-01T00:00:00Z",
    pushed_at: "2025-10-20T00:00:00Z",
    ...overrides,
  };
}

function project(overrides: Partial<Project> = {}): Project {
  return {
    slug: "p",
    title: "P",
    category: "Web",
    period: "2025",
    status: "Completed",
    summary: "",
    stack: [],
    links: {},
    ...overrides,
  };
}

describe("formatting helpers", () => {
  it("humanizes repo names", () => {
    expect(humanizeRepoName("smart-clinic_app")).toBe("Smart Clinic App");
    expect(humanizeRepoName("Portfolio26")).toBe("Portfolio26");
  });

  it("labels known topics nicely and title-cases the rest", () => {
    expect(formatTopic("nextjs")).toBe("Next.js");
    expect(formatTopic("machine-learning")).toBe("Machine Learning");
  });

  it("shows one year or a range", () => {
    expect(formatPeriod("2025-01-01T00:00:00Z", "2025-12-01T00:00:00Z")).toBe("2025");
    expect(formatPeriod("2024-03-01T00:00:00Z", "2025-02-01T00:00:00Z")).toBe("2024 — 2025");
  });

  it("normalizes the Website field", () => {
    expect(normalizeHomepage(null)).toBeUndefined();
    expect(normalizeHomepage("  ")).toBeUndefined();
    expect(normalizeHomepage("clinic.vercel.app")).toBe("https://clinic.vercel.app");
    expect(normalizeHomepage("http://a.dev")).toBe("http://a.dev");
  });
});

describe("selectPortfolioRepos", () => {
  it("keeps only own public repos tagged `portfolio`, newest push first", () => {
    const older = repo({ name: "older", pushed_at: "2024-01-01T00:00:00Z" });
    const newer = repo({ name: "newer", pushed_at: "2025-01-01T00:00:00Z" });
    const untagged = repo({ name: "untagged", topics: ["react"] });
    const fork = repo({ name: "fork", fork: true });
    const noTopics = repo({ name: "no-topics", topics: undefined });

    expect(
      selectPortfolioRepos([older, untagged, fork, newer, noTopics]).map((r) => r.name),
    ).toEqual(["newer", "older"]);
  });
});

describe("repoToProject", () => {
  it("maps repo details to a project card", () => {
    expect(repoToProject(repo())).toEqual({
      slug: "github-smart-clinic",
      title: "Smart Clinic",
      category: "TypeScript project",
      period: "2025",
      status: "Open source",
      summary: "Book appointments and follow the queue live.",
      stack: ["React", "Node.js"],
      links: { repo: "https://github.com/senuAmarasinghe/smart-clinic", live: undefined },
      featured: false,
    });
  });

  it("marks live, archived and featured repos", () => {
    expect(repoToProject(repo({ homepage: "clinic.dev" })).status).toBe("Live");
    expect(repoToProject(repo({ homepage: "clinic.dev" })).links.live).toBe("https://clinic.dev");
    expect(repoToProject(repo({ archived: true })).status).toBe("Completed");

    const featured = repoToProject(repo({ topics: ["portfolio", "portfolio-featured", "react"] }));
    expect(featured.featured).toBe(true);
    expect(featured.stack).toEqual(["React"]); // control topics are hidden
  });

  it("falls back gracefully when the description or language is missing", () => {
    const bare = repoToProject(repo({ description: null, language: null }));
    expect(bare.summary).toBe("Source code and details on GitHub.");
    expect(bare.category).toBe("Open-source project");
  });
});

describe("mergeProjects", () => {
  it("puts featured first, keeps curated order, then GitHub projects", () => {
    const merged = mergeProjects(
      [project({ slug: "a" }), project({ slug: "b", featured: true })],
      [project({ slug: "gh-1" }), project({ slug: "gh-2", featured: true })],
    );
    expect(merged.map((p) => p.slug)).toEqual(["b", "gh-2", "a", "gh-1"]);
  });

  it("lets a hand-written project replace the same repo from GitHub", () => {
    const merged = mergeProjects(
      [project({ slug: "curated", links: { repo: "https://github.com/me/Clinic/" } })],
      [project({ slug: "gh", links: { repo: "https://github.com/me/clinic" } })],
    );
    expect(merged.map((p) => p.slug)).toEqual(["curated"]);
  });
});
