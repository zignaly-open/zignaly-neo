import { styled } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';

export const Investor = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 22px;
  align-items: center;
  justify-content: center;
  margin-bottom: 36px;
`;

export const InvestorData = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const InvestorName = styled(ZigTypography)``;

export const PendingTransaction = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 24px;
  margin: 0 0 42px;
  justify-content: space-between;

  ${({ theme }) => `
    gap: 22px;
    border: 1px solid ${theme.palette.yellow};
    background: ${theme.palette.neutral700};
    border-radius: 5px;
    
    svg {
      width: 14px;
      height: 14px;
      fill: ${theme.palette.yellow};
    }
  `}
`;

export const Field = styled('div')`
  display: grid;
  grid-template-columns: 0.9fr 1fr;
  user-select: none;
  gap: 42px;
  align-items: center;
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

export const WithdrawFundsOptionWrapper = styled('div')<{ border?: boolean }>`
  flex-direction: column;
  display: flex;

  height: 100%;
`;

export const WithdrawFundsButtonWrapper = styled('div')`
  text-align: center;
  margin-top: 56px;

  button {
    min-width: 170px;
  }
`;

export const TransactionContainer = styled('div')`
  margin: 42px -20px 0;
`;

export const WithdrawActions = styled('div')`
  margin-top: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
