import theme from "../../../../../theme/theme";

export interface PercentageIndicatorProps {
  value: number;
  theme: theme;
  withoutIcon?: boolean;
  dashboardType?: "user" | "investor";
  subtitle?: string;
}
