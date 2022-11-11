/// <reference types="react-scripts" />

import ThemeZig from '@zignaly-open/ui/lib/theme/theme';
import { MetaMaskInpageProvider } from '@metamask/providers';

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

declare module '@mui/material/styles' {
  interface CustomPalette {}
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

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
    subscribersSiteId: string;
  }
}
