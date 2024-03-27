import { Variant } from "@mui/material/styles/createTypography";

export type ZigAlertMessageProps = {
  text: string | React.ReactElement;
  error?: boolean;
  warning?: boolean;
  id?: string;
  variant?: Variant;
  size?: "small" | "medium";
};
