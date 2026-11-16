import { originFromEvent, withInkSpread } from "./theme-transition";

describe("withInkSpread", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    // @ts-expect-error -- remove the test stub again
    delete document.startViewTransition;
  });

  it("switches instantly when View Transitions aren't supported", () => {
    const apply = vi.fn();
    withInkSpread(apply, { x: 10, y: 10 });
    expect(apply).toHaveBeenCalledTimes(1);
  });

  it("uses a View Transition when supported", () => {
    const apply = vi.fn();
    const start = vi.fn((callback: () => void) => {
      callback();
      return { ready: new Promise(() => {}) };
    });
    Object.assign(document, { startViewTransition: start });

    withInkSpread(apply, { x: 10, y: 10 });
    expect(start).toHaveBeenCalledTimes(1);
    expect(apply).toHaveBeenCalledTimes(1);
  });

  it("switches instantly for visitors who prefer reduced motion", () => {
    const start = vi.fn();
    Object.assign(document, { startViewTransition: start });
    vi.spyOn(window, "matchMedia").mockReturnValue({ matches: true } as MediaQueryList);

    const apply = vi.fn();
    withInkSpread(apply);
    expect(start).not.toHaveBeenCalled();
    expect(apply).toHaveBeenCalledTimes(1);
  });
});

describe("originFromEvent", () => {
  const element = {
    getBoundingClientRect: () => ({ left: 100, top: 20, width: 40, height: 10 }) as DOMRect,
  } as Element;

  it("uses the pointer position for mouse clicks", () => {
    expect(originFromEvent({ clientX: 5, clientY: 7, detail: 1, currentTarget: element })).toEqual({
      x: 5,
      y: 7,
    });
  });

  it("uses the element's centre for keyboard activation", () => {
    expect(originFromEvent({ clientX: 0, clientY: 0, detail: 0, currentTarget: element })).toEqual({
      x: 120,
      y: 25,
    });
  });
});
