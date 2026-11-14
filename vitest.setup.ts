/// <reference types="vitest/globals" />
import "@testing-library/jest-dom/vitest";

import { createElement, type ImgHTMLAttributes } from "react";

// jsdom has no matchMedia. Default: no media query matches (like a touch device with
// no motion preference); individual tests can override window.matchMedia.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Vitest imports images as plain URL strings, while next/image expects Next's
// static-import object. In tests we render a plain <img> instead.
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    priority: _priority,
    placeholder: _placeholder,
    ...rest
  }: ImgHTMLAttributes<HTMLImageElement> & {
    src: string | { src: string };
    priority?: boolean;
    placeholder?: string;
  }) => createElement("img", { src: typeof src === "string" ? src : src.src, alt, ...rest }),
}));
