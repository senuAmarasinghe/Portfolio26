import { fireEvent, render, screen } from "@testing-library/react";

import { setLenis } from "@/lib/smooth-scroll";

import { MobileMenu } from "./mobile-menu";

const items = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
];

function setup() {
  render(<MobileMenu items={items} email="hello@example.com" />);
  const toggle = screen.getByRole("button", { name: /menu/i });
  // The dialog is in the DOM even while closed (for the reveal animation); hidden = inert.
  const dialog = screen.getByRole("dialog", { hidden: true });
  return { toggle, dialog };
}

describe("MobileMenu", () => {
  it("starts closed and inert", () => {
    const { toggle, dialog } = setup();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(dialog).toHaveAttribute("inert");
  });

  it("opens, moves focus to the first link, and locks page scroll", () => {
    const { toggle, dialog } = setup();
    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(dialog).not.toHaveAttribute("inert");
    expect(screen.getByRole("link", { name: /about/i })).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("closes with Escape and returns focus to the toggle", () => {
    const { toggle, dialog } = setup();
    fireEvent.click(toggle);
    fireEvent.keyDown(document, { key: "Escape" });

    expect(dialog).toHaveAttribute("inert");
    expect(toggle).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
  });

  it("closes when a link is chosen", () => {
    const { toggle, dialog } = setup();
    fireEvent.click(toggle);
    fireEvent.click(screen.getByRole("link", { name: /work/i }));
    expect(dialog).toHaveAttribute("inert");
  });

  it("pauses smooth scrolling while open and resumes it on close", () => {
    const lenis = { stop: vi.fn(), start: vi.fn() };
    setLenis(lenis as unknown as Parameters<typeof setLenis>[0]);
    try {
      const { toggle } = setup();
      fireEvent.click(toggle);
      expect(lenis.stop).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(document, { key: "Escape" });
      expect(lenis.start).toHaveBeenCalled();
    } finally {
      setLenis(null);
    }
  });
});
