import { styled } from "@mui/system";
import { dark } from "../../../theme";

export const ChartLayoutLarge = styled("div")`
  width: 100%;
  z-index: 3;

  svg {
    overflow: visible;
  }
`;

export const ChartLayoutMini = styled("div")<{ height?: number }>`
  height: ${(props) => props.height || 100}px;
  width: 100%;
  display: block;
  margin-bottom: 10px;
`;

export const axisStyle = {
  axisLabel: {
    fontSize: 20,
    padding: 30,
    // sorry not sorry
    fill: dark.palette.neutral200,
    fontFamily: "Avenir Next",
    letterSpacing: 0.55,
    lineHeight: 16,
  },
  tickLabels: {
    fontSize: 11,
    padding: 7,
    // sorry not sorry
    fill: dark.palette.neutral200,
    fontFamily: "Avenir Next",
    letterSpacing: 0.55,
    lineHeight: 16,
  },
};
