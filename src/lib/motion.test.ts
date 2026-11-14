import { easeOutExpo } from "./motion";

describe("easeOutExpo", () => {
  it("starts at 0 and ends exactly at 1", () => {
    expect(easeOutExpo(0)).toBeCloseTo(0, 5);
    expect(easeOutExpo(1)).toBe(1);
  });

  it("front-loads the motion (most of the distance early, soft settle)", () => {
    expect(easeOutExpo(0.3)).toBeGreaterThan(0.85);
  });
});
