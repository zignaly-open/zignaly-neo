/// <reference types="react-scripts" />

import '@zignaly-open/ui/src/module-name.d.ts';

declare global {
  interface Window {
    dataLayer: {
      push: (payload: unknown) => void;
    };
  }
}

declare module '*.svg' {
  /**
   * Use `any` to avoid conflicts with
   * `@svgr/webpack` plugin or
   * `babel-plugin-inline-react-svg` plugin.
   */
  const content: any;

  export default content;
}

declare module '@mui/material/styles' {
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
    avatarBack: string;
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

  interface TypographyVariants {
    bigNumber: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    bigNumber: true;
  }
}

declare module '@mui/material/styles/createTheme' {
  interface Theme extends ThemeZig {}
}

declare module '@mui/material/Button' {
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
    avatarBack: true;
    almostWhite: true;
    errorToasterBg: true;
    errorToasterBorder: true;
    successToasterBg: true;
    successToasterBorder: true;
  }
}

declare module '@mui/material/SvgIcon' {
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
    avatarBack: true;
    almostWhite: true;
    errorToasterBg: true;
    errorToasterBorder: true;
    successToasterBg: true;
    successToasterBorder: true;
  }
}

import { Theme as MuiTheme } from '@mui/material/styles';

declare module '@emotion/react' {
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
    avatarBack: string;
    successToasterBg: string;
    successToasterBorder: string;
  }
}
