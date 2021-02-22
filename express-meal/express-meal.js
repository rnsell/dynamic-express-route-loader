const {
  explodeDirectory,
  buildRouteMetaData,
  pickFilesToLoad,
  buildRoute,
} = require("./utils");

const { Router } = require("express");

const getRouter = (params) => {
  const { cwd, glob } = params;
  if (!cwd) {
    throw new Error("No current working directory.");
  }

  if (!glob) {
    throw new Error("No glob provided");
  }

  const allFilesInDirectory = explodeDirectory(cwd);
  const filesToLoad = allFilesInDirectory.filter(pickFilesToLoad(glob));
  const routeMetaData = filesToLoad.map(buildRouteMetaData(cwd));

  const baseRouter = Router();

  const combinedRoutes = routeMetaData.reduce(buildRoute(require), baseRouter);

  return combinedRoutes;
};

module.exports = {
  getRouter,
};
