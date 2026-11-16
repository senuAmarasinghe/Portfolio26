import { act, fireEvent, render, screen } from "@testing-library/react";

import { ThemeProvider } from "./theme-provider";
import { PullCordToggle } from "./pull-cord-toggle";

function setup() {
  render(
    <ThemeProvider>
      <PullCordToggle />
    </ThemeProvider>,
  );
  return screen.getByRole("button", { name: "Dark theme" });
}

const theme = () => document.documentElement.dataset.theme;

describe("PullCordToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("starts in the light theme", () => {
    const cord = setup();
    expect(theme()).toBe("light");
    expect(cord).toHaveAttribute("aria-pressed", "false");
  });

  it("switches to dark and back, and remembers the choice", async () => {
    const cord = setup();

    await act(async () => fireEvent.click(cord));
    expect(theme()).toBe("dark");
    expect(cord).toHaveAttribute("aria-pressed", "true");
    expect(localStorage.getItem("portfolio26-theme")).toBe("dark");

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
