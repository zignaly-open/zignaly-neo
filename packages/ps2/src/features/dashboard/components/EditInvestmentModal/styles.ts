import styled, { css } from 'styled-components';
import { Typography } from '@zignaly-open/ui';

export const Investor = styled.div`
  display: flex;
  flex-direction: row;
  gap: 22px;
  align-items: center;
  margin-bottom: 32px;
  margin-top: 18px;
`;

export const InvestorData = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InvestorName = styled(Typography)``;

export const InvestorSuccessFee = styled(Typography)``;

export const PendingTransaction = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 24px;
  margin: 0 0 42px;
  justify-content: space-between;

  ${({ theme }) => `
    gap: 22px;
    border: 1px solid ${theme.yellow};
    background: ${theme.neutral700};
    border-radius: 5px;
    
    svg {
      width: 14px;
      height: 14px;
      fill: ${theme.yellow};
    }
  `}
`;

export const Field = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1fr;
  user-select: none;
  gap: 42px;
  align-items: center;
`;

export const Row = styled.div`
  ${({ theme }) => `
    &:first-child {
      border-right: 1px solid ${theme.neutral500};
    }
  `};
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 56px;
  gap: 32px;

  ${({ theme }) => `
    svg {
      fill: ${theme.links};
    }
  `}
`;

export const Inline = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex-direction: row;
  margin-top: 12px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  &:first-child {
    border-right: 1px solid ${({ theme }) => theme.neutral500};
    padding-right: 62px;
  }

  &:last-child {
    padding-left: 62px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Block = styled.div`
  padding: 4px 32px;
`;

export const WithdrawFundsOptionWrapper = styled.div<{ border?: boolean }>`
  flex-direction: column;
  gap: 15px;
  display: flex;

  height: 100%;
  justify-content: space-between;

  ${(props) =>
    props.border
      ? css`
          border-right: 1px solid rgb(74, 73, 88);
          padding-right: 50px;
        `
      : css`
          padding-left: 50px;
        `};
`;

export const WithdrawFundsButtonWrapper = styled.div`
  text-align: center;
`;

export const MultilineButton = styled.div`
  padding: 15px;
  flex-direction: column;
  display: flex;
`;

export const LoaderContainer = styled.div`
  padding: 4em 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TransactionContainer = styled.div`
  margin-top: 42px;
`;

export const WithdrawActions = styled.div`
  margin-top: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
