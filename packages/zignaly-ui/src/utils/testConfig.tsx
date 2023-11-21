import { render } from "@testing-library/react";
import { ThemeProvider as ThemeProviderMui } from "@mui/material";
import { ThemeProvider, ThemeProviderMui as ThemeInheritorMui } from "../index";
import React from "react";
import { getZignalyThemeExport } from "../theme";

export const renderWithProvidersUi = (ui: JSX.Element, renderOptions = {}) => {
  const { mui, legacyStyledComponentsDoNotUse } = getZignalyThemeExport();
  return render(ui, {
    wrapper: ({ children }: { children: JSX.Element }) => (
      <ThemeProvider theme={legacyStyledComponentsDoNotUse}>
        <ThemeInheritorMui theme={mui}>
          <ThemeProviderMui theme={mui}>{children}</ThemeProviderMui>
        </ThemeInheritorMui>
      </ThemeProvider>
    ),
    ...renderOptions,
  });
};
