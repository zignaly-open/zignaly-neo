import React, { ReactElement } from "react";
import { dark } from "theme";

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
  disabled?: boolean;
  className?: string;
  color?: keyof typeof dark;
};
