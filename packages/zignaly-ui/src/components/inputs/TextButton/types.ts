import React, { ReactElement } from "react";

export type ButtonProps = {
  caption?: string;
  leftElement?: ReactElement<any> | string | null;
  rightElement?: ReactElement<any> | string | null;
  underline?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  href?: string;
  rel?: string;
  target?: string;
};
