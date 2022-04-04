import { create } from "@storybook/theming";

import ZignalyLogoWhite from "./images/zignaly-white.svg";

export default create({
  base: "dark",
  colorPrimary: "#26C496",
  colorSecondary: "#9864EF",

  // UI
  appBg: "#0D0D28",
  appContentBg: "#080A1D",
  appBorderColor: "#222249",
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: "monospace",

  // Text colors
  textColor: "#fff",
  textInverseColor: "rgba(255,255,255,0.9)",

  // Toolbar default and active colors
  barTextColor: "#fff",
  barSelectedColor: "#9864EF",
  barBg: "#22224966",

  // Form colors
  inputBg: "#0C0D21",
  inputBorder: "#413BA0",
  inputTextColor: "#fff",
  inputBorderRadius: 4,

  brandTitle: "Zignaly UI",
  brandUrl: "https://zignaly.com",
  brandImage: ZignalyLogoWhite,
});
