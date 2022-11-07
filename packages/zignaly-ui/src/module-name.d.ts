declare module "@metamask/jazzicon";

type SvgrComponent = React.StatelessComponent<
  React.SVGAttributes<SVGElement> & { alt?: string; color?: string }
>;

declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string; alt?: string }
  >;

  const src: string;
  export default src;
}

declare module "*.svg?url" {
  const content: any;
  export default content;
}

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

  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module "@mui/material/styles/createTheme" {
  interface Theme extends ThemeZig {}
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
  interface SvgIconPropsColorOverrides {
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

import { Theme as MuiTheme } from "@mui/material/styles";

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
