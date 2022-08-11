import { css } from '@mui/material/styles';
import { AmountContainer } from 'components/common/AmountContainer';
import { PriceLabel as PriceLabelZig } from '@zignaly-open/ui';
import { styled } from '@mui/system';

export const Item = styled('div')(({ theme }) => ({
  background: 'rgba(37, 35, 57, 0.4)',
  border: '1px solid rgba(193, 193, 200, 0.4)',
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  [theme.breakpoints.up('lg')]: {
    width: '640px',
  },
}));

export const CardHeader = styled('div')<{ isColumn: boolean }>`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;

  ${({ isColumn }) =>
    isColumn
      ? css`
          height: 64px;
        `
      : css`
          border-bottom: 1px solid rgba(193, 193, 200, 0.4);
          margin-bottom: 20px;
        `}
`;

export const CardHeaderLeft = styled(CardHeader)`
  border-bottom: 1px solid rgba(193, 193, 200, 0.4);
`;

export const AuctionImage = styled('img')<{ isColumn: boolean }>`
  width: 100%;
  height: 209px;
  object-fit: cover;
  box-sizing: border-box;
  ${({ isColumn }) =>
    !isColumn &&
    css`
      padding: 0 30px;
    `}
`;

export const StyledAmountContainer = styled(AmountContainer)`
  width: 100%;
  padding: 10px 0 5px;
  margin: 20px 0 16px;
  max-width: 300px;
`;

export const CardColumn = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
  min-width: 265px;
`;

export const CardBody = styled('div')`
  padding: 0 30px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;

export const PriceLabel = styled(PriceLabelZig)`
  span > span {
    &:nth-of-type(1) {
      font-size: 22px !important;
      margin-left: 10px;
      color: ${({ theme }) => theme.neutral100};
    }

    &:nth-of-type(2) {
      font-size: 15px !important;
      width: auto !important;
    }
  }
`;

export const CardActions = styled('div')<{ isColumn: boolean; hide?: boolean }>`
  display: flex;
  align-items: flex-end;
  flex: 1;
  padding: 8px 0 30px;
  justify-content: center;

  ${({ isColumn }) =>
    isColumn &&
    css`
      flex-direction: column;
      align-items: center;
      padding-top: 25px;
    `}

  ${({ hide }) =>
    hide &&
    css`
      display: none;
    `}
`;
