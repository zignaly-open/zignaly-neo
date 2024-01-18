import styled from "styled-components";
import { ReactComponent as CaretTriangleIcon } from "assets/icons/caret-triangle-icon.svg";
import muiStyled from "@emotion/styled";
import ZigTypography from "../../../ZigTypography";

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

export const Value = muiStyled(ZigTypography)<{ isPositive: boolean }>`
  display: inline;
  ${(props) => `
    font-size: 12px;
    font-weight: 500;
    color: ${
      props.isPositive ? props.theme.palette.greenGraph : props.theme.palette.redGraphOrError
    };
  `}
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Inline = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Subtitle = muiStyled(ZigTypography)`
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

export const ValueIndicator = styled(ZigTypography)<{
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
