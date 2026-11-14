import { render, screen } from "@testing-library/react";

import { navItems } from "@/config/site";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

import HomePage from "./page";

describe("HomePage", () => {
  it("renders the name as the only h1", () => {
    render(<HomePage />);
    const [heading, ...others] = screen.getAllByRole("heading", { level: 1 });
    expect(others).toHaveLength(0);
    expect(heading).toHaveTextContent(/Senuthi/);
    expect(heading).toHaveTextContent(/Amarasinghe/);
  });

  it("shows the tagline and portrait", () => {
    render(<HomePage />);
    expect(screen.getByText(profile.tagline)).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /portrait of senuthi amarasinghe/i }),
    ).toBeInTheDocument();
  });

  it("has a labelled section for every navigation link", () => {
    const { container } = render(<HomePage />);
    for (const item of navItems) {
      const id = item.href.replace("#", "");
      const section = container.querySelector(`section#${id}`);
      expect(section, `missing section for ${item.href}`).not.toBeNull();
      expect(section).toHaveAttribute("aria-labelledby", `${id}-title`);
    }
  });

  it("lists every project and experience entry", () => {
    render(<HomePage />);
    for (const project of projects) {
      expect(screen.getByRole("heading", { level: 3, name: project.title })).toBeInTheDocument();
    }
    for (const job of experience) {
      expect(screen.getByRole("heading", { level: 3, name: job.role })).toBeInTheDocument();
    }
  });

  it("has a page-curl link that turns to the About section", () => {
    render(<HomePage />);
    expect(screen.getByRole("link", { name: "Turn page" })).toHaveAttribute("href", "#about");
  });

  it("links to the email address", () => {
    render(<HomePage />);
    const emailLink = screen.getByRole("link", { name: profile.email });
    expect(emailLink).toHaveAttribute("href", `mailto:${profile.email}`);
  });
});
