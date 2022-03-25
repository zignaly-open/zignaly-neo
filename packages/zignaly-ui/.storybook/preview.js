// Dependencies
import { addDecorator } from "@storybook/react";
import { makeDecorator } from "@storybook/addons";
import { themes as sbThemes } from "@storybook/theming";
import { withDesign } from "storybook-addon-designs";
import { useDarkMode } from "storybook-dark-mode";
import { useMemo } from "react";

// Theme Provider
import { ThemeProvider } from "styled-components";
import { createTheme, GlobalStyles, ThemeProvider as MUIThemeProvider } from "@mui/material";
import { dark, light } from "../src/types/theme";

// Testing Results
import { withTests } from "@storybook/addon-jest";
import results from "../.jest-test-results.json";

// Theme wrappers
const withStyledTheme = (storyFn) => {
  const darkMode = useDarkMode();
  const currentTheme = darkMode ? dark : light;
  const muiTheme = useMemo(() => createTheme(currentTheme), [darkMode]);

  return (
    <MUIThemeProvider theme={muiTheme}>
      <GlobalStyles styles={{ body: { color: muiTheme.palette.text.primary } }} />
      <ThemeProvider theme={currentTheme}>{storyFn()}</ThemeProvider>
    </MUIThemeProvider>
  );
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
  darkMode: {
    dark: { ...sbThemes.dark, appBg: "#2d2d2d", appContentBg: "#07071A" },
    light: { ...sbThemes.normal, appBg: "white" },
  },
};
