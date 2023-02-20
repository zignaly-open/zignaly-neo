module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current", modules: false } }],
    "@babel/preset-typescript",
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
  ],
  plugins: [
    "@babel/plugin-syntax-jsx",
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true,
        useESModules: true,
      },
    ],
  ],
};
