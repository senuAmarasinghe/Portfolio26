import { render, screen } from "@testing-library/react";

import { profile } from "@/data/profile";

import HomePage from "./page";

describe("HomePage", () => {
  it("renders the name as the main heading", () => {
    render(<HomePage />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/Senuthi/);
    expect(heading).toHaveTextContent(/Amarasinghe/);
  });

  it("shows the tagline", () => {
    render(<HomePage />);
    expect(screen.getByText(profile.tagline)).toBeInTheDocument();
  });

  it("shows the portrait with descriptive alt text", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("img", { name: /portrait of senuthi amarasinghe/i }),
    ).toBeInTheDocument();
  });
});
