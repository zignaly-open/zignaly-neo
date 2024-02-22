import dts from "rollup-plugin-dts";
import commonjs from '@rollup/plugin-commonjs';
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import alias from "@rollup/plugin-alias";
import path from "node:path";
import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default {
  input: {
    index: "src/index.ts",
    fonts: "src/fonts.ts",
    charts: "src/charts.ts",
    i18n: "src/i18n.ts",
    icons: "src/icons.ts"
  },
  output: [
    {
      dir: "lib",
      format: "esm",
      preserveModules: true,
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
        "styled-components": "styled",
      },
    },
    {
      dir: "lib",
      format: "cjs",
      preserveModules: true,
      interop: 'compat',
      entryFileNames: '[name].cjs',
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
    json(),
    resolve({ browser: true }),
    typescript({ emitDeclarationOnly: true }),
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
    url({
      // by default, rollup-plugin-url will not handle font files
      include: ['**/*.otf', '**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif'],
      // setting infinite limit will ensure that the files
      // are always bundled with the code, not copied to /dist
      limit: Infinity,
    }),
    svgr({ icon: true }),
  ],
}
