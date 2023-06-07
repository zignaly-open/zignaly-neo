import { styled } from '@mui/material';

export const Field = styled('div')`
  display: grid;
  grid-template-columns: 0.7fr 1fr;
  gap: 34px;
  margin-bottom: 54px;

  > div:first-child {
    padding-right: 17px;
    border-right: 1px dotted ${({ theme }) => theme.palette.neutral600};
  }
`;

export const Form = styled('form')``;
