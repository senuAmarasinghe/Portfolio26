import { act, fireEvent, render } from "@testing-library/react";

import { SCROLL_INK_DELAY, ScrollInk } from "./scroll-ink";

describe("ScrollInk", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  const isScrolling = () => document.documentElement.hasAttribute("data-scrolling");

  it("marks the page as scrolling, then clears it after a pause", () => {
    render(<ScrollInk />);
    expect(isScrolling()).toBe(false);

    fireEvent.scroll(window);
    expect(isScrolling()).toBe(true);

    act(() => vi.advanceTimersByTime(SCROLL_INK_DELAY));
    expect(isScrolling()).toBe(false);
  });

  it("stays marked while scrolling continues", () => {
    render(<ScrollInk />);
    fireEvent.scroll(window);
    act(() => vi.advanceTimersByTime(SCROLL_INK_DELAY - 100));
    fireEvent.scroll(window);
    act(() => vi.advanceTimersByTime(SCROLL_INK_DELAY - 100));
    expect(isScrolling()).toBe(true);
  });

  it("cleans up when unmounted", () => {
    const { unmount } = render(<ScrollInk />);
    fireEvent.scroll(window);
    unmount();
    expect(isScrolling()).toBe(false);
  });
});
