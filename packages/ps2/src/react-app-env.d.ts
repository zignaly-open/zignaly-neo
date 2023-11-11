/// <reference types="react-scripts" />

import '@zignaly-open/ui/src/module-name.d.ts';

declare global {
  interface Window {
    dataLayer: {
      push: (payload: unknown) => void;
    };
    safari?: unknown;
    twq?: (e: string, eventKey: string, eventData: unknown) => void;
    intercomSettings?: { user_hash?: string };
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
  interface TypographyVariants {
    bigNumber: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    bigNumber?: React.CSSProperties;
  }

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
    avatarBack: string;
    contrasting: string;
    paleBlue: string;

    // I am sorry
    // Here we define some of the "new" colors - only thoise needed in ps2
    // not all because a) I am lazy b) we do not need them c) we SHOULD NOT need them in the first place
    // d) because I added them here only because adding an explanatory comment and a ts-ignore every time
    // is too much of a hassle (see a).).
    backgrounds: Record<
      | 'menuHover'
      | 'modal'
      | 'investorsIcon'
      | 'withdrawalHighlight'
      | 'secondaryBackground'
      | 'selectInputFill'
      | 'activeTab'
      | 'manageServiceMenuHover',
      string
    >;
  }

  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/styles/createTheme' {
  interface Theme extends ThemeZig {}
}

declare module '@mui/material/Button' {
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

    avatarBack: true;
    contrasting: true;
  }
}

declare module '@mui/material/SvgIcon' {
  export interface SvgIconPropsColorOverrides {
    danger: true;
    success: true;
    neutral950: true;
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

    avatarBack: true;
    contrasting: true;
  }
}

import { Theme as MuiTheme } from '@mui/material/styles';
import { NumericFormatProps } from 'react-number-format';
import React from 'react';

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {
    neutral950: string;
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
    avatarBack: string;
  }
}

declare module 'react-number-format' {
  const numericFormatter = (numStr: string, props: NumericFormatProps) =>
    string;
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    bigNumber: true;
  }
}
