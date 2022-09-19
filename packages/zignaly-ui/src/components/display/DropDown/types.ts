import React from "react";
import { PopoverOrigin, PopoverPosition } from "@mui/material/Popover/Popover";

export type DropDownProps = {
  content: React.ReactElement;
  component: ({ open }: { open: boolean }) => JSX.Element;
  anchorOrigin?: PopoverOrigin;
  anchorPosition?: PopoverPosition;
  transformOrigin?: PopoverOrigin;
};

export type DropDownHandle = {
  closeDropDown?: () => void;
};
