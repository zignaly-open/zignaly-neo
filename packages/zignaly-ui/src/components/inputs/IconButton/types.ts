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

export const dropdownPosition = {
  static: "static",
  absolute: "absolute",
};

export const defaultDropDownOptions = {
  width: "auto",
  componentOverflowRef: null,
  alignment: "left",
  position: "absolute",
  zIndex: 10,
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
    zIndex?: number;
    position?: keyof typeof dropdownPosition;
  };

  loading?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement> | null;
  renderDropDown?: ReactElement<any> | null;
  className?: string;
};
