import { ChartColors } from "../types";
import { useTheme } from "@mui/material";

export function useChartColor(): ChartColors {
  const theme = useTheme();
  return {
    green: theme.palette.chart.green,
    red: theme.palette.chart.red,
  };
}
