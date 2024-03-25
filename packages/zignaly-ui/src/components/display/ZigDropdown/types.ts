import { PopoverOrigin, PopoverPosition } from "@mui/material/Popover/Popover";

type Option = {
  id?: string;
  label?: string | JSX.Element;
  onClick?: () => void;
  href?: string;
  target?: "_blank";
  active?: boolean;
};

type ZigDropdownOptionCommon = {
  id?: string;
  customStyle?: string; // why yes of course this is a crutch
};

export type ZigDropdownOption = Option & {
  children?: Option[];
  element?: JSX.Element;
} & ZigDropdownOptionCommon;

export type ZigDropdownOptionSeparator = { separator?: boolean } & ZigDropdownOptionCommon;

export type ZigDropdownProps = {
  id?: string;
  options: (ZigDropdownOption | ZigDropdownOptionSeparator)[];
  component: ({ open }: { open: boolean }) => JSX.Element;
  anchorOrigin?: PopoverOrigin;
  anchorPosition?: PopoverPosition;
  transformOrigin?: PopoverOrigin;
  disabled?: boolean;
  position?: "left" | "right";
  menuSx?: SxProps;
};

export type ZigDropdownHandle = {
  closeDropDown?: () => void;
};
