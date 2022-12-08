import { Theme as MuiTheme } from "@mui/material/styles";
import React from "react";

declare module "@mui/material/styles" {
  interface CustomPalette {
    white: string;
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
    dropDownBackground: string;
    darkSpecial: string;
    almostWhite: string;
    errorToasterBg: string;
    errorToasterBorder: string;
    successToasterBg: string;
    successToasterBorder: string;
  }

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
    white: true;
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
    dropDownBackground: true;
    darkSpecial: true;
    almostWhite: true;
    errorToasterBg: true;
    errorToasterBorder: true;
    successToasterBg: true;
    successToasterBorder: true;
  }
}

declare module "@mui/material/SvgIcon" {
  export interface SvgIconPropsColorOverrides {
    white: true;
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
    dropDownBackground: true;
    darkSpecial: true;
    almostWhite: true;
    errorToasterBg: true;
    errorToasterBorder: true;
    successToasterBg: true;
    successToasterBorder: true;
  }
}

declare module "@emotion/react" {
  export interface Theme extends MuiTheme {
    white: string;
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
    dropDownBackground: string;
    darkSpecial: string;
    almostWhite: string;
    errorToasterBg: string;
    errorToasterBorder: string;
    successToasterBg: string;
    successToasterBorder: string;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    bigNumber: true;
  }
}
