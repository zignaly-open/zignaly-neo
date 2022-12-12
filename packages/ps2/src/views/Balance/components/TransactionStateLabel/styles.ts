import { styled } from '@mui/material';
import { transactionStateColor } from './types';

export const Value = styled('span')`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
`;

type LayoutTypeProps = {
  stateId: string;
};

export const Layout = styled('div')<LayoutTypeProps>`
  ${({ stateId, theme }) => `
    color: ${transactionStateColor(theme)[stateId]};
  `}
`;
