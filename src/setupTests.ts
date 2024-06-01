import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import * as extendedMatchers from "jest-extended";
expect.extend(extendedMatchers);

afterEach(() => {
  cleanup();
});
