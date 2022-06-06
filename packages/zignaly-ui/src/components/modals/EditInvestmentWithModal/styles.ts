// Dependencies
import styled from "styled-components";
import Typography from "../../display/Typography";

export const Investor = styled.div`
  display: flex;
  flex-direction: row;
  gap: 22px;
  align-items: center;
  margin-bottom: 32px;
`;

export const InvestorData = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InvestorName = styled(Typography)``;

export const InvestorSuccessFee = styled(Typography)<any>``;

export const PendingTransaction = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 24px;
  margin: 0 0 42px;
  justify-content: space-between;

  ${({ theme }) => `
    gap: 22px;
    border: 1px solid ${theme["yellow"]};
    background: ${theme["neutral700"]};
    border-radius: 5px;
    
    svg {
      width: 14px;
      height: 14px;
      fill: ${theme["yellow"]};
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
      border-right: 1px solid ${theme["neutral500"]};
    }
  `};
`;

export const AmountInvested = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
`;

export const TokenValue = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .investmentAmount {
    font-size: 18px;
  }
`;

export const TokenImage = styled.img`
  width: 28px;
  height: 28px;
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
      fill: ${theme["links"]};
    }
  `}
`;

export const Inline = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const InputContainer = styled.div`
  margin-top: 68px;
`;

export const Form = styled.form``;
