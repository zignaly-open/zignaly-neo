import { styled } from '@mui/material';
import { PriceLabel, Typography } from '@zignaly-open/ui';

export const TotalValue = styled(PriceLabel)`
  span,
  span span {
    color: #c1c1c8 !important;
  }
`;

export const Profit = styled(PriceLabel)`
  letter-spacing: 0.3px;

  & > span > span {
    line-height: 16px;
  }
`;

export const Layout = styled(Typography)`
  text-align: center;
  display: grid;
  gap: 8px;
`;

export const Symbol = styled(Typography)`
  padding-left: 4px;
`;
