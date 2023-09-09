import { dark } from "../src/theme";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { DocsContainer } from "@storybook/addon-docs/blocks";
import { ThemeProvider as ThemeProviderMui } from "@mui/material";
import { ChartGradients } from "../src";
import theme from "./theme";
import { withTests } from "@storybook/addon-jest";
import results from "../.jest-test-results.json";
import { themes } from '@zignaly-open/ui';

const GlobalStyle = createGlobalStyle`
  body {
    color: ${(props) => (props.darkMode ? "#c1c1c8" : "black")};
  }
`;

const withStyledTheme = (storyFn) => {
  return (
    <ThemeProvider theme={themes.dark.legacyStyledComponentsDoNotUse}>
      <ThemeProviderMui theme={themes.dark.mui}>
        <GlobalStyle darkMode />
        <ChartGradients />
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
