import { CSSProperties } from "react";

export interface PercentageIndicatorProps {
  labelTooltip?: string;
  value: string | number;
  type?: "default" | "graph" | "only_number";
  label?: string;
  style?: CSSProperties;
  normalized?: boolean;
  stableCoinOperative?: boolean;
}
