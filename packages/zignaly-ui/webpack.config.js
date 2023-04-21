const path = require("path");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "index.js",
    library: {
      type: "umd",
      name: "ufc",
    },
    globalObject: "this",
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        // build: true,
        mode: "write-dts",
        // tsconfig: __dirname + "/tsconfig.json",
        memoryLimit: 4096,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "package.json",
          to: "package.json",
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
        options: {
          // Ignore errors
          transpileOnly: true,
          configFile: __dirname + "/tsconfig.json",
          compilerOptions: {
            // declaration: true,
            // https://stackoverflow.com/a/61258647/1494428
            target: "ES2018",
          },
        },
      },
      {
        test: /\.svg$/i,
        type: "asset",
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] },
        use: [
          {
            loader: "@svgr/webpack",
            options: { exportType: "named" },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: "./tsconfig.json",
      }),
    ],
    alias: {
      "styled-components": path.resolve("./node_modules/styled-components"),
      assets: path.resolve("../src/assets"),
      components: path.resolve("../src/components"),
      theme: path.resolve("../src/theme"),
      utils: path.resolve("../src/utils"),
    },
  },
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: [
    "react",
    "react-dom",
    "styled-components",
    // making these bad boys shred actually INCREASES the build size because now less is tree-shaken in ps2 lol
    // "@mui/material", "@mui/system",
    "@emotion/react",
    "@emotion/styled",
  ],
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
    // Separate sourcemap file
    config.devtool = "source-map";
  } else {
    config.mode = "development";
    // Better sourcemap for dev
    config.devtool = "eval";
  }
  return config;
};
