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
  wide?: boolean;
  error?: boolean | string;
};
