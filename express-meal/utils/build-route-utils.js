const buildRouteMetaData = (cwd) => (filePath) => {
  const [, apiPathWithFileName] = filePath.split(cwd);
  const [fileName, ...reverseApiPaths] = apiPathWithFileName
    .split("/")
    .reverse();

  const apiPath = reverseApiPaths.reverse().join("/");

  return {
    apiPath,
    fileName,
    filePath,
  };
};

// Require is passed in for easy mock
const buildRoute = (requireDep) => (router, routeMetaData) => {
  const { apiPath, filePath } = routeMetaData;
  const fileRouter = requireDep(filePath);

  router.use(apiPath, fileRouter);

  return router;
};

module.exports = {
  buildRouteMetaData,
  buildRoute,
};
