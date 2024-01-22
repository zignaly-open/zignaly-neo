import { CheckboxProps } from "@mui/material/Checkbox";
import { ReactNode } from "react";
import { SxProps } from "@mui/system";

export type ZigCheckBoxProps = CheckboxProps & {
  variant?: "contained" | "outlined";
  label?: ReactNode;
  id?: string;
  wrapperSx?: SxProps;
};
