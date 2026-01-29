import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import * as extendedMatchers from "jest-extended";
expect.extend(extendedMatchers);

global.matchMedia = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn()
});

global.structuredClone = (val: unknown) => JSON.parse(JSON.stringify(val));

class ResizeObserverMock {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

global.ResizeObserver = ResizeObserverMock as typeof ResizeObserver;

Element.prototype.scrollTo = jest.fn();

afterEach(() => {
  cleanup();
});
