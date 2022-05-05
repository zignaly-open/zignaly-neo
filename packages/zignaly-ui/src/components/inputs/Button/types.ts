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
  icon?: ReactElement<any> | string | null;
  leftElement?: ReactElement<any> | string | null;
  rightElement?: ReactElement<any> | string | null;
  disabled?: boolean;
  color?: keyof typeof buttonColors;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  children?: React.ReactNode;
};
