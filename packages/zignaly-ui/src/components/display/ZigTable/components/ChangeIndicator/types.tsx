import { CSSProperties } from "react";

export interface ChangeIndicatorProps {
  labelTooltip?: string;
  value: string | number;
  type?: "default" | "graph" | "only_number";
  label?: string;
  style?: CSSProperties;
  normalized?: boolean;
  stableCoinOperative?: boolean;
  id?: string;
  decimalScale?: number;
  smallPct?: boolean;
  hideNegativeSign?: boolean;
}
