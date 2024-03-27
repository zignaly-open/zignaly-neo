import { PopperPlacementType, SxProps } from "@mui/material";

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
  sx?: SxProps;
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
  disabled?: boolean;
  menuSx?: SxProps;
  placement?: PopperPlacementType;
  matchAnchorWidth?: boolean;
};

export type ZigDropdownHandle = {
  closeDropDown?: () => void;
};
