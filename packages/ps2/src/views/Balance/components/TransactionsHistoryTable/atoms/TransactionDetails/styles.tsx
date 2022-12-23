import React from 'react';
import { styled } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';

export const TransactionPanel = styled('div')`
  background: ${({ theme }) => theme.palette.neutral800};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  gap: 16px;
`;

export const TypographyPanelLabel = styled(ZigTypography)`
  && {
    margin-right: 16px;
    color: rgb(112, 111, 130);
    font-weight: 400;
    font-size: 13px;
  }
`;

export const TypographyPanelName = styled((props) => (
  <ZigTypography {...props} variant='body2' />
))`
  && {
    color: rgb(193, 193, 200);
  }
`;
