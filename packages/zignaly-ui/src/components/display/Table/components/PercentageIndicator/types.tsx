export interface PercentageIndicatorProps {
  value: string | number;
  type?: "default" | "graph" | "only_number";
  label?: string;
  style?: CSSProperties;
  normalized?: boolean;
  stableCoinOperative?: boolean;
}
