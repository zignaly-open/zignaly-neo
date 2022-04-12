// Dependencies
import { withDesign } from "storybook-addon-designs";

// Testing Results
import { withTests } from "@storybook/addon-jest";
import results from "../.jest-test-results.json";

export const decorators = [
  withTests({
    results,
  }),
  withDesign(),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  decorators,
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
