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

export const dropdownAlignment = {
  left: "left",
  right: "right",
};

export type IconButtonProps = {
  icon: string | ReactElement;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  disabled?: boolean;
  dropDownOptions?: {
    width?: string;
    alignment?: keyof typeof dropdownAlignment;
    componentOverflowRef?: any;
  };
  onClick?: React.MouseEventHandler<HTMLButtonElement> | null;
  renderDropDown?: ReactElement<any> | null;
};
