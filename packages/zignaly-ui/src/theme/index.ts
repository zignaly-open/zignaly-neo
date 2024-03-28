import { ThemeExport, ThemeStyledComponentsOverrides } from "./types";

import dark from "./themes/dark";
import { getMuiAndStyledThemes } from "./muiTheme";

export const zignalyBaseThemeConfig = dark;

export const getZignalyThemeExport = (
  themeName?: "dark",
  overrides?: ThemeStyledComponentsOverrides | ThemeStyledComponentsOverrides[],
): ThemeExport => {
  const theme = dark;
  return getMuiAndStyledThemes(
    theme,
    overrides ? (Array.isArray(overrides) ? overrides : [overrides]) : [],
  );
};

export type {
  ThemeStyledComponents as ThemeType,
  ThemeStyledComponentsOverrides as ThemeOverridesType,
} from "./types";

export { GlobalAppStyle } from "./GlobalAppStyle";
