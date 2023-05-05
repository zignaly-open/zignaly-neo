import dts from "rollup-plugin-dts";
import commonjs from '@rollup/plugin-commonjs';
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import alias from "@rollup/plugin-alias";
import path from "node:path";
import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import {fileURLToPath} from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default {
  input: "src/index.ts",
  output: [
    {
      file: 'lib/cjs.js',
      format: 'cjs',
      sourcemap: false,
    },
    {
      dir: "lib",
      format: "esm",
      preserveModules: true,
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
        "styled-components": "styled",
      },
    }
  ],
  plugins: [
    external({
      includeDependencies: true
    }),
    resolve({browser: true}),
    typescript(),
    commonjs({
      include: /\/node_modules\//,
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
  ],
}
