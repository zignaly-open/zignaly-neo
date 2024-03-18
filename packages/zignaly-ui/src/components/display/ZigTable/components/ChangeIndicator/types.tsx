import { CSSProperties } from "react";

export interface ChangeIndicatorProps {
  labelTooltip?: string;
  value: string | number;
  type?: "default" | "graph" | "only_number";
  label?: string;
  sx?: CSSProperties;
  normalized?: boolean;
  stableCoinOperative?: boolean;
  id?: string;
  decimalScale?: number;
  smallPct?: boolean;
  indicatorPostion?: "left" | "right";
}
