// Dependencies
import styled from "styled-components";

import Typography from "components/display/Typography";
import { styledIf } from "utils/styled";

export const Layout = styled.div<{ fiat: boolean }>`
  ${(props) => `
     ${styledIf(
       props.fiat,
          `
      margin-right: 19px;
    `,
          `
      margin-right: 0;
    `,
  )}
  `}
  
`;

export const Value = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const Coin = styled(Typography)`
  margin: 0 4px;
  text-transform: uppercase;
  width: 45px;
  text-align: left;
`;

export const BottomElementWrap = styled.div`
  text-align: right;
  margin-right: 30px;
`;
