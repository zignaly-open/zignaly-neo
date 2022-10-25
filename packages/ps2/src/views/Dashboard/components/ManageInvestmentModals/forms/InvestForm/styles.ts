import styled from 'styled-components';

export const Field = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  user-select: none;
  gap: 42px;
  align-items: flex-start;
`;

export const Form = styled.form``;

export const Row = styled.div`
  height: 110px;
  ${({ theme }) => `
    &:first-child {
      padding-right: 42px;
      border-right: 1px solid ${theme.neutral500};
    }
  `};
`;
