import { styled } from "@mui/system";
import ZigTypography from "components/display/ZigTypography";
import ZigSlider from "components/inputs/ZigSlider";

export const StyledZigSlider = styled(ZigSlider)`
  .MuiSlider-thumb {
    width: 21px;
    height: 21px;
  }
`;

export const Value = styled(ZigTypography)<{ showPct: boolean }>`
  font-size: 18px;
  color: ${({ theme }) => theme.palette.paleBlue};

  &::after {
    content: "${({ showPct }) => (showPct ? "%" : "")}";
    font-size: 12px;
    position: relative;
    top: -5px;
  }
`;
