import { CheckboxProps } from "@mui/material/Checkbox";
import { ReactNode } from "react";

export type ZigCheckBoxProps = CheckboxProps & {
  variant?: "contained" | "outlined";
  label?: ReactNode;
};
