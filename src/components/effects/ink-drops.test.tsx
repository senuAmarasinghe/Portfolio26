import { fireEvent, render, screen } from "@testing-library/react";

import { InkDrops } from "./ink-drops";

describe("InkDrops", () => {
  beforeEach(() => {
    // jsdom has no Web Animations API; a resolved `finished` promise is enough here.
    Element.prototype.animate = vi.fn(
      () => ({ finished: Promise.resolve() }) as unknown as Animation,
    );
  });

  function setup() {
    const { container } = render(
      <>
        <button type="button">Click me</button>
        <p>Plain text</p>
        <InkDrops />
      </>,
    );
    const layer = container.querySelector("[aria-hidden]") as HTMLElement;
    return { layer };
  }

  it("drops ink when a button is clicked", () => {
    const { layer } = setup();
    fireEvent.click(screen.getByRole("button"), { detail: 1, clientX: 40, clientY: 60 });

    const drop = layer.firstElementChild as HTMLElement;
    expect(drop).not.toBeNull();
    expect(drop.style.left).toBe("40px");
    expect(drop.style.top).toBe("60px");
  });

  it("ignores clicks on non-interactive content", () => {
    const { layer } = setup();
    fireEvent.click(screen.getByText("Plain text"), { detail: 1 });
    expect(layer.childElementCount).toBe(0);
  });

  it("ignores keyboard activation (no pointer position)", () => {
    const { layer } = setup();
    fireEvent.click(screen.getByRole("button"), { detail: 0 });
    expect(layer.childElementCount).toBe(0);
  });
});
