import { styled } from '@mui/material';
import { Typography } from '@zignaly-open/ui';

export const InvestorData = styled('div')`
  display: flex;
  flex-direction: column;
`;

export const InvestorName = styled(Typography)``;

export const InvestorSuccessFee = styled(Typography)``;

export const Field = styled('div')`
  display: grid;
  grid-template-columns: 0.9fr 1fr;
  user-select: none;
  gap: 42px;
  align-items: center;
`;

export const Row = styled('div')`
  ${({ theme }) => `
    &:first-child {
      border-right: 1px solid ${theme.palette.neutral500};
    }
  `};
`;

export const Inline = styled('div')`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const Grid = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex-direction: row;
  margin-top: 12px;
`;

export const Column = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 24px;

  &:first-child {
    border-right: 1px solid ${({ theme }) => theme.palette.neutral500};
    padding-right: 62px;
  }

  &:last-child {
    padding-left: 62px;
  }
`;

export const WithdrawFundsSpaceTaker = styled(Typography)`
  flex: 1;
  text-align: justify;
`;

export const LoaderContainer = styled('div')`
  padding: 4em 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TransactionContainer = styled('div')`
  margin-top: 42px;
`;

export const Highline = styled('span')`
  ${({ theme }) => `
    color: ${theme.palette.links};
  `}
`;
