import { CSSProperties } from "react";

export interface ChangeIndicatorProps {
  tooltip?: string | JSX.Element;
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
