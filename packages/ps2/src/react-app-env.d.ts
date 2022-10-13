/// <reference types="react-scripts" />

import ThemeZig from '@zignaly-open/ui/lib/theme/theme';

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

import type { PaletteOptions, Palette } from '@mui/material/styles';
import { PaletteColorOptions } from '@mui/material';

declare module '@mui/material/styles' {
  interface CustomPalette {
    white: PaletteColorOptions;
    neutral800: PaletteColorOptions;
    neutral750: PaletteColorOptions;
    neutral700: PaletteColorOptions;
    neutral600: PaletteColorOptions;
    neutral500: PaletteColorOptions;
    neutral400: PaletteColorOptions;
    neutral300: PaletteColorOptions;
    neutral200: PaletteColorOptions;
    neutral175: PaletteColorOptions;
    neutral150: PaletteColorOptions;
    neutral100: PaletteColorOptions;
    neutral000: PaletteColorOptions;
    secondary: PaletteColorOptions;
    highlighted: PaletteColorOptions;
    redGraphOrError: PaletteColorOptions;
    greenGraph: PaletteColorOptions;
    links: PaletteColorOptions;
    yellow: PaletteColorOptions;
    red: PaletteColorOptions;
    dropDownBackground: PaletteColorOptions;
    darkSpecial: PaletteColorOptions;
    almostWhite: PaletteColorOptions;
    errorToasterBg: PaletteColorOptions;
    errorToasterBorder: PaletteColorOptions;
    successToasterBg: PaletteColorOptions;
    successToasterBorder: PaletteColorOptions;
  }

  interface Palette extends CustomPalette {}

  interface PaletteOptions extends CustomPalette {}
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
    almostWhite: true;
    errorToasterBg: true;
    errorToasterBorder: true;
    successToasterBg: true;
    successToasterBorder: true;
  }
}

declare module '@mui/material/SvgIcon' {
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
