const { getRouter } = require("./express-meal");

jest.mock("./utils", () => ({
  explodeDirectory: jest.fn(() => [
    "/User/code/dynamic-express-route-loader/modules/compliance/routes.js",
  ]),
  pickFilesToLoad: jest.fn(() => () => true),
  buildRouteMetaData: jest.fn(() => () => ({
    apiPath: "/compliance",
    fileName: "routes.js",
    filePath:
      "/User/code/dynamic-express-route-loader/modules/compliance/routes.js",
  })),
  buildRoute: jest.fn(() => (router, value) => {
    const { apiPath, filePath } = value;
    router.use(apiPath, filePath);

    return router;
  }),
}));

jest.mock("express", () => ({
  Router: jest.fn(() => ({
    use: jest.fn(() => void 0),
  })),
}));

const {
  explodeDirectory,
  buildRouteMetaData,
  pickFilesToLoad,
  buildRoute,
} = require("./utils");

const { Router } = require("express");

describe("express-meal.js", () => {
  it("Should throw error if no current working directory is provided", () => {
    expect(() => getRouter({ cwd: "", glob: "" })).toThrow(
      "No current working directory."
    );
  });

  it("Should throw error if no glob is provided", () => {
    expect(() =>
      getRouter({ cwd: "/User/code/dynamic-express-route-loader/", glob: "" })
    ).toThrow("No glob provided");
  });

  it("Should similuate the process of generating a router", () => {
    const params = {
      cwd: "/User/code/dynamic-express-route-loader/modules/",
      glob: "**/*routes*.js",
    };
    const fakeRoute = getRouter(params);

    expect(explodeDirectory).toHaveBeenCalled();
    const [directoryParam] = explodeDirectory.mock.calls[0];
    expect(directoryParam).toBe(params.cwd);

    expect(pickFilesToLoad).toHaveBeenCalled();
    const [globParam] = pickFilesToLoad.mock.calls[0];
    expect(globParam).toBe(params.glob);

    expect(buildRouteMetaData).toHaveBeenCalled();
    expect(buildRoute).toHaveBeenCalled();
    expect(Router).toHaveBeenCalled();
  });
});
