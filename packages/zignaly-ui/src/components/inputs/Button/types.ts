import { ReactElement } from "react";
import * as React from "react";

export enum ButtonVariants {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export enum ButtonSizes {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  XLARGE = "x-large",
}

export enum ButtonColors {
  GREY = "grey",
  GREEN = "green",
}

export type ButtonProps = {
  variant?: ButtonVariants;
  size?: ButtonSizes;
  caption?: string | null;
  icon?: ReactElement<any> | String | null;
  leftElement?: ReactElement<any> | String | null;
  rightElement?: ReactElement<any> | String | null;
  disabled?: boolean;
  color?: ButtonColors;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
};
