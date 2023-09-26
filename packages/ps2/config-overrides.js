// Overrides create-react-app webpack configs without ejecting
// https://github.com/timarney/react-app-rewired

const { useBabelRc, override } = require("customize-cra");
// module.exports = override(useBabelRc());

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: override(useBabelRc()),
  // The Jest config to use when running your jest tests - note that the normal rewires do not
  // work here.
  jest: function (config) {
    config.transformIgnorePatterns = [
      'node_modules/(?!lodash-es|react-markdown|react-image-webp)',
      '^.+\\.module\\.(css|sass|scss)$',
    ];
    return config;
  },
}