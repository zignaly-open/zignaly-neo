import { FilledTextFieldProps } from "@mui/material/TextField/TextField";

type LabelActionProps = {
  text: string;
  href?: string;
  tabIndex?: number;
  onClick?: () => void;
};

export type ZigInputProps = Omit<FilledTextFieldProps, "variant"> & {
  labelAction: LabelActionProps;
  error: boolean | string;
};
