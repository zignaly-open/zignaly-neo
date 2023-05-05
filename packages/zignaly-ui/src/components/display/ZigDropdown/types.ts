import { PopoverOrigin, PopoverPosition } from "@mui/material/Popover/Popover";

type Option = {
  id?: string;
  label?: string | JSX.Element;
  onClick?: () => void;
  href?: string;
  target?: "_blank";
  active?: boolean;
};

export type ZigDropdownOption = Option & {
  id?: string;
  children?: Option[];
  element?: JSX.Element;
  separator?: boolean;
};

export type ZigDropdownProps = {
  options: ZigDropdownOption[];
  component: ({ open }: { open: boolean }) => JSX.Element;
  anchorOrigin?: PopoverOrigin;
  anchorPosition?: PopoverPosition;
  transformOrigin?: PopoverOrigin;
};

export type ZigDropdownHandle = {
  closeDropDown?: () => void;
};
