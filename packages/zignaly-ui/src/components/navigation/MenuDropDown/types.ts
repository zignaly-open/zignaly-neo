import React from "react";

export const defaultDropDownOptions = {
  maxHeight: "120px",
};

export type MenuDropDownProps = {
  id?: string;
  title: string;
  secondaryTitle?: string | null;
  focused?: boolean;
  children: React.ReactElement | React.ReactElement[];
  dropDownOptions?: {
    maxHeight?: string;
  };
  className?: string;
};
