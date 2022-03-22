// Dependencies
import { addDecorator } from "@storybook/react";
import { themes as sbThemes } from "@storybook/theming";
import { withDesign } from "storybook-addon-designs";

// Theme Provider
import { ThemeProvider } from "styled-components";
import { withThemesProvider } from "storybook-addon-styled-component-theme";

// Testing Results
import { withTests } from "@storybook/addon-jest";
import results from "../.jest-test-results.json";

import { dark, light } from "../src/types/theme";

const themes = [dark, light];
addDecorator(withThemesProvider(themes), ThemeProvider);

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
  darkMode: {
    dark: { ...sbThemes.dark, appBg: "#2d2d2d" },
    light: { ...sbThemes.normal, appBg: "white" },
  },
};
