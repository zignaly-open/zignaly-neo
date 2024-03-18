import React from "react";

export const defaultDropDownStyle = {
  maxHeight: "120px",
};

export type MenuDropDownProps = {
  id?: string;
  title: string;
  secondaryTitle?: string | null;
  focused?: boolean;
  children: React.ReactElement | React.ReactElement[];
  dropDownStyle?: Record<string, string>;
  className?: string;
};
