import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
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
      external: ["react", "react-dom", "styled-components"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "styled-components": "styled",
        },
      },
      plugins: [
        alias({
          entries: [
            { find: "assets", replacement: "../src/assets" },
            { find: "theme", replacement: "../src/theme" },
            { find: "components", replacement: "../src/components" },
            { find: "utils", replacement: "../src/utils" },
          ],
        }),
      ],
    },
  },
});
