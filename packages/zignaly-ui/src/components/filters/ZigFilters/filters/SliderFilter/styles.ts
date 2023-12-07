import { styled } from "@mui/system";
import ZigTypography from "components/display/ZigTypography";
import ZigSlider from "components/inputs/ZigSlider";

export const StyledZigSlider = styled(ZigSlider)`
  padding: 0 9px;

  .MuiSlider-thumb {
    width: 18px;
    height: 18px;
  }
`;

export const Value = styled(ZigTypography, {
  shouldForwardProp: (p) => p !== "showPct",
})<{ showPct: boolean }>`
  font-size: 15px;
  color: ${({ theme }) => theme.palette.paleBlue};

  &::after {
    content: "${({ showPct }) => (showPct ? "%" : "")}";
    font-size: 12px;
    position: relative;
    top: -5px;
  }
`;
