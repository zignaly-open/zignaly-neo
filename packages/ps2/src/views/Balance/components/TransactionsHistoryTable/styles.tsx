import React from 'react';
import { styled } from '@mui/material';
import { CoinIcon, ZigTypography } from '@zignaly-open/ui';
import CenteredLoader from 'components/CenteredLoader';

export const TableLoader = styled(CenteredLoader)`
  padding: 8px 0;
`;

export const TransactionPanel = styled('div')`
  background: ${({ theme }) => theme.palette.neutral800};
  border: 1px dashed ${({ theme }) => theme.palette.neutral500};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: flex-start;
  padding: 20px;
  gap: 16px;
`;

export const TypographyPanelLabel = styled(ZigTypography)`
  margin-right: 16px;
  color: ${({ theme }) => theme.palette.neutral000};
  font-weight: 600;
  font-size: 15px;
`;

export const TypographyAddress = styled((props) => (
  <ZigTypography {...props} variant='h5' />
))`
  color: ${({ theme }) => theme.palette.neutral000};
`;

export const SmallCoinIcon = styled(CoinIcon)`
  width: 22px;
  height: 22px;
`;
