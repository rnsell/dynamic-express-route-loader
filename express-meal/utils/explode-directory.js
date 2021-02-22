const { partition, flatMap } = require("lodash");
const {
  buildPath,
  isDirectory,
  getFilesAndDirectories,
} = require("./directory-utils");

const explodeDirectory = (cwd) => {
  const filesAndDirectories = getFilesAndDirectories(cwd);
  const resolvedFilesAndDirectories = filesAndDirectories.map(buildPath(cwd));
  const [directories, files] = partition(
    resolvedFilesAndDirectories,
    isDirectory
  );

  const subdirectoryFiles = flatMap(directories, explodeDirectory);

  return [...files, ...subdirectoryFiles];
};

module.exports = {
  explodeDirectory,
};
