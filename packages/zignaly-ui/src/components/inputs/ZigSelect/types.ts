import { MenuPlacement, Props as SelectProps } from "react-select";
import { SxProps } from "@mui/system";

export type ZigSelectOption<T> = {
  value: T;
  label: string | JSX.Element;
  disabled?: boolean;
};

export type ZigSelectProps<T> = Omit<
  SelectProps,
  "isDisabled" | "isOptionDisabled" | "onChange" | "options"
> & {
  showBorder?: boolean;
  label?: string | JSX.Element;
  id?: string;
  small?: boolean;
  medium?: boolean;
  outlined?: boolean;
  options?: ZigSelectOption<T>[];
  filterOption?: ({ data }: { data: ZigSelectOption<T> }, search: string) => boolean;
  onChange?: (value: ZigSelectOption<T>["value"], option: ZigSelectOption<T> | null) => void;
  value?: ZigSelectOption<T>["value"];
  width?: number;
  error?: string | boolean;
  placeholder?: string;
  disabled?: boolean;
  menuPlacement?: MenuPlacement;
  hoverBackground?: boolean;
  sx?: SxProps;
};
