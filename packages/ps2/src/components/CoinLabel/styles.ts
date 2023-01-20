import { styled } from '@mui/material';
import { ZigCoinIcon } from '@zignaly-open/ui';

export const Layout = styled('div')`
  flex-direction: row;
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

export const WrapCoin = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Icon = styled(ZigCoinIcon)`
  display: flex;
  margin-right: 12px;
`;

export const Coin = styled('span')`
  display: flex;
  text-transform: uppercase;
`;
