import React from "react";
import { DocsContainer as BaseContainer } from "@storybook/addon-docs/blocks";
import theme from "./theme";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as ThemeProviderMui } from "@mui/material";
import { ChartGradients, getZignalyThemeExport } from "../src";
import GlobalStyle from "@zignaly-open/ps2/src/styles";

const { mui: darkMui, legacyStyledComponentsDoNotUse: dark } = getZignalyThemeExport("dark");

export const DocsContainer = ({ children, context }) => {
  return (
    <BaseContainer
      context={{
        ...context,
        storyById: (id) => {
          const storyContext = context.storyById(id);
          return {
            ...storyContext,
            parameters: {
              ...storyContext?.parameters,
              docs: {
                ...storyContext?.parameters?.docs,
                theme,
              },
            },
          };
        },
      }}
    >
      <ThemeProvider theme={dark}>
        <ThemeProviderMui theme={darkMui}>
          <GlobalStyle darkMode />
          <ChartGradients />
          {children}
        </ThemeProviderMui>
      </ThemeProvider>
    </BaseContainer>
  );
};
