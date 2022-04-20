import React from "react";

export const componentByVariants = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body: "span",
  number: "span",
};

export enum weightByType {
  medium = "medium",
  demibold = "demibold",
  regular = "regular",
}

export interface TypographyProps {
  variant?: keyof typeof componentByVariants;
  weight?: weightByType;
  style?: any;
  className?: string;
  component?: any;
  color?: string;
  underline?: boolean;
  children: React.ReactNode;
}
