const { buildRouteMetaData, buildRoute } = require("./build-route-utils");

const requireMock = jest.fn(() => ({ router: () => void 0 }));
const route = {
  use: jest.fn(() => void 0),
};

describe("build-route-utils.js", () => {
  it("buildRouteMetaData should generate route meta data object", () => {
    const cwd = "/User/foo";
    const filePath = "/User/foo/animal/cow/routes.js";

    const metaData = buildRouteMetaData(cwd)(filePath);

    const { apiPath, fileName, filePath: filePathMetaData } = metaData;

    expect(apiPath).toBe("/animal/cow");
    expect(fileName).toBe("routes.js");
    expect(filePathMetaData).toBe(filePath);
  });

  it("buildRoute should invoke require and build route", () => {
    const apiMetaData = {
      apiPath: "/animal/cow",
      filePath: "/User/foo/router.js",
    };

    buildRoute(requireMock)(route, apiMetaData);

    expect(requireMock).toHaveBeenCalled();
    const [requireFilePath] = requireMock.mock.calls[0];
    expect(requireFilePath).toBe(apiMetaData.filePath);

    expect(route.use).toHaveBeenCalled();
    const [routeUsePath] = route.use.mock.calls[0];
    expect(routeUsePath).toBe(apiMetaData.apiPath);
  });
});
