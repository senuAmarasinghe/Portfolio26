import { render, screen } from "@testing-library/react";

import { siteConfig } from "@/config/site";

import HomePage from "./page";

describe("HomePage", () => {
  it("renders the main heading", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(siteConfig.name);
  });
});
