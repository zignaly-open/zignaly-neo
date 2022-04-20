import { ReactElement } from "react";
import * as React from "react";

export enum ButtonVariants {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export enum ButtonSizes {
  SMALL = "small",
  NORMAL = "normal",
  LARGE = "large",
  XLARGE = "xlarge",
}

export type ButtonProps = {
  variant?: ButtonVariants;
  size?: ButtonSizes;
  caption?: string | null;
  icon?: ReactElement<any> | String | null;
  leftElement?: ReactElement<any> | String | null;
  rightElement?: ReactElement<any> | String | null;
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};
