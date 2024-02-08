import { render } from "@testing-library/react";
import { ThemeProvider as ThemeProviderMui } from "@mui/material";
import { ThemeProvider, ThemeProviderMui as ThemeInheritorMui } from "../index";
import React from "react";
import { getZignalyThemeExport } from "../theme";
import mediaQuery from "css-mediaquery";
import { JestI18nextDecorator } from "./dummyI18nextProvider";

export const renderWithProvidersUi = (ui: JSX.Element, renderOptions = {}) => {
  const { mui, legacyStyledComponentsDoNotUse } = getZignalyThemeExport();
  return render(ui, {
    wrapper: ({ children }: { children: JSX.Element }) => (
      <JestI18nextDecorator>
        <ThemeProvider theme={legacyStyledComponentsDoNotUse}>
          <ThemeInheritorMui theme={mui}>
            <ThemeProviderMui theme={mui}>{children}</ThemeProviderMui>
          </ThemeInheritorMui>
        </ThemeProvider>
      </JestI18nextDecorator>
    ),
    ...renderOptions,
  });
};

const createMatchMedia = (width: number) => {
  return (query: string) => {
    return {
      matches: mediaQuery.match(query, { width }),
      media: "",
      addListener: () => {},
      removeListener: () => {},
      onchange: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    };
  };
};

export const resizeScreenSize = (width: number) => {
  window.matchMedia = createMatchMedia(width);
};
