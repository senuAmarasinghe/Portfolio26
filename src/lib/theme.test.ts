import { act, renderHook } from "@testing-library/react";

import { useTheme } from "@/hooks/use-theme";

import { applyTheme, readTheme, THEME_STORAGE_KEY, themeInitScript } from "./theme";

const root = document.documentElement;
/** Run the inline <head> script exactly as the browser would. */
const runInitScript = () => new Function(themeInitScript)();

describe("theme init script", () => {
  beforeEach(() => {
    localStorage.clear();
    root.removeAttribute("data-theme");
  });

  it("defaults first-time visitors to light", () => {
    runInitScript();
    expect(root.dataset.theme).toBe("light");
    expect(root.style.colorScheme).toBe("light");
  });

  it("restores a saved dark theme before paint", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    runInitScript();
    expect(root.dataset.theme).toBe("dark");
  });

  it("ignores unexpected saved values", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "purple");
    runInitScript();
    expect(root.dataset.theme).toBe("light");
  });

  it("still sets a theme when storage is blocked", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    runInitScript();
    expect(root.dataset.theme).toBe("light");
    vi.restoreAllMocks();
  });
});

describe("applyTheme / readTheme", () => {
  it("applies and remembers a theme", () => {
    applyTheme("dark");
    expect(readTheme()).toBe("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    applyTheme("light");
    expect(readTheme()).toBe("light");
  });
});

describe("useTheme", () => {
  it("follows a theme change made in another tab", async () => {
    applyTheme("light");
    const { result } = renderHook(() => useTheme());
    expect(result.current).toBe("light");

    await act(async () => {
      window.dispatchEvent(
        new StorageEvent("storage", { key: THEME_STORAGE_KEY, newValue: "dark" }),
      );
    });
    expect(result.current).toBe("dark");
  });
});
