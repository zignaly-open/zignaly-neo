export interface PercentageIndicatorProps {
  value: number;
  withoutIcon?: boolean;
  dashboardType?: "user" | "investor" | "marketplace";
  subtitle?: string;
  showTrophy?: boolean;
}
