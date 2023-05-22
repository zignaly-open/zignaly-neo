import { FilledTextFieldProps } from "@mui/material/TextField/TextField";

export type LabelActionProps = {
  text: string;
  href?: string;
  id?: string;
  tabIndex?: number;
  onClick?: () => void;
};

export type ZigInputProps = Omit<FilledTextFieldProps, "variant" | "error"> & {
  labelAction?: LabelActionProps;
  testId?: string;
  wide?: boolean;
  sensitive?: boolean;
  error?: boolean | string;
  id?: string;
};
