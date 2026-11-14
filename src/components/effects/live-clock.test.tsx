import { act, render, screen } from "@testing-library/react";

import { LiveClock } from "./live-clock";

describe("LiveClock", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // 00:00 UTC is 05:30 in Colombo (UTC+5:30).
    vi.setSystemTime(new Date("2026-11-15T00:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows the current time in Colombo", () => {
    render(<LiveClock />);
    expect(screen.getByLabelText("Local time in Colombo: 05:30")).toHaveTextContent(/^05:30$/);
  });

  it("updates as time passes", () => {
    render(<LiveClock prefix="Colombo" />);
    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    expect(screen.getByLabelText("Local time in Colombo: 05:31")).toHaveTextContent(
      "Colombo 05:31",
    );
  });
});
