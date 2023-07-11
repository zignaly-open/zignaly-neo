import { Theme as ThemeMui } from "@mui/system";
import { default as darkLegacyDoNotUse, darkMui } from "./dark";
import { default as exampleLegacyDoNotUse, exampleMui } from "./example";
import ThemeStyledComponents from "./theme";

type ThemeExport = {
  mui: ThemeMui;
  legacyStyledComponentsDoNotUse: ThemeStyledComponents;
};
export const themes: Record<"dark" | string, ThemeExport> = {
  dark: {
    mui: darkMui,
    legacyStyledComponentsDoNotUse: darkLegacyDoNotUse,
  },
  example: {
    mui: exampleMui,
    legacyStyledComponentsDoNotUse: exampleLegacyDoNotUse,
  },
};
export type { default as ThemeType } from "./theme";
