import styled from 'styled-components';
import { connectionStateColor } from './types';

export const Value = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
`;

type LayoutTypeProps = {
  stateId: string;
};

export const Layout = styled.div<LayoutTypeProps>`
  ${({ stateId, theme }) => `
    color: ${connectionStateColor(theme)[stateId]};
  `}
`;
