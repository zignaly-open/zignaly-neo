import React, { ReactElement } from "react";
import { dark } from "theme";

export const componentByVariants = {
  h1: "span",
  h2: "span",
  h3: "span",
  h4: "span",
  h5: "span",
  bigNumber: "span",
  body1: "span",
  body2: "span",
  buttonxl: "span",
  buttonl: "span",
  buttonm: "span",
  buttonsm: "span",
  inputl: "span",
  inputm: "span",
  labelm: "span",
};

export type ButtonProps = {
  caption?: ReactElement | string;
  leftElement?: ReactElement<any> | string | null;
  rightElement?: ReactElement<any> | string | null;
  underline?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  href?: string;
  rel?: string;
  target?: string;
  loading?: boolean;
  tabIndex?: number;
  disabled?: boolean;
  className?: string;
  color?: keyof typeof dark;
  variant?: keyof typeof componentByVariants;
};
