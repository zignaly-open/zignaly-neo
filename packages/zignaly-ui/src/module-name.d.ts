import { Theme as MuiTheme } from "@mui/material/styles";
import React from "react";

declare module "@mui/material/styles" {
  interface CustomPalette {
    neutral900: string;
    neutral800: string;
    neutral750: string;
    neutral700: string;
    neutral600: string;
    neutral500: string;
    neutral400: string;
    neutral300: string;
    neutral200: string;
    neutral175: string;
    neutral150: string;
    neutral100: string;
    neutral000: string;
    secondary: string;
    highlighted: string;
    redGraphOrError: string;
    greenGraph: string;
    links: string;
    yellow: string;
    red: string;
    contrasting: string;
    paleBlue: string;
    lightGrayBlue: string;
    darkGreen: string;
    labelCheckbox: string;
    checkboxPrimary: string;
    lightGrey: string;

    backgrounds: Record<
      | "withdrawalHighlight" // why have a dedicated color used only once? because fuck me, that's why
      | "selectInputFill"
      | "inputTextFill"
      | "toastSuccess"
      | "toastError"
      | "greyedOutBorder"
      | "investorsIcon" // why have a dedicated color used only once? because fuck me, that's why
      | "headerMenuItemHover" // why have a dedicated color used only once? because fuck me, that's why
      | "dropdown2ndLevel" // why have a dedicated color used only once? because fuck me, that's why
      | "activeTab" // why have a dedicated color used only once? because fuck me, that's why
      | "modal"
      | "secondaryBackground"
      | "sliderMark"
      | "tableRow"
      | "sliderThumb"
      | "tableHeader"
      | "input2fa"
      | "input2faGradient"
      | "input2faGradientBorder"
      | "buttonPrimary"
      | "header"
      | "manageServiceMenuHover" // why have a dedicated color used only once? because fuck me, that's why
      | "input"
      | "coinIconPlaceholder", // why have a dedicated color used only once? because fuck me, that's why
      string
    >;

    boxShadows: Partial<Record<"tableHeader" | "header" | "button", string>>;

    chart: Record<
      | "greenGradient"
      | "greenMiniGradient"
      | "redGradient"
      | "redMiniGradient"
      | "greenCard"
      | "redCard",
      string[]
    > &
      Record<"red" | "green", string>;

    zscore: ZScoreTheme;
  }

  type RingTheme = {
    gradient: string[];
    icon: string;
    text: string;
  };

  type ZScoreTheme = {
    ring:
      | Record<"profits" | "service" | "balanced", RingTheme>
      | Record<"risk", Omit<RingTheme, "icon">>;
    bar: Record<"profits" | "service" | "balanced" | "risk", string>;
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Palette extends CustomPalette {}
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface PaletteOptions extends CustomPalette {}

  interface TypographyVariants {
    bigNumber: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    bigNumber: true;
  }
}

declare module "@mui/material/styles/createTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends ThemeZig {}
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    danger: true;
    success: true;
    neutral900: true;
    neutral800: true;
    neutral750: true;
    neutral700: true;
    neutral600: true;
    neutral500: true;
    neutral400: true;
    neutral300: true;
    neutral200: true;
    neutral175: true;
    neutral150: true;
    neutral100: true;
    neutral000: true;
    secondary: true;
    highlighted: true;
    redGraphOrError: true;
    greenGraph: true;
    links: true;
    yellow: true;
    red: true;

    contrasting: true;
  }
}

declare module "@mui/material/SvgIcon" {
  export interface SvgIconPropsColorOverrides {
    danger: true;
    success: true;
    neutral900: true;
    neutral800: true;
    neutral700: true;
    neutral600: true;
    neutral500: true;
    neutral400: true;
    neutral300: true;
    neutral200: true;
    neutral175: true;
    neutral150: true;
    neutral100: true;
    neutral000: true;
    secondary: true;
    highlighted: true;
    redGraphOrError: true;
    greenGraph: true;
    links: true;
    yellow: true;
    red: true;

    contrasting: true;
  }
}

declare module "@emotion/react" {
  export interface Theme extends MuiTheme {
    neutral900: string;
    neutral800: string;
    neutral750: string;
    neutral700: string;
    neutral600: string;
    neutral500: string;
    neutral400: string;
    neutral300: string;
    neutral200: string;
    neutral175: string;
    neutral150: string;
    neutral100: string;
    neutral000: string;
    secondary: string;
    highlighted: string;
    redGraphOrError: string;
    greenGraph: string;
    links: string;
    yellow: string;
    red: string;

    contrasting: string;
  }
}
