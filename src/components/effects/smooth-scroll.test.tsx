import { render } from "@testing-library/react";

import { getLenis } from "@/lib/smooth-scroll";

import { SmoothScroll } from "./smooth-scroll";

// A stand-in for Lenis that records how it was created and destroyed.
const created: { options: unknown; destroyed: boolean }[] = [];
vi.mock("lenis", () => ({
  default: class FakeLenis {
    record: { options: unknown; destroyed: boolean };
    constructor(options: unknown) {
      this.record = { options, destroyed: false };
      created.push(this.record);
    }
    destroy() {
      this.record.destroyed = true;
    }
  },
}));

/** Make specific media queries match, e.g. "(pointer: fine)". */
function mockMedia(matching: string[]) {
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query: string) =>
      ({
        matches: matching.includes(query),
        media: query,
        addEventListener: () => {},
        removeEventListener: () => {},
      }) as unknown as MediaQueryList,
  );
}

describe("SmoothScroll", () => {
  beforeEach(() => {
    created.length = 0;
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("starts Lenis for mouse users and cleans up on unmount", () => {
    mockMedia(["(pointer: fine)"]);
    const { unmount } = render(<SmoothScroll />);

    expect(created).toHaveLength(1);
    expect(getLenis()).not.toBeNull();

    unmount();
    expect(created[0]?.destroyed).toBe(true);
    expect(getLenis()).toBeNull();
  });

  it("stays native on touch devices", () => {
    mockMedia([]);
    render(<SmoothScroll />);
    expect(created).toHaveLength(0);
  });

  it("stays native when the visitor prefers reduced motion", () => {
    mockMedia(["(pointer: fine)", "(prefers-reduced-motion: reduce)"]);
    render(<SmoothScroll />);
    expect(created).toHaveLength(0);
  });
});
