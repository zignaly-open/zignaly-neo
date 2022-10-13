import { PopoverOrigin, PopoverPosition } from "@mui/material/Popover/Popover";

type Option = {
  label?: string | JSX.Element;
  onClick?: () => void;
  href?: string;
  target?: "_blank";
  active?: boolean;
};

export type DropDownOption = Option & {
  id?: string;
  children?: Option[];
  element?: JSX.Element;
  separator?: boolean;
};

export type DropDownProps = {
  options: DropDownOption[];
  component: ({ open }: { open: boolean }) => JSX.Element;
  anchorOrigin?: PopoverOrigin;
  anchorPosition?: PopoverPosition;
  transformOrigin?: PopoverOrigin;
};

export type DropDownHandle = {
  closeDropDown?: () => void;
};
