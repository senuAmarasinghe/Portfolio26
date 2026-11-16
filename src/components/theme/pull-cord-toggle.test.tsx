import { act, fireEvent, render, screen } from "@testing-library/react";

import { THEME_STORAGE_KEY } from "@/lib/theme";

import { PullCordToggle } from "./pull-cord-toggle";

function setup() {
  render(<PullCordToggle />);
  return screen.getByRole("button", { name: "Dark theme" });
}

const theme = () => document.documentElement.dataset.theme;

describe("PullCordToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    // What the init script does on page load for a first-time visitor.
    document.documentElement.dataset.theme = "light";
  });

  it("starts in the light theme", () => {
    const cord = setup();
    expect(cord).toHaveAttribute("aria-pressed", "false");
  });

  it("switches to dark and back, and remembers the choice", async () => {
    const cord = setup();

    await act(async () => fireEvent.click(cord));
    expect(theme()).toBe("dark");
    expect(cord).toHaveAttribute("aria-pressed", "true");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");

    await act(async () => fireEvent.click(cord));
    expect(theme()).toBe("light");
    expect(cord).toHaveAttribute("aria-pressed", "false");
  });

  it("works from the keyboard (a real button)", async () => {
    const cord = setup();
    cord.focus();
    expect(cord).toHaveFocus();
    // Enter on a <button> fires click with detail 0.
    await act(async () => fireEvent.click(cord, { detail: 0 }));
    expect(theme()).toBe("dark");
  });
});
