import ZigTypography from "../../../ZigTypography";
import { styled } from "@mui/material";
import { ArrowDropUp } from "@mui/icons-material";

export const Indicator = styled(ArrowDropUp)<{ isPositive: boolean }>`
  width: 14px;
  height: 15.5px;
  margin: 0 -2px;

  ${({ isPositive }) => `
    transform: ${isPositive ? "rotateX(0deg)" : "rotateX(180deg)"};
  `}
`;

export const ValueIndicator = styled(ZigTypography, {
  shouldForwardProp: (p) => p !== "smallPct",
})<{
  smallPct: boolean;
}>`
  display: inline-flex;
  font-size: 15px;
  line-height: 24px;
  font-weight: 500;
  align-items: center;

  span::after {
    content: "${({ smallPct }) => (smallPct ? "%" : "")}";
    font-size: 70%;
    transform: translateY(-13%);
    display: inline-block;
    line-height: 1;
  }
`;
