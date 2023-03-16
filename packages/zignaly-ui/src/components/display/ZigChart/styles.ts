import { styled } from "@mui/system";
import { dark } from "../../../theme";

export const ChartLayoutLarge = styled("div")`
  width: 100%;
`;

export const ChartLayoutMini = styled("div")<{ height?: number }>`
  height: ${(props) => props.height || 100}px;
  width: 100%;
  display: inline-block;
`;

export const axisStyle = {
  axisLabel: {
    fontSize: 20,
    padding: 30,
    // sorry not sorry
    fill: dark.neutral200,
    fontFamily: "Avenir Next",
    letterSpacing: 0.55,
    lineHeight: 16,
  },
  tickLabels: {
    fontSize: 11,
    padding: 5,
    // sorry not sorry
    fill: dark.neutral200,
    fontFamily: "Avenir Next",
    letterSpacing: 0.55,
    lineHeight: 16,
  },
};
