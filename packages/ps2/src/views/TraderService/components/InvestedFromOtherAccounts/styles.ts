import { styled } from '@mui/material';

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
