import { ThemeExport, ThemeStyledComponents } from "./types";

import dark from "./themes/dark";
import example from "./themes/example";
import { getMuiAndStyledThemes } from "./muiTheme";

export const getZignalyThemeExport = (
  themeName?: "dark" | "example",
  overrides?: Partial<ThemeStyledComponents>,
): ThemeExport => {
  const theme = themeName === "example" ? example : dark;
  return getMuiAndStyledThemes(theme, overrides);
};

export type { ThemeStyledComponents as ThemeType } from "./types";
