const path = require("path");
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = async ({ config }) => {
  config.resolve = Object.assign(config.resolve, {
    alias: {
      assets: resolve("../src/assets"),
      components: resolve("../src/components"),
      hooks: resolve("../src/hooks"),
      utils: resolve("../src/utils"),
    },
  });
  return config;
};
