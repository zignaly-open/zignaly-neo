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
    // new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        // build: true,
        mode: "write-dts",
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
          // compilerOptions: {
          //   declaration: true,
          // },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
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
    },
  },
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: ["react", "react-dom", "styled-components", /@mui\/.*/],
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
    config.devtool = "source-map";
  } else {
    config.mode = "development";
    config.devtool = "eval";
  }
  return config;
};
