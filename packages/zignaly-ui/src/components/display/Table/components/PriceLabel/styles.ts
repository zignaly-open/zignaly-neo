import styled from "styled-components";
import muiStyled from "@emotion/styled";
import ZigTypography from "../../../ZigTypography";

export const Layout = styled.div`
  text-align: center;
`;

export const Value = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Coin = muiStyled(ZigTypography)`
  margin: 0 4px;
  text-transform: uppercase;
  width: 45px;
  text-align: left;
`;

export const BottomElementWrap = styled.div``;
