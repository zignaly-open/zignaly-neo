// Dependencies
import styled from "styled-components";

// Assets
import CaretTriangleIcon from "assets/icons/caret-triangle-icon.svg";

// Component
import Typography from "components/display/Typography";

export const Layout = styled.div``;

export const Value = styled(Typography)<{ isPositive: boolean }>`
  display: inline;
  ${({ isPositive, theme }) => `
    font-size: 11px;
    font-weight: 500;
    color: ${isPositive ? theme["greenGraph"] : theme["redGraphOrError"]};
  `}
`;

export const Indicator = styled(CaretTriangleIcon)<{ isPositive: boolean }>`
  margin-right: 6px;
  vertical-align: middle;
  ${({ isPositive }) => `
    transform: ${isPositive ? "rotateX(0deg)" : "rotateX(180deg)"};
  `}
`;
