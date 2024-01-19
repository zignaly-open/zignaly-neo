import { ReactComponent as CaretTriangleIcon } from "assets/icons/caret-triangle-icon.svg";
import ZigTypography from "../../../ZigTypography";
import { styled } from "@mui/material";

export const Layout = styled("div")`
  display: grid;
  grid-row: auto;
  justify-content: center;
`;

export const Container = styled("div")`
  text-align: center;
`;

export const Row = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Inline = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Subtitle = styled(ZigTypography)`
  display: block;
`;

export const Indicator = styled(CaretTriangleIcon)<{ isPositive: boolean }>`
  margin-right: 6px;
  vertical-align: middle;
  margin-left: 6px;
  width: 8px;
  height: 8px;

  ${({ isPositive }) => `
    transform: ${isPositive ? "rotateX(0deg)" : "rotateX(180deg)"};
  `}
`;

export const ValueIndicator = styled(ZigTypography, {
  shouldForwardProp: (p) => p !== "smallPct",
})<{
  smallPct: boolean;
}>`
  display: inline;
  font-size: 15px !important;
  line-height: 24px !important;
  font-weight: 500;

  span::after {
    content: "${({ smallPct }) => (smallPct ? "%" : "")}";
    font-size: 70%;
    transform: translateY(-13%);
    display: inline-block;
  }
`;
