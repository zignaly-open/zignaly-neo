import { styled } from '@mui/material';

export const Field = styled('div')`
  display: grid;
  grid-template-columns: 0.7fr 1fr;
  user-select: none;
  gap: 42px;
  align-items: center;
  margin-bottom: 36px;
`;

export const Row = styled('div')`
  &:first-child {
    padding-right: 22px;
    border-right: 1px solid #35334a;
  }
`;

export const Form = styled('form')``;
