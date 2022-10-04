export interface PercentageIndicatorProps {
  value: string | number;
  type?: "default" | "graph" | "only_number";
  label?: string;
  normalized?: boolean;
  stableCoinOperative?: boolean;
}
