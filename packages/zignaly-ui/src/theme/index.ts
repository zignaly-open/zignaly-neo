import { ThemeExport, ThemeStyledComponentsOverrides } from "./types";

import dark from "./themes/dark";
import example from "./themes/example";
import { getMuiAndStyledThemes } from "./muiTheme";

export const getZignalyThemeExport = (
  themeName?: "dark" | "example",
  overrides?: ThemeStyledComponentsOverrides,
): ThemeExport => {
  const theme = themeName === "example" ? example : dark;
  return getMuiAndStyledThemes(theme, overrides);
};

export type {
  ThemeStyledComponents as ThemeType,
  ThemeStyledComponentsOverrides as ThemeOverridesType,
} from "./types";
