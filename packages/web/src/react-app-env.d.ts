/// <reference types="react-scripts" />

import ThemeZig from 'zignaly-ui/lib/theme/theme';

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}

import type { PaletteOptions, Palette } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CustomPalette {
    prettyPink: PaletteColorOptions;
    greedyGreen: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/styles/createTheme' {
  interface Theme extends ThemeZig {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    prettyPink: true;
    greedyGreen: true;
  }
}
