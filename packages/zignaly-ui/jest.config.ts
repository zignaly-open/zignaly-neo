import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  rootDir: ".",
  testEnvironment: "jsdom",
  transform: {
    "\\.[jt]sx?$": "babel-jest",
    "\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  moduleNameMapper: {
    '\\.svg(.*)$': '<rootDir>/__mocks__/svg.js',
    "^assets(.*)$": "<rootDir>/src/assets$1",
    "^components(.*)$": "<rootDir>/src/components$1",
    "^theme(.*)$": "<rootDir>/src/theme$1",
    "^utils(.*)$": "<rootDir>/src/utils$1",
  },
};

export default config;
