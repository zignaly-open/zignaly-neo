import React from "react";
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

export const weightByType = {
  medium: "medium",
  demibold: "demibold",
  regular: "regular",
};

export interface TypographyProps {
  variant?: keyof typeof componentByVariants;
  weight?: keyof typeof weightByType;
  className?: string;
  component?: any;
  color?: keyof typeof dark;
  underline?: boolean;
  children: React.ReactNode;
  marginRight?: number;
  marginLeft?: number;
  marginTop?: number;
  marginBottom?: number;
}
