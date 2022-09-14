import styled from 'styled-components';

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
      padding-right: 22px;
      border-right: 1px solid ${theme.neutral500};
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
`;

export const InputContainer = styled.div`
  margin-top: 68px;
`;

export const Form = styled.form``;
