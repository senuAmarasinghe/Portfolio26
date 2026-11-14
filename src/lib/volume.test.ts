import { formatVolume } from "./volume";

describe("formatVolume", () => {
  it("uses the last two digits of the year", () => {
    expect(formatVolume(new Date("2026-06-01T12:00:00Z"))).toBe("26");
    expect(formatVolume(new Date("2027-06-01T12:00:00Z"))).toBe("27");
  });

  it("rolls over at midnight in Colombo, not UTC", () => {
    // 31 Dec 2026 20:00 UTC is already 1 Jan 2027 01:30 in Colombo (UTC+5:30).
    expect(formatVolume(new Date("2026-12-31T20:00:00Z"))).toBe("27");
  });
});
