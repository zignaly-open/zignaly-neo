import { Theme as ThemeMui } from "@mui/system/createTheme/createTheme";
// this thing is overwritten in module-name.d.ts
import { CustomPalette } from "@mui/material/styles";

export interface ThemeStyledComponents {
  fontFamily: string[];
  palette: Omit<CustomPalette, "backgrounds" | "boxShadows" | "chart">;
  backgrounds: CustomPalette["backgrounds"];
  boxShadows: CustomPalette["boxShadows"];
  chart: CustomPalette["chart"];
  mode: "dark" | "light";
}

export type ThemeExport = {
  mui: ThemeMui;
  legacyStyledComponentsDoNotUse: ThemeStyledComponents;
};
