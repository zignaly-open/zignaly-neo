import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import svgr from "@svgr/rollup";
import url from "@rollup/plugin-url";
import dts from "vite-plugin-dts";
import alias from "@rollup/plugin-alias";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ZignalyUi",
      formats: ["es", "umd"],
      fileName: (format) => `zignaly-ui.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "styled-components", "@emotion/react", "@emotion/styled"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "styled-components": "styled",
        },
      },
      plugins: [
        alias({
          entries: {
            assets: path.resolve(__dirname, "./src/assets"),
            theme: path.resolve(__dirname, "./src/theme"),
            components: path.resolve(__dirname, "./src/components"),
            utils: path.resolve(__dirname, "./src/utils"),
          },
          // {find: "assets", replacement: "../src/assets"},
          // {find: "theme", replacement: "../src/theme"},
          // {find: "components", replacement: "../src/components"},
          // {find: "utils", replacement: "../src/utils"},

          // ],
        }),
        url(),
        svgr({ icon: true }),
      ],
    },
  },
});
