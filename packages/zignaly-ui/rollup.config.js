import commonjs from "@rollup/plugin-commonjs";
import svg from "rollup-plugin-svg";
// import url from "rollup-plugin-url";
import { babel } from "@rollup/plugin-babel";
import svgr from "@svgr/rollup";
import url from "@rollup/plugin-url";
import image from "rollup-plugin-img";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript";
import postcss from "rollup-plugin-postcss";
import externals from "rollup-plugin-node-externals";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import alias from "@rollup/plugin-alias";

import packageJson from "./package.json";

import path from "path";

const projectRootDir = path.resolve(__dirname);

export default {
  input: "./src/index.ts",
  output: [
    {
      dir: "lib",
      format: "esm",
      preserveModulesRoot: "src",
      preserveModules: true,
      sourcemap: true,
    },
  ],
  plugins: [
    // url(),
    // svgr({ exportType: "named", jsxRuntime: "automatic", babel: true, icon: true }),
    // image({
    //   extensions: /\.(png|jpg|jpeg|gif)$/,
    //   limit: 300000,
    // }),
    // url(),
    // svgr({ exportType: "named" }),
    externals(),
    nodeResolve({ browser: true, extensions: [".js", ".ts", ".tsx", ".svg"] }),
    peerDepsExternal(),
    commonjs(),
    // nodeResovle({ extensions: [".js", ".ts", ".tsx", ".svg"] }),
    // svg(),
    typescript({
      declaration: true,
    }),
    alias({
      entries: [
        { find: "utils", replacement: "./src/utils" },
        { find: /^components\/(.*)/, replacement: projectRootDir + "/components/$1" },
        { find: "theme", replacement: "./src/theme" },
        // {
        //   find: "assets",
        //   replacement: "./src/assets",
        // },
      ],
    }),
    url(),
    svgr({ exportType: "named", jsxRuntime: "automatic", babel: true, icon: true }),
    babel({
      exclude: "node_modules/**",
      babelrc: false,
      babelHelpers: "runtime",
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              browsers: ["last 2 versions"],
              node: "current",
            },
            debug: true,
          },
        ],
        [
          "@babel/preset-react",
          {
            runtime: "automatic",
          },
        ],
      ],
      // plugins: [
      //   [
      //     "@babel/plugin-transform-runtime",
      //     {
      //       regenerator: true,
      //       useESModules: true,
      //     },
      //   ],
      //   "@babel/plugin-proposal-class-properties",
      // ],
    }),
  ],
};
