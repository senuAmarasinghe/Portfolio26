import { act, fireEvent, render, screen } from "@testing-library/react";

import { GLIDE_MS } from "@/lib/motion";

import { InkDotNav } from "./ink-dot-nav";

const items = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

describe("InkDotNav", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // jsdom has no ResizeObserver.
    vi.stubGlobal(
      "ResizeObserver",
      class {
        observe() {}
        disconnect() {}
      },
    );
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("highlights a clicked link straight away, then hands back to scroll-spy", () => {
    render(<InkDotNav items={items} />);
    const contact = screen.getByRole("link", { name: /contact/i });

    fireEvent.click(contact);
    expect(contact).toHaveClass("text-foreground");
    expect(screen.getByRole("link", { name: /work/i })).not.toHaveClass("text-foreground");

    // After the glide, scroll-spy decides again (no sections exist in this test → none active).
    act(() => vi.advanceTimersByTime(GLIDE_MS + 200));
    expect(contact).not.toHaveClass("text-foreground");
  });

  it("moves the dot with the same duration as the smooth scroll", () => {
    const { container } = render(<InkDotNav items={items} />);
    const dot = container.querySelector("span[aria-hidden]") as HTMLElement;
    expect(dot.style.transitionDuration).toBe(`${GLIDE_MS}ms`);
  });
});
