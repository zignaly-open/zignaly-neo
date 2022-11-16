import { styled } from '@mui/material';

export const Field = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  user-select: none;
  gap: 42px;
  align-items: flex-start;

  & > div {
    min-height: 110px;
    ${({ theme }) => `
    &:first-child {
      padding-right: 42px;
      border-right: 1px solid ${theme.palette.neutral500};
    }
  `};
  }
`;

export const Form = styled('form')``;
