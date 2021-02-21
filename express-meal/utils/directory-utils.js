const { statSync, readdirSync } = require("fs");
const path = require("path");

const buildPath = (cwd) => (fileOrDirectory) => {
  return path.join(cwd, fileOrDirectory);
};

const isDirectory = (path) => {
  return statSync(path).isDirectory();
};

const getFilesAndDirectories = (cwd) => {
  return readdirSync(cwd);
};

module.exports = {
  buildPath,
  isDirectory,
  getFilesAndDirectories,
};
