// Dependencies
import { withDesign } from "storybook-addon-designs";
import { useDarkMode } from "storybook-dark-mode";
import { dark, light } from "../src/theme";
import { addDecorator } from "@storybook/react";
import { makeDecorator } from "@storybook/addons";
import { ThemeProvider } from "styled-components";

// Testing Results
import { withTests } from "@storybook/addon-jest";
import results from "../.jest-test-results.json";

const withStyledTheme = (storyFn) => {
  const darkMode = useDarkMode();
  const currentTheme = darkMode ? dark : light;

  return <ThemeProvider theme={currentTheme}>{storyFn()}</ThemeProvider>;
};

const styledThemed = makeDecorator({
  name: "styled-theme",
  wrapper: withStyledTheme,
});

addDecorator(styledThemed);

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
