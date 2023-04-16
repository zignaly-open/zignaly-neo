import dts from "rollup-plugin-dts";
import commonjs from '@rollup/plugin-commonjs';
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
// import typescript from "rollup-plugin-typescript2";
import typescript from "@rollup/plugin-typescript";
import alias from "@rollup/plugin-alias";
import path from "node:path";
// import {babel} from '@rollup/plugin-babel';
import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import {fileURLToPath} from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default [
  {
    input: "src/index.ts",
    output: [
      {
        dir: "dist",
        format: "esm",
        // exports: "named",
        preserveModules: true,
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "styled-components": "styled",
        },
      },
      // {
      //   dir: "dist/zignaly-ui",
      //   format: "cjs",
      //   exports: "named",
      //   preserveModules: true,
      // },
    ],
    plugins: [
      external({
        includeDependencies: true
      }),
      resolve({browser: true}),
      peerDepsExternal(),
      typescript(),
      commonjs({
        // namedExports: {
        //   'node_modules/react-is/index.js': ['isValidElementType']
        // },
        // ignoreGlobal: true,
        include: /\/node_modules\//,
        // namedExports: {
        //   react: Object.keys(require('react')),
        //   'react-is': Object.keys(require('react-is')),
        // },
      }),

      alias({
        entries: {
          assets: path.resolve(__dirname, "./src/assets"),
          theme: path.resolve(__dirname, "./src/theme"),
          components: path.resolve(__dirname, "./src/components"),
          utils: path.resolve(__dirname, "./src/utils"),
        },
      }),
      url(),
      svgr({icon: true}),
      // babel({
      //   exclude: 'node_modules/**',
      //   babelrc: false,
      //   runtimeHelpers: true,
      //   presets: [
      //     [
      //       '@babel/preset-env',
      //       {
      //         targets: {
      //           browsers: ['last 2 versions'],
      //         },
      //         debug: true,
      //       },
      //     ],
      //     '@babel/preset-react',
      //   ],
      //   plugins: [
      //     '@babel/transform-runtime'
      //   ],
      // }),
    ],
    // external: [
    //   "react",
    //   "react-dom",
    //   "styled-components",
    //   // "@emotion/react",
    //   // "@emotion/styled"
    // ],
  },
  {
    input: "dist/index.d.ts",
    output: [{file: "dist/index.d.ts", format: "esm"}],
    plugins: [dts()],
  },
];
