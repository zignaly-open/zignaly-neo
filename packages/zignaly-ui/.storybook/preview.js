import { ThemeProvider, createGlobalStyle } from "styled-components";
import { DocsContainer } from "@storybook/addon-docs/blocks";
import { ThemeProvider as ThemeProviderMui } from "@mui/material";
import { ThemeChartGradients } from "../src/charts";
import theme from "./theme";
import { withTests } from "@storybook/addon-jest";
import results from "../.jest-test-results.json";
import { getZignalyThemeExport } from "@zignaly-open/ui";
import { storybookI18nextDecorator } from "../src/i18n/dummyI18nextProvider";

const GlobalStyle = createGlobalStyle`
  body {
    color: ${(props) => (props.darkMode ? "#c1c1c8" : "black")};
  }
`;

const dark = getZignalyThemeExport("dark");

const withStyledTheme = (storyFn) => {
  return (
    <ThemeProvider theme={dark.legacyStyledComponentsDoNotUse}>
      <ThemeProviderMui theme={dark.mui}>
        <GlobalStyle darkMode />
        <ThemeChartGradients />
        {storyFn()}
      </ThemeProviderMui>
    </ThemeProvider>
  );
};

export const decorators = [
  withTests({
    results,
    filesExt: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  }),
  withStyledTheme,
  storybookI18nextDecorator,
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
  backgrounds: { disable: true },
  docs: {
    theme,
    container: DocsContainer,
  },
};
