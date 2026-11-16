import { projects } from "./projects";

describe("curated projects data", () => {
  it("has unique slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("links each repo to a specific GitHub repository, not just the profile", () => {
    for (const { slug, links } of projects) {
      if (!links.repo) continue;
      expect(links.repo, slug).toMatch(/^https:\/\/github\.com\/[^/]+\/[^/]+$/);
    }
  });

  it("never points two projects at the same repository", () => {
    const repos = projects.flatMap((p) => (p.links.repo ? [p.links.repo.toLowerCase()] : []));
    expect(new Set(repos).size).toBe(repos.length);
  });
});
