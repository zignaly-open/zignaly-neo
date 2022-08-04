module.exports = {
  presets: [
    ["@babel/preset-env", {targets: {node: "current"}}],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    "@babel/plugin-syntax-jsx",
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true,
      },
    ],
    [
      require.resolve('babel-plugin-named-asset-import'),
      {
        loaderMap: {
          svg: {
            ReactComponent:
              '@svgr/webpack?-svgo,+titleProp,+ref![path]',
          },
        },
      },
    ],
  ],
};
