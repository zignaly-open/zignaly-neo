const path = require("path");

const resolve = dir => path.resolve(__dirname, dir);

module.exports = async ({ config }) => {
  config.resolve = Object.assign(config.resolve, {
    alias: {
      "@components": resolve("../src/components"),
      "@assets": resolve("../src/assets"),
      "@hooks": resolve("../src/hooks"),
      "@utils": resolve("../src/utils"),
      "@types": resolve("../src/types"),
    },
  });
  return config;
};
