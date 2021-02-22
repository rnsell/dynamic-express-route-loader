const { pickFilesToLoad } = require("./pick-files-to-load");

const SUCCESS_PATH = "/users/foo/dynamic-express-route-loader/routes.js";
const FAIL_PATH = "/users/foo/dynamic-express-route-loader/a-route.ts";
const glob = "**/*routes*.js";

describe("pick-files-to-load", () => {
  it("Should return true for glob pattern", () => {
    expect(pickFilesToLoad(glob)(SUCCESS_PATH)).toBe(true);
  });

  it("Should return false for glob pattern", () => {
    expect(pickFilesToLoad(glob)(FAIL_PATH)).toBe(false);
  });
});
