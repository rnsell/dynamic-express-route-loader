const {
  buildPath,
  isDirectory,
  getFilesAndDirectories,
} = require("./directory-utils");

jest.mock("fs", () => {
  return {
    readdirSync: jest.fn(() => ["robot/", "someTypescript.ts"]),
    statSync: jest.fn(() => ({ isDirectory: jest.fn(() => true) })),
  };
});

const { readdirSync, statSync } = require("fs");

describe("directory-utils", () => {
  describe("buildPath", () => {
    it("Should join paths", () => {
      expect(buildPath("/User/foo")("files.txt")).toBe("/User/foo/files.txt");
    });
  });

  describe("getFilesAndDirectories", () => {
    const filesAndDirectories = getFilesAndDirectories("/User/foo");
    const [diskObj1, diskObj2] = filesAndDirectories;

    expect(readdirSync).toHaveBeenCalled();
    expect(diskObj1).toBe("robot/");
    expect(diskObj2).toBe("someTypescript.ts");
  });

  describe("isDirectory", () => {
    const isDiskPathADirectory = isDirectory("/Users/foo/");

    expect(isDiskPathADirectory).toBe(true);
    expect(statSync).toHaveBeenCalled();
  });
});

module.exports = {};
