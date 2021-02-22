const mm = require("micromatch");

const pickFilesToLoad = (glob) => (file) => {
  return mm.contains(file, glob);
};

module.exports = {
  pickFilesToLoad,
};
