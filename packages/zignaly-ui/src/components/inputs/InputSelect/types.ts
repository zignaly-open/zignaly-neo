import React from "react";

export enum SelectSizes {
  SMALL = "small",
  NORMAL = "normal",
  LARGE = "large",
}

export type SelectorItemFormat = {
  ref: {
    id: number;
    icon?: React.ReactElement | null;
    caption: string;
  };
  data: object | null;
};

export type SelectProps = {
  name: string;
  size?: SelectSizes;
  onSelectItem: (item: null | SelectorItemFormat) => void;
  disabled?: boolean;
  label?: string | null;
  placeholder?: string | null;
  options?: SelectorItemFormat[];
  variant: "primary" | "transparent";
  selected?: SelectorItemFormat | null | any;
};
