import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  rootDir: ".",
  testEnvironment: "jsdom",
  transform: {
    "\\.[jt]sx?$": "babel-jest",
    "\\.ts$": "ts-jest",
    "^.+\\.svg$": "<rootDir>/svgTransform.js",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  moduleNameMapper: {
    "^assets(.*)$": "<rootDir>/src/assets$1",
    "^components(.*)$": "<rootDir>/src/components$1",
    "^hooks(.*)$": "<rootDir>/src/hooks$1",
    "^utils(.*)$": "<rootDir>/src/utils$1",
  },
};

export default config;
