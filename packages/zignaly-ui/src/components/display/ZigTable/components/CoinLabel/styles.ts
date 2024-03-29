import styled from "styled-components";

import muiStyled from "@emotion/styled";
import ZigTypography from "../../../ZigTypography";
import ZigCoinIcon from "../../../ZigCoinIcon";

export const Layout = styled.div`
  flex-direction: row;
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

export const WrapCoin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Icon = styled(ZigCoinIcon)`
  display: flex;
  margin-right: 12px;
`;

export const Name = muiStyled(ZigTypography)`
  display: flex;
`;

export const Coin = styled.span`
  display: flex;
  text-transform: uppercase;
`;
