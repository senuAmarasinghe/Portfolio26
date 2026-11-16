import "server-only";

import { cacheLife } from "next/cache";

import { siteConfig } from "@/config/site";
import { projects as curatedProjects } from "@/data/projects";
import { type GitHubRepo, mergeProjects, repoToProject, selectPortfolioRepos } from "@/lib/github";
import type { Project } from "@/types";

/**
 * Fetches the owner's public repos tagged `portfolio`. Runs on the server only
 * ("server-only" makes the build fail if this is ever imported into browser code,
 * so GITHUB_TOKEN can't leak).
 *
 * Cached: fresh results for an hour; if GitHub is unreachable the site shows the
 * hand-written projects and tries again within minutes, instead of breaking.
 */
export async function getPortfolioRepos(): Promise<GitHubRepo[]> {
  "use cache";

  const token = process.env.GITHUB_TOKEN;
  const url = `https://api.github.com/users/${siteConfig.githubUsername}/repos?type=owner&sort=pushed&per_page=100`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "portfolio26-site",
        // Optional: without a token GitHub allows 60 requests/hour, with one 5,000.
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      // Never let a slow API hold up a build or a page regeneration.
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`GitHub API responded ${response.status}`);

    const data: unknown = await response.json();
    if (!Array.isArray(data)) throw new Error("Unexpected GitHub API response");

    cacheLife("hours");
    return selectPortfolioRepos(data as GitHubRepo[]);
  } catch (error) {
    console.error("[github] Could not load portfolio repos:", error);
    cacheLife("minutes");
    return [];
  }
}

/** Everything the Work section shows: hand-written projects plus tagged GitHub repos. */
export async function getProjects(): Promise<Project[]> {
  const repos = await getPortfolioRepos();
  return mergeProjects(curatedProjects, repos.map(repoToProject));
}
