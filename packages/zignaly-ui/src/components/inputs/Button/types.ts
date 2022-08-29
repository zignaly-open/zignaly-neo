import { ReactElement } from "react";
import * as React from "react";

export const buttonVariants = {
  primary: "primary",
  secondary: "secondary",
};

export const buttonSizes = {
  small: "small",
  medium: "medium",
  large: "large",
  xlarge: "xlarge",
};

export const buttonColors = {
  grey: "grey",
  green: "green",
};

export type ButtonProps = {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  caption?: string | null;
  leftElement?: ReactElement | string | null;
  rightElement?: ReactElement | string | null;
  bottomElement?: ReactElement | string | null;
  disabled?: boolean;
  loading?: boolean;
  id?: string;
  color?: keyof typeof buttonColors;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  testIdLeftElement?: string | null;
  testIdCaptionElement?: string | null;
  testIdRightElement?: string | null;
  testIdLoadingElement?: string | null;
  children?: React.ReactNode;
  minWidth?: number;
  maxWidth?: number;
  maxHeight?: number;
};
