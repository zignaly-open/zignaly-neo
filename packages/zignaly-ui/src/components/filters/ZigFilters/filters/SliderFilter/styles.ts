import { styled } from "@mui/system";
import ZigTypography from "components/display/ZigTypography";
import ZigSlider from "components/inputs/ZigSlider";

export const StyledZigSlider = styled(ZigSlider)`
  padding: 0 10px;

  .MuiSlider-thumb {
    width: 20px;
    height: 20px;
  }

  /* .MuiSlider-track {
    color: yellow;
  } */

  .MuiSlider-rail {
    color: #acc4e4;
  }

  .MuiSlider-active {
    color: green;
  }
`;

export const Value = styled(ZigTypography, {
  shouldForwardProp: (p) => p !== "showPct",
})<{ showPct: boolean }>`
  font-size: 18px;
  color: ${({ theme }) => theme.palette.paleBlue};

  &::after {
    content: "${({ showPct }) => (showPct ? "%" : "")}";
    font-size: 12px;
    position: relative;
    top: -5px;
  }
`;
