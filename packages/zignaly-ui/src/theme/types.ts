import { Theme as ThemeMui } from "@mui/system/createTheme/createTheme";
// this thing is overwritten in module-name.d.ts
import { CustomPalette } from "@mui/material/styles";

export type ThemeStyledComponents = {
  fontFamily: string[];
  fontFamilyH1H6?: string[];
  palette: Omit<CustomPalette, "backgrounds" | "boxShadows" | "chart" | "zscore">;
  backgrounds: Record<
    | "withdrawalHighlight" // why have a dedicated color used only once? because fuck me, that's why
    | "body"
    | "selectInputFill"
    | "toastSuccess"
    | "toastError"
    | "greyedOutBorder"
    | "investorsIcon" // why have a dedicated color used only once? because fuck me, that's why
    | "headerMenuItemHover" // why have a dedicated color used only once? because fuck me, that's why
    | "dropdown2ndLevel" // why have a dedicated color used only once? because fuck me, that's why
    | "activeTab" // why have a dedicated color used only once? because fuck me, that's why
    | "modal"
    | "secondaryBackground"
    | "tableRow"
    | "tableHeader"
    | "input2fa"
    | "input2faGradient"
    | "buttonPrimary"
    | "header"
    | "manageServiceMenuHover" // why have a dedicated color used only once? because fuck me, that's why
    | "breakLineSignUp"
    | "coinIconPlaceholder",
    string
  >;
  boxShadows: CustomPalette["boxShadows"];
  chart: CustomPalette["chart"];
  zscore: CustomPalette["zscore"];
  mode: "dark" | "light";
  imageColorOverride?: string;
};

// https://stackoverflow.com/a/61132308/2044039
type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type ThemeStyledComponentsOverrides = DeepPartial<ThemeStyledComponents>;

export type ThemeExport = {
  mui: ThemeMui;
  legacyStyledComponentsDoNotUse: ThemeStyledComponents;
};
