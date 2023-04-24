import { dark } from "../src/theme";
import { addDecorator } from "@storybook/react";
import { makeDecorator } from "@storybook/addons";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { ThemeProvider as ThemeProviderMui } from "@mui/material";
import { ChartGradients } from "../src";

// Testing Results
import { withTests } from "@storybook/addon-jest";
import results from "../.jest-test-results.json";
import darkMui from "../src/theme/darkMui";

const GlobalStyle = createGlobalStyle`
  body {
    color: ${(props) => (props.darkMode ? "#c1c1c8" : "black")};
  }
`;

const withStyledTheme = (storyFn) => {
  return (
    <ThemeProvider theme={dark}>
      <ThemeProviderMui theme={darkMui}>
        <GlobalStyle darkMode />
        <ChartGradients />
        {storyFn()}
      </ThemeProviderMui>
    </ThemeProvider>
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
    filesExt: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  }),
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
