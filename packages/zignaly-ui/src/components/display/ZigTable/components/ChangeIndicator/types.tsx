import { SxProps } from "@mui/system";

export interface ChangeIndicatorProps {
  tooltip?: string | JSX.Element;
  value: string | number;
  type?: "default" | "graph" | "only_number";
  label?: string;
  sx?: SxProps;
  normalized?: boolean;
  stableCoinOperative?: boolean;
  id?: string;
  decimalScale?: number;
  smallPct?: boolean;
  indicatorPostion?: "left" | "right";
  shorten?: boolean;
}
