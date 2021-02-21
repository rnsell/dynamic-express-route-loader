const fs = require("fs");
const { partition, flatMap } = require("lodash");
const path = require("path");
const mm = require("micromatch");

const buildPath = (cwd) => (fileOrDirectory) => {
  return path.join(cwd, fileOrDirectory);
};

const isDirectory = (path) => {
  return fs.statSync(path).isDirectory();
};

const explodeDirectory = (cwd) => {
  const filesAndDirectories = fs.readdirSync(cwd);
  const resolvedFilesAndDirectories = filesAndDirectories.map(buildPath(cwd));
  const [directories, files] = partition(
    resolvedFilesAndDirectories,
    isDirectory
  );
  const subdirectoryFiles = flatMap(directories, explodeDirectory);

  return [...files, ...subdirectoryFiles];
};

const buildRouteMetaData = (cwd) => (filePath) => {
  const [, apiPathWithFileName] = filePath.split(cwd);
  const [fileName, ...reverseApiPaths] = apiPathWithFileName
    .split("/")
    .reverse();
  const apiPath = reverseApiPaths.reverse().join("/");

  return {
    apiPath,
    filePath,
  };
};

const pickFilesToLoad = (glob) => (file) => {
  return mm.contains(file, glob);
};

const buildRoute = (require) => (router, routeMetaData) => {
  const { apiPath, filePath } = routeMetaData;
  const fileRouter = require(filePath);

  router.use(apiPath, fileRouter);

  return router;
};

module.exports = {
  buildPath,
  isDirectory,
  explodeDirectory,
  buildRouteMetaData,
  pickFilesToLoad,
  buildRoute,
};
