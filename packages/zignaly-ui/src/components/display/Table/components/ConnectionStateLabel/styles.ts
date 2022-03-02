// Dependencies
import styled from "styled-components";
import { connectionStateTypesId } from "./types";

export const Value = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
`;

export const Layout = styled.div<{ stateId: connectionStateTypesId }>`
  ${({ theme, stateId }) => `
    color: ${theme.connectionStateLabel.textColor[stateId]};
  `}
`;
