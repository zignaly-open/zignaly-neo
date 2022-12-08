import { MenuPlacement, Props as SelectProps } from "react-select";

export type ZigSelectOption<T> = {
  value: T;
  label: string | JSX.Element;
  disabled?: boolean;
};

export type ZigSelectProps<T> = Omit<
  SelectProps,
  "isDisabled" | "isOptionDisabled" | "onChange" | "options"
> & {
  label?: string | JSX.Element;
  id?: string;
  small?: boolean;
  outlined?: boolean;
  options?: ZigSelectOption<T>[];
  filterOption?: ({ data }: { data: ZigSelectOption<T> }, search: string) => boolean;
  onChange?: (value: ZigSelectOption<T>["value"] | null, option: ZigSelectOption<T> | null) => void;
  value?: ZigSelectOption<T>["value"];
  width?: number;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  menuPlacement?: MenuPlacement;
  helperText?: string;
};
