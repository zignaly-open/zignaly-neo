import { styled } from '@mui/material';
import { Typography, PriceLabel } from '@zignaly-open/ui';

// TODO: Box
export const Body = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ToContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
`;

export const ToOutline = styled('div')`
  background: linear-gradient(
        ${({ theme }) => theme.palette.neutral750},
        ${({ theme }) => theme.palette.neutral750}
      )
      padding-box,
    linear-gradient(to right, #8671f7 14.16%, #7ec9f9 83.59%) border-box;
  border: 2px solid transparent;
  width: 510px;
  height: 132px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 16px;
  row-gap: 16px;
  margin-bottom: 12px;
`;

export const MainPriceLabel = styled(PriceLabel)`
  > span {
    font-weight: 500;
    font-size: 26px !important;
    line-height: 40px !important;
    color: #f3f4f6;
    justify-content: center;
    margin-top: 16px;

    > span:nth-of-type(1) {
      font-weight: 500 !important;
      font-size: 26px !important;
    }

    > span:nth-of-type(2) {
      font-size: 15px;
      color: ${({ theme }) => theme.palette.highlighted};
    }
  }
`;

export const TypographyNumberResult = styled(Typography)`
  margin-right: 8px;
`;

export const TypographyBalance = styled(Typography)`
  margin-left: 4px;
`;

export const Inline = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Actions = styled('div')`
  margin-top: 56px;
  display: flex;
  justify-content: center;

  button {
    margin-right: 8px;

    &:last-child {
      margin-right: 0;
    }
  }
`;
