import React, { ReactElement } from "react";

export const buttonVariants = {
  primary: "primary",
  secondary: "secondary",
  flat: "flat",
};

export const buttonSizes = {
  small: "small",
  medium: "medium",
  large: "large",
  xlarge: "xlarge",
};

export type IconButtonProps = {
  id?: string;
  icon?: string | ReactElement;
  shrinkWrap?: boolean;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  disabled?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];

  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  isFocused?: boolean;
  colors?: {
    normal: string;
    active: string;
  };
};
