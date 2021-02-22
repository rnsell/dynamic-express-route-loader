const { explodeDirectory } = require("./explode-directory");

jest.mock("./directory-utils", () => ({
  isDirectory: jest.fn((path) => {
    if (
      path.includes("animals") &&
      !path.includes("chicken.js") &&
      !path.includes("cow.js")
    ) {
      return true;
    }

    return false;
  }),
  getFilesAndDirectories: jest.fn((path) => {
    const isAnimalFolder = path.includes("animals");
    if (isAnimalFolder) {
      return ["chicken.js", "cow.js"];
    }

    return ["robots.txt", "animals"];
  }),
  buildPath: jest.requireActual("./directory-utils").buildPath,
}));

// const { isDirectory, getFilesAndDirectories } = require("./directory-utils");

describe("explodeDirectory.js", () => {
  it("Should generate all files in a folder recursively", () => {
    const directoryFiles = explodeDirectory(
      "/User/code/dynamic-express-route-loader/modules"
    );
    const [robot, chicken, cow] = directoryFiles;

    expect(directoryFiles.length).toBe(3);
    expect(robot).toBe(
      "/User/code/dynamic-express-route-loader/modules/robots.txt"
    );
    expect(chicken).toBe(
      "/User/code/dynamic-express-route-loader/modules/animals/chicken.js"
    );
    expect(cow).toBe(
      "/User/code/dynamic-express-route-loader/modules/animals/cow.js"
    );
  });
});
