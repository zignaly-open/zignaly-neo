// Dependencies
import styled from "styled-components";

// Assets
import { ReactComponent as CaretTriangleIcon } from "assets/icons/caret-triangle-icon.svg";

// Component
import Typography from "components/display/Typography";

export const Layout = styled.div`
  display: grid;
  grid-row: auto;
  justify-content: center;
`;

export const Container = styled.div`
  text-align: center;
`;

export const TropyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
`;

export const Value = styled(Typography)<{ isPositive: boolean }>`
  display: inline;
  ${(props) => `
    font-size: 11px;
    font-weight: 500;
    color: ${props.isPositive ? props.theme.greenGraph : props.theme.redGraphOrError};
  `}
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Subtitle = styled(Typography)`
  display: inline;
  line-height: 20px !important;
`;

export const Indicator = styled(CaretTriangleIcon)<{ isPositive: boolean }>`
  margin-right: 6px;
  vertical-align: middle;
  ${({ isPositive }) => `
    transform: ${isPositive ? "rotateX(0deg)" : "rotateX(180deg)"};
  `}
`;
