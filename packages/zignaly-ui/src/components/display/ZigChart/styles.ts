import { styled } from "@mui/system";
import { useTheme } from "@mui/material";

export const ChartLayoutLarge = styled("div")`
  width: 100%;
  z-index: 3;

  svg {
    overflow: visible;
  }
`;

export const ChartLayoutMini = styled("div")<{ height?: number }>`
  height: ${(props) => props.height || 110}px;
  width: 100%;
  display: flex;
  padding-bottom: ${(props) => (props.height ? 0 : 10)}px;
`;

export const useAxisStyle = () => {
  const theme = useTheme();
  return {
    axisLabel: {
      fontSize: 20,
      padding: 30,
      fill: theme.palette.neutral200,
      fontFamily: theme.typography.fontFamily,
      letterSpacing: 0.55,
      lineHeight: 16,
    },
    tickLabels: {
      fontSize: 11,
      padding: 7,
      // sorry not sorry
      fill: theme.palette.neutral200,
      fontFamily: theme.typography.fontFamily,
      letterSpacing: 0.55,
      lineHeight: 16,
    },
  };
};
